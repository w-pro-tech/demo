/* =========================================================
   app.js: INTERFACE
   Desenha o conteúdo de cada página. Cada função só corre se
   encontrar na página o elemento de que precisa.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  atualizarContador();

  if (document.querySelector("#lista-produtos")) iniciarCatalogo();
  if (document.querySelector("#detalhe-produto")) mostrarProduto();
  if (document.querySelector("#lista-carrinho")) mostrarCarrinho();
  if (document.querySelector("#form-checkout")) iniciarCheckout();
  if (document.querySelector("#resumo-encomenda")) mostrarConfirmacao();
});

/* ---------- Componentes reutilizáveis ---------- */

// Fotografia do produto. Se não carregar, fica o bloco de cor com a inicial.
function imagemProduto(p, tamanho = "") {
  return `
    <div class="media ${tamanho}" style="--cor:${p.cor}" data-inicial="${p.nome[0]}">
      <img src="${p.imagem}" alt="${p.nome}" loading="lazy" onerror="this.remove()">
    </div>`;
}

// Etiqueta opcional ("Novo", "Mais vendido"...)
function etiqueta(p) {
  return p.etiqueta ? `<span class="etiqueta">${p.etiqueta}</span>` : "";
}

// Cartão de produto usado no catálogo e nas sugestões
function cartaoProduto(p) {
  return `
    <article class="cartao-produto">
      <a href="produto.html?id=${p.id}" class="cartao-link" aria-label="Ver ${p.nome}">
        ${imagemProduto(p)}
        ${etiqueta(p)}
      </a>
      <div class="cartao-info">
        <p class="categoria">${p.categoria}</p>
        <h3><a href="produto.html?id=${p.id}">${p.nome}</a></h3>
        <div class="cartao-rodape">
          <span class="preco">${formatarPreco(p.preco)}</span>
          <button class="botao pequeno" data-adicionar="${p.id}">Adicionar</button>
        </div>
      </div>
    </article>`;
}

// Mensagem curta no fundo do ecrã, com atalho para o carrinho
function mostrarAviso(texto) {
  const aviso = document.querySelector("#aviso");
  if (!aviso) return;
  aviso.innerHTML = `<span>✓ ${texto}</span><a href="carrinho.html">Ver carrinho</a>`;
  aviso.classList.add("visivel");
  clearTimeout(aviso.temporizador);
  aviso.temporizador = setTimeout(() => aviso.classList.remove("visivel"), 2600);
}

// Qualquer botão com data-adicionar, em qualquer página, adiciona ao carrinho
document.addEventListener("click", (e) => {
  const botao = e.target.closest("[data-adicionar]");
  if (!botao) return;
  const produto = PRODUTOS.find((p) => p.id === Number(botao.dataset.adicionar));
  adicionarAoCarrinho(produto.id);
  mostrarAviso(`${produto.nome} adicionado ao carrinho`);
});

/* ---------- Página inicial (index.html) ---------- */

function iniciarCatalogo() {
  const filtros = document.querySelector("#filtros");
  const pesquisa = document.querySelector("#pesquisa");
  const ordem = document.querySelector("#ordem");
  const categorias = ["Todos", ...new Set(PRODUTOS.map((p) => p.categoria))];

  // Estado atual dos filtros
  const estado = { categoria: "Todos", texto: "", ordem: "destaque" };

  filtros.innerHTML = categorias
    .map((c) => `<button class="filtro ${c === "Todos" ? "ativo" : ""}" data-categoria="${c}">${c}</button>`)
    .join("");

  filtros.addEventListener("click", (e) => {
    const botao = e.target.closest(".filtro");
    if (!botao) return;
    filtros.querySelectorAll(".filtro").forEach((b) => b.classList.remove("ativo"));
    botao.classList.add("ativo");
    estado.categoria = botao.dataset.categoria;
    desenharProdutos(estado);
  });

  pesquisa.addEventListener("input", () => {
    estado.texto = pesquisa.value.trim().toLowerCase();
    desenharProdutos(estado);
  });

  ordem.addEventListener("change", () => {
    estado.ordem = ordem.value;
    desenharProdutos(estado);
  });

  desenharProdutos(estado);
}

