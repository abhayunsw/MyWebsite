import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/philosophy', label: 'Philosophy' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '60px',
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
    }}>
      {links.map(link => {
        const isActive = location.pathname === link.path
        return (
          <Link
            key={link.path}
            to={link.path}
            style={{
              color: isActive ? '#a855f7' : 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: isActive ? 'bold' : 'normal',
              letterSpacing: '2px',
              padding: '6px 16px',
              borderRadius: '20px',
              border: isActive
                ? '1px solid rgba(168,85,247,0.6)'
                : '1px solid transparent',
              backgroundColor: isActive
                ? 'rgba(168,85,247,0.15)'
                : 'transparent',
              boxShadow: isActive
                ? '0 0 10px rgba(168,85,247,0.3)'
                : 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.target.style.color = 'white'
                e.target.style.border = '1px solid rgba(168,85,247,0.3)'
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.target.style.color = 'rgba(255,255,255,0.7)'
                e.target.style.border = '1px solid transparent'
              }
            }}
          >
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}

export default Navbar
