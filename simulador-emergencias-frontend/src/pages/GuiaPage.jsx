import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const pasos = [
  {
    numero: 1,
    icon: '🔐',
    titulo: 'Ingresar a la aplicación',
    instrucciones: [
      'Abre la aplicación en el navegador.',
      'Escribe tu correo electrónico y contraseña.',
      'Haz clic en "Ingresar".',
      'Si es tu primera vez, usa el enlace "Crear cuenta" para registrarte.',
    ],
    nota: 'Si el sistema no te deja ingresar, verifica que el correo y la contraseña sean correctos.',
  },
  {
    numero: 2,
    icon: '🎯',
    titulo: 'Elegir una simulación',
    instrucciones: [
      'En el panel principal, haz clic en la tarjeta "Simulaciones".',
      'Verás dos opciones: Sismo 🌊 e Incendio 🔥.',
      'Haz clic en "Iniciar" en la simulación que vas a usar.',
      'La primera escena aparecerá de inmediato.',
    ],
    nota: 'Puedes realizar las dos simulaciones en la misma sesión. Cada una comienza de cero.',
  },
  {
    numero: 3,
    icon: '📋',
    titulo: 'Presentar las escenas al grupo',
    instrucciones: [
      'Lee la situación en voz alta para todo el grupo.',
      'Lee también las opciones de respuesta disponibles.',
      'Permite que el grupo debata y llegue a un acuerdo.',
      'Haz clic en la opción acordada para seleccionarla (se resalta en rojo).',
      'Haz clic en "Confirmar decisión del grupo" para avanzar.',
    ],
    nota: 'Si necesitas volver a la escena anterior, usa el botón "← Volver" en la parte superior.',
  },
  {
    numero: 4,
    icon: '💡',
    titulo: 'Revisar la retroalimentación',
    instrucciones: [
      'Al finalizar el recorrido, haz clic en "Ver retroalimentación completa".',
      'Verás el resultado general del grupo (Excelente, Aceptable o Riesgo).',
      'Cada decisión tomada aparece con su explicación.',
      'Usa estas explicaciones para guiar la discusión con el grupo.',
      'Cuando termines, puedes iniciar una nueva simulación o volver al panel.',
    ],
    nota: 'El contenido de retroalimentación es provisional y está sujeto a revisión por el área SST.',
  },
]

const consejos = [
  { icon: '📽️', texto: 'Activa el modo "Proyector" (botón en la barra superior de cada escena) para agrandar el texto y que todos lo lean desde lejos.' },
  { icon: '👥', texto: 'Orienta la pantalla hacia el grupo. Tú maneja la aplicación, ellos observan y debaten.' },
  { icon: '⏳', texto: 'No apresures las decisiones. El debate es parte del aprendizaje.' },
  { icon: '🔄', texto: 'Si el grupo quiere cambiar una respuesta antes de confirmar, haz clic en otra opción.' },
  { icon: '📶', texto: 'Verifica la conexión a internet antes de comenzar. La aplicación necesita acceso a Supabase.' },
]

export default function GuiaPage() {
  const navigate = useNavigate()

  return (
    <div className="app-layout">
      <Navbar />
      <main className="guia-page">

        <div className="guia-hero">
          <div className="guia-hero-text">
            <h1 className="guia-titulo">Guía de uso</h1>
            <p className="guia-subtitulo">
              Todo lo que necesitas saber para facilitar un simulacro con tu grupo
            </p>
          </div>
          <button className="btn-iniciar guia-cta" onClick={() => navigate('/simulaciones')}>
            Ir a simulaciones →
          </button>
        </div>

        {/* Pasos */}
        <section className="guia-pasos">
          <h2 className="guia-section-titulo">Recorrido paso a paso</h2>
          <div className="pasos-grid">
            {pasos.map((p) => (
              <div key={p.numero} className="paso-card">
                <div className="paso-header">
                  <div className="paso-numero">{p.numero}</div>
                  <span className="paso-icon">{p.icon}</span>
                  <h3 className="paso-titulo">{p.titulo}</h3>
                </div>
                <ol className="paso-lista">
                  {p.instrucciones.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ol>
                <div className="paso-nota">
                  <span>ℹ️</span>
                  <p>{p.nota}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consejos proyector */}
        <section className="guia-consejos">
          <h2 className="guia-section-titulo">Consejos para usar con proyector o pantalla grande</h2>
          <div className="consejos-lista">
            {consejos.map((c, i) => (
              <div key={i} className="consejo-item">
                <span className="consejo-icon">{c.icon}</span>
                <p>{c.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Referencia rápida */}
        <section className="guia-referencia">
          <h2 className="guia-section-titulo">Referencia rápida</h2>
          <div className="referencia-grid">
            <div className="ref-card">
              <span>🔐</span>
              <div>
                <p className="ref-titulo">¿Olvidaste la contraseña?</p>
                <p className="ref-desc">Contacta al administrador del sistema para restablecer tu acceso.</p>
              </div>
            </div>
            <div className="ref-card">
              <span>📋</span>
              <div>
                <p className="ref-titulo">¿La simulación se interrumpió?</p>
                <p className="ref-desc">Si cierras el navegador, el recorrido se pierde. Deberás iniciarla nuevamente desde el principio.</p>
              </div>
            </div>
            <div className="ref-card">
              <span>🛡️</span>
              <div>
                <p className="ref-titulo">¿Dónde ver la información SST?</p>
                <p className="ref-desc">En el panel principal, entra a "Información de Seguridad" para consultar rutas, extintores y alarmas.</p>
              </div>
            </div>
            <div className="ref-card">
              <span>⚠️</span>
              <div>
                <p className="ref-titulo">Contenido provisional</p>
                <p className="ref-desc">Los escenarios y retroalimentación están marcados como provisionales. El contenido definitivo requiere aprobación del área SST.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="guia-footer-cta">
          <p>¿Todo claro? Comienza ahora con tu grupo.</p>
          <button className="btn-iniciar" onClick={() => navigate('/simulaciones')}>
            Ir a simulaciones →
          </button>
        </div>
      </main>
    </div>
  )
}