function desenharProdutos(estado) {
  const lista = document.querySelector("#lista-produtos");
  const contagem = document.querySelector("#contagem");

  // 1. Filtrar por categoria e texto
  let produtos = PRODUTOS.filter(
    (p) =>
      (estado.categoria === "Todos" || p.categoria === estado.categoria) &&
      p.nome.toLowerCase().includes(estado.texto)
  );

  // 2. Ordenar
  if (estado.ordem === "preco-asc") produtos = [...produtos].sort((a, b) => a.preco - b.preco);
  if (estado.ordem === "preco-desc") produtos = [...produtos].sort((a, b) => b.preco - a.preco);

  contagem.textContent = `${produtos.length} ${produtos.length === 1 ? "produto" : "produtos"}`;

  lista.innerHTML = produtos.length
    ? produtos.map(cartaoProduto).join("")
    : `<div class="vazio"><p class="vazio-titulo">Nenhum produto encontrado</p><p>Experimenta outra palavra ou categoria.</p></div>`;
}

/* ---------- Produto (produto.html?id=1) ---------- */

function mostrarProduto() {
  const id = Number(new URLSearchParams(location.search).get("id"));
  const produto = PRODUTOS.find((p) => p.id === id);
  const zona = document.querySelector("#detalhe-produto");

  if (!produto) {
    zona.innerHTML = `<div class="vazio"><p class="vazio-titulo">Produto não encontrado</p><a class="botao" href="index.html">Voltar ao catálogo</a></div>`;
    return;
  }

  document.title = `${produto.nome} · Loja Morabeza`;
  let quantidade = 1;

  zona.innerHTML = `
    <nav class="migalhas" aria-label="Caminho"><a href="index.html">Produtos</a> / <span>${produto.categoria}</span> / <span>${produto.nome}</span></nav>
    <div class="detalhe">
      ${imagemProduto(produto, "grande")}
      <div class="detalhe-info">
        ${etiqueta(produto)}
        <p class="categoria">${produto.categoria}</p>
        <h1>${produto.nome}</h1>
        <p class="preco grande">${formatarPreco(produto.preco)}</p>
        <p class="descricao">${produto.descricao}</p>

        <div class="comprar">
          <div class="quantidade" aria-label="Quantidade">
            <button type="button" id="menos" aria-label="Diminuir">−</button>
            <span id="qtd">1</span>
            <button type="button" id="mais" aria-label="Aumentar">+</button>
          </div>
          <button class="botao" id="btn-adicionar">Adicionar ao carrinho</button>
        </div>

        <ul class="garantias">
          <li>🚚 Entrega na Praia em 24 a 48 h</li>
          <li>💵 Pagamento na entrega disponível</li>
          <li>↩️ Devolução grátis até 14 dias</li>
        </ul>
      </div>
    </div>

    <section class="sugestoes">
      <h2>Também podes gostar</h2>
      <div class="grelha-produtos">
        ${PRODUTOS.filter((p) => p.id !== produto.id).slice(0, 3).map(cartaoProduto).join("")}
      </div>
    </section>`;

  // Seletor de quantidade
  const qtd = document.querySelector("#qtd");
  document.querySelector("#mais").onclick = () => (qtd.textContent = ++quantidade);
  document.querySelector("#menos").onclick = () => (qtd.textContent = quantidade = Math.max(1, quantidade - 1));

  document.querySelector("#btn-adicionar").addEventListener("click", () => {
    adicionarAoCarrinho(produto.id, quantidade);
    mostrarAviso(`${quantidade} × ${produto.nome} adicionado ao carrinho`);
  });
}

/* ---------- Carrinho (carrinho.html) ---------- */

