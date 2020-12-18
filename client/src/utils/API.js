import axios from "axios";
const membersUrl =
  process.env.NODE_ENV === "production"
    ? "/api/members"
    : "http://localhost:5000/api/members";
const updatesUrl =
  process.env.NODE_ENV === "production"
    ? "/api/updates"
    : "http://localhost:5000/api/updates";

export default {
  SignInWithEmailAndPassword: (data) => {
    return axios.put(membersUrl + "/login", data);
  },
  GetAllMembers: () => {
    return axios.get(membersUrl);
  },
  GetUpdates: () => {
    return axios.get(updatesUrl);
  },
};
