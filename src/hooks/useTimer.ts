import { useEffect, useState } from 'react';

// Custom hook for a timer
export function useTimer(autoStart = false) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(autoStart);

  // Effect to handle the timer interval
  useEffect(() => {
    // Only set up interval
    if (!running) {
      return;
    }
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);

    // Cleanup function to clear interval
    return () => clearInterval(id);
  }, [running]);

  function start() {
    setRunning(true);
  }
  function stop() {
    setRunning(false);
  }
  function toggle() {
    setRunning((r) => !r);
  }
  function reset() {
    setSeconds(0);
  }

  // Return timer state and control functions
  return {
    seconds,
    running,
    start,
    stop,
    toggle,
    reset,
  };
}

// Format seconds into MM:SS string
export function formatTime(s: number): string {
  const m = Math.floor(s / 60)
    .toString()
    .padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');

  return `${m}:${sec}`;
}
