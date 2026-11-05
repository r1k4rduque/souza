import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'

export function CategoryPanel({ category, onProductSelect }) {
  const sectionRef = useRef(null)
  const scrollerRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0 })
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.2 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const move = (amount) => scrollerRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  const pointerDown = (event) => {
    const scroller = scrollerRef.current
    drag.current = { active: true, startX: event.clientX, startScroll: scroller.scrollLeft }
    scroller.setPointerCapture?.(event.pointerId)
  }
  const pointerMove = (event) => {
    if (!drag.current.active) return
    const scroller = scrollerRef.current
    scroller.scrollLeft = drag.current.startScroll - (event.clientX - drag.current.startX)
  }
  const pointerUp = () => { drag.current.active = false }

  return (
    <article ref={sectionRef} className={`category category--${category.tone} ${revealed ? 'category--revealed' : ''}`} id={category.id}>
      <div className="page-shell category__layout">
        <div className="category__intro">
          <p className="eyebrow"><span>{category.suit}</span> Linha Souza</p>
          <h3>{category.title}</h3>
          <p>{category.lead}</p>
          <span className="category__suit" aria-hidden="true">{category.suit}</span>
        </div>
        <div className="showcase-wrap">
          <div className="showcase-label"><span>Arraste para explorar</span><span>{category.suit}</span></div>
          <div className="showcase">
            <div className="showcase__top"><div><span>Seleção Souza</span><h4>{category.description}</h4></div></div>
            <div className="product-scroller" ref={scrollerRef} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
              {category.products.map((product) => <ProductCard key={product.name} category={category} product={product} onSelect={() => onProductSelect({ ...product, category })} />)}
              <a className="catalog-request" href={`https://wa.me/5519988882409?text=${encodeURIComponent(`Olá! Gostaria de conhecer as opções da categoria ${category.title}.`)}`} target="_blank" rel="noreferrer"><span>Não encontrou<br />o que procura?</span><strong>Fale com a gente <Icon name="arrow" /></strong></a>
            </div>
            <div className="showcase__footer"><p>Catálogo sujeito à disponibilidade. Consulte nossa equipe.</p><div className="slider-actions"><button onClick={() => move(-320)} aria-label={`Ver produtos anteriores de ${category.title}`}><Icon name="arrow" /></button><button onClick={() => move(320)} aria-label={`Ver mais produtos de ${category.title}`}><Icon name="arrow" /></button></div></div>
          </div>
        </div>
      </div>
    </article>
  )
}

function ProductCard({ category, product, onSelect }) {
  return (
    <button className="product-card" type="button" onClick={onSelect} aria-label={`Ver detalhes: ${product.name}`}>
      <div className={`product-visual product-visual--${product.visual}`}><span className="product-visual__brand">Souza<br />Atacadista</span><div className="visual-shape" /><span className="product-visual__suit">{category.suit}</span></div>
      <div className="product-card__copy"><span>Consultar</span><h5>{product.name}</h5><Icon name="arrow" /></div>
    </button>
  )
}
