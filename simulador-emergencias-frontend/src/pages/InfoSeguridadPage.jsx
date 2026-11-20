import { useState } from 'react'
import Navbar from '../components/Navbar'
import { categorias } from '../data/infoSeguridad'

export default function InfoSeguridadPage() {
  const [categoriaActiva, setCategoriaActiva] = useState(categorias[0].id)
  const categoria = categorias.find((c) => c.id === categoriaActiva)

  return (
    <div className="app-layout">
      <Navbar />
      <main className="info-page">
        {/* Page header */}
        <div className="info-header">
          <div>
            <h1 className="info-title">Información de Seguridad</h1>
            <p className="info-subtitle">
              Consulta el material de seguridad antes de iniciar la simulación
            </p>
          </div>
          <div className="provisional-badge">
            <span>⚠️</span>
            <span>PROVISIONAL — Pendiente aprobación SST</span>
          </div>
        </div>

        <div className="info-layout">
          {/* Sidebar */}
          <nav className="info-sidebar" aria-label="Categorías de seguridad">
            {categorias.map((cat) => (
              <button
                key={cat.id}
                id={`cat-${cat.id}`}
                className={`sidebar-btn ${categoriaActiva === cat.id ? 'active' : ''}`}
                onClick={() => setCategoriaActiva(cat.id)}
                aria-current={categoriaActiva === cat.id ? 'page' : undefined}
              >
                <span className="sidebar-icon">{cat.icon}</span>
                <span className="sidebar-label">{cat.nombre}</span>
                {categoriaActiva === cat.id && (
                  <span className="sidebar-arrow">›</span>
                )}
              </button>
            ))}
          </nav>

          {/* Content panel */}
          <div className="info-content" key={categoriaActiva}>
            <div className="content-heading">
              <span className="content-heading-icon">{categoria.icon}</span>
              <div>
                <h2 className="content-title">{categoria.nombre}</h2>
                <p className="content-provisional">
                  📋 Contenido provisional — sujeto a revisión por el área SST de la empresa
                </p>
              </div>
            </div>

            <div className="secciones">
              {categoria.secciones.map((seccion, i) => (
                <article key={i} className="seccion-card">
                  <h3 className="seccion-titulo">{seccion.titulo}</h3>
                  <p className="seccion-texto">{seccion.texto}</p>
                  {seccion.puntos && (
                    <ul className="seccion-lista">
                      {seccion.puntos.map((punto, j) => (
                        <li key={j} className="seccion-item">
                          <span className="item-dot" />
                          <span>{punto}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>

            <div className="content-footer">
              <span>🏢 SOLUTIONS S.A.S.</span>
              <span className="dot">·</span>
              <span>Material sujeto a aprobación del área SST</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
