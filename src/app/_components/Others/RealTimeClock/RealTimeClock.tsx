import { useState, useEffect } from "react";

interface RealTimeClockProps {
  className?: string;
}
const RealTimeClock: React.FC<RealTimeClockProps> = ({ className }) => {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
      <p className={` ${className}`}>{time}</p>
  );
}

export default RealTimeClock;
