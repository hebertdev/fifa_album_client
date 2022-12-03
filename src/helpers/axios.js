import Axios from "axios";

//auth helpers
import { getToken, deleteToken } from "./auth";

const baseURL = process.env.NEXT_PUBLIC_URL;

let headers = {};

function verifiedToken() {
  if (getToken()) {
    headers.Authorization = `token ${getToken()}`;
    return headers.Authorization;
  }
}

verifiedToken();

const axiosInstance = Axios.create({
  baseURL: baseURL,
  headers,
});

export default axiosInstance;

export function axiosInterceptors() {
  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        deleteToken();
        window.location.href = "/";
      } else {
        return Promise.reject(error);
      }
    }
  );
}

export function urlImage() {
  //let nuevaUrl = baseURL.split("/api")[0];
  return baseURL;
}

export function urlImage2(img) {
  //let nuevaUrl = baseURL.split("/api")[0];
  nuevaUrl = `${nuevaUrl}${img}`;
  return nuevaUrl;
}
