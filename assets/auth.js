(function () {
  'use strict';

  const dialog = document.querySelector('#auth-dialog');
  const openButtons = document.querySelectorAll('[data-auth-open]');
  const closeButton = document.querySelector('#auth-close');
  const form = document.querySelector('#auth-form');
  const title = document.querySelector('#auth-title');
  const description = document.querySelector('#auth-description');
  const nameField = document.querySelector('#auth-name-field');
  const nameInput = document.querySelector('#auth-name');
  const emailInput = document.querySelector('#auth-email');
  const passwordInput = document.querySelector('#auth-password');
  const consentField = document.querySelector('#auth-consent-field');
  const consentInput = document.querySelector('#auth-consent');
  const submitButton = document.querySelector('#auth-submit');
  const toggleButton = document.querySelector('#auth-toggle');
  const forgotButton = document.querySelector('#auth-forgot');
  const recovery = document.querySelector('#auth-recovery');
  const newPasswordInput = document.querySelector('#auth-new-password');
  const updatePasswordButton = document.querySelector('#auth-update-password');
  const signedIn = document.querySelector('#auth-signed-in');
  const accountLabel = document.querySelector('#auth-account-label');
  const signOutButton = document.querySelector('#auth-signout');
  const message = document.querySelector('#auth-message');
  const config = window.DOCES_MOMENTOS_SUPABASE;
  const redirectUrl = `${window.location.origin}${window.location.pathname}`;
  let signupMode = false;
  let passwordRecovery = false;
  let client = null;
  let sdkPromise = null;
  let authInitialization = null;
  let setupMessage = 'O login ainda não foi configurado. Siga as instruções de SUPABASE_SETUP.md.';

  function loadSupabaseSdk() {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      return Promise.resolve();
    }
    if (!sdkPromise) {
      sdkPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.4/dist/umd/supabase.js';
        script.integrity = 'sha384-sLWJsCmP+Z4Qn+HgF7Hi64Djta4fZMu0fcgi3uUL3GFV/ubx2G86LPOuMf7+ZIyX';
        script.crossOrigin = 'anonymous';
        script.onload = resolve;
        script.onerror = () => reject(new Error('Supabase SDK failed to load.'));
        document.head.append(script);
      }).catch(error => {
        sdkPromise = null;
        throw error;
      });
    }
    return sdkPromise;
  }

  async function getClient() {
    if (client) return client;
    if (!config || !config.url || !config.anonKey) return null;

    try {
      await loadSupabaseSdk();
      if (!window.supabase || typeof window.supabase.createClient !== 'function') {
        throw new Error('Supabase SDK is unavailable.');
      }
      const projectUrl = new URL(config.url);
      if (projectUrl.protocol !== 'https:' || !config.termsVersion) {
        setupMessage = 'A configuração do Supabase é inválida. Verifique SUPABASE_SETUP.md.';
        return null;
      }

      client = window.supabase.createClient(config.url, config.anonKey, {
        auth: {
          flowType: 'pkce',
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
      return client;
    } catch (error) {
      console.error('Falha ao inicializar o Supabase Auth.', error);
      setupMessage = 'Não foi possível iniciar o login. Verifique a conexão, a configuração e tente novamente.';
      return null;
    }
  }

  function initializeAuth() {
    if (authInitialization) return authInitialization;
    authInitialization = (async () => {
      const supabaseClient = await getClient();
      if (!supabaseClient) {
        authInitialization = null;
        return null;
      }

      supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          passwordRecovery = true;
          if (!dialog.open) dialog.showModal();
        }
        showSession(session);
      });

      const { data, error } = await supabaseClient.auth.getSession();
      if (error) throw error;
      showSession(data.session);
      return supabaseClient;
    })().catch(error => {
      console.error('Falha ao inicializar o estado de autenticação.', error);
      setupMessage = 'Não foi possível verificar sua sessão. Recarregue a página e tente novamente.';
      authInitialization = null;
      return null;
    });
    return authInitialization;
  }

  function setMessage(text) {
    message.textContent = text;
  }

  function setSignupMode(enabled) {
    signupMode = enabled;
    nameField.hidden = !enabled;
    nameInput.required = enabled;
    consentField.hidden = !enabled;
    consentInput.required = enabled;
    passwordInput.minLength = enabled ? 12 : 1;
    passwordInput.autocomplete = enabled ? 'new-password' : 'current-password';
    title.textContent = enabled ? 'Criar conta' : 'Entrar';
    description.textContent = enabled
      ? 'Informe seu nome, e-mail e uma senha com pelo menos 12 caracteres.'
      : 'Acesse sua conta ou crie seu cadastro.';
    submitButton.textContent = enabled ? 'Criar conta' : 'Entrar';
    toggleButton.textContent = enabled ? 'Já tenho uma conta' : 'Criar uma conta';
    forgotButton.hidden = enabled;
    setMessage('');
  }

  function showSession(session) {
    const loggedIn = Boolean(session);
    form.hidden = loggedIn || passwordRecovery;
    document.querySelector('.auth-links').hidden = loggedIn || passwordRecovery;
    signedIn.hidden = !loggedIn || passwordRecovery;
    recovery.hidden = !passwordRecovery;
    openButtons.forEach(button => {
      if (button.classList.contains('auth-icon-button')) {
        const label = loggedIn ? 'Minha conta' : 'Entrar ou criar conta';
        button.setAttribute('aria-label', label);
        button.title = label;
      } else {
        button.textContent = loggedIn ? 'Minha conta' : 'Entrar / criar conta';
      }
    });
    if (loggedIn) {
      accountLabel.textContent = `Conta conectada: ${session.user.email}`;
    }
  }

  openButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (!dialog.open) dialog.showModal();
      setMessage(config && config.url && config.anonKey ? 'Conectando ao serviço de autenticação...' : setupMessage);
      initializeAuth().then(supabaseClient => {
        if (!supabaseClient) setMessage(setupMessage);
      });
    });
  });

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });

  toggleButton.addEventListener('click', () => setSignupMode(!signupMode));

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const supabaseClient = await initializeAuth();
    if (!supabaseClient) {
      setMessage(setupMessage);
      return;
    }

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const fullName = nameInput.value.trim();
    if (signupMode && (fullName.length < 1 || fullName.length > 120 || password.length < 12 || !consentInput.checked)) {
      setMessage('Informe seu nome, use uma senha de pelo menos 12 caracteres e aceite os Termos de Uso.');
      return;
    }

    submitButton.disabled = true;
    setMessage(signupMode ? 'Criando sua conta...' : 'Entrando...');
    try {
      if (signupMode) {
        const { data, error } = await supabaseClient.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: fullName,
              terms_accepted: true,
              terms_version: config.termsVersion
            }
          }
        });
        if (error) throw error;
        if (data.session) {
          setMessage('Conta criada e conectada.');
        } else {
          setMessage('Cadastro iniciado. Confira seu e-mail para confirmar a conta antes de entrar.');
        }
      } else {
        const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage('Login realizado.');
      }
    } catch (error) {
      console.error('Falha no cadastro ou login.', error);
      setMessage(signupMode
        ? 'Não foi possível concluir o cadastro. Confira os dados e tente novamente.'
        : 'Não foi possível entrar. Confira o e-mail e a senha e tente novamente.');
    } finally {
      submitButton.disabled = false;
    }
  });

  forgotButton.addEventListener('click', async () => {
    const supabaseClient = await initializeAuth();
    if (!supabaseClient) {
      setMessage(setupMessage);
      return;
    }
    if (!emailInput.value.trim()) {
      setMessage('Informe seu e-mail para receber as instruções de redefinição.');
      emailInput.focus();
      return;
    }

    forgotButton.disabled = true;
    try {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(
        emailInput.value.trim().toLowerCase(),
        { redirectTo: redirectUrl }
      );
      if (error) throw error;
      setMessage('Se houver uma conta com esse e-mail, enviaremos as instruções de redefinição.');
    } catch (error) {
      console.error('Falha ao solicitar redefinição de senha.', error);
      setMessage('Não foi possível solicitar a redefinição. Tente novamente mais tarde.');
    } finally {
      forgotButton.disabled = false;
    }
  });

  updatePasswordButton.addEventListener('click', async () => {
    const supabaseClient = await initializeAuth();
    if (!supabaseClient) {
      setMessage(setupMessage);
      return;
    }
    if (newPasswordInput.value.length < 12) {
      setMessage('A nova senha precisa ter pelo menos 12 caracteres.');
      newPasswordInput.focus();
      return;
    }

    updatePasswordButton.disabled = true;
    try {
      const { data, error } = await supabaseClient.auth.updateUser({ password: newPasswordInput.value });
      if (error) throw error;
      passwordRecovery = false;
      newPasswordInput.value = '';
      showSession(data.user ? { user: data.user } : null);
      setMessage('Senha alterada com sucesso.');
    } catch (error) {
      console.error('Falha ao atualizar a senha.', error);
      setMessage('Não foi possível alterar a senha. Solicite uma nova redefinição e tente novamente.');
    } finally {
      updatePasswordButton.disabled = false;
    }
  });

  signOutButton.addEventListener('click', async () => {
    const supabaseClient = await initializeAuth();
    if (!supabaseClient) {
      setMessage(setupMessage);
      return;
    }
    signOutButton.disabled = true;
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
      passwordRecovery = false;
      setSignupMode(false);
      passwordInput.value = '';
      setMessage('Você saiu da sua conta.');
    } catch (error) {
      console.error('Falha ao sair da conta.', error);
      setMessage('Não foi possível encerrar a sessão. Tente novamente.');
    } finally {
      signOutButton.disabled = false;
    }
  });

  setSignupMode(false);
})();
