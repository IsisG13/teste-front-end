import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProductCarousel from './components/ProductCarousel/ProductCarousel';
import ProductModal from './components/ProductModal/ProductModal';
import './styles/global.scss';
import type { ApiResponse, Product } from './types/product';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data: ApiResponse) => setProducts(data.products))
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  return (
    <div className="app-layout">
      {/* 1. HEADER */}
      <header className="main-header">
        <div className="top-bar">
          <div className="container top-bar-content">
            <span><img src="/image/ShieldCheck.png" alt="" /> Compra <strong>100% segura</strong></span>
            <span><img src="/image/Truck.png" alt="" /> <strong>Frete grátis</strong> acima de R$ 200</span>
            <span><img src="/image/CreditCard.png" alt="" /> <strong>Parcele</strong> suas compras</span>
          </div>
        </div>

        <div className="container header-middle">
          <div className="brand-logo">
            <img className="logo-img" src="/image/Logo.png" alt="Econverse" />
          </div>
          <form className="search-box" role="search" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="busca">O que você está buscando?</label>
            <input id="busca" name="q" type="search" placeholder="O que você está buscando?" />
            <Search size={20} className="search-icon" />
          </form>
          <nav className="header-icons" aria-label="Atalhos de conta e carrinho">
            <a href="#vitrine-1" aria-label="Ofertas e prêmios"><img src="/image/Group.png" alt="" /></a>
            <a href="#vitrine-1" aria-label="Favoritos"><img src="/image/Heart.png" alt="" /></a>
            <a href="#vitrine-1" aria-label="Minha conta"><img src="/image/UserCircle.png" alt="" /></a>
            <a href="#vitrine-1" aria-label="Carrinho de compras"><img src="/image/ShoppingCart.png" alt="" /></a>
          </nav>
        </div>

        <nav className="main-nav">
          <div className="container nav-links">
            <a href="#">Todas Categorias</a>
            <a href="#">Supermercado</a>
            <a href="#">Livros</a>
            <a href="#">Moda</a>
            <a href="#">Lançamentos</a>
            <a href="#" className="active">Ofertas do dia</a>
            <a href="#"><img className="nav-icon" src="/image/assunatura.png" alt="" />Assinatura</a>
          </div>
        </nav>
      </header>

      {/* 2. HERO BANNER */}
      <section className="hero-banner">
        <div className="container banner-content">
          <div className="banner-texts">
            <h1>Venha conhecer nossas<br />promoções</h1>
            <p><strong>50% Off</strong> nos produtos</p>
            <button className="yellow-btn">Ver produtos</button>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIAS */}
      <nav className="container categories-container" aria-label="Categorias">
        <button type="button" className="category-box active">
          <span className="icon-card"><img src="/image/tecnologia.png" alt="" /></span>
          <span>Tecnologia</span>
        </button>
        <button type="button" className="category-box">
          <span className="icon-card"><img src="/image/supermercado.png" alt="" /></span>
          <span>Supermercado</span>
        </button>
        <button type="button" className="category-box">
          <span className="icon-card"><img src="/image/bebidas.png" alt="" /></span>
          <span>Bebidas</span>
        </button>
        <button type="button" className="category-box">
          <span className="icon-card"><img src="/image/ferramentas.png" alt="" /></span>
          <span>Ferramentas</span>
        </button>
        <button type="button" className="category-box">
          <span className="icon-card"><img src="/image/saude.png" alt="" /></span>
          <span>Saúde</span>
        </button>
        <button type="button" className="category-box">
          <span className="icon-card"><img src="/image/esportes.png" alt="" /></span>
          <span>Esportes e Fitness</span>
        </button>
        <button type="button" className="category-box">
          <span className="icon-card"><img src="/image/moda.png" alt="" /></span>
          <span>Moda</span>
        </button>
      </nav>

      {/* 4. VITRINE 1 */}
      <section className="container" id="vitrine-1" aria-labelledby="vitrine-1-titulo">
        <h2 className="section-title" id="vitrine-1-titulo">Produtos relacionados</h2>
        <div className="vitrine-tabs">
          <button className="active">Celular</button>
          <button>Acessórios</button>
          <button>Tablets</button>
          <button>Notebooks</button>
          <button>TVs</button>
          <button>Ver todos</button>
        </div>

        {products.length === 0
          ? (
            <div className="vitrine-skeletons">
              {[0, 1, 2, 3].map((i) => <div className="vitrine-skeleton" key={i} />)}
            </div>
          )
          : <ProductCarousel products={products} onOpenModal={setSelectedProduct} titulo="Ofertas da semana" />}
      </section>

      {/* 5. PARCEIROS */}
      <section className="container partners-section" aria-label="Parceiros">
        <article className="partner-card">
          <h2>Parceiros</h2>
          <p>Lorem ipsum dolor sit amet, consectetur</p>
          <button className="confira-btn">Confira</button>
        </article>
        <article className="partner-card">
          <h2>Parceiros</h2>
          <p>Lorem ipsum dolor sit amet, consectetur</p>
          <button className="confira-btn">Confira</button>
        </article>
      </section>

      {/* 6. VITRINE 2 */}
      <section className="container" id="vitrine-2" aria-labelledby="vitrine-2-titulo">
        <h2 className="section-title" id="vitrine-2-titulo">Produtos relacionados</h2>
        <a href="#" className="view-all">Ver todos</a>
        {products.length === 0
          ? (
            <div className="vitrine-skeletons">
              {[0, 1, 2, 3].map((i) => <div className="vitrine-skeleton" key={i} />)}
            </div>
          )
          : <ProductCarousel products={products} onOpenModal={setSelectedProduct} titulo="Mais vendidos" />}
      </section>

      {/* 7. PARCEIROS */}
      <section className="container partners-section partners-section--gap" aria-label="Parceiros em destaque">
        <article className="partner-card">
          <h2>Parceiros</h2>
          <p>Lorem ipsum dolor sit amet, consectetur</p>
          <button className="confira-btn">Confira</button>
        </article>
        <article className="partner-card">
          <h2>Parceiros</h2>
          <p>Lorem ipsum dolor sit amet, consectetur</p>
          <button className="confira-btn">Confira</button>
        </article>
      </section>

      {/* 8. MARCAS */}
      <section className="container brands-section" aria-labelledby="marcas-titulo">
        <h2 className="section-title" id="marcas-titulo">Navegue por marcas</h2>
        <div className="brands-container">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="brand-circle">
              <img src="/image/Logo.png" alt="Marca" />
            </div>
          ))}
        </div>
      </section>

      {/* 9. VITRINE 3 (Abaixo das Marcas) */}
      <section className="container vitrine-last" id="vitrine-3" aria-labelledby="vitrine-3-titulo">
        <h2 className="section-title" id="vitrine-3-titulo">Produtos relacionados</h2>
        <a href="#" className="view-all">Ver todos</a>
        {products.length === 0
          ? (
            <div className="vitrine-skeletons">
              {[0, 1, 2, 3].map((i) => <div className="vitrine-skeleton" key={i} />)}
            </div>
          )
          : <ProductCarousel products={products} onOpenModal={setSelectedProduct} titulo="Novidades" />}
      </section>

      {/* 10. NEWSLETTER */}
      <section className="newsletter-box">
        <div className="container newsletter-content">
          <div className="newsletter-text">
            <h3>Inscreva-se na nossa newsletter</h3>
            <p>Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.</p>
          </div>
          <div className="newsletter-form">
            <div className="newsletter-field">
              <input type="text" placeholder="Digite seu nome" />
              <label className="newsletter-checkbox">
                <input type="checkbox" />
                <span className="checkbox-box"></span>
                <span className="checkbox-text">Aceito os termos e condições</span>
              </label>
            </div>
            <input type="email" placeholder="Digite seu e-mail" />
            <button>Inscrever</button>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="main-footer">
        <div className="container footer-links">
          <div className="footer-brand">
            <img className="footer-logo" src="/image/Logo.png" alt="Econverse" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <ul className="footer-social">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer noopener" aria-label="Instagram">
                  <img src="/image/instagram.png" alt="" />
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer noopener" aria-label="Facebook">
                  <img src="/image/facebook.png" alt="" />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
                  <img src="/image/linkedin.png" alt="" />
                </a>
              </li>
            </ul>
          </div>
          <nav className="footer-column" aria-labelledby="footer-institucional">
            <h4 id="footer-institucional">Institucional</h4>
            <ul>
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="#">Movimento</a></li>
              <li><a href="#">Trabalhe conosco</a></li>
            </ul>
          </nav>
          <nav className="footer-column" aria-labelledby="footer-ajuda">
            <h4 id="footer-ajuda">Ajuda</h4>
            <ul>
              <li><a href="#">Suporte</a></li>
              <li><a href="#">Fale Conosco</a></li>
              <li><a href="#">Perguntas Frequentes</a></li>
            </ul>
          </nav>
          <nav className="footer-column" aria-labelledby="footer-termos">
            <h4 id="footer-termos">Termos</h4>
            <ul>
              <li><a href="#">Termos e Condições</a></li>
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">Troca e Devolução</a></li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </footer>

      {/* MODAL SELECIONADO */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}

export default App;