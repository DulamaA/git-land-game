import { useEffect, useState } from "react";

export function useTimer(autoStart = false) {
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(autoStart);

    useEffect(() => {
        if (!running) return;
        const id = setInterval(() => setSeconds((s) => s + 1), 1000);
        return () => clearInterval(id);
    }, [running]);

    function start() { setRunning(true); }
    function stop() { setRunning(false); }
    function toggle() { setRunning((r) => !r); }
    function reset() { setSeconds(0); }

    return { seconds, running, start, stop, toggle, reset };
}

export function formatTime(s: number): string {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
}