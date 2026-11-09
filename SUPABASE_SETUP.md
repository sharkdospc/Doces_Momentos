# Configuração do login e do Supabase

O site é estático e não tem acesso à sua conta Supabase. O arquivo SQL cria a estrutura necessária, mas você precisa executá-lo no projeto Supabase e preencher a configuração pública antes de publicar o login.

## 1. Criar e configurar o projeto

1. Crie um projeto no Supabase e, se disponível, escolha a região de São Paulo para reduzir transferência internacional de dados.
2. Em **Authentication → Providers**, mantenha habilitado o login por e-mail e exija confirmação do endereço.
3. Configure a senha mínima para 12 caracteres e habilite a proteção contra senhas comprometidas, se disponível no seu plano.
4. Em **Authentication → URL Configuration**, configure o endereço HTTPS real do site como URL principal e adicione como URLs de redirecionamento somente os endereços exatos de produção e desenvolvimento que você usa. Não use curingas amplos.
5. Configure um provedor de e-mail confiável para confirmação e recuperação de senha antes de abrir o cadastro ao público.
6. Revise os limites de autenticação e habilite CAPTCHA/proteção contra abuso se o cadastro ficar público.

## 2. Criar a tabela protegida

No SQL Editor do painel Supabase, execute o conteúdo de [`supabase/migrations/20261109155500_secure_profiles.sql`](./supabase/migrations/20261109155500_secure_profiles.sql).

A tabela guarda nome, data de cadastro e a versão/data de aceite dos Termos. E-mail e senha ficam sob o Supabase Auth; a senha não é copiada para a tabela pública `profiles`. O RLS limita a leitura ao próprio usuário, permite atualizar apenas o nome e não permite inserção ou exclusão direta pelo navegador. A função de cadastro valida os campos e grava a data de aceite no banco.

## 3. Conectar o site

No painel do Supabase, copie a **Project URL** e a **publishable key** (ou a chave pública `anon`, em projetos antigos) para `assets/supabase-config.js`:

```js
window.DOCES_MOMENTOS_SUPABASE = {
  url: 'https://SEU-PROJETO.supabase.co',
  anonKey: 'SUA_CHAVE_PUBLICA',
  termsVersion: '2026-11-09-v1'
};
```

Essa chave pública é destinada ao navegador e não substitui RLS. **Nunca** coloque `service_role`, senha do banco, token privado ou credencial SMTP nesse arquivo, no HTML, no JavaScript ou no Git. Não publique o site abrindo `index.html` via `file://`; use um servidor local ou hospedagem HTTPS.

## 4. Antes de liberar o cadastro

- Preencha o nome/identificação legal do controlador marcado como pendente em [`privacidade.html`](./privacidade.html) e [`termos.html`](./termos.html), confirme o contato e revise o texto com profissional jurídico com experiência em LGPD/consumidor.
- Confira a região efetivamente configurada no Supabase e avalie com seu jurídico os termos do fornecedor e eventual transferência internacional de dados.
- Teste confirmação de e-mail, login, recuperação de senha e saída da conta em produção.
- Teste a tabela com duas contas diferentes: uma conta não pode ler ou alterar o perfil da outra; usuários anônimos não devem acessar perfil algum.
- Sirva tudo por HTTPS e configure cabeçalhos de segurança na hospedagem (incluindo uma CSP ajustada ao domínio real do Supabase e à CDN utilizada). O HTML estático não consegue impor esses cabeçalhos de resposta por conta própria.
- O login registra contas, mas o site ainda não oferece compras nem funções exclusivas após o login.

Nenhuma configuração garante segurança absoluta ou elimina obrigações legais. Mantenha o Supabase, a hospedagem e as dependências atualizados, revise logs/acessos e estabeleça um processo para atender solicitações de titulares e incidentes.

## Referências técnicas

- [Supabase Auth: senhas e confirmação de e-mail](https://supabase.com/docs/guides/auth/passwords)
- [Supabase: segurança com RLS, políticas e permissões](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Lei Geral de Proteção de Dados — Lei nº 13.709/2018](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
