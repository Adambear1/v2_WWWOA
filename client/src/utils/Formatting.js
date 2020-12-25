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

const _formatDate = (d) => {
  let date = new Date(d);
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return (d = mm + "/" + dd + "/" + yyyy);
};

module.exports = {
  _formattedEmail,
  _formattedPhoneNumber,
  _formattedPhoneNumberAddHyphen,
  _formatDate,
};
