const timeConverter = (timestamp) => {
  const dateObj = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
  const timeString = dateObj.toLocaleTimeString(); // Convert to local time string
  return timeString;
};

export default timeConverter;