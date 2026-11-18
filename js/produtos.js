/* =========================================================
   produtos.js: DADOS
   A lista de produtos da loja. Mais tarde (fase 6) estes
   dados podem vir de uma base de dados como o Supabase.

   Fotografias: Unsplash (licença gratuita). Se uma imagem
   não carregar, a loja mostra um bloco com a cor do produto.
   ========================================================= */

// Monta o endereço de uma fotografia do Unsplash no tamanho pedido
function fotoUnsplash(id, largura = 800) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${largura}&q=70`;
}

const PRODUTOS = [
  {
    id: 1,
    nome: "Café do Fogo",
    categoria: "Alimentação",
    preco: 950,
    cor: "#6B4F3A",
    etiqueta: "Mais vendido",
    imagem: fotoUnsplash("photo-1707216265113-9f57a25cfea4"),
    descricao: "Café torrado de produção local, com notas de chocolate e frutos secos. Pacote de 250 g, moído na hora."
  },
  {
    id: 2,
    nome: "Doce de papaia",
    categoria: "Alimentação",
    preco: 450,
    cor: "#F2994A",
    etiqueta: "",
    imagem: fotoUnsplash("photo-1729182808229-9a688478872c"),
    descricao: "Doce caseiro feito com papaia madura e pouco açúcar. Frasco de 300 g, ideal para o pequeno-almoço."
  },
  {
    id: 3,
    nome: "Sabonete de coco",
    categoria: "Beleza",
    preco: 350,
    cor: "#C9D6DF",
    etiqueta: "Novo",
    imagem: fotoUnsplash("photo-1729019376515-f769480f6efb"),
    descricao: "Sabonete artesanal com óleo de coco, suave para todo o tipo de pele. Barra de 120 g."
  },
  {
    id: 4,
    nome: "Óleo de purgueira",
    categoria: "Beleza",
    preco: 700,
    cor: "#B5EA6E",
    etiqueta: "",
    imagem: fotoUnsplash("photo-1671493229066-f36e86b35841"),
    descricao: "Óleo natural para pele e cabelo, prensado a frio. Frasco de 100 ml com conta-gotas."
  },
  {
    id: 5,
    nome: "Pano di terra",
    categoria: "Artesanato",
    preco: 2500,
    cor: "#2F6BEB",
    etiqueta: "Feito à mão",
    imagem: fotoUnsplash("photo-1760328715296-9714daa8a737"),
    descricao: "Pano tecido à mão em tear tradicional, com padrões inspirados nas ilhas. 1,5 m de comprimento."
  },
  {
    id: 6,
    nome: "Cesto de palha",
    categoria: "Artesanato",
    preco: 1200,
    cor: "#D9B26F",
    etiqueta: "",
    imagem: fotoUnsplash("photo-1758487424832-a53ae6cdefdb"),
    descricao: "Cesto entrançado à mão com pegas coloridas. Ideal para fruta, pão ou para ir ao mercado."
  }
];
