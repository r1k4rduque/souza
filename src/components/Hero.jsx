import { useEffect, useState } from 'react'
import { Icon } from './Icon'
import { whatsappLink } from '../data/contact'

const slides = [
  { eyebrow: 'Desde 1995', title: <>A mão certa<br /><em>para o seu comércio.</em></>, text: 'Produtos para jogos, bares e estabelecimentos que valorizam qualidade.', accent: '♠', theme: 'hero-slide--blue' },
  { eyebrow: 'Especialistas em jogos', title: <>Tradição que<br /><em>entra em jogo.</em></>, text: 'Baralhos e acessórios para tornar cada partida ainda melhor.', accent: '♦', theme: 'hero-slide--gold' },
  { eyebrow: 'Atendimento próximo', title: <>Seu estoque<br /><em>bem servido.</em></>, text: 'Consulte nosso catálogo e encontre o que o seu negócio precisa.', accent: '♥', theme: 'hero-slide--orange' },
]

export function Hero() {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 5000)
    return () => window.clearInterval(timer)
  }, [])

  const previous = () => setSlide((current) => (current - 1 + slides.length) % slides.length)
  const next = () => setSlide((current) => (current + 1) % slides.length)

  return (
    <section className="hero-section" id="inicio" data-navigation-section="inicio" aria-label="Apresentação Souza Atacadista">
      {slides.map((item, index) => (
        <div key={item.eyebrow} className={`hero-slide ${item.theme} ${slide === index ? 'is-active' : ''}`} aria-hidden={slide !== index}>
          <div className="hero-felt" />
          <div className="hero-reference-photo" />
          <div className="hero-orbit hero-orbit--one" />
          <div className="hero-orbit hero-orbit--two" />
          <div className="page-shell hero-content">
            <div className="hero-copy">
              <p className="hero-eyebrow"><span>{item.accent}</span>{item.eyebrow}</p>
              <h1>{item.title}</h1>
              <p className="hero-description">{item.text}</p>
              <div className="hero-actions">
                <a className="card-button card-button--gold" href="#produtos" tabIndex={slide === index ? 0 : -1}>Explorar produtos <Icon name="arrow" /></a>
                <a className="hero-contact" href={whatsappLink()} target="_blank" rel="noreferrer" tabIndex={slide === index ? 0 : -1}><Icon name="whatsapp" /> Falar com a gente</a>
              </div>
            </div>
            <CardFan suit={item.accent} index={index} />
          </div>
        </div>
      ))}

      <div className="hero-controls page-shell">
        <div className="hero-dots" role="tablist" aria-label="Selecionar slide">
          {slides.map((item, index) => <button key={item.eyebrow} className={slide === index ? 'is-active' : ''} onClick={() => setSlide(index)} aria-label={`Ir para slide ${index + 1}`} aria-selected={slide === index} role="tab" />)}
        </div>
        <div className="hero-arrows"><button onClick={previous} aria-label="Slide anterior"><Icon name="arrow" /></button><button onClick={next} aria-label="Próximo slide"><Icon name="arrow" /></button></div>
      </div>
    </section>
  )
}

function CardFan({ suit, index }) {
  return (
    <div className={`card-fan card-fan--${index}`} aria-hidden="true">
      <div className="playing-card playing-card--rear"><span>Souza</span><b>SA</b><span>Atacadista</span></div>
      <div className="playing-card playing-card--middle"><span>{suit}</span><b>{suit}</b><span>{suit}</span></div>
      <div className="playing-card playing-card--front"><span>A</span><b>{suit}</b><span>A</span></div>
      <div className="fan-shadow" />
    </div>
  )
}