function mostrarCarrinho() {
  const lista = document.querySelector("#lista-carrinho");
  const resumo = document.querySelector("#resumo-carrinho");
  const itens = itensDetalhados();

  if (itens.length === 0) {
    lista.innerHTML = `
      <div class="vazio">
        <p class="vazio-icone">🛍️</p>
        <p class="vazio-titulo">O teu carrinho está vazio</p>
        <p>Descobre os produtos artesanais de Cabo Verde.</p>
        <a class="botao" href="index.html">Ver produtos</a>
      </div>`;
    resumo.hidden = true;
    return;
  }

  lista.innerHTML = itens
    .map(
      (i) => `
      <div class="linha-carrinho">
        <a href="produto.html?id=${i.id}">${imagemProduto(i, "mini")}</a>
        <div class="linha-info">
          <h3>${i.nome}</h3>
          <p class="categoria">${formatarPreco(i.preco)} / unidade</p>
          <button class="remover" data-acao="remover" data-id="${i.id}">Remover</button>
        </div>
        <div class="quantidade">
          <button data-acao="menos" data-id="${i.id}" aria-label="Diminuir">−</button>
          <span>${i.quantidade}</span>
          <button data-acao="mais" data-id="${i.id}" aria-label="Aumentar">+</button>
        </div>
        <p class="linha-total">${formatarPreco(i.preco * i.quantidade)}</p>
      </div>`
    )
    .join("");

  const subtotal = calcularSubtotal();
  const entrega = calcularEntrega(subtotal);
  const falta = ENTREGA_GRATIS_DESDE - subtotal;
  const progresso = Math.min(100, (subtotal / ENTREGA_GRATIS_DESDE) * 100);

  resumo.hidden = false;
  resumo.innerHTML = `
    <h2>Resumo</h2>
    <div class="progresso-entrega">
      <p>${falta > 0 ? `Faltam <strong>${formatarPreco(falta)}</strong> para a entrega grátis` : "🎉 Tens entrega grátis!"}</p>
      <div class="barra"><span style="width:${progresso}%"></span></div>
    </div>
    <p class="linha-resumo"><span>Subtotal</span><span>${formatarPreco(subtotal)}</span></p>
    <p class="linha-resumo"><span>Entrega</span><span>${formatarPreco(entrega)}</span></p>
    <p class="linha-resumo total"><span>Total</span><span>${formatarPreco(subtotal + entrega)}</span></p>
    <a class="botao largo" href="checkout.html">Finalizar compra</a>
    <a class="link-secundario" href="index.html">← Continuar a comprar</a>`;

  // Botões +, − e Remover
  lista.onclick = (e) => {
    const botao = e.target.closest("button[data-acao]");
    if (!botao) return;
    const id = Number(botao.dataset.id);
    const atual = obterCarrinho().find((i) => i.id === id).quantidade;

    if (botao.dataset.acao === "mais") alterarQuantidade(id, atual + 1);
    if (botao.dataset.acao === "menos") alterarQuantidade(id, atual - 1);
    if (botao.dataset.acao === "remover") removerDoCarrinho(id);

    mostrarCarrinho(); // volta a desenhar com os novos valores
  };
}

/* ---------- Checkout (checkout.html) ---------- */

