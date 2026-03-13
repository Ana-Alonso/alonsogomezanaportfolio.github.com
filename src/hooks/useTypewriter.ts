import { useState, useEffect, useRef } from "react";

interface UseTypewriterOptions {
  /** Milisegundos entre cada carácter (default: 38ms) */
  speed?: number;
  /** Delay inicial antes de empezar a escribir (default: 300ms) */
  startDelay?: number;
}

interface UseTypewriterReturn {
  /** Texto revelado hasta el momento */
  displayedText: string;
  /** true cuando todos los caracteres han sido mostrados */
  isComplete: boolean;
  /** Reinicia el efecto al estado inicial */
  reset: () => void;
}

/**
 * useTypewriter
 *
 * Implementa el efecto de escritura carácter a carácter, estilo
 * diálogo RPG clásico. Se activa cuando `isActive` pasa a true.
 *
 * Uso:
 * ```ts
 * const { displayedText, isComplete } = useTypewriter(
 *   station.dialogContent,
 *   isDialogOpen
 * );
 * ```
 */
export function useTypewriter(
  text: string,
  isActive: boolean,
  options: UseTypewriterOptions = {},
): UseTypewriterReturn {
  const { speed = 38, startDelay = 300 } = options;

  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    indexRef.current = 0;
    setDisplayedText("");
    setIsComplete(false);
  };

  useEffect(() => {
    if (!isActive || !text) {
      // Si se cierra el diálogo, limpiamos para la próxima apertura
      reset();
      return;
    }

    // Reset siempre que cambie el texto (nueva estación)
    reset();

    const type = () => {
      indexRef.current += 1;
      setDisplayedText(text.slice(0, indexRef.current));

      if (indexRef.current < text.length) {
        timerRef.current = setTimeout(type, speed);
      } else {
        setIsComplete(true);
      }
    };

    timerRef.current = setTimeout(type, startDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isActive]);

  return { displayedText, isComplete, reset };
}
