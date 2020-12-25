const _formattedEmail = (email) => {
  return email.toLowerCase().trim();
};

const _formattedPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/-/g, "").trim();
};

module.exports = { _formattedEmail, _formattedPhoneNumber };
