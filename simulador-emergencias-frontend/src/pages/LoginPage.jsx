import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError('Correo o contraseña incorrectos. Verifica tus datos e intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-bg">
      {/* Animated background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="login-card">
        <div className="login-header">
          <div className="login-logo-wrap">
            <span className="login-logo">🚨</span>
          </div>
          <h1 className="login-title">Simulador de Emergencias</h1>
          <p className="login-subtitle">Colegio Comfandi El Prado</p>
          <p className="login-desc">Acceso exclusivo para facilitadores autorizados</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label className="field-label" htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              className="field-input"
              placeholder="facilitador@comfandi.edu.co"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              disabled={loading}
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              className="field-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className="login-error" role="alert">
              <span>⚠</span>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            id="btn-login"
            className={`btn-login ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                <span>Verificando...</span>
              </>
            ) : (
              <>
                <span>🔐</span>
                <span>Ingresar</span>
              </>
            )}
          </button>
        </form>

        <div className="register-link">
          <span>¿Nuevo facilitador?</span>
          <Link to="/register" className="link">Crear cuenta →</Link>
        </div>

        <footer className="login-footer">
          <span>SOLUTIONS S.A.S.</span>
          <span className="dot">·</span>
          <span>Solo facilitadores autorizados</span>
        </footer>
      </div>
    </div>
  )
}
