# Loja Morabeza (projeto de demonstração)

Loja online simples, feita só com **HTML, CSS e JavaScript**, para o workshop de E-commerce da UNICV.
A marca é fictícia, e o objetivo é mostrar **como organizar um projeto** feito com a ajuda de IA.

## Estrutura de pastas

```
loja-demo/
├── index.html            → Catálogo (página inicial)
├── produto.html          → Detalhe de um produto
├── carrinho.html         → Carrinho de compras
├── checkout.html         → Dados do cliente e pagamento simulado
├── confirmacao.html      → Resumo da encomenda
│
├── css/
│   └── style.css         → Todos os estilos (cores do design system no topo)
│
├── js/
│   ├── produtos.js       → Dados: a lista de produtos
│   ├── carrinho.js       → Lógica: guardar, alterar e calcular o carrinho
│   └── app.js            → Interface: desenha cada página
│
├── assets/
│   └── img/              → Imagens e logótipo
│
└── docs/                 → Documentos para carregar no projeto do chatbot
    ├── 01-business-model-canvas.md
    ├── 02-design-system.md
    ├── 03-requisitos.md
    ├── 04-user-flow.md
    └── 05-prompts.md
```

### Porque está organizado assim

- **Uma página HTML por ecrã do user flow.** Cada seta do fluxo é um link ou um botão.
- **Um único ficheiro CSS**, com as cores e as fontes em variáveis no topo. Para mudar a cor da marca, basta mudar uma linha.
- **O JavaScript separado por responsabilidade:**
  - os dados ficam em `produtos.js`;
  - a lógica do carrinho fica em `carrinho.js`;
  - o que aparece no ecrã é desenhado por `app.js`.

  Assim podem pedir à IA para mexer só numa parte sem estragar o resto.
- **A pasta `docs/` é o contexto da IA.** São estes os ficheiros que se carregam no projeto do chatbot.

## Boas práticas de UX incluídas

- **Página inicial:** imagem de destaque com uma única ação ("Ver produtos") e três vantagens que respondem às dúvidas mais comuns (entrega, pagamento, origem).
- **Catálogo:** filtros por categoria, pesquisa, ordenação por preço, contador de resultados e mensagem quando não há resultados.
- **Produto:** caminho de navegação ("Produtos / Categoria / Produto"), seletor de quantidade, garantias e sugestões de outros produtos.
- **Feedback imediato:** aviso com atalho "Ver carrinho" ao adicionar um produto e contador animado no cabeçalho.
- **Carrinho:** barra de progresso até à entrega grátis, que incentiva a comprar mais.
- **Checkout:**
  - passos numerados, para o cliente saber onde está;
  - validação de cada campo ao sair dele, com o erro a desaparecer logo que fica certo;
  - opções em cartões fáceis de tocar;
  - morada pedida só quando é precisa.
- **Imagens:** se uma fotografia não carregar, aparece um bloco com a cor do produto e a inicial, e o layout não se estraga.

## Como abrir

1. Abrir a pasta no **VS Code**.
2. Abrir o `index.html` no browser. Também se pode usar a extensão **Live Server**, que atualiza a página sozinha a cada alteração.

Não é preciso instalar nada. O carrinho fica guardado no browser, com `localStorage`.

## Como publicar no Netlify

1. Entrar em https://app.netlify.com e criar um projeto novo.
2. Em **Upload your project files**, arrastar a pasta `loja-demo` inteira (ou um ZIP dela).
3. O Netlify devolve um link público. Para publicar uma versão nova, arrasta-se a pasta outra vez.

## Créditos das fotografias

Todas as fotografias vêm do [Unsplash](https://unsplash.com) e podem ser usadas gratuitamente segundo a licença do Unsplash. As imagens são carregadas diretamente do Unsplash, por isso a loja precisa de internet para as mostrar.

- Paisagem de Santiago: Kayla Gibson
- Café: pouchdirect Australia
- Doce: Loa Kon
- Sabonete: Pavlo Talpa
- Óleo: Denise Chan
- Tear (pano): Thảo Phạm
- Cestos: Kushali Bhagat

## Próximos passos (fase 6)

- Trocar `produtos.js` por uma tabela no **Supabase**.
- Acrescentar registo e login.
- Ligar um pagamento real (opcional).
