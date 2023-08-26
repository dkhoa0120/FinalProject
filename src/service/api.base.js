import axios from "axios";
import Cookies from "universal-cookie";

const API_URL = process.env.REACT_APP_API_URL;

export const userAxios = axios.create({
  baseURL: `${API_URL}/user`,
});

export const baseAxios = axios.create({
  baseURL: `${API_URL}`,
});

export const getAuthorizeAxios = () =>
  axios.create({
    baseURL: `${API_URL}`,
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });

export const accountAxios = axios.create({
  baseURL: `${API_URL}/account`,
});

export const helperAxios = axios.create({
  baseURL: `${API_URL}/helper`,
});
