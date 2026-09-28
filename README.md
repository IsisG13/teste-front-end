# Econverse — Vitrine de Produtos

Teste front-end: página de vitrine de produtos da **Econverse**, desenvolvida em
**React + TypeScript** com **Vite** e **Sass**, seguindo o layout do Figma e
consumindo o catálogo de produtos em JSON.

A página exibe as vitrines de produtos (carrossel paginado) e, ao clicar em um
produto, abre um **modal** com as informações principais do item.

---

## Índice

- [Stack](#stack)
- [Pré-requisitos](#pré-requisitos)
- [Como rodar](#como-rodar)
- [Como compilar (build)](#como-compilar-build)
- [Como testar (lint)](#como-testar-lint)
- [Scripts disponíveis](#scripts-disponíveis)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Decisões de arquitetura](#decisões-de-arquitetura)
- [Acessibilidade](#acessibilidade)
- [SEO](#seo)
- [Requisitos atendidos](#requisitos-atendidos)
- [Pontos de melhoria](#pontos-de-melhoria)

---

## Stack

| Tecnologia | Versão | Papel |
|---|---|---|
| React | 19 | Biblioteca de UI |
| TypeScript | ~6.0 | Tipagem estática |
| Vite | 8 | Bundler e dev server |
| Sass | 1.105 | Pré-processador CSS |
| lucide-react | 1.48 | Ícones (SVG inline) |
| ESLint | 10 | Lint (flat config) |

Sem bibliotecas de UI (Bootstrap, Foundation, MUI, etc.) — todo o CSS é
autoral em Sass.

---

## Pré-requisitos

- **Node.js 20.19+** (testado em `v20.19.2`)
- **npm 9+**

```bash
node --version   # v20.19.2 ou superior
npm --version    # 9.x
```

---

## Como rodar

```bash
# 1. instalar as dependências
npm install

# 2. subir o servidor de desenvolvimento
npm run dev
```

O Vite exibe o endereço local no terminal, por padrão:

```
➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

O servidor já sobe com **HMR** (hot reload): alterações em `.tsx` e `.scss`
são aplicadas no navegador sem recarregar a página.

> Os produtos são carregados de `public/products.json` via `fetch`. A pasta
> `public/` é servida na raiz, então o caminho é `/products.json` em dev e em
> produção. A rota funciona porque o `App.tsx` faz o request no `useEffect`.

Para escolher outra porta:

```bash
npm run dev -- --port 3000
```

---

## Como compilar (build)

```bash
npm run build
```

O comando executa duas etapas:

1. `tsc -b` — checagem de tipos (TypeScript project references)
2. `vite build` — gera o bundle de produção

Saída em `dist/`:

```
dist/
├── index.html
├── assets/
│   ├── index-<hash>.js
│   └── index-<hash>.css
├── fonts/          (Poppins 400/600/700)
├── image/          (logos, banners, categorias)
└── products.json   (catálogo)
```

Para **testar o build de produção localmente** (simula o servidor real):

```bash
npm run preview
```

Acesse o endereço exibido (por padrão `http://localhost:4173/`).

> ⚠️ `dist/` está no `.gitignore` e não deve ser versionado.

---

## Como testar (lint)

```bash
npm run lint
```

Valida `**/*.{ts,tsx}` com ESLint (flat config) usando as regras de
`@eslint/js`, `typescript-eslint`, `react-hooks` e `react-refresh`.

O comando deve encerrar **sem saída** e com código de saída `0` para passar.

> O projeto **não possui testes automatizados** (Vitest/Jest) nem cobertura.
> A verificação disponível hoje é o lint + a checagem de tipos do `npm run build`.

---

## Scripts disponíveis

| Script | Comando | Descrição |
|---|---|---|
| `npm run dev` | `vite` | Servidor de desenvolvimento com HMR |
| `npm run build` | `tsc -b && vite build` | Checagem de tipos + build de produção |
| `npm run lint` | `eslint .` | Lint de todo o código TypeScript/TSX |
| `npm run preview` | `vite preview` | Serve o `dist/` localmente |

---

## Estrutura do projeto

```
.
├── index.html                  # Documento base: metadados SEO, OG, JSON-LD
├── vite.config.ts
├── eslint.config.js
├── public/
│   ├── products.json           # Catálogo consumido pela vitrine
│   ├── fonts/                  # Poppins 400/600/700 (self-hosted)
│   ├── favicon.svg
│   └── image/                  # Logos, banners, ícones, categorias
└── src/
    ├── main.tsx                # Entry point (ReactDOM.createRoot)
    ├── App.tsx                 # Página home: header, hero, vitrines, footer
    ├── components/
    │   ├── ProductCard/        # Card da vitrine (imagem, preços, comprar)
    │   │   ├── ProductCard.tsx
    │   │   └── ProductCard.scss
    │   ├── ProductCarousel/    # Carrossel paginado das vitrines
    │   │   ├── ProductCarousel.tsx
    │   │   └── ProductCarousel.scss
    │   └── ProductModal/       # Modal de detalhes do produto
    │       ├── ProductModal.tsx
    │       └── ProductModal.scss
    ├── styles/
    │   ├── _variables.scss     # Tokens de design (cores, fontes, @font-face)
    │   └── global.scss         # Reset + estilos de todas as seções
    ├── types/
    │   └── product.ts          # Interfaces Product e ApiResponse
    └── utils/
        └── format.ts           # formatCurrency (pt-BR / BRL)
```

**Padrão de componentização:** um diretório por componente, com o `.tsx` e o
`.scss` de mesmo nome juntos. Cada componente é autocontido e recebe somente o
que precisa via props.

---

## Decisões de arquitetura

### Estado e fluxo de dados

O `App.tsx` é o dono do estado da página:

```tsx
const [products, setProducts] = useState<Product[]>([])
const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
```

- `products` é preenchido com `fetch('/products.json')` no `useEffect`.
- `selectedProduct` controla o modal: `null` = fechado, `Product` = aberto.
- Enquanto `products` está vazio, a vitrine renderiza 4 skeletons de loading.

O fluxo é **unidirecional**: clique no card → `onOpenModal` → `setSelectedProduct`
→ `<ProductModal product={...} onClose={...} />` → `onClose` volta a `null`.

### Tipagem

`src/types/product.ts` espelha 1:1 o formato do JSON, então o compilador
valida a resposta da API:

```ts
export interface Product {
  productName: string
  descriptionShort: string
  photo: string
  price: number
}

export interface ApiResponse {
  success: boolean
  products: Product[]
}
```

### Estilos (Sass)

- `_variables.scss` centraliza os tokens do design (cores, família
  tipográfica, largura máxima, altura do header) e declara os `@font-face` da
  Poppins servida localmente.
- `global.scss` faz o reset e estiliza as seções da página (header, hero,
  categorias, vitrines, parceiros, newsletter, footer).
- Cada componente tem o seu próprio `.scss` com escopo por classe, sem CSS
  global vazando.
- Medidas do Figma (larguras, alturas, gaps) estão anotadas em comentários ao
  lado de cada regra para facilitar a conferência pixel a pixel.
- Breakpoints: `1420px`, `1340px`, `1200px`, `1100px`, `820px` e `640px`.

### Valores calculados

O JSON traz apenas `price`. A vitrine deriva os demais valores em tela:

| Valor | Cálculo | Onde |
|---|---|---|
| Preço "de" (riscado) | `price * 1.07` | `ProductCard.tsx` |
| Parcelas (`10x de`) | `round(price / 10)`, mínimo 1 | `ProductCard.tsx` |
| Valor formatado | `formatCurrency()` (pt-BR/BRL) | `utils/format.ts` |

---

## Acessibilidade

Cuidados que já estão implementados:

- HTML semântico: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`,
  `<footer>`, `<form>`, `<button>`.
- Imagens com `alt` descritivo e `loading="lazy"` nas vitrines.
- Modal com `role="dialog"`, `aria-modal="true"` e `aria-labelledby` no título.
- Foco movido para o botão de fechar ao abrir o modal; clique no overlay ou
  tecla `Esc` fecham o modal.
- `document.body.style.overflow` travado enquanto o modal está aberto.
- Carrossel com `aria-roledescription="página"`, `aria-hidden` nas páginas
  inativas, `aria-controls` ligando setas e track, e `aria-live` no status.
- Botões desabilitados (`disabled`) quando não há página anterior/seguinte.
- Utilitário `.sr-only` para rótulos apenas para leitores de tela.
- `lang="pt-BR"` e `<noscript>` com mensagem de fallback.

---

## SEO

Implementado no `index.html`:

- `<title>` e `<meta name="description">` otimizados com palavras-chave.
- `canonical` apontando para a URL de produção.
- Open Graph completo (`og:type`, `og:locale`, `og:site_name`, `og:url`,
  `og:title`, `og:description`, `og:image`).
- Twitter Card `summary_large_image`.
- `theme-color` e ícones (`favicon.svg`).
- JSON-LD `WebSite` com `SearchAction` (dados estruturados para buscadores).

---

## Requisitos atendidos

| Requisito | Status |
|---|---|
| React + TypeScript conforme o layout | ✅ |
| Vitrine consumindo produtos via JSON | ✅ `fetch('/products.json')` |
| Modal com informações do produto ao clicar | ✅ `ProductModal` |
| Pré-processador Sass | ✅ `.scss` em todas as camadas |
| Layout, fontes, cores e botões do Figma | ✅ tokens em `_variables.scss` |
| Sem bibliotecas de UI | ✅ apenas `lucide-react` (ícones SVG) |
| Boas práticas de SEO | ✅ meta tags, OG, JSON-LD |
| HTML semântico | ✅ tags semânticas + ARIA |
| Componentização | ✅ 3 componentes isolados + `utils`/`types`/`styles` |
| Organização do projeto | ✅ estrutura por camada/feature |
| Lint e checagem de tipos | ✅ `npm run lint` e `tsc -b` no build |

---

## Pontos de melhoria

Não implementados por estarem fora do escopo do teste, mas identificados:

- Testes automatizados (Vitest + Testing Library) e cobertura.
- CI (GitHub Actions) e pre-commit hooks.
- Migração de `@import` para `@use`/`@forward` no Sass (a API antiga está
  depreciada e emite warnings).
- Compressão das imagens de banner (`bannerHome.jpg` tem ~6 MB,
  `bannerParceiros.jpg` ~1,1 MB) — impacta diretamente o Core Web Vitals.
- Paginação / infinite scroll nas vitrines (hoje todos os produtos são
  carregados de uma vez).
- Remoção dos assets não utilizados (`public/icons.svg` e
  `public/image/Grupo 8.png`).
- Roteamento (React Router) caso existam outras páginas além da home.
- Estado global de carrinho (hoje o botão "Comprar" não persiste nada).
