import React from 'react';
import type { PassengerAnimationState } from '../../types';
import styles from './PassengerSystem.module.css';

interface PassengerSystemProps {
  animationState: PassengerAnimationState;
}

/** Datos de los sprites de pasajeros con sus colores y offsets de delay */
const PASSENGERS = [
  { id: 'p1', color: '#e74c3c', delay: 0    },
  { id: 'p2', color: '#3498db', delay: 0.12 },
  { id: 'p3', color: '#e67e22', delay: 0.24 },
] as const;

/**
 * PassengerSystem
 *
 * Sprites de pasajeros construidos en CSS pixel art.
 * Se renderizan únicamente cuando hay una animación activa (boarding/departing).
 *
 * - boarding: los pasajeros aparecen desde la derecha y entran al tren.
 * - departing: los pasajeros salen del tren hacia la derecha.
 */
export const PassengerSystem: React.FC<PassengerSystemProps> = ({
  animationState,
}) => {
  if (animationState === 'idle') return null;

  return (
    <div
      className={`${styles.container} ${styles[animationState]}`}
      aria-hidden="true"
    >
      {PASSENGERS.map((p) => (
        <div
          key={p.id}
          className={styles.passenger}
          style={
            { '--delay': `${p.delay}s`, '--pcolor': p.color } as React.CSSProperties
          }
        >
          {/* Cabeza */}
          <div
            className={styles.head}
            style={{ backgroundColor: p.color }}
          />
          {/* Cuerpo */}
          <div
            className={styles.body}
            style={{ backgroundColor: p.color }}
          />
          {/* Piernas */}
          <div className={styles.legs} />
        </div>
      ))}
    </div>
  );
};
