/* =========================================================
   carrinho.js: LÓGICA DO CARRINHO
   Guarda o carrinho no localStorage do browser, para não se
   perder quando a página é atualizada.
   Formato guardado: [{ id: 1, quantidade: 2 }, ...]
   ========================================================= */

const CHAVE_CARRINHO = "morabeza_carrinho";
const CUSTO_ENTREGA = 300;        // entrega ao domicílio, em escudos (CVE)
const ENTREGA_GRATIS_DESDE = 5000; // a partir deste subtotal a entrega é grátis

// Lê o carrinho guardado (ou devolve uma lista vazia)
function obterCarrinho() {
  const guardado = localStorage.getItem(CHAVE_CARRINHO);
  return guardado ? JSON.parse(guardado) : [];
}

// Guarda o carrinho e atualiza o contador do cabeçalho
function guardarCarrinho(carrinho) {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
  atualizarContador();
}

// Adiciona um produto (ou soma à quantidade se já estiver no carrinho)
function adicionarAoCarrinho(id, quantidade = 1) {
  const carrinho = obterCarrinho();
  const item = carrinho.find((i) => i.id === id);

  if (item) {
    item.quantidade += quantidade;
  } else {
    carrinho.push({ id: id, quantidade: quantidade });
  }
  guardarCarrinho(carrinho);
}

// Muda a quantidade; se chegar a 0, o item é removido
function alterarQuantidade(id, quantidade) {
  if (quantidade <= 0) {
    removerDoCarrinho(id);
    return;
  }
  const carrinho = obterCarrinho().map((i) =>
    i.id === id ? { ...i, quantidade: quantidade } : i
  );
  guardarCarrinho(carrinho);
}

// Remove um produto do carrinho
function removerDoCarrinho(id) {
  guardarCarrinho(obterCarrinho().filter((i) => i.id !== id));
}

// Esvazia o carrinho (usado depois de confirmar a encomenda)
function limparCarrinho() {
  guardarCarrinho([]);
}

// Junta os dados do produto a cada item do carrinho
function itensDetalhados() {
  return obterCarrinho()
    .map((item) => {
      const produto = PRODUTOS.find((p) => p.id === item.id);
      return produto ? { ...produto, quantidade: item.quantidade } : null;
    })
    .filter(Boolean); // ignora produtos que já não existam
}

// Soma preço × quantidade de todos os itens
function calcularSubtotal() {
  return itensDetalhados().reduce((soma, i) => soma + i.preco * i.quantidade, 0);
}

// Custo de entrega: grátis ao levantar na loja ou acima do valor mínimo
function calcularEntrega(subtotal, metodo = "domicilio") {
  if (metodo === "loja") return 0;
  return subtotal >= ENTREGA_GRATIS_DESDE ? 0 : CUSTO_ENTREGA;
}

// Número total de unidades (para o contador do cabeçalho)
function contarItens() {
  return obterCarrinho().reduce((soma, i) => soma + i.quantidade, 0);
}

// Formata um número como preço em escudos: 1200 → "1200 CVE"
function formatarPreco(valor) {
  return valor === 0 ? "Grátis" : valor.toLocaleString("pt-PT") + " CVE";
}

// Mostra o número de itens no ícone do carrinho (todas as páginas)
function atualizarContador() {
  const contador = document.querySelector("#contador-carrinho");
  if (!contador) return;
  const total = contarItens();
  contador.textContent = total;
  contador.hidden = total === 0;
  // pequena animação para chamar a atenção
  contador.classList.remove("pulsar");
  void contador.offsetWidth;
  contador.classList.add("pulsar");
}
