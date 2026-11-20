import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

const modules = [
  {
    id: 'info-seguridad',
    icon: '🛡️',
    title: 'Información de Seguridad',
    desc: 'Consulta rutas de evacuación, puntos de encuentro, alarmas y ubicación de extintores.',
    path: '/info-seguridad',
    color: '#e63946',
    tag: 'Seguridad SST',
  },
  {
    id: 'simulacion',
    icon: '🎯',
    title: 'Simulaciones',
    desc: 'Realiza simulacros de emergencia con tu grupo: sismo e incendio con escenas interactivas.',
    path: '/simulaciones',
    color: '#f4a261',
    tag: 'Sismo · Incendio',
  },
  {
    id: 'reportes',
    icon: '📊',
    title: 'Reportes',
    desc: 'Consulta el historial y resultados de los simulacros realizados.',
    path: '#',
    color: '#4895ef',
    tag: 'Próximamente',
    disabled: true,
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const firstName = user?.email?.split('@')[0] ?? 'Facilitador'

  return (
    <div className="app-layout">
      <Navbar />
      <main className="dashboard">
        <div className="dashboard-hero">
          <div className="hero-text">
            <p className="hero-greeting">Bienvenido,</p>
            <h1 className="hero-name">{firstName}</h1>
            <p className="hero-role">Facilitador · Simulador de Emergencias</p>
          </div>
          <div className="hero-badge">
            <span>🚨</span>
            <span>Modo Facilitador</span>
          </div>
        </div>

        <section className="dashboard-section">
          <h2 className="section-title">¿Qué quieres hacer hoy?</h2>
          <div className="modules-grid">
            {modules.map((mod) => (
              <div
                key={mod.id}
                id={`module-${mod.id}`}
                className={`module-card ${mod.disabled ? 'disabled' : ''}`}
                onClick={() => !mod.disabled && navigate(mod.path)}
                style={{ '--card-accent': mod.color }}
              >
                <div className="module-tag" style={{ color: mod.color }}>
                  {mod.tag}
                </div>
                <div className="module-icon">{mod.icon}</div>
                <h3 className="module-title">{mod.title}</h3>
                <p className="module-desc">{mod.desc}</p>
                {!mod.disabled && (
                  <span className="module-cta">
                    Abrir <span>→</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
