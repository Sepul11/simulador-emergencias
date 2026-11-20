export const simulaciones = [
  {
    id: 'sismo',
    nombre: 'Simulacro de Sismo',
    icon: '🌊',
    color: '#f4a261',
    colorBg: 'rgba(244,162,97,0.1)',
    colorBorder: 'rgba(244,162,97,0.25)',
    desc: 'Entrena la respuesta ante un terremoto: qué hacer durante el movimiento, cómo protegerse y cómo evacuar al finalizar.',
    duracion: '~15 min',
    totalEscenas: 4,
    primeraEscena: 'sismo-01',
  },
  {
    id: 'incendio',
    nombre: 'Simulacro de Incendio',
    icon: '🔥',
    color: '#e63946',
    colorBg: 'rgba(230,57,70,0.1)',
    colorBorder: 'rgba(230,57,70,0.25)',
    desc: 'Practica el protocolo de evacuación ante un incendio: activación de alarma, liderazgo del grupo y uso de rutas de salida.',
    duracion: '~15 min',
    totalEscenas: 4,
    primeraEscena: 'incendio-01',
  },
]

export const escenas = {

  // ════════════════ SISMO ════════════════
  'sismo-01': {
    id: 'sismo-01', tipo: 'sismo', paso: 1,
    titulo: '¡Alerta Sísmica!',
    situacion: 'El grupo está en la sala de capacitación cuando de repente el edificio comienza a temblar con fuerza. Los objetos caen de los estantes, las luces parpadean y la alarma sísmica se activa.',
    pregunta: '¿Cuál es la primera acción del grupo?',
    opciones: [
      {
        id: 'a',
        texto: 'Ponerse bajo el escritorio en posición de protección (cabeza cubierta, alejado de ventanas)',
        siguiente: 'sismo-02a',
        esCorrecta: true,
        feedback: 'Protegerse bajo una superficie sólida y cubrir la cabeza es la técnica recomendada mundialmente. Se conoce como "Agáchate, Cúbrete y Sujétate" y reduce significativamente el riesgo de lesiones por caída de objetos.',
      },
      {
        id: 'b',
        texto: 'Correr inmediatamente hacia la puerta o salida del edificio',
        siguiente: 'sismo-02b',
        esCorrecta: false,
        feedback: 'Moverse durante el sismo aumenta el riesgo de caídas y golpes con objetos en movimiento. Los marcos de las puertas no ofrecen protección especial en construcciones modernas.',
      },
      {
        id: 'c',
        texto: 'Asomarse por la ventana para evaluar qué está pasando afuera',
        siguiente: 'sismo-02b',
        esCorrecta: false,
        feedback: 'Las ventanas son zonas de alto riesgo durante un sismo por la posibilidad de rotura del vidrio y caída de objetos desde el exterior. Siempre alejarse de ellas.',
      },
    ],
  },

  'sismo-02a': {
    id: 'sismo-02a', tipo: 'sismo', paso: 2,
    titulo: 'Bajo cubierta — el sismo continúa',
    situacion: 'El grupo se protegió bajo los escritorios. El temblor dura 40 segundos más. Se escuchan crujidos pero la estructura resiste. El movimiento empieza a ceder lentamente.',
    pregunta: '¿Qué hace el grupo mientras espera que cese el sismo?',
    opciones: [
      {
        id: 'a',
        texto: 'Mantener la posición y esperar que el movimiento cese completamente antes de moverse',
        siguiente: 'sismo-03a',
        esCorrecta: true,
        feedback: 'Correcto. Mantener la posición de protección hasta que el sismo cese por completo evita lesiones innecesarias. Los movimientos secundarios (réplicas) son frecuentes y pueden sorprender a quienes se mueven prematuramente.',
      },
      {
        id: 'b',
        texto: 'Intentar salir corriendo hacia el pasillo aprovechando un momento de menor temblor',
        siguiente: 'sismo-03b',
        esCorrecta: false,
        feedback: 'Desplazarse durante un sismo activo es una de las principales causas de lesiones. Esperar en posición cubierta, aunque el temblor sea intermitente, siempre es más seguro que moverse.',
      },
    ],
  },

  'sismo-02b': {
    id: 'sismo-02b', tipo: 'sismo', paso: 2,
    titulo: 'Peligro — exposición durante el sismo',
    situacion: 'Al moverse durante el sismo, objetos caen cerca del grupo. Es difícil mantener el equilibrio. Una persona tropieza y cae. El temblor sigue siendo intenso.',
    pregunta: '¿Qué hace el grupo en este momento?',
    opciones: [
      {
        id: 'a',
        texto: 'Detenerse de inmediato y buscar refugio bajo el mueble más cercano',
        siguiente: 'sismo-03a',
        esCorrecta: true,
        feedback: 'Bien. Reaccionar rápido y buscar cubierta inmediata reduce el impacto de errores anteriores. La protección sigue siendo la prioridad mientras el sismo continúa, independientemente de dónde se encuentre el grupo.',
      },
      {
        id: 'b',
        texto: 'Seguir intentando llegar a la salida del edificio',
        siguiente: 'sismo-03b',
        esCorrecta: false,
        feedback: 'Continuar expuesto durante el sismo sin protección aumenta significativamente el riesgo de lesiones graves. Cuando el sismo está activo, la prioridad siempre es protegerse, no evacuar.',
      },
    ],
  },

  'sismo-03a': {
    id: 'sismo-03a', tipo: 'sismo', paso: 3,
    titulo: 'El sismo terminó — momento de evacuar',
    situacion: 'El movimiento cesó. No hay fuego visible ni estructuras caídas en la ruta asignada. El brigadista indica iniciar la evacuación ordenada hacia el punto de encuentro.',
    pregunta: '¿Cómo evacúa el grupo?',
    opciones: [
      {
        id: 'a',
        texto: 'Usar las escaleras, en fila, siguiendo la ruta señalizada con verde',
        siguiente: 'sismo-fin-bien',
        esCorrecta: true,
        feedback: 'Correcto. Las escaleras son la única vía segura post-sismo. Bajar en orden, por la derecha, siguiendo la señalización, garantiza una evacuación eficiente y sin accidentes.',
      },
      {
        id: 'b',
        texto: 'Usar el ascensor para bajar más rápido',
        siguiente: 'sismo-fin-ascensor',
        esCorrecta: false,
        feedback: 'Los ascensores nunca deben usarse durante ni después de un sismo. Un corte eléctrico o daño estructural puede dejarlos bloqueados entre pisos, creando una situación de riesgo adicional.',
      },
    ],
  },

  'sismo-03b': {
    id: 'sismo-03b', tipo: 'sismo', paso: 3,
    titulo: 'Lesión durante la evacuación',
    situacion: 'Al moverse durante el temblor, una persona se lesionó la rodilla. El sismo aún no ha cesado completamente. El pasillo tiene escombros menores.',
    pregunta: '¿Qué hace el facilitador?',
    opciones: [
      {
        id: 'a',
        texto: 'Detener al grupo, asistir al lesionado y esperar que cese el sismo antes de continuar',
        siguiente: 'sismo-fin-asistido',
        esCorrecta: true,
        feedback: 'Correcto. Atender al lesionado y esperar condiciones seguras es el protocolo adecuado. No se debe abandonar a ningún integrante del grupo, y continuar con un sismo activo solo aumenta el riesgo.',
      },
      {
        id: 'b',
        texto: 'Continuar la evacuación sin atender la lesión para salir más rápido',
        siguiente: 'sismo-fin-mal',
        esCorrecta: false,
        feedback: 'Abandonar a una persona lesionada va en contra de cualquier protocolo de emergencias. Además, forzar el movimiento de alguien herido sin valoración puede agravar la lesión.',
      },
    ],
  },

  'sismo-fin-bien': {
    id: 'sismo-fin-bien', tipo: 'sismo', paso: 4, fin: true, resultado: 'excelente',
    titulo: '¡Evacuación exitosa!',
    situacion: 'El grupo llegó ordenadamente al Punto de Encuentro A. El brigadista tomó lista y todos están presentes y en buen estado. El protocolo se cumplió correctamente de principio a fin.',
    pregunta: null, opciones: [],
    mensaje: 'El grupo tomó las decisiones correctas: protegerse durante el sismo, mantener la posición hasta que cesara, y evacuar por las escaleras siguiendo la ruta señalizada.',
  },
  'sismo-fin-ascensor': {
    id: 'sismo-fin-ascensor', tipo: 'sismo', paso: 4, fin: true, resultado: 'critico',
    titulo: 'Atrapados en el ascensor',
    situacion: 'El post-sismo cortó el suministro eléctrico. El ascensor se bloqueó entre pisos. El grupo quedó atrapado 2 horas hasta ser rescatado. Todos sobrevivieron, pero fue una situación completamente evitable.',
    pregunta: null, opciones: [],
    mensaje: 'Los ascensores nunca deben usarse durante ni después de un sismo. Siempre usar las escaleras para la evacuación.',
  },
  'sismo-fin-asistido': {
    id: 'sismo-fin-asistido', tipo: 'sismo', paso: 4, fin: true, resultado: 'aceptable',
    titulo: 'Evacuación con asistencia médica',
    situacion: 'El grupo llegó al punto de encuentro. La persona lesionada recibió atención de primeros auxilios. La evacuación fue más lenta de lo ideal, pero todos llegaron a salvo.',
    pregunta: null, opciones: [],
    mensaje: 'El resultado fue seguro, pero algunas decisiones iniciales aumentaron el riesgo. Se recomienda reforzar la importancia de protegerse ANTES de moverse durante el sismo.',
  },
  'sismo-fin-mal': {
    id: 'sismo-fin-mal', tipo: 'sismo', paso: 4, fin: true, resultado: 'critico',
    titulo: 'Resultado crítico',
    situacion: 'Varias personas resultaron con lesiones al moverse durante el sismo y no atender al herido. Los organismos de socorro debieron intervenir.',
    pregunta: null, opciones: [],
    mensaje: 'En una emergencia real, estas decisiones habrían tenido consecuencias graves. La regla es: protegerse PRIMERO, moverse DESPUÉS de que cese el sismo.',
  },

  // ════════════════ INCENDIO ════════════════
  'incendio-01': {
    id: 'incendio-01', tipo: 'incendio', paso: 1,
    titulo: '¡Humo detectado!',
    situacion: 'Estás facilitando la actividad cuando percibes olor a quemado. Al asomarte al pasillo, ves humo saliendo de la sala de servidores. La alarma automática aún NO se ha activado.',
    pregunta: '¿Cuál es la primera acción del facilitador?',
    opciones: [
      {
        id: 'a',
        texto: 'Activar manualmente el pulsador de alarma más cercano y alertar al grupo de inmediato',
        siguiente: 'incendio-02a',
        esCorrecta: true,
        feedback: 'Correcto. Activar la alarma es siempre el primer paso ante un incendio. Alerta a todo el edificio y pone en marcha el protocolo de evacuación. Cada segundo perdido permite que el fuego se propague.',
      },
      {
        id: 'b',
        texto: 'Intentar apagar el fuego con el extintor antes de alarmar al grupo',
        siguiente: 'incendio-02b',
        esCorrecta: false,
        feedback: 'Solo se debe intentar apagar un fuego incipiente (pequeño, recién iniciado) con extintor y si se tiene el entrenamiento. Si el fuego es de tamaño considerable, la prioridad es siempre alarmar y evacuar.',
      },
      {
        id: 'c',
        texto: 'Esperar a que la alarma automática se active sola para confirmar la emergencia',
        siguiente: 'incendio-02c',
        esCorrecta: false,
        feedback: 'Esperar confirmación automática en un incendio puede costar vidas. Los sistemas automáticos pueden fallar o demorar. Ante señales evidentes de humo o fuego, se debe actuar de inmediato.',
      },
    ],
  },

  'incendio-02a': {
    id: 'incendio-02a', tipo: 'incendio', paso: 2,
    titulo: 'Alarma activada — grupo reunido',
    situacion: 'La alarma está sonando. El grupo está atento. Dos trabajadores que estaban en el baño aún no se han reunido con el grupo.',
    pregunta: '¿Cómo procede el facilitador?',
    opciones: [
      {
        id: 'a',
        texto: 'Enviar a alguien a avisar a los que faltan, cerrar puertas del salón y liderar la evacuación completa',
        siguiente: 'incendio-03a',
        esCorrecta: true,
        feedback: 'Correcto. Verificar que todo el grupo esté presente y cerrar puertas al salir son acciones clave. Las puertas cerradas retardan la propagación del fuego y el humo, ganando tiempo valioso para la evacuación.',
      },
      {
        id: 'b',
        texto: 'Salir de inmediato con quien está presente sin esperar a los trabajadores faltantes',
        siguiente: 'incendio-03b',
        esCorrecta: false,
        feedback: 'Dejar personas atrás durante una evacuación puede resultar en víctimas. El facilitador es responsable de verificar que todo el grupo esté reunido antes de iniciar la salida.',
      },
    ],
  },

  'incendio-02b': {
    id: 'incendio-02b', tipo: 'incendio', paso: 2,
    titulo: 'El fuego creció',
    situacion: 'Al intentar usar el extintor, el fuego ya es demasiado grande. El extintor se agotó y el fuego sigue creciendo. El humo se espesa rápidamente.',
    pregunta: '¿Qué hace el facilitador ahora?',
    opciones: [
      {
        id: 'a',
        texto: 'Abandonar el extintor, activar la alarma de inmediato y evacuar al grupo por la ruta alternativa',
        siguiente: 'incendio-03c',
        esCorrecta: true,
        feedback: 'Correcto. Cuando el fuego supera la capacidad del extintor, la única decisión acertada es evacuar de inmediato. Reconocer el límite de lo que se puede controlar es parte del protocolo de seguridad.',
      },
      {
        id: 'b',
        texto: 'Buscar otro extintor para seguir intentando controlar el fuego',
        siguiente: 'incendio-fin-mal',
        esCorrecta: false,
        feedback: 'Un fuego grande con humo denso puede incapacitar a una persona en segundos. Nunca se debe anteponer el intento de extinción a la evacuación del grupo. Las vidas son la prioridad absoluta.',
      },
    ],
  },

  'incendio-02c': {
    id: 'incendio-02c', tipo: 'incendio', paso: 2,
    titulo: 'El fuego se propagó',
    situacion: 'Mientras esperaban, el fuego se extendió al pasillo. La alarma automática finalmente se activó. La ruta principal de evacuación está parcialmente bloqueada por humo.',
    pregunta: '¿Cómo reacciona el grupo?',
    opciones: [
      {
        id: 'a',
        texto: 'Usar la ruta de evacuación secundaria desplazándose cerca del piso para evitar el humo',
        siguiente: 'incendio-03c',
        esCorrecta: true,
        feedback: 'Correcto. Ante humo denso, la ruta alternativa es la decisión adecuada. El humo asciende, por lo que el aire cerca del piso es más limpio y permite respirar mejor durante la evacuación.',
      },
      {
        id: 'b',
        texto: 'Intentar atravesar el humo por la ruta principal que ya conocen',
        siguiente: 'incendio-fin-mal',
        esCorrecta: false,
        feedback: 'El humo es la principal causa de muerte en incendios. Atravesar zonas con humo denso sin equipo puede causar pérdida del conocimiento en 30-60 segundos. Siempre usar la ruta alternativa cuando la principal esté comprometida.',
      },
    ],
  },

  'incendio-03a': {
    id: 'incendio-03a', tipo: 'incendio', paso: 3,
    titulo: 'Evacuación organizada en marcha',
    situacion: 'Todo el grupo está reunido. Las puertas del salón están cerradas. El facilitador lidera la evacuación por la ruta norte. Se llega al punto de decisión: las escaleras.',
    pregunta: '¿Cómo baja el grupo?',
    opciones: [
      {
        id: 'a',
        texto: 'Bajar por las escaleras en fila, sin correr, con la mano en la pared para sentir calor',
        siguiente: 'incendio-fin-bien',
        esCorrecta: true,
        feedback: 'Correcto. Las escaleras son la vía correcta durante un incendio. Bajar ordenadamente con la mano en la pared permite detectar calor y cambiar de ruta si es necesario. No correr evita caídas y permite mayor control.',
      },
      {
        id: 'b',
        texto: 'Usar el ascensor para bajar más rápido y llegar antes al punto de encuentro',
        siguiente: 'incendio-fin-ascensor',
        esCorrecta: false,
        feedback: 'Los ascensores jamás deben usarse durante un incendio. El calor puede deformar los rieles, el sistema eléctrico falla y el humo se acumula en la cabina. Es una de las reglas más importantes en evacuación por incendio.',
      },
    ],
  },

  'incendio-03b': {
    id: 'incendio-03b', tipo: 'incendio', paso: 3,
    titulo: 'Grupo incompleto en el punto de encuentro',
    situacion: 'El facilitador llegó con parte del grupo. Los trabajadores faltantes lograron salir solos pero con pánico. En el punto de encuentro hay confusión.',
    pregunta: '¿Qué hace el facilitador al llegar?',
    opciones: [
      {
        id: 'a',
        texto: 'Tomar lista, reportar al brigadista e identificar personas faltantes de forma organizada',
        siguiente: 'incendio-fin-asistido',
        esCorrecta: true,
        feedback: 'Correcto. Tomar lista y reportar al brigadista es el procedimiento establecido en el punto de encuentro. Permite identificar quién falta y coordinar el rescate con los bomberos si es necesario.',
      },
      {
        id: 'b',
        texto: 'Regresar al edificio en llamas a buscar a los trabajadores que faltaban',
        siguiente: 'incendio-fin-mal',
        esCorrecta: false,
        feedback: 'Regresar a un edificio en llamas sin equipo ni entrenamiento puede costar la vida. La búsqueda de personas atrapadas es responsabilidad exclusiva de los bomberos. El facilitador debe permanecer en el punto de encuentro.',
      },
    ],
  },

  'incendio-03c': {
    id: 'incendio-03c', tipo: 'incendio', paso: 3,
    titulo: 'Ruta alternativa en uso',
    situacion: 'El grupo se desplaza por el pasillo sur. Se llega a la escalera de emergencia exterior. Algunos trabajadores quieren volver por sus pertenencias.',
    pregunta: '¿Cómo procede el grupo?',
    opciones: [
      {
        id: 'a',
        texto: 'Bajar ordenadamente por la escalera exterior hacia la cancha (punto B). Las pertenencias no importan.',
        siguiente: 'incendio-fin-asistido',
        esCorrecta: true,
        feedback: 'Correcto. Ninguna pertenencia tiene valor frente a una vida. Continuar la evacuación sin detenerse por objetos es la decisión correcta siempre. Los objetos pueden reemplazarse, una vida no.',
      },
      {
        id: 'b',
        texto: 'Dejar que quienes quieran regresen al piso por sus pertenencias',
        siguiente: 'incendio-fin-mal',
        esCorrecta: false,
        feedback: 'Permitir que personas regresen durante una evacuación es una de las decisiones más peligrosas. El fuego puede expandirse rápidamente. El facilitador tiene la autoridad y responsabilidad de mantener al grupo unido y en movimiento.',
      },
    ],
  },

  'incendio-fin-bien': {
    id: 'incendio-fin-bien', tipo: 'incendio', paso: 4, fin: true, resultado: 'excelente',
    titulo: '¡Evacuación perfecta!',
    situacion: 'Todo el grupo llegó al punto de encuentro B en 4 minutos. El brigadista verificó la lista y todos están presentes. Los bomberos tomaron control del incendio.',
    pregunta: null, opciones: [],
    mensaje: 'Excelente: alarma inmediata, grupo completo, puertas cerradas para contener el fuego, escaleras usadas correctamente. Este es exactamente el comportamiento esperado en una emergencia real.',
  },
  'incendio-fin-ascensor': {
    id: 'incendio-fin-ascensor', tipo: 'incendio', paso: 4, fin: true, resultado: 'critico',
    titulo: 'Atrapados en el ascensor',
    situacion: 'El incendio cortó el suministro eléctrico. El ascensor se detuvo entre pisos. El humo comenzó a filtrarse dentro. Los bomberos rescataron al grupo tras 45 minutos.',
    pregunta: null, opciones: [],
    mensaje: 'Los ascensores NUNCA deben usarse durante un incendio. El calor puede deformar los rieles, el sistema eléctrico falla y el humo se acumula en la cabina.',
  },
  'incendio-fin-asistido': {
    id: 'incendio-fin-asistido', tipo: 'incendio', paso: 4, fin: true, resultado: 'aceptable',
    titulo: 'Evacuación lograda con complicaciones',
    situacion: 'El grupo llegó al punto de encuentro. La evacuación fue exitosa aunque con complicaciones en el proceso. El brigadista verificó la lista con apoyo del facilitador.',
    pregunta: null, opciones: [],
    mensaje: 'El resultado fue seguro, pero las decisiones iniciales generaron complicaciones. Se recomienda repasar el protocolo completo, especialmente la verificación del grupo antes de salir.',
  },
  'incendio-fin-mal': {
    id: 'incendio-fin-mal', tipo: 'incendio', paso: 4, fin: true, resultado: 'critico',
    titulo: 'Situación de alto riesgo',
    situacion: 'Las decisiones tomadas pusieron al grupo en situación de riesgo grave. Los organismos de socorro tuvieron que intervenir para completar la evacuación.',
    pregunta: null, opciones: [],
    mensaje: 'En una emergencia real, estas decisiones habrían tenido consecuencias graves. Es fundamental: activar alarma PRIMERO, no volver al edificio, no usar ascensores.',
  },
}
