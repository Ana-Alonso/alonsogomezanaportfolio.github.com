import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useRef,
} from 'react';
import type {
  JourneyState,
  JourneyContextType,
  JourneyAction,
  PassengerAnimationState,
} from '../types';

// ── Estado inicial ────────────────────────────────────────────────
const initialState: JourneyState = {
  isJourneyStarted:  false,
  activeStationId:   null,
  isDialogOpen:      false,
  dialogStationId:   null,
  showArrivalAlert:  false,
  arrivalAlertText:  '',
  passengerAnimation: 'idle',
};

// ── Reducer puro ──────────────────────────────────────────────────
function journeyReducer(state: JourneyState, action: JourneyAction): JourneyState {
  switch (action.type) {
    case 'START_JOURNEY':
      return { ...state, isJourneyStarted: true };

    case 'SET_ACTIVE_STATION':
      return { ...state, activeStationId: action.payload };

    case 'OPEN_DIALOG':
      return { ...state, isDialogOpen: true, dialogStationId: action.payload };

    case 'CLOSE_DIALOG':
      return { ...state, isDialogOpen: false, dialogStationId: null };

    case 'SHOW_ARRIVAL_ALERT':
      return { ...state, showArrivalAlert: true, arrivalAlertText: action.payload };

    case 'DISMISS_ARRIVAL_ALERT':
      return { ...state, showArrivalAlert: false, arrivalAlertText: '' };

    case 'SET_PASSENGER_ANIMATION':
      return { ...state, passengerAnimation: action.payload };

    default:
      return state;
  }
}

// ── Contexto ──────────────────────────────────────────────────────
const JourneyContext = createContext<JourneyContextType | null>(null);

// ── Provider ──────────────────────────────────────────────────────
export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(journeyReducer, initialState);

  // Timer para resetear passengerAnimation a 'idle'
  const passengerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Acciones ─────────────────────────────────────────────────

  const startJourney = useCallback(() => {
    dispatch({ type: 'START_JOURNEY' });
  }, []);

  const setActiveStation = useCallback((id: string | null) => {
    dispatch({ type: 'SET_ACTIVE_STATION', payload: id });
  }, []);

  const openDialog = useCallback((stationId: string) => {
    dispatch({ type: 'OPEN_DIALOG', payload: stationId });
  }, []);

  const closeDialog = useCallback(() => {
    dispatch({ type: 'CLOSE_DIALOG' });
  }, []);

  const triggerArrivalAlert = useCallback((text: string) => {
    dispatch({ type: 'SHOW_ARRIVAL_ALERT', payload: text });
  }, []);

  const dismissArrivalAlert = useCallback(() => {
    dispatch({ type: 'DISMISS_ARRIVAL_ALERT' });
  }, []);

  const triggerPassengerAnimation = useCallback(
    (type: PassengerAnimationState) => {
      if (passengerTimerRef.current) clearTimeout(passengerTimerRef.current);

      dispatch({ type: 'SET_PASSENGER_ANIMATION', payload: type });

      // Vuelve a 'idle' tras 2 segundos (duración de la animación CSS)
      passengerTimerRef.current = setTimeout(() => {
        dispatch({ type: 'SET_PASSENGER_ANIMATION', payload: 'idle' });
      }, 2000);
    },
    []
  );

  const value: JourneyContextType = {
    ...state,
    startJourney,
    setActiveStation,
    openDialog,
    closeDialog,
    triggerArrivalAlert,
    dismissArrivalAlert,
    triggerPassengerAnimation,
  };

  return (
    <JourneyContext.Provider value={value}>
      {children}
    </JourneyContext.Provider>
  );
}

// ── Hook de consumo ───────────────────────────────────────────────
/**
 * Accede al estado y las acciones del viaje.
 * Solo funciona dentro de un árbol envuelto por <JourneyProvider>.
 */
export function useJourney(): JourneyContextType {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error('useJourney debe usarse dentro de <JourneyProvider>');
  }
  return context;
}
