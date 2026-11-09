/* =========================================================
   DOCES MOMENTOS — Scripts de Interatividade
   ========================================================= */

(function () {
  'use strict';

  document.documentElement.classList.add('js');

  const introducao = document.querySelector('.entrada-site');
  const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
  const idiomaToggle = document.querySelector('.idioma-toggle');
  const opcoesIdioma = document.querySelector('.idioma-opcoes');
  const opcoesIdiomaBotoes = document.querySelectorAll('[data-idioma]');
  const textosOriginais = [];
  const atributosOriginais = [];
  const coletorTexto = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let textoParaSalvar;

  while ((textoParaSalvar = coletorTexto.nextNode())) {
    if (textoParaSalvar.parentElement && !textoParaSalvar.parentElement.closest('script, style, svg')) {
      textosOriginais.push([textoParaSalvar, textoParaSalvar.nodeValue]);
    }
  }

  document.querySelectorAll('[aria-label], [title], img[alt]').forEach(elemento => {
    ['aria-label', 'title', 'alt'].forEach(atributo => {
      if (elemento.hasAttribute(atributo)) {
        atributosOriginais.push([elemento, atributo, elemento.getAttribute(atributo)]);
      }
    });
  });

  const traducoes = {
    en: {
      'Idioma: PT': 'Language: EN',
      'Selecionar idioma do site': 'Select site language',
      'Idioma do site': 'Site language',
      'feito com carinho, para adoçar seu dia': 'Made with love to sweeten your day',
      'Pular abertura': 'Skip intro',
      'Doces Momentos, início': 'Doces Momentos, home',
      'Navegação principal': 'Main navigation',
      'Entre em contato pelas redes sociais': 'Contact us on social media',
      'Mais pedidos': 'Best sellers',
      'Sabores': 'Flavors',
      'Tamanhos': 'Sizes',
      'Sobre nós': 'About us',
      'Encomendar pelo WhatsApp: (47) 99286-8955': 'Order on WhatsApp: +55 47 99286-8955',
      'Ativar tema escuro': 'Enable dark theme',
      'Ativar tema claro': 'Enable light theme',
      'feito com carinho para toda Joinville': 'Made with love for all of Joinville',
      'Bem-vindo!': 'Welcome!',
      'Um potinho de carinho.': 'A little jar of love.',
      'Um momento só seu.': 'A moment just for you.',
      'Camadas de sabor, cuidado em cada detalhe e aquele docinho que transforma uma pausa simples em um momento especial.': 'Layers of flavor, thoughtful details, and a sweet treat that turns an ordinary break into a special moment.',
      'Descobrir os favoritos': 'Discover the favorites',
      'Ver tamanhos e preços': 'See sizes and prices',
      'uma colherada': 'a spoonful',
      'de felicidade': 'of happiness',
      'Acompanhe nossos sabores deliciosos': 'Explore our delicious flavors',
      'os queridinhos da casa': 'house favorites',
      'Dois favoritos que conquistam na primeira colherada.': 'Two favorites that win you over at the first spoonful.',
      'mais amado': 'most loved',
      'encontro de sabores': 'a meeting of flavors',
      'Dois Amores': 'Two Loves',
      'duas camadas, um amor só': 'two layers, one love',
      'Uma combinação deliciosa de chocolate e creme, para quem nunca quis escolher só um.': 'A delicious blend of chocolate and cream for anyone who never wanted to choose just one.',
      'Escolher meu tamanho': 'Choose my size',
      'crocante favorito': 'crunchy favorite',
      'crocante & cremoso': 'crunchy & creamy',
      'Oreo': 'Oreo',
      'textura que dá vontade de repetir': 'a texture worth coming back for',
      'Creme suave com pedacinhos crocantes: o equilíbrio perfeito para uma pausa gostosa.': 'Smooth cream with crunchy cookie pieces: the perfect balance for a lovely break.',
      'um sabor para cada vontade': 'a flavor for every craving',
      'Nossos sabores': 'Our flavors',
      'Toque em um potinho para conhecer um pouquinho mais.': 'Tap a dessert to discover a little more.',
      'Ninho': 'Milk powder cream',
      'cremoso e suave': 'smooth and creamy',
      'Um carinho cremoso para deixar qualquer pausa mais gostosa.': 'A creamy treat to make any break a little sweeter.',
      'Cenoura': 'Carrot',
      'fofinho com cobertura': 'soft cake with frosting',
      'Um clássico fofinho com cobertura, feito para acompanhar boas conversas.': 'A soft classic with frosting, made for good conversations.',
      'Brigadeiro': 'Brigadeiro',
      'clássico irresistível': 'an irresistible classic',
      'O clássico que tem gostinho de festa e nunca sai de moda.': 'A timeless classic that tastes like a celebration.',
      'Prestígio': 'Coconut & chocolate',
      'coco cremoso com chocolate': 'creamy coconut with chocolate',
      'A combinação de coco e chocolate para quem gosta de um sabor marcante e cremoso.': 'Coconut and chocolate come together for a rich, creamy flavor.',
      'Paçoca': 'Peanut candy',
      'amendoim cremoso e irresistível': 'creamy, irresistible peanut',
      'O gostinho da paçoca em um creme suave, perfeito para adoçar qualquer pausa.': 'The taste of paçoca in a smooth cream, perfect for sweetening any break.',
      'escolha seu momento': 'choose your moment',
      'Do tamanho da sua vontade.': 'Just the size you crave.',
      'Pequeno para adoçar uma pausa, grandinho para aproveitar até a última colherada.': 'Small enough for a sweet break, or bigger to enjoy down to the last spoonful.',
      'um mimo gostoso': 'a little treat',
      'Potinho': 'Dessert jar',
      'Consultar pelo Instagram': 'Ask us on Instagram',
      'mais para aproveitar': 'a little more to enjoy',
      'para curtir sem pressa': 'to savor slowly',
      'Escolha o sabor que mais combina com você e faça seu pedido pelo WhatsApp ou Instagram.': 'Choose your favorite flavor and order through WhatsApp or Instagram.',
      'um sonho servido em camadas': 'a dream served in layers',
      'Todo grande carinho pode começar em um potinho.': 'A little jar can hold a whole lot of love.',
      'Somos um casal da Zona Sul de Joinville que transformou o amor por bolos em um pequeno empreendimento de bolos de pote. Cada receita é preparada com dedicação, cuidado e vontade de fazer parte dos seus momentos especiais.': 'We are a couple from southern Joinville who turned our love of cake into a small dessert-jar business. Every recipe is made with care and the hope of being part of your special moments.',
      'Venha conhecer nosso cantinho': 'Come visit our little corner',
      'seu próximo momento gostoso começa aqui': 'your next sweet moment starts here',
      'Vamos adoçar o dia de quem você ama?': 'Shall we sweeten someone’s day?',
      'Escolha seu sabor favorito e fale com a gente pelo WhatsApp ou Instagram. Toque no botão do WhatsApp para começar a conversa com a mensagem de encomenda pronta.': 'Choose your favorite flavor and contact us on WhatsApp or Instagram. Tap the WhatsApp button to start an order with a message ready to send.',
      'Feito com carinho para todos os amantes de bolos': 'Made with love for everyone who loves cake',
      'Oi! Sou a Fada Gigica. Vamos descobrir nossos docinhos?': 'Hi! I’m Fairy Gigica. Shall we discover our sweet treats?',
      'Vamos explorar os sabores juntos?': 'Shall we explore the flavors together?',
      'Toque em um potinho para descobrir mais!': 'Tap a dessert jar to discover more!',
      'Seu próximo docinho favorito pode estar por aqui.': 'Your next favorite treat could be right here.',
      'Já escolheu o tamanho do seu carinho?': 'Have you picked the size of your sweet treat?',
      'Uma encomenda gostosa está a um toque de distância!': 'A delicious order is just a tap away!',
      'Sua encomenda está a um toque de distância!': 'Your order is just a tap away!',
      'Venha conhecer mais do nosso cantinho!': 'Come discover more of our little corner!',
      'Você pode mudar as cores do site por aqui.': 'You can change the site colors here.',
      'Vamos encontrar o tamanho ideal para você!': 'Let’s find the perfect size for you!',
      'Prontinha para ajudar com sua encomenda!': 'Ready to help with your order!',
      'Ouvir uma dica de navegação da Fada Gigica': 'Hear a navigation tip from Fairy Gigica',
      'Toque para ouvir uma dica da Fada Gigica': 'Tap to hear a tip from Fairy Gigica',
      'Bolo de pote Dois Amores': 'Two Loves dessert jar',
      'Bolo de pote Oreo decorado com biscoitos': 'Oreo dessert jar topped with cookies',
      'Bolo de pote Ninho': 'Milk powder cream dessert jar',
      'Bolos de pote de cenoura': 'Carrot cake dessert jars',
      'Bolo de pote de brigadeiro': 'Brigadeiro dessert jar',
      'Bolo de pote de Prestígio com coco e chocolate': 'Coconut and chocolate dessert jar',
      'Bolo de pote de paçoca': 'Paçoca peanut dessert jar',
      'Foto do casal por trás da Doces Momentos': 'Photo of the couple behind Doces Momentos',
      'Consultar bolo de pote de 250 ml pelo Instagram': 'Ask about the 250 ml dessert jar on Instagram',
      'Consultar bolo de pote de 350 ml pelo Instagram': 'Ask about the 350 ml dessert jar on Instagram',
      'Fada Gigica, guia do site': 'Fairy Gigica, site guide'
    },
    es: {
      'Idioma: PT': 'Idioma: ES',
      'Selecionar idioma do site': 'Seleccionar idioma del sitio',
      'Idioma do site': 'Idioma del sitio',
      'feito com carinho, para adoçar seu dia': 'Hecho con cariño para endulzar tu día',
      'Pular abertura': 'Saltar introducción',
      'Doces Momentos, início': 'Doces Momentos, inicio',
      'Navegação principal': 'Navegación principal',
      'Entre em contato pelas redes sociais': 'Póngase en contacto con nosotros en las redes sociales',
      'Mais pedidos': 'Más pedidos',
      'Sabores': 'Sabores',
      'Tamanhos': 'Tamaños',
      'Sobre nós': 'Sobre nosotros',
      'Encomendar pelo WhatsApp: (47) 99286-8955': 'Pedir por WhatsApp: +55 47 99286-8955',
      'Ativar tema escuro': 'Activar tema oscuro',
      'Ativar tema claro': 'Activar tema claro',
      'feito com carinho para toda Joinville': 'Hecho con cariño para toda Joinville',
      'Bem-vindo!': '¡Te damos la bienvenida!',
      'Um potinho de carinho.': 'Un vasito lleno de cariño.',
      'Um momento só seu.': 'Un momento solo para ti.',
      'Camadas de sabor, cuidado em cada detalhe e aquele docinho que transforma uma pausa simples em um momento especial.': 'Capas de sabor, cuidado en cada detalle y ese dulce que transforma una pausa sencilla en un momento especial.',
      'Descobrir os favoritos': 'Descubrir los favoritos',
      'Ver tamanhos e preços': 'Ver tamaños y precios',
      'uma colherada': 'una cucharada',
      'de felicidade': 'de felicidad',
      'Acompanhe nossos sabores deliciosos': 'Descubre nuestros deliciosos sabores',
      'os queridinhos da casa': 'los favoritos de la casa',
      'Dois favoritos que conquistam na primeira colherada.': 'Dos favoritos que conquistan desde la primera cucharada.',
      'mais amado': 'el más querido',
      'encontro de sabores': 'encuentro de sabores',
      'Dois Amores': 'Dos Amores',
      'duas camadas, um amor só': 'dos capas, un solo amor',
      'Uma combinação deliciosa de chocolate e creme, para quem nunca quis escolher só um.': 'Una deliciosa combinación de chocolate y crema, para quienes nunca quisieron elegir solo uno.',
      'Escolher meu tamanho': 'Elegir mi tamaño',
      'crocante favorito': 'crujiente favorito',
      'crocante & cremoso': 'crujiente y cremoso',
      'Oreo': 'Oreo',
      'textura que dá vontade de repetir': 'una textura para repetir',
      'Creme suave com pedacinhos crocantes: o equilíbrio perfeito para uma pausa gostosa.': 'Crema suave con trocitos crujientes: el equilibrio perfecto para una pausa deliciosa.',
      'um sabor para cada vontade': 'un sabor para cada antojo',
      'Nossos sabores': 'Nuestros sabores',
      'Toque em um potinho para conhecer um pouquinho mais.': 'Toca un vasito para conocerlo un poco mejor.',
      'Ninho': 'Crema de leche en polvo',
      'cremoso e suave': 'cremoso y suave',
      'Um carinho cremoso para deixar qualquer pausa mais gostosa.': 'Un dulce cremoso para hacer más deliciosa cualquier pausa.',
      'Cenoura': 'Zanahoria',
      'fofinho com cobertura': 'esponjoso con cobertura',
      'Um clássico fofinho com cobertura, feito para acompanhar boas conversas.': 'Un clásico esponjoso con cobertura, ideal para una buena conversación.',
      'Brigadeiro': 'Brigadeiro',
      'clássico irresistível': 'un clásico irresistible',
      'O clássico que tem gostinho de festa e nunca sai de moda.': 'El clásico con sabor a fiesta que nunca pasa de moda.',
      'Prestígio': 'Coco y chocolate',
      'coco cremoso com chocolate': 'coco cremoso con chocolate',
      'A combinação de coco e chocolate para quem gosta de um sabor marcante e cremoso.': 'La combinación de coco y chocolate para quienes prefieren un sabor intenso y cremoso.',
      'Paçoca': 'Dulce de cacahuete',
      'amendoim cremoso e irresistível': 'cacahuete cremoso e irresistible',
      'O gostinho da paçoca em um creme suave, perfeito para adoçar qualquer pausa.': 'El sabor de la paçoca en una crema suave, perfecta para endulzar cualquier pausa.',
      'escolha seu momento': 'elige tu momento',
      'Do tamanho da sua vontade.': 'Del tamaño de tus ganas.',
      'Pequeno para adoçar uma pausa, grandinho para aproveitar até a última colherada.': 'Pequeño para endulzar una pausa, o grande para disfrutar hasta la última cucharada.',
      'um mimo gostoso': 'un pequeño antojo',
      'Potinho': 'Vasito',
      'Consultar pelo Instagram': 'Preguntar por Instagram',
      'mais para aproveitar': 'un poco más para disfrutar',
      'para curtir sem pressa': 'para disfrutar sin prisa',
      'Escolha o sabor que mais combina com você e faça seu pedido pelo WhatsApp ou Instagram.': 'Elige tu sabor favorito y haz tu pedido por WhatsApp o Instagram.',
      'um sonho servido em camadas': 'un sueño servido en capas',
      'Todo grande carinho pode começar em um potinho.': 'Un vasito puede guardar mucho cariño.',
      'Somos um casal da Zona Sul de Joinville que transformou o amor por bolos em um pequeno empreendimento de bolos de pote. Cada receita é preparada com dedicação, cuidado e vontade de fazer parte dos seus momentos especiais.': 'Somos una pareja del sur de Joinville que convirtió su amor por los pasteles en un pequeño negocio de postres en vasito. Preparamos cada receta con dedicación y cariño, para formar parte de tus momentos especiales.',
      'Venha conhecer nosso cantinho': 'Ven a conocer nuestro rincón',
      'seu próximo momento gostoso começa aqui': 'tu próximo momento dulce empieza aquí',
      'Vamos adoçar o dia de quem você ama?': '¿Endulzamos el día de alguien especial?',
      'Escolha seu sabor favorito e fale com a gente pelo WhatsApp ou Instagram. Toque no botão do WhatsApp para começar a conversa com a mensagem de encomenda pronta.': 'Elige tu sabor favorito y escríbenos por WhatsApp o Instagram. Toca el botón de WhatsApp para empezar tu pedido con un mensaje listo para enviar.',
      'Feito com carinho para todos os amantes de bolos': 'Hecho con cariño para quienes aman los pasteles',
      'Oi! Sou a Fada Gigica. Vamos descobrir nossos docinhos?': '¡Hola! Soy el Hada Gigica. ¿Descubrimos nuestros dulces?',
      'Vamos explorar os sabores juntos?': '¿Exploramos juntos los sabores?',
      'Toque em um potinho para descobrir mais!': '¡Toca un vasito para descubrir más!',
      'Seu próximo docinho favorito pode estar por aqui.': 'Tu próximo dulce favorito podría estar aquí.',
      'Já escolheu o tamanho do seu carinho?': '¿Ya elegiste el tamaño de tu dulce?',
      'Uma encomenda gostosa está a um toque de distância!': '¡Tu pedido delicioso está a un toque!',
      'Sua encomenda está a um toque de distância!': '¡Tu pedido está a un toque!',
      'Venha conhecer mais do nosso cantinho!': '¡Ven a conocer nuestro rincón!',
      'Você pode mudar as cores do site por aqui.': 'Puedes cambiar los colores del sitio aquí.',
      'Vamos encontrar o tamanho ideal para você!': '¡Busquemos el tamaño ideal para ti!',
      'Prontinha para ajudar com sua encomenda!': '¡Lista para ayudarte con tu pedido!',
      'Ouvir uma dica de navegação da Fada Gigica': 'Escuchar un consejo de navegación del Hada Gigica',
      'Toque para ouvir uma dica da Fada Gigica': 'Toca para escuchar un consejo del Hada Gigica',
      'Bolo de pote Dois Amores': 'Postre en vasito Dos Amores',
      'Bolo de pote Oreo decorado com biscoitos': 'Postre Oreo en vasito decorado con galletas',
      'Bolo de pote Ninho': 'Postre en vasito de crema de leche en polvo',
      'Bolos de pote de cenoura': 'Postres de zanahoria en vasito',
      'Bolo de pote de brigadeiro': 'Postre de brigadeiro en vasito',
      'Bolo de pote de Prestígio com coco e chocolate': 'Postre de coco y chocolate en vasito',
      'Bolo de pote de paçoca': 'Postre de paçoca en vasito',
      'Foto do casal por trás da Doces Momentos': 'Foto de la pareja detrás de Doces Momentos',
      'Consultar bolo de pote de 250 ml pelo Instagram': 'Consultar por el postre de 250 ml en Instagram',
      'Consultar bolo de pote de 350 ml pelo Instagram': 'Consultar por el postre de 350 ml en Instagram',
      'Fada Gigica, guia do site': 'Hada Gigica, guía del sitio'
    },
    'zh-CN': {
      'Idioma: PT': '语言：中文',
      'Selecionar idioma do site': '选择网站语言',
      'Idioma do site': '网站语言',
      'feito com carinho, para adoçar seu dia': '用心制作，为你的日子增添甜蜜',
      'Pular abertura': '跳过开场',
      'Doces Momentos, início': 'Doces Momentos，首页',
      'Navegação principal': '主导航',
      'Entre em contato pelas redes sociais': '通过社交媒体与我们联系',
      'Mais pedidos': '人气推荐',
      'Sabores': '口味',
      'Tamanhos': '规格',
      'Sobre nós': '关于我们',
      'Encomendar pelo WhatsApp: (47) 99286-8955': '通过 WhatsApp 订购：+55 47 99286-8955',
      'Ativar tema escuro': '开启深色模式',
      'Ativar tema claro': '开启浅色模式',
      'feito com carinho para toda Joinville': '为 Joinville 用心制作',
      'Bem-vindo!': '欢迎！',
      'Um potinho de carinho.': '一小杯甜蜜心意。',
      'Um momento só seu.': '属于你的片刻。',
      'Camadas de sabor, cuidado em cada detalhe e aquele docinho que transforma uma pausa simples em um momento especial.': '层层美味，细致用心，让一份甜点把平凡的休息变成特别时刻。',
      'Descobrir os favoritos': '探索人气口味',
      'Ver tamanhos e preços': '查看规格与价格',
      'uma colherada': '一勺',
      'de felicidade': '幸福滋味',
      'Acompanhe nossos sabores deliciosos': '继续探索美味',
      'os queridinhos da casa': '店内人气之选',
      'Dois favoritos que conquistam na primeira colherada.': '两款一尝就令人喜爱的热门甜点。',
      'mais amado': '最受喜爱',
      'encontro de sabores': '风味相遇',
      'Dois Amores': '双重甜蜜',
      'duas camadas, um amor só': '两层美味，一份心意',
      'Uma combinação deliciosa de chocolate e creme, para quem nunca quis escolher só um.': '巧克力与奶油的美味组合，再也不用只选一种。',
      'Escolher meu tamanho': '选择规格',
      'crocante favorito': '人气酥脆口感',
      'crocante & cremoso': '酥脆又香滑',
      'Oreo': '奥利奥',
      'textura que dá vontade de repetir': '让人想再来一份的口感',
      'Creme suave com pedacinhos crocantes: o equilíbrio perfeito para uma pausa gostosa.': '香滑奶油搭配酥脆饼干，为惬意片刻带来完美口感。',
      'um sabor para cada vontade': '满足每一种心情的风味',
      'Nossos sabores': '我们的口味',
      'Toque em um potinho para conhecer um pouquinho mais.': '点击甜点杯，了解更多。',
      'Ninho': '奶粉奶油',
      'cremoso e suave': '香滑细腻',
      'Um carinho cremoso para deixar qualquer pausa mais gostosa.': '一份香滑甜点，让每次休息都更美好。',
      'Cenoura': '胡萝卜',
      'fofinho com cobertura': '松软蛋糕配糖霜',
      'Um clássico fofinho com cobertura, feito para acompanhar boas conversas.': '经典松软蛋糕搭配糖霜，适合与美好交谈相伴。',
      'Brigadeiro': '巴西巧克力球',
      'clássico irresistível': '令人难以抗拒的经典',
      'O clássico que tem gostinho de festa e nunca sai de moda.': '充满派对气息、永不过时的经典甜点。',
      'Prestígio': '椰子与巧克力',
      'coco cremoso com chocolate': '香滑椰子搭配巧克力',
      'A combinação de coco e chocolate para quem gosta de um sabor marcante e cremoso.': '椰子与巧克力的组合，浓郁香滑，风味十足。',
      'Paçoca': '花生糖',
      'amendoim cremoso e irresistível': '香滑可口的花生风味',
      'O gostinho da paçoca em um creme suave, perfeito para adoçar qualquer pausa.': '将巴西花生糖的风味融入细腻奶油，为休息时光增添甜蜜。',
      'escolha seu momento': '选择你的甜蜜时刻',
      'Do tamanho da sua vontade.': '满足你的心意。',
      'Pequeno para adoçar uma pausa, grandinho para aproveitar até a última colherada.': '小杯为片刻添甜，大杯让你享受每一勺。',
      'um mimo gostoso': '一份甜蜜小礼',
      'Potinho': '甜点杯',
      'Consultar pelo Instagram': '通过 Instagram 咨询',
      'mais para aproveitar': '更多美味享受',
      'para curtir sem pressa': '慢慢享用',
      'Escolha o sabor que mais combina com você e faça seu pedido pelo WhatsApp ou Instagram.': '选择最适合你的口味，通过 WhatsApp 或 Instagram 下单。',
      'um sonho servido em camadas': '层层呈现的甜蜜梦想',
      'Todo grande carinho pode começar em um potinho.': '一小杯甜点，也能装下满满心意。',
      'Somos um casal da Zona Sul de Joinville que transformou o amor por bolos em um pequeno empreendimento de bolos de pote. Cada receita é preparada com dedicação, cuidado e vontade de fazer parte dos seus momentos especiais.': '我们是一对来自 Joinville 南区的情侣，因为热爱蛋糕而创立了这家甜点杯小店。每份甜点都用心制作，希望陪伴你的特别时刻。',
      'Venha conhecer nosso cantinho': '来看看我们的小天地',
      'seu próximo momento gostoso começa aqui': '下一段甜蜜时光从这里开始',
      'Vamos adoçar o dia de quem você ama?': '为你爱的人增添一份甜蜜吧？',
      'Escolha seu sabor favorito e fale com a gente pelo WhatsApp ou Instagram. Toque no botão do WhatsApp para começar a conversa com a mensagem de encomenda pronta.': '选择你喜欢的口味，通过 WhatsApp 或 Instagram 联系我们。点击 WhatsApp 按钮，即可发送预设订购消息。',
      'Feito com carinho para todos os amantes de bolos': '为每一位蛋糕爱好者用心制作',
      'Oi! Sou a Fada Gigica. Vamos descobrir nossos docinhos?': '你好！我是 Gigica 小仙子。一起探索甜点吧？',
      'Vamos explorar os sabores juntos?': '一起探索各种口味吧？',
      'Toque em um potinho para descobrir mais!': '点击甜点杯了解更多！',
      'Seu próximo docinho favorito pode estar por aqui.': '你喜欢的下一款甜点可能就在这里。',
      'Já escolheu o tamanho do seu carinho?': '选好甜点的规格了吗？',
      'Uma encomenda gostosa está a um toque de distância!': '只需轻轻一点，美味即可下单！',
      'Sua encomenda está a um toque de distância!': '轻轻一点即可下单！',
      'Venha conhecer mais do nosso cantinho!': '来看看我们的小天地吧！',
      'Você pode mudar as cores do site por aqui.': '你可以在这里更改网站颜色。',
      'Vamos encontrar o tamanho ideal para você!': '一起找到最适合你的规格吧！',
      'Prontinha para ajudar com sua encomenda!': '我随时准备帮你下单！',
      'Ouvir uma dica de navegação da Fada Gigica': '听听 Gigica 小仙子的浏览提示',
      'Toque para ouvir uma dica da Fada Gigica': '点击收听 Gigica 小仙子的提示',
      'Bolo de pote Dois Amores': '双重甜蜜蛋糕杯',
      'Bolo de pote Oreo decorado com biscoitos': '装饰奥利奥饼干的甜点杯',
      'Bolo de pote Ninho': '奶粉奶油蛋糕杯',
      'Bolos de pote de cenoura': '胡萝卜蛋糕杯',
      'Bolo de pote de brigadeiro': '巴西巧克力蛋糕杯',
      'Bolo de pote de Prestígio com coco e chocolate': '椰子巧克力蛋糕杯',
      'Bolo de pote de paçoca': '花生糖蛋糕杯',
      'Foto do casal por trás da Doces Momentos': 'Doces Momentos 创办情侣的照片',
      'Consultar bolo de pote de 250 ml pelo Instagram': '通过 Instagram 咨询 250 毫升甜点杯',
      'Consultar bolo de pote de 350 ml pelo Instagram': '通过 Instagram 咨询 350 毫升甜点杯',
      'Fada Gigica, guia do site': '网站向导 Gigica 小仙子'
    }
  };

  const chavesLegadasDeTraducao = {
    'Feito com carinho para adoçar o seu dia.': 'feito com carinho, para adoçar seu dia',
    'Feito com carinho para Joinville.': 'feito com carinho para toda Joinville',
    'Boas-vindas!': 'Bem-vindo!',
    'Um momento especial para você.': 'Um momento só seu.',
    'Camadas de sabor e cuidado em cada detalhe: uma sobremesa que transforma uma pausa simples em um momento especial.': 'Camadas de sabor, cuidado em cada detalhe e aquele docinho que transforma uma pausa simples em um momento especial.',
    'Conheça os favoritos': 'Descobrir os favoritos',
    'Consulte os tamanhos e preços': 'Ver tamanhos e preços',
    'Uma colherada': 'uma colherada',
    'de felicidade.': 'de felicidade',
    'Conheça nossos sabores.': 'Acompanhe nossos sabores deliciosos',
    'Utilize as setas para navegar pelos sabores.': 'Toque em um potinho para conhecer um pouquinho mais.',
    'Os favoritos da casa': 'os queridinhos da casa',
    'Dois sabores que conquistam desde a primeira colherada.': 'Dois favoritos que conquistam na primeira colherada.',
    'O mais querido': 'mais amado',
    'Um encontro de sabores': 'encontro de sabores',
    'Duas camadas, um só amor.': 'duas camadas, um amor só',
    'Uma deliciosa combinação de chocolate e creme, para quem não quer escolher apenas um sabor.': 'Uma combinação deliciosa de chocolate e creme, para quem nunca quis escolher só um.',
    'Escolha o seu tamanho': 'Escolher meu tamanho',
    'O favorito crocante': 'crocante favorito',
    'Crocante e cremoso': 'crocante & cremoso',
    'Uma textura que dá vontade de repetir.': 'textura que dá vontade de repetir',
    'Creme suave com pedaços crocantes: o equilíbrio perfeito para uma pausa deliciosa.': 'Creme suave com pedacinhos crocantes: o equilíbrio perfeito para uma pausa gostosa.',
    'Um sabor para cada desejo': 'um sabor para cada vontade',
    'Uma sobremesa cremosa para tornar qualquer pausa mais deliciosa.': 'Um carinho cremoso para deixar qualquer pausa mais gostosa.',
    'Cremoso e suave.': 'cremoso e suave',
    'Macio e coberto com deliciosa cobertura.': 'fofinho com cobertura',
    'Um clássico macio e coberto, perfeito para acompanhar boas conversas.': 'Um clássico fofinho com cobertura, feito para acompanhar boas conversas.',
    'Um clássico irresistível.': 'clássico irresistível',
    'Um clássico com sabor de festa, que nunca sai de moda.': 'O clássico que tem gostinho de festa e nunca sai de moda.',
    'Coco cremoso com chocolate.': 'coco cremoso com chocolate',
    'Uma combinação de coco e chocolate para quem aprecia sabores marcantes e cremosos.': 'A combinação de coco e chocolate para quem gosta de um sabor marcante e cremoso.',
    'Creme de amendoim, cremoso e irresistível.': 'amendoim cremoso e irresistível',
    'O sabor da paçoca em um creme suave, perfeito para adoçar qualquer pausa.': 'O gostinho da paçoca em um creme suave, perfeito para adoçar qualquer pausa.',
    'Escolha o seu momento': 'escolha seu momento',
    'Um tamanho para cada vontade.': 'Do tamanho da sua vontade.',
    'Uma opção pequena para adoçar uma pausa e outra maior para aproveitar até a última colherada.': 'Pequeno para adoçar uma pausa, grandinho para aproveitar até a última colherada.',
    'Uma deliciosa pausa': 'um mimo gostoso',
    'Mais para aproveitar': 'mais para aproveitar',
    'Para saborear sem pressa': 'para curtir sem pressa',
    'Escolha o sabor que mais lhe agrada e faça seu pedido pelo WhatsApp ou pelo Instagram.': 'Escolha o sabor que mais combina com você e faça seu pedido pelo WhatsApp ou Instagram.',
    'Um sonho servido em camadas': 'um sonho servido em camadas',
    'Um grande gesto de carinho pode começar em um potinho.': 'Todo grande carinho pode começar em um potinho.',
    'Somos um casal da Zona Sul de Joinville que transformou a paixão por bolos em um pequeno empreendimento de bolos de pote. Cada receita é preparada com dedicação e cuidado, para fazer parte de momentos especiais.': 'Somos um casal da Zona Sul de Joinville que transformou o amor por bolos em um pequeno empreendimento de bolos de pote. Cada receita é preparada com dedicação, cuidado e vontade de fazer parte dos seus momentos especiais.',
    'Conheça nosso trabalho': 'Venha conhecer nosso cantinho',
    'Entre em contato pelas redes sociais': 'Fale com a gente nas redes sociais',
    'Ver o sabor anterior': 'Ver bolo anterior',
    'Ver o próximo sabor': 'Ver próximo bolo',
    'Seu próximo momento especial começa aqui': 'seu próximo momento gostoso começa aqui',
    'Que tal adoçar o dia de alguém especial?': 'Vamos adoçar o dia de quem você ama?',
    'Escolha seu sabor favorito e entre em contato pelo WhatsApp ou pelo Instagram. No WhatsApp, uma mensagem sugerida facilitará o início da conversa.': 'Escolha seu sabor favorito e fale com a gente pelo WhatsApp ou Instagram. Toque no botão do WhatsApp para começar a conversa com a mensagem de encomenda pronta.',
    'Feito com carinho para todos os apreciadores de bolos.': 'Feito com carinho para todos os amantes de bolos',
    'Olá! Sou a Fada Gigica. Vamos conhecer nossas sobremesas?': 'Oi! Sou a Fada Gigica. Vamos descobrir nossos docinhos?',
    'Ouça uma dica de navegação da Fada Gigica': 'Ouvir uma dica de navegação da Fada Gigica',
    'Vamos explorar os sabores?': 'Vamos explorar os sabores juntos?',
    'Selecione um potinho para saber mais.': 'Toque em um potinho para descobrir mais!',
    'Sua próxima sobremesa favorita pode estar aqui.': 'Seu próximo docinho favorito pode estar por aqui.',
    'Já escolheu o tamanho ideal?': 'Já escolheu o tamanho do seu carinho?',
    'Faça sua encomenda com apenas um toque!': 'Uma encomenda gostosa está a um toque de distância!',
    'Você pode alterar o tema do site neste botão.': 'Você pode mudar as cores do site por aqui.',
    'Estou pronta para ajudar com a sua encomenda!': 'Prontinha para ajudar com sua encomenda!',
    'Selecione para ouvir uma dica da Fada Gigica': 'Toque para ouvir uma dica da Fada Gigica',
    'Bolo de pote de leite em pó': 'Bolo de pote Ninho',
    'Casal responsável pela Doces Momentos': 'Foto do casal por trás da Doces Momentos'
  };

  function traduzir(texto, dicionario) {
    return dicionario[texto] || dicionario[chavesLegadasDeTraducao[texto]];
  }

  let idiomaAtivo = 'pt-BR';
  function aplicarIdioma(codigo) {
    const dicionario = traducoes[codigo] || {};
    const idiomaDocumento = codigo === 'pt-BR' ? 'pt-BR' : codigo;
    const metas = {
      'pt-BR': {
        titulo: 'Doces Momentos | Bolos de pote artesanais',
        descricao: 'Doces Momentos: bolos de pote artesanais preparados com carinho na Zona Sul de Joinville.'
      },
      en: {
        titulo: 'Doces Momentos | Handmade dessert jars',
        descricao: 'Doces Momentos — handmade dessert jars, lovingly made in southern Joinville, Brazil.'
      },
      es: {
        titulo: 'Doces Momentos | Postres artesanales en vasito',
        descricao: 'Doces Momentos — postres artesanales en vasito, hechos con cariño en el sur de Joinville, Brasil.'
      },
      'zh-CN': {
        titulo: 'Doces Momentos | 手工甜点杯',
        descricao: 'Doces Momentos——在巴西 Joinville 南区用心制作的手工甜点杯。'
      }
    };

    idiomaAtivo = idiomaDocumento;
    document.documentElement.lang = idiomaDocumento;
    document.title = metas[idiomaDocumento].titulo;
    document.querySelector('meta[name="description"]').content = metas[idiomaDocumento].descricao;
    const mensagensPedido = {
      'pt-BR': 'Olá! Gostaria de encomendar um bolo de pote.',
      en: 'Hi, I would like to order a dessert jar',
      es: 'Hola, quisiera pedir un postre en vasito',
      'zh-CN': '你好，我想订购一份甜点杯'
    };

    document.querySelectorAll('a[href^="https://wa.me/5547992868955"]').forEach(link => {
      link.href = `https://wa.me/5547992868955?text=${encodeURIComponent(mensagensPedido[idiomaDocumento])}`;
    });

    textosOriginais.forEach(([noTexto, valorOriginal]) => {
      const textoOriginal = valorOriginal.trim();
      const traducao = traduzir(textoOriginal, dicionario);
      if (!traducao) {
        noTexto.nodeValue = valorOriginal;
        return;
      }

      const espacoInicial = valorOriginal.match(/^\s*/)[0];
      const espacoFinal = valorOriginal.match(/\s*$/)[0];
      noTexto.nodeValue = `${espacoInicial}${traducao}${espacoFinal}`;
    });

    atributosOriginais.forEach(([elemento, atributo, valorOriginal]) => {
      elemento.setAttribute(atributo, traduzir(valorOriginal, dicionario) || valorOriginal);
    });

    idiomaToggle.textContent = dicionario['Idioma: PT'] || 'Idioma: PT';
    idiomaToggle.dataset.idiomaCurto = { 'pt-BR': 'PT', en: 'EN', es: 'ES', 'zh-CN': '中' }[idiomaDocumento];
    idiomaToggle.setAttribute('aria-label', dicionario['Selecionar idioma do site'] || 'Selecionar idioma do site');
    idiomaToggle.title = idiomaToggle.getAttribute('aria-label');
    opcoesIdioma.setAttribute('aria-label', dicionario['Idioma do site'] || 'Idioma do site');
    opcoesIdiomaBotoes.forEach(botao => {
      botao.setAttribute('aria-pressed', String(botao.dataset.idioma === idiomaDocumento));
    });

    localStorage.setItem('doces-momentos-idioma', idiomaDocumento);
  }

  const idiomaSalvo = localStorage.getItem('doces-momentos-idioma');
  if (idiomaSalvo && ['pt-BR', 'en', 'es', 'zh-CN'].includes(idiomaSalvo)) {
    aplicarIdioma(idiomaSalvo);
  }

  idiomaToggle.addEventListener('click', () => {
    const aberto = idiomaToggle.getAttribute('aria-expanded') === 'true';
    idiomaToggle.setAttribute('aria-expanded', String(!aberto));
    opcoesIdioma.hidden = aberto;
  });

  opcoesIdiomaBotoes.forEach(botao => {
    botao.addEventListener('click', () => {
      aplicarIdioma(botao.dataset.idioma);
      aplicarTemaEscuro(document.body.dataset.theme === 'dark');
      idiomaToggle.setAttribute('aria-expanded', 'false');
      opcoesIdioma.hidden = true;
    });
  });

  document.addEventListener('click', evento => {
    if (!evento.target.closest('.idioma-controle')) {
      idiomaToggle.setAttribute('aria-expanded', 'false');
      opcoesIdioma.hidden = true;
    }
  });

  idiomaToggle.addEventListener('keydown', evento => {
    if (evento.key === 'Escape') {
      idiomaToggle.setAttribute('aria-expanded', 'false');
      opcoesIdioma.hidden = true;
    }
  });

  opcoesIdioma.addEventListener('keydown', evento => {
    if (evento.key === 'Escape') {
      idiomaToggle.setAttribute('aria-expanded', 'false');
      opcoesIdioma.hidden = true;
      idiomaToggle.focus();
    }
  });

  if (introducao) {
    const duracaoMinima = movimentoReduzido.matches ? 1000 : 1500;
    const conteudoIntroducao = introducao.querySelector('.entrada-conteudo');
    const centralizarIntroducao = () => {
      conteudoIntroducao.style.left = `${document.documentElement.clientWidth / 2}px`;
    };
    centralizarIntroducao();
    window.addEventListener('resize', centralizarIntroducao);

    window.setTimeout(() => {
      introducao.classList.add('entrada-saindo');
      window.setTimeout(() => {
        window.removeEventListener('resize', centralizarIntroducao);
        introducao.remove();
      }, 360);
    }, duracaoMinima);
  }

  const carrosseis = new WeakMap();

  function configurarCarrossel(grid) {
    if (carrosseis.has(grid)) return;

    grid.dataset.carousel = '';
    const controles = document.createElement('div');
    controles.className = 'carousel-controls';

    function criarBotao(direcao, rotulo) {
      const botao = document.createElement('button');
      botao.className = `carousel-arrow carousel-arrow-${direcao}`;
      botao.type = 'button';
      botao.setAttribute('aria-label', rotulo);
      const topo = document.createElement('span');
      topo.className = 'arrow-top';
      const baixo = document.createElement('span');
      baixo.className = 'arrow-bottom';
      botao.append(topo, baixo);
      return botao;
    }

    const anterior = criarBotao('prev', 'Ver o sabor anterior');
    const indicador = document.createElement('span');
    indicador.className = 'carousel-indicator';
    indicador.setAttribute('aria-live', 'polite');
    indicador.setAttribute('aria-atomic', 'true');
    const proximo = criarBotao('next', 'Ver o próximo sabor');
    controles.append(anterior, indicador, proximo);

    const estado = { indice: 0, controles, indicador };
    carrosseis.set(grid, estado);

    function atualizar() {
      const cartoes = [...grid.querySelectorAll('.card-sabor')];
      if (cartoes.length === 0) {
        controles.hidden = true;
        return;
      }

      estado.indice = (estado.indice + cartoes.length) % cartoes.length;
      controles.hidden = cartoes.length < 2;
      indicador.textContent = `${estado.indice + 1} / ${cartoes.length}`;
      cartoes.forEach((cartao, indice) => {
        const ativo = indice === estado.indice;
        cartao.hidden = !ativo;
        cartao.classList.toggle('is-active', ativo);
        cartao.setAttribute('aria-roledescription', 'slide');
        cartao.setAttribute('aria-label', `${indice + 1} de ${cartoes.length}`);
        if (ativo) cartao.setAttribute('data-visivel', '');
        else cartao.removeAttribute('data-visivel');
      });
    }

    estado.atualizar = atualizar;
    anterior.addEventListener('click', () => {
      estado.indice -= 1;
      atualizar();
    });
    proximo.addEventListener('click', () => {
      estado.indice += 1;
      atualizar();
    });
    controles.addEventListener('keydown', evento => {
      if (evento.key !== 'ArrowLeft' && evento.key !== 'ArrowRight') return;
      evento.preventDefault();
      estado.indice += evento.key === 'ArrowRight' ? 1 : -1;
      atualizar();
    });

    grid.after(controles);
    atualizar();
  }

  document.querySelectorAll('.grid-sabores').forEach(grid => {
    grid.querySelectorAll('details.card-sabor').forEach(card => {
      const cartao = document.createElement('article');
      cartao.className = card.className;
      const resumo = card.querySelector('.card-resumo');
      const conteudoResumo = document.createElement('div');
      conteudoResumo.className = 'card-resumo';
      while (resumo.firstChild) conteudoResumo.append(resumo.firstChild);
      cartao.append(conteudoResumo, card.querySelector('.card-detalhes'));
      card.replaceWith(cartao);
    });
    if (!grid.classList.contains('grid-destaques')) {
      configurarCarrossel(grid);
    }
  });

  const elementosRevelados = document.querySelectorAll(
    '.hero-conteudo, .hero-ilustracao, .hero-rolagem, .titulo-secao, .card-sabor, ' +
    '.tamanhos-intro, .tamanho-card, .tamanhos-nota, .personalizacao-nota, ' +
    '.personalizacao-link, .sobre-foto-moldura, .sobre-conteudo, .contato-conteudo, ' +
    '.contato-links, .avaliacao-conteudo'
  );

  elementosRevelados.forEach((elemento, indice) => {
    elemento.classList.add('revelar-rolagem');
    elemento.style.setProperty('--atraso-revelacao', `${(indice % 6) * 110}ms`);
  });

  if (movimentoReduzido.matches || !('IntersectionObserver' in window)) {
    elementosRevelados.forEach(elemento => elemento.setAttribute('data-visivel', ''));
  } else {
    const observadorRevelacao = new IntersectionObserver((entradas, observador) => {
      entradas.forEach(entrada => {
        if (!entrada.isIntersecting) return;
        entrada.target.setAttribute('data-visivel', '');
        observador.unobserve(entrada.target);
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0 });

    elementosRevelados.forEach(elemento => {
      if (elemento.hidden) return;
      if (elemento.getBoundingClientRect().top < window.innerHeight * 0.82) {
        elemento.setAttribute('data-visivel', '');
      } else {
        observadorRevelacao.observe(elemento);
      }
    });
  }

  const temaToggle = document.querySelector('.tema-toggle');
  const temaSalvo = localStorage.getItem('doces-momentos-tema');

  function aplicarTemaEscuro(escuro) {
    const rotuloTema = escuro ? 'Ativar tema claro' : 'Ativar tema escuro';
    const textoAcessivel = traducoes[idiomaAtivo]?.[rotuloTema] || rotuloTema;
    document.body.dataset.theme = escuro ? 'dark' : 'light';
    temaToggle.setAttribute('aria-pressed', String(escuro));
    temaToggle.setAttribute('aria-label', textoAcessivel);
    temaToggle.title = textoAcessivel;
  }

  aplicarTemaEscuro(temaSalvo === 'dark');
  temaToggle.addEventListener('click', () => {
    const escuro = document.body.dataset.theme !== 'dark';
    aplicarTemaEscuro(escuro);
    localStorage.setItem('doces-momentos-tema', escuro ? 'dark' : 'light');
  });

  const fada = document.querySelector('.fada-assistente');
  const fadaBotao = fada.querySelector('.fada-toque');
  const fadaFala = fada.querySelector('.fada-fala');
  const falasFada = [
    'Vamos explorar os sabores?',
    'Selecione um potinho para saber mais.',
    'Sua próxima sobremesa favorita pode estar aqui.',
    'Já escolheu o tamanho ideal?',
    'Faça sua encomenda com apenas um toque!'
  ];
  let falaTimeout;
  let indiceFala = 0;

  function mostrarFalaFada(mensagem) {
    fadaFala.textContent = traduzir(mensagem, traducoes[idiomaAtivo] || {}) || mensagem;
    fada.classList.add('fada-falando');
    window.clearTimeout(falaTimeout);
    falaTimeout = window.setTimeout(() => {
      fada.classList.remove('fada-falando');
    }, 6000);
  }

  fadaBotao.addEventListener('click', () => {
    mostrarFalaFada(falasFada[indiceFala++ % falasFada.length]);
  });

  const formularioAvaliacao = document.querySelector('#avaliacao-form');
  formularioAvaliacao.addEventListener('submit', evento => {
    evento.preventDefault();
    const avaliacao = new FormData(formularioAvaliacao);
    const estrelas = avaliacao.get('rating');
    const comentario = String(avaliacao.get('comment') || '').trim();
    const assunto = encodeURIComponent('Avaliação ou sugestão enviada pelo site Doces Momentos');
    const corpo = encodeURIComponent(`Avaliação: ${estrelas} de 5 estrelas\n\nComentário:\n${comentario}`);
    window.location.href = `mailto:carloshenriquemichalak3@gmail.com?subject=${assunto}&body=${corpo}`;
  });

  const opcoesEstrelas = [...formularioAvaliacao.querySelectorAll('input[name="rating"]')];
  const caminhoEstrela = formularioAvaliacao.querySelector('label[for="rating-1"] path').getAttribute('d');
  formularioAvaliacao.querySelectorAll('.radio path').forEach(caminho => {
    caminho.setAttribute('d', caminhoEstrela);
  });

  function atualizarEstrelas(valor) {
    opcoesEstrelas.forEach(opcao => {
      const rotulo = formularioAvaliacao.querySelector(`label[for="${opcao.id}"]`);
      rotulo.classList.toggle('rating-highlight', Number(opcao.value) <= Number(valor));
    });
  }
  opcoesEstrelas.forEach(opcao => {
    opcao.addEventListener('change', () => atualizarEstrelas(opcao.value));
  });

  /* Smooth scroll para links internos, respeitando redução de movimento. */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* ---------------------------------------------------------
     5. Log amigável no console
     --------------------------------------------------------- */
  console.log(
    '%cDoces Momentos %c— cartas de sabores prontas para descobrir!',
    'background: #6b3216; color: white; padding: 4px 8px; border-radius: 4px 0 0 4px; font-weight: bold;',
    'background: #f5e8dc; color: #4a2e2e; padding: 4px 8px; border-radius: 0 4px 4px 0;'
  );

})();