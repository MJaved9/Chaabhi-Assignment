import React, { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const formattedSeconds = seconds % 60;

  return (
    <div>
      Minutes: {minutes} Seconds: {formattedSeconds}
    </div>
  );
};

export default Timer;
