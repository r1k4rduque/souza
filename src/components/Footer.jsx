import { Icon } from './Icon'
import { whatsappLink } from '../data/contact'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <a className="brand brand--footer" href="#inicio"><span className="brand__mark"><b>S</b><i>♦</i></span><span><strong>Souza</strong><small>Atacadista</small></span></a>
        <nav aria-label="Navegação do rodapé"><a href="#produtos">Produtos</a><a href="#sobre">Sobre nós</a><a href="#contato">Contato</a></nav>
        <div className="footer-contact"><a href="tel:+5519988882409"><Icon name="phone" size={16} /> (19) 98888-2409</a><a href={whatsappLink()} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={17} /> WhatsApp</a></div>
      </div>
      <div className="page-shell footer-bottom"><span>© 2026 Souza Atacadista. Todos os direitos reservados.</span><span>Mogi Mirim — SP <b>♦</b></span></div>
    </footer>
  )
}
