import React, { useCallback } from 'react';
import { useJourney }          from './context/JourneyContext';
import { useScrollDetection }  from './hooks/useScrollDetection';
import { STATIONS, STATIONS_MAP } from './constants/stations';

import { Ticket }          from './components/Ticket/Ticket';
import { Train }           from './components/Train/Train';
import { Navigation }      from './components/Navigation/Navigation';
import { Station }         from './components/Station/Station';
import { RailwayCard }     from './components/RailwayCard/RailwayCard';
import { PassengerSystem } from './components/PassengerSystem/PassengerSystem';
import { ArrivalAlert }    from './components/ArrivalAlert/ArrivalAlert';

import styles from './App.module.css';

/**
 * App
 *
 * Raíz de la SPA. Gestiona dos estados:
 *
 *  1. Pantalla de bienvenida → muestra <Ticket /> a pantalla completa.
 *  2. Experiencia de viaje   → tren fijo + scroll con estaciones.
 *
 * El hook useScrollDetection conecta el DOM con el estado del contexto.
 */
const App: React.FC = () => {
  const {
    isJourneyStarted,
    passengerAnimation,
    setActiveStation,
    triggerArrivalAlert,
  } = useJourney();

  /**
   * Callback del IntersectionObserver: se llama cuando una estación
   * entra en la zona activa del viewport.
   */
  const handleStationActive = useCallback(
    (id: string) => {
      setActiveStation(id);
      const station = STATIONS_MAP.get(id);
      if (station) {
        triggerArrivalAlert(station.arrivalAlert);
      }
    },
    [setActiveStation, triggerArrivalAlert]
  );

  const { registerSection } = useScrollDetection(handleStationActive);

  // ── Pantalla de bienvenida ──────────────────────────────────
  if (!isJourneyStarted) {
    return <Ticket />;
  }

  // ── Experiencia principal ───────────────────────────────────
  return (
    <div className={styles.app}>

      {/* Notificación "Nueva Parada" (top, fixed) */}
      <ArrivalAlert />

      {/* Panel de navegación ferroviaria (right, fixed) */}
      <Navigation />

      {/* Sprite del tren (bottom-center, fixed) */}
      <Train passengerAnimation={passengerAnimation} />

      {/* Pasajeros animados (sobre el tren, fixed) */}
      <PassengerSystem animationState={passengerAnimation} />

      {/* Contenedor de scroll: las 4 estaciones/secciones */}
      <main className={styles.main} aria-label="Contenido del portfolio">
        {STATIONS.map((station) => (
          <Station
            key={station.id}
            station={station}
            registerSection={registerSection}
          />
        ))}
      </main>

      {/* Diálogo RPG — overlay global, fuera del flow principal */}
      <RailwayCard />
    </div>
  );
};

export default App;
