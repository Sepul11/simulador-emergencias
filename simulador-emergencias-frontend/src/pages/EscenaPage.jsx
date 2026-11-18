import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { simulaciones } from '../data/simulaciones'
import { getEscenariosCustom, transformarParaSimulador } from '../utils/escenariosCustom'
import { useSimulacion } from '../context/SimulacionContext'

export default function EscenaPage() {
  const { tipo, escenaId } = useParams()
  const navigate = useNavigate()
  const { sesion, registrarDecision, setResultadoFinal, goBack, getEscena } = useSimulacion()
  const [seleccion, setSeleccion] = useState(null)
  const [confirmado, setConfirmado] = useState(false)
  const [presentacion, setPresentacion] = useState(false)

  // React Router reutiliza el mismo componente al cambiar params.
  // Este effect resetea el estado local cada vez que cambia la escena.
  useEffect(() => {
    setSeleccion(null)
    setConfirmado(false)
  }, [escenaId])

  const escena = getEscena(escenaId)
  // Look up sim in hardcoded list first, then custom scenarios
  const sim = simulaciones.find((s) => s.id === tipo)
    ?? (() => {
      const esc = getEscenariosCustom().find((e) => e.id === tipo)
      return esc ? transformarParaSimulador(esc).sim : null
    })()

  if (!escena || !sim) {
    return (
      <div className="app-layout">
        <Navbar />
        <main className="escena-error">
          <span>⚠️</span>
          <h2>Escena no encontrada</h2>
          <p>El identificador de escena no es válido.</p>
          <button className="btn-volver" onClick={() => navigate('/simulaciones')}>
            ← Volver a simulaciones
          </button>
        </main>
      </div>
    )
  }

  const puedeVolver = sesion?.historial && sesion.historial.length > 1

  const handleSeleccion = (opcion) => {
    if (confirmado) return
    setSeleccion(opcion)
  }

  const handleConfirmar = () => {
    if (!seleccion) return
    registrarDecision(escena.id, seleccion.id, seleccion.texto, seleccion.siguiente)
    setConfirmado(true)
    setTimeout(() => {
      navigate(`/simulacion/${tipo}/escena/${seleccion.siguiente}`)
    }, 500)
  }

  const handleBack = () => {
    const prevId = goBack()
    if (prevId) navigate(`/simulacion/${tipo}/escena/${prevId}`)
  }

  const handleVerResultado = () => {
    if (escena.resultado) setResultadoFinal(escena.resultado)
    navigate(`/simulacion/${tipo}/resultado`)
  }

  const progreso = Math.round((escena.paso / sim.totalEscenas) * 100)

  return (
    <div className={`app-layout${presentacion ? ' modo-presentacion' : ''}`}>
      <Navbar />
      <main className="escena-page">

        {/* Barra superior: contexto, progreso y controles */}
        <div className="escena-topbar" style={{ '--sim-color': sim.color }}>
          {/* Volver */}
          {puedeVolver && !escena.fin && (
            <button className="btn-topbar btn-back" onClick={handleBack} title="Escena anterior">
              ← Volver
            </button>
          )}

          <div className="escena-tipo">
            <span>{sim.icon}</span>
            <span>{sim.nombre}</span>
          </div>

          <div className="escena-progreso">
            <span className="progreso-label">Escena {escena.paso} de {sim.totalEscenas}</span>
            <div className="progreso-bar">
              <div className="progreso-fill" style={{ width: `${progreso}%`, background: sim.color }} />
            </div>
          </div>

          {/* Modo presentación */}
          <button
            className={`btn-topbar btn-presentacion-toggle ${presentacion ? 'activo' : ''}`}
            onClick={() => setPresentacion((p) => !p)}
            title={presentacion ? 'Desactivar modo proyector' : 'Activar modo proyector'}
          >
            {presentacion ? '🔍 Normal' : '📽️ Proyector'}
          </button>

          <button className="btn-abandonar" onClick={() => navigate('/simulaciones')}>
            ✕ Salir
          </button>
        </div>

        {/* Contenido de la escena */}
        <div className="escena-contenido">
          <div className="escena-card">

            {/* Cabecera */}
            <div className="escena-card-header" style={{ '--sim-color': sim.color, '--sim-bg': sim.colorBg }}>
              <span className="escena-sim-icon">{sim.icon}</span>
              <div>
                <p className="escena-numero">Escena {escena.paso}</p>
                <h1 className="escena-titulo">{escena.titulo}</h1>
              </div>
            </div>

            {/* Situación */}
            <div className="escena-situacion">
              <p className="situacion-label">📋 SITUACIÓN</p>
              <p className="situacion-texto">{escena.situacion}</p>
            </div>

            {/* Escena final */}
            {escena.fin ? (
              <div className="escena-fin">
                <div className={`fin-resultado resultado-${escena.resultado}`}>
                  {escena.resultado === 'excelente' && '🏆 ¡Excelente desempeño!'}
                  {escena.resultado === 'aceptable' && '✅ Resultado aceptable'}
                  {escena.resultado === 'critico' && '⚠️ Situación de riesgo'}
                </div>
                <div className="fin-mensaje">
                  <p className="fin-label">💡 Aprendizaje clave</p>
                  <p>{escena.mensaje}</p>
                </div>
                <div className="fin-acciones">
                  {puedeVolver && (
                    <button className="btn-fin-volver" onClick={handleBack}>
                      ← Revisar decisión anterior
                    </button>
                  )}
                  <button className="btn-resultado" onClick={handleVerResultado}>
                    Ver retroalimentación completa →
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Pregunta y opciones */}
                <div className="escena-pregunta">
                  <p className="pregunta-label">🎯 DECISIÓN DEL GRUPO</p>
                  <p className="pregunta-texto">{escena.pregunta}</p>
                </div>

                <div className="opciones-grid">
                  {escena.opciones.map((op, i) => (
                    <button
                      key={op.id}
                      id={`opcion-${op.id}`}
                      className={`opcion-btn ${seleccion?.id === op.id ? 'seleccionada' : ''} ${confirmado ? 'disabled' : ''}`}
                      onClick={() => handleSeleccion(op)}
                      disabled={confirmado}
                    >
                      <span className="opcion-letra">{String.fromCharCode(65 + i)}</span>
                      <span className="opcion-texto">{op.texto}</span>
                    </button>
                  ))}
                </div>

                {seleccion && !confirmado && (
                  <div className="confirmar-wrap">
                    <p className="confirmar-hint">
                      Opción seleccionada: <strong>{seleccion.texto}</strong>
                    </p>
                    <button id="btn-confirmar" className="btn-confirmar" onClick={handleConfirmar}>
                      ✓ Confirmar decisión del grupo
                    </button>
                  </div>
                )}

                {confirmado && (
                  <div className="confirmado-msg">
                    <span className="spinner" />
                    <span>Avanzando a la siguiente escena...</span>
                  </div>
                )}

                <p className="facilitar-nota">
                  💬 Presenta la situación en voz alta, da tiempo para debatir y luego confirma la opción acordada.
                </p>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
