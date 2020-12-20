const GetUser = async () => {
  let email = await localStorage.getItem("email");
  let admin = await localStorage.getItem("admin");
  let _id = await localStorage.getItem("_id");
  return { email: email, admin: admin, _id: _id };
};
export default GetUser;
