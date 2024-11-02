import { useState, useEffect, useRef } from 'react';

const useCountdownTimer = (initialMinutes = 1) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const timerRef = useRef<any>(null); // Store the timer ID to clear it when needed

  useEffect(() => {
    // Start the countdown when the timer is active
    if (timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    // Clear the interval when the timer reaches 0 or when unmounted
    if (timeLeft === 0) {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, [timeLeft]);

  // Helper function to convert seconds to minutes and seconds
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return {
      minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
  };

  // Function to reset the timer to its initial value
  const reset = () => {
    clearInterval(timerRef.current);
    setTimeLeft(initialMinutes * 60);
  };

  return { ...formatTime(), reset, timeLeft };
};

export default useCountdownTimer;
