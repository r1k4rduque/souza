import { useEffect, useRef } from 'react'
import { Icon } from './Icon'

export function ProductModal({ product, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (product) closeRef.current?.focus()
  }, [product])

  if (!product) return null
  const message = `Olá! Gostaria de informações sobre ${product.name}.`

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }} role="presentation">
      <section className={`product-modal product-modal--${product.category.tone}`} role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Fechar detalhes do produto"><Icon name="close" /></button>
        <div className={`modal-visual product-visual--${product.visual}`} aria-hidden="true"><span className="product-visual__brand">Souza<br />Atacadista</span><div className="visual-shape" /><span className="product-visual__suit">{product.category.suit}</span></div>
        <div className="modal-content"><p className="eyebrow"><span>{product.category.suit}</span> {product.category.title}</p><h2 id="product-modal-title">{product.name}</h2><p>{product.detail}</p><p className="modal-note">Para informações sobre modelos, marcas e disponibilidade, fale diretamente com a nossa equipe.</p><a className="card-button card-button--blue" href={`https://wa.me/5519988882409?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> Consultar no WhatsApp <Icon name="arrow" /></a></div>
      </section>
    </div>
  )
}