function iniciarCheckout() {
  const itens = itensDetalhados();
  const form = document.querySelector("#form-checkout");

  // Sem itens não há checkout: volta ao carrinho
  if (itens.length === 0) {
    location.href = "carrinho.html";
    return;
  }

  // O resumo muda quando se escolhe o tipo de entrega
  const desenharResumo = () => {
    const subtotal = calcularSubtotal();
    const entrega = calcularEntrega(subtotal, form.entrega.value);
    document.querySelector("#resumo-checkout").innerHTML = `
      <h2>A tua encomenda</h2>
      ${itens
        .map(
          (i) => `
        <div class="linha-mini">
          ${imagemProduto(i, "micro")}
          <span>${i.nome}<small>Quantidade: ${i.quantidade}</small></span>
          <strong>${formatarPreco(i.preco * i.quantidade)}</strong>
        </div>`
        )
        .join("")}
      <p class="linha-resumo"><span>Subtotal</span><span>${formatarPreco(subtotal)}</span></p>
      <p class="linha-resumo"><span>Entrega</span><span>${formatarPreco(entrega)}</span></p>
      <p class="linha-resumo total"><span>Total</span><span>${formatarPreco(subtotal + entrega)}</span></p>`;
    return subtotal + entrega;
  };

  desenharResumo();
  form.addEventListener("change", (e) => {
    if (e.target.name === "entrega") {
      desenharResumo();
      // A morada só é obrigatória na entrega ao domicílio
      document.querySelector("#campo-morada").hidden = form.entrega.value === "loja";
    }
  });

  // Valida cada campo quando o utilizador sai dele; se já tinha erro,
  // volta a validar a cada tecla para o erro desaparecer logo que fica certo
  form.querySelectorAll("input[type=text], input[type=tel], input[type=email]").forEach((input) => {
    input.addEventListener("blur", () => validarCampo(form, input.name));
    input.addEventListener("input", () => {
      if (input.classList.contains("invalido")) validarCampo(form, input.name);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // não recarrega a página
    if (!validarFormulario(form)) {
      form.querySelector(".invalido")?.focus();
      return;
    }

    const encomenda = {
      numero: "MRB-" + Date.now().toString().slice(-6),
      nome: form.nome.value.trim(),
      entrega: form.entrega.value === "loja" ? "Levantamento na loja (Plateau)" : form.morada.value.trim(),
      pagamento: form.pagamento.value,
      itens: itens,
      total: desenharResumo()
    };
    localStorage.setItem("morabeza_ultima_encomenda", JSON.stringify(encomenda));
    limparCarrinho();
    location.href = "confirmacao.html";
  });
}

// Regras de validação de cada campo (true = válido, texto = mensagem de erro)
const REGRAS = {
  nome: (v) => v.length >= 3 || "Escreve o nome completo.",
  telefone: (v) => /^\d{7}$/.test(v.replace(/\s/g, "")) || "O telefone deve ter 7 dígitos.",
  email: (v) => /^\S+@\S+\.\S+$/.test(v) || "Escreve um email válido.",
  morada: (v, form) => form.entrega.value === "loja" || v.length >= 5 || "Escreve a morada de entrega."
};

function validarCampo(form, campo) {
  const input = form[campo];
  const resultado = REGRAS[campo](input.value.trim(), form);
  const erro = input.parentElement.querySelector(".erro");
  const valido = resultado === true;

  erro.textContent = valido ? "" : resultado;
  input.classList.toggle("invalido", !valido);
  input.classList.toggle("valido", valido && input.value.trim() !== "");
  return valido;
}

function validarFormulario(form) {
  return Object.keys(REGRAS)
    .map((campo) => validarCampo(form, campo))
    .every(Boolean);
}

/* ---------- Confirmação (confirmacao.html) ---------- */

function mostrarConfirmacao() {
  const zona = document.querySelector("#resumo-encomenda");
  const encomenda = JSON.parse(localStorage.getItem("morabeza_ultima_encomenda"));

  if (!encomenda) {
    zona.innerHTML = `<div class="vazio"><p class="vazio-titulo">Não há nenhuma encomenda</p><a class="botao" href="index.html">Voltar à loja</a></div>`;
    return;
  }

  zona.innerHTML = `
    <div class="sucesso-icone">✓</div>
    <p class="categoria">Encomenda ${encomenda.numero}</p>
    <h1>Obrigado, ${encomenda.nome.split(" ")[0]}!</h1>
    <p class="descricao">Recebemos a tua encomenda. Vais receber uma mensagem quando sair para entrega.</p>
    <div class="caixa-dados">
      <p><span>Entrega</span><strong>${encomenda.entrega}</strong></p>
      <p><span>Pagamento</span><strong>${encomenda.pagamento} (simulado)</strong></p>
    </div>
    <div class="caixa-dados">
      ${encomenda.itens.map((i) => `<p><span>${i.quantidade} × ${i.nome}</span><strong>${formatarPreco(i.preco * i.quantidade)}</strong></p>`).join("")}
      <p class="total"><span>Total</span><strong>${formatarPreco(encomenda.total)}</strong></p>
    </div>
    <a class="botao largo" href="index.html">Continuar a comprar</a>`;
}
