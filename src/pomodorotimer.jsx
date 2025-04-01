import { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [customHours, setCustomHours] = useState("");
  const [customMinutes, setCustomMinutes] = useState("");
  const [customSeconds, setCustomSeconds] = useState("");

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const updateTotalTime = () => {
    const totalSeconds = (parseInt(customHours) || 0) * 3600 + (parseInt(customMinutes) || 0) * 60 + (parseInt(customSeconds) || 0);
    setTimeLeft(totalSeconds);
  };

  const handleStartPause = () => {
    if (!isRunning) {
      updateTotalTime();
    }
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    updateTotalTime();
  };

  return (
    <div className="timer-container">
      <div className="inputs">
        <input 
          type="number" 
          value={customHours} 
          onChange={(e) => setCustomHours(e.target.value)} 
          placeholder="HH"
        />
        <input 
          type="number" 
          value={customMinutes} 
          onChange={(e) => setCustomMinutes(e.target.value)} 
          placeholder="MM"
        />
        <input 
          type="number" 
          value={customSeconds} 
          onChange={(e) => setCustomSeconds(e.target.value)} 
          placeholder="SS"
        />
        <button onClick={updateTotalTime}>Set Time</button>
      </div>
      <div className="time-display">{timeLeft !== null ? formatTime(timeLeft) : "--:--:--"}</div>
      <div className="controls">
        <button onClick={handleStartPause}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
