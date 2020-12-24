import axios from "axios";
const membersUrl =
  process.env.NODE_ENV === "production"
    ? "/api/members"
    : "http://localhost:5000/api/members/";
const updatesUrl =
  process.env.NODE_ENV === "production"
    ? "/api/updates"
    : "http://localhost:5000/api/updates/";

export default {
  Login: (data) => {
    return axios.put(membersUrl + "login", data);
  },
  GetAllMembers: () => {
    return axios.get(membersUrl);
  },
  GetAllInactiveMembers: () => {
    return axios.get(membersUrl + "inactive");
  },
  AddMembers: (data) => {
    return axios.post(membersUrl, data);
  },
  GetOneMember: (id) => {
    return axios.get(membersUrl + id);
  },
  SendResetLink: (data) => {
    return axios.put(membersUrl + "resetLink", data);
  },
  UpdateOneMember: (id, data) => {
    return axios.put(membersUrl + "profile/" + id, data);
  },
  ToggleUserStatus: (id) => {
    return axios.put(membersUrl + "status/" + id);
  },
  GetUpdates: () => {
    return axios.get(updatesUrl);
  },
};
