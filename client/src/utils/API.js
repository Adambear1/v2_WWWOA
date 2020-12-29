import axios from "axios";
const membersUrl =
  process.env.NODE_ENV === "production"
    ? "/api/members"
    : "http://localhost:5000/api/members/";
const announcementsUrl =
  process.env.NODE_ENV === "production"
    ? "/api/announcements"
    : "http://localhost:5000/api/announcements/";

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
  GetAnnouncements: () => {
    return axios.get(announcementsUrl);
  },
  PostAnnouncements: (data) => {
    return axios.post(announcementsUrl, data);
  },
  ArchiveAnnouncement: (data) => {
    return axios.put(announcementsUrl, data);
  },
  //
  RandomQuote: () => {
    return axios.get("https://type.fit/api/quotes/");
  },
};
