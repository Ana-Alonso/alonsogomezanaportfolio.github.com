import React, { useState, useEffect } from 'react';
import { useJourney } from '../../context/JourneyContext';
import { STATIONS } from '../../constants/stations';
import styles from './Navigation.module.css';

/** Reloj interno que se actualiza cada minuto */
function useClock(): string {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

/**
 * Navigation
 *
 * Panel lateral con diseño de tablón de salidas de estación ferroviaria.
 * Permanece fijo a la derecha durante el scroll.
 * Pulsar una fila hace scroll suave a esa sección.
 */
export const Navigation: React.FC = () => {
  const { activeStationId } = useJourney();
  const time = useClock();

  const scrollToStation = (id: string) => {
    const el = document.getElementById(`station-${id}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={styles.panel} aria-label="Navegación — Panel de salidas">

      {/* ── Cabecera del tablón ── */}
      <div className={styles.header}>
        <span className={styles.headerLabel}>SALIDAS</span>
        <time className={styles.clock} aria-label="Hora actual">{time}</time>
      </div>

      {/* ── Columnas: etiquetas ── */}
      <div className={styles.colHeaders} aria-hidden="true">
        <span>VÍA</span>
        <span>DESTINO</span>
        <span>ANDÉN</span>
      </div>

      {/* ── Filas de destino ── */}
      <ul className={styles.list} role="list">
        {STATIONS.map((station) => {
          const isActive = activeStationId === station.id;
          return (
            <li key={station.id} role="listitem">
              <button
                className={`${styles.row} ${isActive ? styles.rowActive : ''}`}
                onClick={() => scrollToStation(station.id)}
                aria-label={`Ir a la sección ${station.name}`}
                aria-current={isActive ? 'location' : undefined}
              >
                <span className={styles.code}>{station.platformCode}</span>
                <span className={styles.destination}>
                  {station.name.toUpperCase()}
                </span>
                <span className={styles.platform}>
                  {station.platform.replace('Andén ', '')}
                </span>
                {isActive && (
                  <span className={styles.activeMarker} aria-hidden="true">◀</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* ── Pie con mensaje decorativo ── */}
      <div className={styles.footer} aria-hidden="true">
        <span className={styles.footerText}>◈ EN RUTA ◈</span>
      </div>
    </nav>
  );
};
