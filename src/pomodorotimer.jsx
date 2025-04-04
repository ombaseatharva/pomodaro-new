import { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Default 25 min
  const [isRunning, setIsRunning] = useState(false);
  const [customHours, setCustomHours] = useState("00");
  const [customMinutes, setCustomMinutes] = useState("25");
  const [customSeconds, setCustomSeconds] = useState("00");

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      playAlarm(); // Play alarm when time ends
      alert("Time's up! Take a break."); 
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const playAlarm = () => {
    const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
    audio.play();
  };

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
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60); // Reset to 25:00
  };

  return (
    <div className="timer-container">
      <h2>⏳ Stay Focused, Stay Productive!</h2>
      <div className="input-section">
        <input  type="number" value={customHours} onChange={(e) => setCustomHours(e.target.value)} placeholder="HH" />
        <input type="number" value={customMinutes} onChange={(e) => setCustomMinutes(e.target.value)} placeholder="MM" />
        <input type="number" value={customSeconds} onChange={(e) => setCustomSeconds(e.target.value)} placeholder="SS" />
      </div>
      <button className="set-time-btn" onClick={updateTotalTime}>Set Time</button>

      <div className="time-display">{formatTime(timeLeft)}</div>
      
      <div className="controls">
        <button className="start-btn" onClick={handleStartPause}>{isRunning ? "Pause" : "Start"}</button>
        <button className="reset-btn" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
