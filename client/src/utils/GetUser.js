const GetUser = async () => {
  let email = await localStorage.getItem("email");
  let admin = await localStorage.getItem("admin");
  let name = await localStorage.getItem("name");
  let _id = await localStorage.getItem("_id");
  return { email, name, admin, _id };
};
export default GetUser;
