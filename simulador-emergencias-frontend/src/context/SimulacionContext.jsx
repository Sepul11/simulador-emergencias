import { createContext, useContext, useState } from 'react'
import { guardarEnHistorial } from '../utils/historial'
import { escenas as escenariosHardcoded } from '../data/simulaciones'

const SimulacionContext = createContext(null)

export function SimulacionProvider({ children }) {
  const [sesion, setSesion] = useState(null)
  // Mapa de escenas custom cargadas al iniciar una simulación custom
  const [customScenesMap, setCustomScenesMap] = useState({})

  const iniciarSimulacion = (tipo, primeraEscena, escenesMap = null) => {
    if (escenesMap) setCustomScenesMap(escenesMap)
    else setCustomScenesMap({})
    setSesion({ tipo, decisiones: [], historial: [primeraEscena], resultadoFinal: null })
  }

  const registrarDecision = (escenaId, opcionId, opcionTexto, nextEscenaId) => {
    setSesion((prev) => ({
      ...prev,
      decisiones: [...prev.decisiones, { escenaId, opcionId, opcionTexto }],
      historial: [...(prev.historial ?? []), nextEscenaId],
    }))
  }

  const setResultadoFinal = (resultado) => {
    setSesion((prev) => ({ ...prev, resultadoFinal: resultado }))
  }

  // Guarda la sesión en el historial (llamado desde ResultadoPage con las decisiones enriquecidas)
  const persistirSesion = (decisionesDetalladas) => {
    if (!sesion) return
    guardarEnHistorial(sesion, decisionesDetalladas)
  }

  const goBack = () => {
    if (!sesion?.historial || sesion.historial.length <= 1) return null
    const newHistorial = sesion.historial.slice(0, -1)
    const newDecisiones = sesion.decisiones.slice(0, -1)
    const prevEscenaId = newHistorial[newHistorial.length - 1]
    setSesion((prev) => ({ ...prev, historial: newHistorial, decisiones: newDecisiones }))
    return prevEscenaId
  }

  // Busca una escena primero en el mapa custom, luego en el hardcodeado
  const getEscena = (escenaId) => customScenesMap[escenaId] ?? escenariosHardcoded[escenaId] ?? null

  const reiniciar = () => {
    setSesion(null)
    setCustomScenesMap({})
  }

  return (
    <SimulacionContext.Provider
      value={{ sesion, iniciarSimulacion, registrarDecision, setResultadoFinal, persistirSesion, goBack, reiniciar, getEscena, customScenesMap }}
    >
      {children}
    </SimulacionContext.Provider>
  )
}

export function useSimulacion() {
  return useContext(SimulacionContext)
}
