/**
 * Calculates the time left until a target date
 * @param {string} targetDate - Date string in a format parseable by Date constructor
 * @returns {Object|null} Object with days, hours, minutes, seconds or null if date has passed
 */
export const calculateTimeLeft = (targetDate) => {
  const difference = new Date(targetDate) - new Date();
  
  // Return null if the date has passed
  if (difference <= 0) {
    return null;
  }
  
  // Calculate time units
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};
