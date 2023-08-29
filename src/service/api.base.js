import axios from "axios";
import Cookies from "universal-cookie";

const API_URL = process.env.REACT_APP_API_URL;

export const baseAxios = axios.create({
  baseURL: `${API_URL}`,
});

export const getAuthorizedAxios = () =>
  axios.create({
    baseURL: `${API_URL}`,
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
