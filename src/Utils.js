const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const calculateDuration = (departure, arrival) => {
  const getMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  let depMinutes = getMinutes(departure);
  let arrMinutes = getMinutes(arrival);

  let durationMinutes = arrMinutes - depMinutes;

  // Handle overnight flights (e.g., 23:30 -> 02:15)
  if (durationMinutes < 0) {
    durationMinutes += 24 * 60;
  }

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  return `${hours}h ${minutes > 0 ? minutes + "m" : ""}`;
};

export const capitalizeFullName = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatDate = (dateString) => {
  if (!dateString) return "Not Provided";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatTime = (timeRaw) => {
  return timeRaw.includes("T")
    ? new Date(timeRaw).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : timeRaw.slice(0, 5);
};

export const formatDateTime = (dateString) => {
  if (!dateString) return "Not Provided";
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const getDate = (newDate) => {
  let date = newDate;
  let day = days[date.getDay()];
  let dd = date.getDate();
  let mm = date.getMonth() + 1; // January is 0!
  let yyyy = date.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  date = yyyy + "-" + mm + "-" + dd;

  return { day, dd, mm, yyyy, date };
};
