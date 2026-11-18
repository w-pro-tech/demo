# User flow: Loja Morabeza

## Fluxo do cliente

```mermaid
flowchart LR
  A[Catálogo<br>index.html] --> B[Produto<br>produto.html]
  A -->|Adicionar| C[Carrinho<br>carrinho.html]
  B -->|Adicionar| C
  C -->|Finalizar| D[Checkout<br>checkout.html]
  D -->|Dados válidos| E[Confirmação<br>confirmacao.html]
  D -->|Dados em falta| D
  C -->|Continuar a comprar| A
```

Para ver o diagrama, colar o bloco acima em https://mermaid.live.

## Perguntas por ecrã

| Ecrã | O que o cliente quer fazer | Passo seguinte | E se falhar? |
|---|---|---|---|
| Catálogo | Encontrar um produto | Ver produto ou adicionar | Mensagem "Sem produtos nesta categoria" |
| Produto | Decidir se compra | Adicionar ao carrinho | Produto não existe: voltar ao catálogo |
| Carrinho | Rever a compra | Finalizar | Carrinho vazio: botão para o catálogo |
| Checkout | Pagar e receber | Confirmar encomenda | Campos inválidos: mensagem por campo |
| Confirmação | Ter a certeza de que correu bem | Voltar à loja | Sem encomenda: voltar ao catálogo |
