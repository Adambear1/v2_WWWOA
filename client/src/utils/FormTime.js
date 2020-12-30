function FormTime(time) {
  const [hours, minutes, seconds] = time.split(":");
  return `${hours > 12 ? hours - 12 : hours}:${minutes}${
    seconds ? `:${seconds}` : ""
  } ${hours >= 12 ? "PM" : "AM"}`;
}

export default FormTime;
