const _formattedEmail = (email) => {
  return email.toLowerCase().trim();
};

const _formattedPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/-/g, "").trim();
};

const _formattedPhoneNumberAddHyphen = (phoneNumber) => {
  phoneNumber = phoneNumber.replace(/\D[^\.]/g, "");
  let phoneNumber_value =
    phoneNumber.slice(0, 3) +
    "-" +
    phoneNumber.slice(3, 6) +
    "-" +
    phoneNumber.slice(6);
  return phoneNumber_value;
};

module.exports = {
  _formattedEmail,
  _formattedPhoneNumber,
  _formattedPhoneNumberAddHyphen,
};
