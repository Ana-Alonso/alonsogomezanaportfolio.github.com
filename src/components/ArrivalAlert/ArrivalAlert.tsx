import React, { useEffect } from 'react';
import { useJourney } from '../../context/JourneyContext';
import styles from './ArrivalAlert.module.css';

const AUTO_DISMISS_MS = 3800;

/**
 * ArrivalAlert
 *
 * Banner de "Nueva Parada" que aparece en la parte superior de la pantalla
 * cada vez que el scroll activa una nueva estación.
 * Se autodescarta tras AUTO_DISMISS_MS milisegundos.
 */
export const ArrivalAlert: React.FC = () => {
  const { showArrivalAlert, arrivalAlertText, dismissArrivalAlert } = useJourney();

  useEffect(() => {
    if (!showArrivalAlert) return;
    const timer = setTimeout(dismissArrivalAlert, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [showArrivalAlert, arrivalAlertText, dismissArrivalAlert]);

  if (!showArrivalAlert) return null;

  return (
    <output
      className={styles.alert}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className={styles.icon} aria-hidden="true">🚂</span>
      <span className={styles.text}>{arrivalAlertText}</span>
    </output>
  );
};
