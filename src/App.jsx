import { useEffect, useState } from 'react'
import { catalog } from './data/catalog'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { CategoryPanel } from './components/CategoryPanel'
import { ProductModal } from './components/ProductModal'
import { Footer } from './components/Footer'
import { Icon } from './components/Icon'
import { whatsappLink } from './data/contact'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('inicio')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-navigation-section]'))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActiveSection(visible.target.dataset.navigationSection)
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.1, 0.35, 0.65] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.16 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const closeModal = (event) => {
      if (event.key === 'Escape') setSelectedProduct(null)
    }
    window.addEventListener('keydown', closeModal)
    return () => window.removeEventListener('keydown', closeModal)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('modal-open', Boolean(selectedProduct))
    return () => document.body.classList.remove('modal-open')
  }, [selectedProduct])

  return (
    <>
      <Header
        activeSection={activeSection}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onNavigate={() => setMenuOpen(false)}
      />

      <main>
        <Hero />

        <section className="product-index" aria-labelledby="product-index-title">
          <div className="page-shell product-index__inner">
            <div className="product-index__intro">
              <p>Explore por categoria</p>
              <h2 id="product-index-title">O que você procura?</h2>
            </div>
            <nav className="product-index__links" aria-label="Categorias de produtos">
              {catalog.map((category) => (
                <a href={`#${category.id}`} key={category.id}>
                  <strong>{category.title}</strong>
                  <i aria-hidden="true">{category.suit}</i>
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="catalog-section" id="produtos" data-navigation-section="produtos" aria-labelledby="catalog-title">
          <div className="page-shell section-heading" data-reveal>
            <p className="eyebrow"><span>♦</span> Catálogo</p>
            <h2 id="catalog-title">Encontre o que faz a mesa render.</h2>
            <p>Uma seleção organizada para o seu comércio. Consulte as opções disponíveis e fale direto com a nossa equipe.</p>
          </div>

          <div className="catalog-list">
            {catalog.map((category) => (
              <CategoryPanel key={category.id} category={category} onProductSelect={setSelectedProduct} />
            ))}
          </div>
        </section>

        <section className="about-section" id="sobre" data-navigation-section="sobre" aria-labelledby="about-title">
          <div className="about-suits" aria-hidden="true"><span>♣</span><span>♥</span></div>
          <div className="page-shell about-grid">
            <div className="about-visual" data-reveal>
              <div className="about-card about-card--back"><span>SA</span></div>
              <div className="about-card about-card--front"><small>desde</small><strong>1995</strong><span className="about-card__suit">♦</span></div>
              <div className="about-seal"><span>31</span><small>anos<br />de história</small></div>
            </div>
            <div className="about-copy" data-reveal>
              <p className="eyebrow eyebrow--light"><span>♠</span> Sobre a Souza</p>
              <h2 id="about-title">Tradição para acompanhar cada partida.</h2>
              <p>Situada em Mogi Mirim-SP, a Souza Atacadista atua há 31 anos levando produtos de qualidade a bares, estabelecimentos comerciais e amantes dos jogos de cartas.</p>
              <p>Somos especializados em baralhos novos e reciclados, toalhas de mesa e acessórios. Também reunimos artigos de conveniência para atender o dia a dia dos nossos clientes.</p>
              <a className="text-link text-link--gold" href="#contato">Conheça nosso atendimento <Icon name="arrow" /></a>
            </div>
          </div>

          <div className="page-shell commitments" aria-label="Compromissos da Souza Atacadista">
            <article data-reveal><span className="commitment-number">01</span><h3>Qualidade</h3><p>Produtos de qualidade e marcas reconhecidas para o seu negócio.</p></article>
            <article data-reveal><span className="commitment-number">02</span><h3>Compromisso</h3><p>Atendimento transparente, próximo e feito com responsabilidade.</p></article>
            <article data-reveal><span className="commitment-number">03</span><h3>Tradição</h3><p>Experiência de quem conhece o segmento há mais de três décadas.</p></article>
          </div>
        </section>

        <section className="contact-section" id="contato" data-navigation-section="contato" aria-labelledby="contact-title">
          <div className="page-shell contact-card" data-reveal>
            <div className="contact-card__title">
              <p className="eyebrow"><span>♥</span> Vamos conversar?</p>
              <h2 id="contact-title">Seu próximo pedido começa por uma boa conversa.</h2>
              <p>Consulte produtos e condições comerciais pelo WhatsApp.</p>
              <a className="card-button card-button--orange" href={whatsappLink()} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> Falar no WhatsApp <Icon name="arrow" /></a>
            </div>
            <address className="contact-card__details">
              <div><Icon name="pin" /><p>Av. Juscelino Kubitschek de Oliveira, 325<br />Inocoop — Mogi Mirim/SP<br />CEP: 13806-520</p></div>
              <a href="tel:+5519988882409"><Icon name="phone" /> (19) 98888-2409</a>
              <a className="map-link" href="https://www.google.com/maps/search/?api=1&query=Av.+Juscelino+Kubitschek+de+Oliveira,+325,+Mogi+Mirim+-+SP" target="_blank" rel="noreferrer">Ver no Google Maps <Icon name="external" /></a>
            </address>
            <span className="contact-card__suit" aria-hidden="true">♣</span>
          </div>
        </section>
      </main>

      <a className="floating-whatsapp" href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Falar com a Souza Atacadista pelo WhatsApp"><Icon name="whatsapp" /><span>WhatsApp</span></a>
      <Footer />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}

export default App
