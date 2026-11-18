import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getHistorial, limpiarHistorial } from '../utils/historial'
import { simulaciones } from '../data/simulaciones'

function porcentaje(valor, total) {
  if (!total) return 0
  return Math.round((valor / total) * 100)
}

export default function EstadisticasPage() {
  const navigate = useNavigate()
  const [historial, setHistorial] = useState([])
  const [filtro, setFiltro] = useState('todos')

  useEffect(() => { setHistorial(getHistorial()) }, [])

  const filtrado = filtro === 'todos' ? historial : historial.filter((h) => h.tipo === filtro)
  const total = filtrado.length

  const porResultado = {
    excelente: filtrado.filter((h) => h.resultado === 'excelente').length,
    aceptable: filtrado.filter((h) => h.resultado === 'aceptable').length,
    critico: filtrado.filter((h) => h.resultado === 'critico').length,
  }

  const pctExcelente = porcentaje(porResultado.excelente, total)
  const pctAceptable = porcentaje(porResultado.aceptable, total)
  const pctCritico = porcentaje(porResultado.critico, total)

  // Decisión más fallida: contar opciones incorrectas por texto
  const fallidas = {}
  filtrado.forEach((s) => {
    s.decisiones?.forEach((d) => {
      if (!d.esCorrecta) {
        const k = d.opcionTexto?.slice(0, 60) ?? 'Desconocido'
        fallidas[k] = (fallidas[k] ?? 0) + 1
      }
    })
  })
  const topFallida = Object.entries(fallidas).sort((a, b) => b[1] - a[1])[0]

  // Precisión media
  const precisionMedia = total === 0 ? null
    : Math.round(filtrado.reduce((acc, s) => acc + porcentaje(s.correctas ?? 0, s.totalDecisiones || 1), 0) / total)

  // Por tipo
  const porTipo = simulaciones.map((s) => ({
    ...s,
    cuenta: historial.filter((h) => h.tipo === s.id).length,
  }))

  // Sesiones recientes (últimas 8)
  const recientes = filtrado.slice(0, 8)

  const handleLimpiar = () => {
    if (window.confirm('¿Eliminar todo el historial de simulacros? Esta acción no se puede deshacer.')) {
      limpiarHistorial()
      setHistorial([])
    }
  }

  const resultadoCfg = {
    excelente: { label: '🏆 Excelente', color: '#22c55e' },
    aceptable:  { label: '✅ Aceptable', color: '#f4a261' },
    critico:    { label: '⚠️ Riesgo',    color: '#e63946' },
  }

  return (
    <div className="app-layout">
      <Navbar />
      <main className="stats-page">

        {/* Encabezado */}
        <div className="stats-header">
          <div>
            <h1 className="stats-titulo">Estadísticas de simulacros</h1>
            <p className="stats-subtitulo">Seguimiento histórico de sesiones y resultados</p>
          </div>
          <div className="stats-acciones">
            <button className="btn-filtro" onClick={() => navigate('/simulaciones')}>+ Nueva sesión</button>
            {historial.length > 0 && (
              <button className="btn-limpiar" onClick={handleLimpiar}>Limpiar historial</button>
            )}
          </div>
        </div>

        {total === 0 && historial.length === 0 ? (
          <div className="stats-empty">
            <span>📊</span>
            <h2>Todavía no hay datos</h2>
            <p>Cuando completes simulacros, aquí verás el historial, los resultados y las tendencias de tu grupo.</p>
            <button className="btn-filtro" onClick={() => navigate('/simulaciones')}>Ir a simulaciones →</button>
          </div>
        ) : (
          <>
            {/* Filtros */}
            <div className="stats-filtros">
              <button className={`filtro-btn ${filtro === 'todos' ? 'activo' : ''}`} onClick={() => setFiltro('todos')}>
                Todos ({historial.length})
              </button>
              {porTipo.map((s) => (
                <button key={s.id} className={`filtro-btn ${filtro === s.id ? 'activo' : ''}`} onClick={() => setFiltro(s.id)}>
                  {s.icon} {s.nombre.replace('Simulacro de ', '')} ({s.cuenta})
                </button>
              ))}
            </div>

            {/* KPIs */}
            <div className="stats-kpis">
              <div className="kpi-card">
                <span className="kpi-num">{total}</span>
                <span className="kpi-label">Simulacros completados</span>
              </div>
              <div className="kpi-card">
                <span className="kpi-num" style={{ color: '#22c55e' }}>{porResultado.excelente}</span>
                <span className="kpi-label">Resultados excelentes</span>
              </div>
              <div className="kpi-card">
                <span className="kpi-num" style={{ color: '#f4a261' }}>{precisionMedia ?? '—'}%</span>
                <span className="kpi-label">Precisión media del grupo</span>
              </div>
              <div className="kpi-card">
                <span className="kpi-num" style={{ color: '#e63946' }}>{porResultado.critico}</span>
                <span className="kpi-label">Resultados de riesgo</span>
              </div>
            </div>

            <div className="stats-row">
              {/* Gráfica de resultados */}
              <div className="stats-card stats-pie-card">
                <h2 className="stats-card-titulo">Distribución de resultados</h2>
                {total > 0 ? (
                  <div className="pie-wrap">
                    <div
                      className="pie-chart"
                      style={{
                        background: `conic-gradient(
                          #22c55e 0% ${pctExcelente}%,
                          #f4a261 ${pctExcelente}% ${pctExcelente + pctAceptable}%,
                          #e63946 ${pctExcelente + pctAceptable}% 100%
                        )`,
                      }}
                    />
                    <div className="pie-legend">
                      {Object.entries(porResultado).map(([k, v]) => (
                        <div key={k} className="legend-item">
                          <span className="legend-dot" style={{ background: resultadoCfg[k]?.color }} />
                          <span className="legend-label">{resultadoCfg[k]?.label}</span>
                          <span className="legend-val">{v} <span className="legend-pct">({porcentaje(v, total)}%)</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : <p className="no-data">Sin datos para este filtro</p>}
              </div>

              {/* Barras por tipo */}
              <div className="stats-card stats-tipos-card">
                <h2 className="stats-card-titulo">Por tipo de emergencia</h2>
                <div className="tipos-bars">
                  {porTipo.map((s) => (
                    <div key={s.id} className="tipo-bar-row">
                      <div className="tipo-bar-label">
                        <span>{s.icon}</span>
                        <span>{s.nombre.replace('Simulacro de ', '')}</span>
                        <span className="tipo-bar-count">{s.cuenta}</span>
                      </div>
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{
                            width: historial.length ? `${porcentaje(s.cuenta, historial.length)}%` : '0%',
                            background: s.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {topFallida && (
                  <div className="top-fallida">
                    <p className="fallida-titulo">⚠️ Decisión más fallida</p>
                    <p className="fallida-texto">"{topFallida[0]}..."</p>
                    <span className="fallida-count">Falló {topFallida[1]} {topFallida[1] === 1 ? 'vez' : 'veces'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Sesiones recientes */}
            {recientes.length > 0 && (
              <div className="stats-card">
                <h2 className="stats-card-titulo">Sesiones recientes</h2>
                <div className="sessions-list">
                  {recientes.map((s) => {
                    const sim = simulaciones.find((x) => x.id === s.tipo)
                    const cfg = resultadoCfg[s.resultado] ?? resultadoCfg.aceptable
                    const pct = porcentaje(s.correctas ?? 0, s.totalDecisiones || 1)
                    const fecha = new Date(s.fecha)
                    return (
                      <div key={s.id} className="session-item">
                        <span className="session-icon">{sim?.icon ?? '⚡'}</span>
                        <div className="session-info">
                          <p className="session-nombre">{sim?.nombre ?? s.tipo}</p>
                          <p className="session-fecha">{fecha.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                        </div>
                        <div className="session-pct">{pct}%</div>
                        <span className="session-resultado" style={{ color: cfg.color }}>{cfg.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
