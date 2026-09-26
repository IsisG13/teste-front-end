import { ShieldCheck, Truck, CreditCard, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard/ProductCard';
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
            <span><ShieldCheck size={16} /> Compra <strong>100% segura</strong></span>
            <span><Truck size={16} /> <strong>Frete grátis</strong> acima de R$ 200</span>
            <span><CreditCard size={16} /> <strong>Parcele</strong> suas compras</span>
          </div>
        </div>

        <div className="container header-middle">
          <div className="brand-logo">
            <img className="logo-img" src="/image/Logo.png" alt="Econverse" />
          </div>
          <div className="search-box">
            <input type="text" placeholder="O que você está buscando?" />
            <Search size={20} className="search-icon" />
          </div>
          <div className="header-icons">
            <img src="/image/Group.png" alt="Troféu" />
            <img src="/image/Heart.png" alt="Favoritos" />
            <img src="/image/UserCircle.png" alt="Minha conta" />
            <img src="/image/ShoppingCart.png" alt="Carrinho" />
          </div>
        </div>

        <nav className="main-nav">
          <div className="container nav-links">
            <a href="#">TODAS CATEGORIAS</a>
            <a href="#">SUPERMERCADO</a>
            <a href="#">LIVROS</a>
            <a href="#">MODA</a>
            <a href="#">LANÇAMENTOS</a>
            <a href="#" className="active">OFERTAS DO DIA</a>
            <a href="#"><img className="nav-icon" src="/image/assunatura.png" alt="" />ASSINATURA</a>
          </div>
        </nav>
      </header>

      {/* 2. HERO BANNER */}
      <section className="hero-banner">
        <div className="container banner-content">
          <h1>Venha conhecer nossas<br />promoções</h1>
          <p>50% Off nos produtos</p>
          <button className="yellow-btn">Ver produto</button>
        </div>
      </section>

      {/* 3. CATEGORIAS */}
      <section className="container categories-container">
        <div className="category-box active">
          <div className="icon-card"><img src="/image/tecnologia.png" alt="Tecnologia" /></div>
          <span>Tecnologia</span>
        </div>
        <div className="category-box">
          <div className="icon-card"><img src="/image/supermercado.png" alt="Supermercado" /></div>
          <span>Supermercado</span>
        </div>
        <div className="category-box">
          <div className="icon-card"><img src="/image/bebidas.png" alt="Bebidas" /></div>
          <span>Bebidas</span>
        </div>
        <div className="category-box">
          <div className="icon-card"><img src="/image/ferramentas.png" alt="Ferramentas" /></div>
          <span>Ferramentas</span>
        </div>
        <div className="category-box">
          <div className="icon-card"><img src="/image/saude.png" alt="Saúde" /></div>
          <span>Saúde</span>
        </div>
        <div className="category-box">
          <div className="icon-card"><img src="/image/esportes.png" alt="Esportes e Fitness" /></div>
          <span>Esportes e Fitness</span>
        </div>
        <div className="category-box">
          <div className="icon-card"><img src="/image/moda.png" alt="Moda" /></div>
          <span>Moda</span>
        </div>
      </section>

      {/* 4. VITRINE 1 */}
      <section className="container">
        <h2 className="section-title">Produtos relacionados</h2>
        <div className="vitrine-tabs">
          <button className="active">Celular</button>
          <button>Acessórios</button>
          <button>Tablets</button>
          <button>Notebooks</button>
          <button>TVs</button>
          <button>Ver Todos</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {products.slice(0, 4).map((product, i) => (
            <ProductCard key={i} product={product} onOpenModal={() => setSelectedProduct(product)} />
          ))}
        </div>
      </section>

      {/* 5. PARCEIROS */}
      <section className="container partners-section">
        <div className="partner-card">
          <h2>Parceiros</h2>
          <p>Lorem ipsum dolor sit amet, consectetur</p>
          <button className="confira-btn">Confira</button>
        </div>
        <div className="partner-card">
          <h2>Parceiros</h2>
          <p>Lorem ipsum dolor sit amet, consectetur</p>
          <button className="confira-btn">Confira</button>
        </div>
      </section>

      {/* 6. VITRINE 2 */}
      <section className="container">
        <h2 className="section-title">Produtos relacionados</h2>
        <a href="#" className="view-all">Ver todos</a>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {products.slice(2, 6).map((product, i) => (
            <ProductCard key={i} product={product} onOpenModal={() => setSelectedProduct(product)} />
          ))}
        </div>
      </section>

      {/* 7. PARCEIROS */}
      <section className="container partners-section">
        <div className="partner-card">
          <h2>Parceiros</h2>
          <p>Lorem ipsum dolor sit amet, consectetur</p>
          <button className="confira-btn">Confira</button>
        </div>
        <div className="partner-card">
          <h2>Parceiros</h2>
          <p>Lorem ipsum dolor sit amet, consectetur</p>
          <button className="confira-btn">Confira</button>
        </div>
      </section>

      {/* 8. MARCAS */}
      <section className="container">
        <h2 className="section-title">Navegue por marcas</h2>
        <div className="brands-container">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="brand-circle">
              <img src="/image/Logo.png" alt="Marca" />
            </div>
          ))}
        </div>
      </section>

      {/* 9. VITRINE 3 (Abaixo das Marcas) */}
      <section className="container" style={{ paddingBottom: '60px' }}>
        <h2 className="section-title">Produtos relacionados</h2>
        <a href="#" className="view-all">Ver todos</a>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {products.slice(4, 8).map((product, i) => (
            <ProductCard key={i} product={product} onOpenModal={() => setSelectedProduct(product)} />
          ))}
        </div>
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
            <div className="footer-social">
              <img src="/image/instagram.png" alt="Instagram" />
              <img src="/image/facebook.png" alt="Facebook" />
              <img src="/image/linkedin.png" alt="LinkedIn" />
            </div>
          </div>
          <div className="footer-column">
            <h4>Institucional</h4>
            <ul>
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="#">Movimento</a></li>
              <li><a href="#">Trabalhe conosco</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Ajuda</h4>
            <ul>
              <li><a href="#">Suporte</a></li>
              <li><a href="#">Fale Conosco</a></li>
              <li><a href="#">Perguntas Frequentes</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Termos</h4>
            <ul>
              <li><a href="#">Termos e Condições</a></li>
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">Troca e Devolução</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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