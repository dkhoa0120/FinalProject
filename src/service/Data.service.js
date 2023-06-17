import axios from "axios";
import Cookies from "universal-cookie";

const API_URL = process.env.REACT_APP_API_URL; // Access the API_URL variable from the environment

//Test API
export const getMangaForUI = () => {
  return axios.get(`${API_URL}/user/Manga/`);
};

//Search Component
export const getMangaForSearch = (Search) => {
  return axios.get(`${API_URL}/user/Manga?search=${Search}`);
};

//Get manga

export const getMangas = (Search, SortOption, Page, PageSize) => {
  return axios.get(
    `${API_URL}/user/Manga/?Search=${Search}&SortOption=${SortOption}&Page=${Page}&PageSize=${PageSize}`
  );
};

export const totalItems = () => {
  return axios.get(`${API_URL}/user/Manga/count`);
};

export const totalItemsWithSearch = (search) => {
  return axios.get(`${API_URL}/user/Manga/countSearch/?search=${search}`);
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
export const getMangaList = ( Search, Page, PageSize) => {
  return axios.get(
    `${API_URL}/manage/Manga/?Search=${Search}&Page=${Page}&PageSize=${PageSize}`,
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

export const getCategory = (PageSize) => {
  return axios.get(`${API_URL}/manage/category/?PageSize=${PageSize}&IncludeDeleted=false`);
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

export const createCategory = (data) => {
  return axios.post(`${API_URL}/manage/category`, data, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const getCategoryByID = (id, data) => {
  return axios.get(`${API_URL}/manage/category/${id}`, data, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const editCategory = (id, data) => {
  return axios.put(`${API_URL}/manage/category/${id}`, data, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const deleteCategory = (id) => {
  return axios.delete(`${API_URL}/manage/category/${id}`, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};