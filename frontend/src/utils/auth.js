import checkResponse from "./checkResponse";
// export const BASE_URL = "http://localhost:4000";
export const BASE_URL = 'https://api.yuliaduk.nomoreparties.sbs'

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log(data);
        return data;
      }
    });
};

export const getContent = () => {
  const token = localStorage.getItem('token')
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      // Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
