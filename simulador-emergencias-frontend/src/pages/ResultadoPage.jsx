import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { simulaciones, escenas } from '../data/simulaciones'
import { useSimulacion } from '../context/SimulacionContext'

const resultadoConfig = {
  excelente: {
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.25)',
    label: '🏆 ¡Excelente desempeño!',
    desc: 'El grupo tomó las mejores decisiones en cada situación. Están bien preparados para una emergencia real.',
  },
  aceptable: {
    color: '#f4a261',
    bg: 'rgba(244,162,97,0.08)',
    border: 'rgba(244,162,97,0.25)',
    label: '✅ Resultado aceptable',
    desc: 'El grupo llegó a un resultado seguro. Hay decisiones que, con práctica, pueden mejorar.',
  },
  critico: {
    color: '#e63946',
    bg: 'rgba(230,57,70,0.08)',
    border: 'rgba(230,57,70,0.25)',
    label: '⚠️ Situación de riesgo',
    desc: 'Algunas decisiones habrían generado situaciones peligrosas en una emergencia real. Este espacio de debate es clave para aprender.',
  },
}

export default function ResultadoPage() {
  const { tipo } = useParams()
  const navigate = useNavigate()
  const { sesion, reiniciar, persistirSesion, getEscena } = useSimulacion()
  const sim = simulaciones.find((s) => s.id === tipo)

  if (!sesion || !sim) {
    return (
      <div className="app-layout">
        <Navbar />
        <main className="escena-error">
          <span>📋</span>
          <h2>No hay simulación activa</h2>
          <p>Inicia una simulación para ver los resultados.</p>
          <button className="btn-volver" onClick={() => navigate('/simulaciones')}>← Ir a simulaciones</button>
        </main>
      </div>
    )
  }

  const cfg = resultadoConfig[sesion.resultadoFinal] || resultadoConfig.aceptable

  // Enriquecer decisiones: campos para UI + campos para historial
  const decisionesDetalladas = (sesion?.decisiones ?? []).map((d, i) => {
    const escenaData = getEscena(d.escenaId)
    const opcion = escenaData?.opciones?.find((o) => o.id === d.opcionId)
    return {
      numero: i + 1,
      situacionTitulo: escenaData?.titulo ?? `Situación ${i + 1}`,
      opcionTexto: d.opcionTexto,
      escenaId: d.escenaId,
      opcionId: d.opcionId,
      esCorrecta: opcion?.esCorrecta ?? true,
      feedback: opcion?.feedback ?? '',
    }
  })

  // Guardar en historial una sola vez al montar
  useEffect(() => {
    if (sesion && decisionesDetalladas.length > 0) persistirSesion(decisionesDetalladas)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalCorrectas = decisionesDetalladas.filter((d) => d.esCorrecta).length
  const totalDecisiones = decisionesDetalladas.length

  const handleReiniciar = () => {
    reiniciar()
    navigate('/simulaciones')
  }

  return (
    <div className="app-layout">
      <Navbar />
      <main className="resultado-page">

        {/* Encabezado */}
        <div className="resultado-header">
          <span>{sim.icon}</span>
          <div>
            <h1 className="resultado-titulo">Retroalimentación del simulacro</h1>
            <p className="resultado-subtitulo">{sim.nombre}</p>
          </div>
        </div>

        {/* Badge de resultado global */}
        <div
          className="resultado-badge-grande"
          style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}
        >
          <span className="resultado-badge-label">{cfg.label}</span>
          <p className="resultado-badge-desc">{cfg.desc}</p>
          {totalDecisiones > 0 && (
            <div className="resultado-score">
              <span style={{ color: cfg.color }}>{totalCorrectas}</span>
              <span className="score-sep">/</span>
              <span>{totalDecisiones}</span>
              <span className="score-label">decisiones acertadas</span>
            </div>
          )}
        </div>

        {/* Revisión por situación */}
        {decisionesDetalladas.length > 0 && (
          <div className="resultado-decisiones">
            <h2 className="decisiones-titulo">Revisión de cada situación</h2>
            <p className="decisiones-desc">Repasa con el grupo qué se decidió en cada momento y por qué.</p>
            <div className="decisiones-lista">
              {decisionesDetalladas.map((d) => (
                <div
                  key={d.numero}
                  className={`decision-card ${d.esCorrecta ? 'correcta' : 'mejorable'}`}
                >
                  <div className="decision-card-header">
                    <div className="decision-num-wrap">
                      <span className="decision-num">{d.numero}</span>
                    </div>
                    <div className="decision-meta">
                      <p className="decision-situacion">{d.situacionTitulo}</p>
                      <span className={`decision-badge ${d.esCorrecta ? 'badge-ok' : 'badge-mejora'}`}>
                        {d.esCorrecta ? '✓ Decisión acertada' : '↑ Se puede mejorar'}
                      </span>
                    </div>
                  </div>

                  <div className="decision-elegida">
                    <p className="elegida-label">Lo que el grupo decidió:</p>
                    <p className="elegida-texto">"{d.opcionTexto}"</p>
                  </div>

                  {d.feedback && (
                    <div className={`decision-feedback ${d.esCorrecta ? 'fb-ok' : 'fb-mejora'}`}>
                      <span className="fb-icon">{d.esCorrecta ? '💡' : '⚠️'}</span>
                      <p>{d.feedback}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Aviso SST */}
        <div className="sst-aviso">
          <span>📋</span>
          <p>
            <strong>Contenido provisional:</strong> Las explicaciones presentadas se basan en
            protocolos generales de Seguridad y Salud en el Trabajo (SST). El contenido definitivo
            está sujeto a revisión y aprobación por el área SST de la empresa.
          </p>
        </div>

        {/* Acciones */}
        <div className="resultado-acciones">
          <button className="btn-nuevo-sim" onClick={handleReiniciar}>
            🔄 Hacer otra simulación
          </button>
          <button className="btn-dashboard" onClick={() => navigate('/dashboard')}>
            ⊞ Volver al panel
          </button>
        </div>
      </main>
    </div>
  )
}
