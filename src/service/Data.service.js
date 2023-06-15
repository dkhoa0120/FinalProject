import axios from "axios";
import Cookies from "universal-cookie";

const API_URL = process.env.REACT_APP_API_URL; // Access the API_URL variable from the environment

//Test API
export const getMangaForUI = () => {
  return axios.get(`${API_URL}/user/Manga`);
};

//Get manga
export const getMangas = (SortOption, Page, PageSize) => {
  return axios.get(
    `${API_URL}/user/Manga/?sortOption=${SortOption}&Page=${Page}&PageSize=${PageSize}`
  );
};

export const totalItems = () => {
  return axios.get(`${API_URL}/user/Manga/count`);
};

export const getMangaById = (id) => {
  return axios.get(`${API_URL}/user/Manga/${id}`);
};

//AUthentical

export const loginAPI = (data) => {
  return axios.post(`${API_URL}/api/Authenticate/SignIn`, data);
};

export const registerAPI = (data) => {
  return axios.post(`${API_URL}/api/Authenticate/SignUp`, data);
};

// Admin mangae Manga

export const getMangaList = (Page, PageSize) => {
  return axios.get(
    `${API_URL}/manage/Manga/?Page=${Page}&PageSize=${PageSize}`,
    {
      headers: {
        Authorization: `Bearer ${new Cookies().get("Token")}`,
      },
    }
  );
};

export const getCurrentUserBasic = () => {
  return axios.get(`${API_URL}/api/User`, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const createManga = (formData) => {
  return axios.post(`${API_URL}/manage/manga`, formData, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const editManga = (id, formData) => {
  return axios.put(`${API_URL}/manage/manga/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const deleteManga = (id) => {
  return axios.delete(`${API_URL}/manage/manga/${id}`, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const getLanguage = () => {
  return axios.get(`${API_URL}/Language`);
};

export const getCategory = () => {
  return axios.get(`${API_URL}/manage/category`);
};

export const getAuthor = () => {
  return axios.get(`${API_URL}/manage/author`);
};

// Admin mangae Category

export const getCategoryList = (Page, PageSize) => {
  return axios.get(
    `${API_URL}/manage/category/?Page=${Page}&PageSize=${PageSize}`,
    {
      headers: {
        Authorization: `Bearer ${new Cookies().get("Token")}`,
      },
    }
  );
};
