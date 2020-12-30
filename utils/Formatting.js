const _formattedEmail = (email) => {
  return email.toLowerCase().trim();
};

const _formattedPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/-/g, "").trim();
};

const _formattedDate = (str) => {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
};

const _formattedTime = (time) => {
  const [hours, minutes, seconds] = time.split(":");
  return `${hours > 12 ? hours - 12 : hours}:${minutes}${
    seconds ? `:${seconds}` : ""
  } ${hours >= 12 ? "PM" : "AM"}`;
};

module.exports = {
  _formattedEmail,
  _formattedPhoneNumber,
  _formattedDate,
  _formattedTime,
};
