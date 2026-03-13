import React from 'react';
import type { PassengerAnimationState } from '../../types';
import styles from './Train.module.css';
import trainSprite from '../../assets/train.png';

interface TrainProps {
  passengerAnimation: PassengerAnimationState;
}

/**
 * Train
 *
 * Sprite del tren construido en CSS pixel art.
 * Permanece fijo en la parte inferior de la pantalla durante todo el viaje.
 * La animación de vibración simula el movimiento continuo.
 * Al hacer boarding/departing, el tren reacciona visualmente.
 */
export const Train: React.FC<TrainProps> = ({ passengerAnimation }) => {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      {/* ── Vías del tren ── */}
      <div className={styles.tracks}>
        <div className={styles.rails}>
          <div className={styles.rail} />
          <div className={styles.rail} />
        </div>

        <div className={styles.sleepers}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className={styles.sleeper} />
          ))}
        </div>
      </div>

      {/* ── Composición del tren ── */}
      <div className={styles.trainComposition}>
        <div
          className={`${styles.spriteMotion} ${
            passengerAnimation !== 'idle' ? styles[`anim--${passengerAnimation}`] : ''
          }`}
        >
          <img
            src={trainSprite}
            alt=""
            aria-hidden="true"
            className={styles.trainSprite}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};
