import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../config/supabase'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password !== confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    setLoading(true)
    try {
      const { error: signUpError } = await supabase.auth.signUp({ email, password })
      if (signUpError) throw signUpError
      setSuccess('¡Usuario creado! Revisa tu correo para confirmar la cuenta, o ingresa directamente si la confirmación está desactivada.')
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setError(err.message || 'Error al crear el usuario.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-bg">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="login-card">
        <div className="login-header">
          <div className="login-logo-wrap">
            <span className="login-logo">👤</span>
          </div>
          <h1 className="login-title">Crear Facilitador</h1>
          <p className="login-subtitle">Colegio Comfandi El Prado</p>
          <p className="login-desc">Registra un nuevo facilitador autorizado</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label className="field-label" htmlFor="reg-email">Correo electrónico</label>
            <input
              id="reg-email"
              type="email"
              className="field-input"
              placeholder="facilitador@comfandi.edu.co"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="reg-password">Contraseña</label>
            <input
              id="reg-password"
              type="password"
              className="field-input"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="reg-confirm">Confirmar contraseña</label>
            <input
              id="reg-confirm"
              type="password"
              className="field-input"
              placeholder="Repite la contraseña"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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

          {success && (
            <div className="login-success" role="status">
              <span>✅</span>
              <span>{success}</span>
            </div>
          )}

          <button
            type="submit"
            id="btn-register"
            className={`btn-login ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <><span className="spinner" /><span>Creando usuario...</span></>
            ) : (
              <><span>➕</span><span>Crear usuario</span></>
            )}
          </button>
        </form>

        <div className="register-link">
          <span>¿Ya tienes cuenta?</span>
          <Link to="/login" className="link">Iniciar sesión →</Link>
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
