import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { label: 'Panel', path: '/dashboard', icon: '⊞' },
  { label: 'Info Seguridad', path: '/info-seguridad', icon: '🛡️' },
  { label: 'Simulaciones', path: '/simulaciones', icon: '🎯' },
  { label: 'Estadísticas', path: '/estadisticas', icon: '📊' },
  { label: 'Editor', path: '/editor', icon: '🏗️' },
  { label: 'Guía', path: '/guia', icon: '📖' },
]

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="navbar-icon">🚨</span>
        <div className="navbar-title">
          <span className="navbar-name">Simulador de Emergencias</span>
          <span className="navbar-org">Colegio Comfandi El Prado</span>
        </div>
      </div>

      <nav className="navbar-nav">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="navbar-user">
        <span className="user-email">{user?.email}</span>
        <button className="btn-signout" onClick={handleSignOut} title="Cerrar sesión">
          <span>⎋</span>
          <span>Salir</span>
        </button>
      </div>
    </header>
  )
}
