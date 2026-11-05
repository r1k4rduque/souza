import { useEffect, useState } from 'react'
import { Icon } from './Icon'
import { whatsappLink } from '../data/contact'

const navigation = [
  { id: 'inicio', label: 'Início', href: '#inicio' },
  { id: 'produtos', label: 'Produtos', href: '#produtos' },
  { id: 'sobre', label: 'Sobre nós', href: '#sobre' },
  { id: 'contato', label: 'Contato', href: '#contato' },
]

export function Header({ activeSection, menuOpen, onMenuToggle, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="page-shell site-header__inner">
        <a className="brand" href="#inicio" onClick={onNavigate} aria-label="Souza Atacadista, início">
          <span className="brand__mark"><b>S</b><i>♦</i></span>
          <span><strong>Souza</strong><small>Atacadista</small></span>
        </a>

        <button className="menu-toggle" type="button" onClick={onMenuToggle} aria-expanded={menuOpen} aria-label="Abrir menu de navegação"><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        <nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} aria-label="Navegação principal">
          {navigation.map((item) => <a key={item.id} className={activeSection === item.id ? 'is-active' : ''} href={item.href} onClick={onNavigate}>{item.label}</a>)}
          <a className="header-whatsapp" href={whatsappLink()} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={17} /> WhatsApp</a>
        </nav>
      </div>
    </header>
  )
}
