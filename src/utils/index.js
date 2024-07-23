import axios from "axios";

// export const serverUrl = "http://localhost:4000";
// export const serverUrl = "https://tawasol-server-production.up.railway.app";
export const serverUrl = "https://tawasolserver-c42a5715fa4c.herokuapp.com";

export const api = axios.create({
  baseURL: `${serverUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

export const getProfileImage = (userId) => `${serverUrl}/images/${userId}`;

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
  }).format(new Date(date));
};
