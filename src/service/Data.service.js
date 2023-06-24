import axios from "axios";
import Cookies from "universal-cookie";

const API_URL = process.env.REACT_APP_API_URL; // Access the API_URL variable from the environment

// Test API
export const getMangaForUI = () => {
  return axios.get(`${API_URL}/user/Manga/`);
};

//Search Component
export const getMangaForSearch = (Search) => {
  return axios.get(`${API_URL}/user/Manga?search=${Search}`);
};

// Get manga
export const getMangas = (Search, SortOption, Page, PageSize) => {
  return axios.get(
    `${API_URL}/user/Manga/?Search=${Search}&SortOption=${SortOption}&Page=${Page}&PageSize=${PageSize}`
  );
};

export const getMangaByIdUser = (id) => {
  return axios.get(`${API_URL}/user/Manga/${id}`);
};

// Authenticate
export const loginAPI = (data) => {
  return axios.post(`${API_URL}/api/Authenticate/SignIn`, data);
};

export const registerAPI = (data) => {
  return axios.post(`${API_URL}/api/Authenticate/SignUp`, data);
};

// Admin manage Manga
export const getMangaList = (Search, Page) => {
  return axios.get(`${API_URL}/manage/Manga/?Search=${Search}&Page=${Page}`, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const getCurrentUserBasic = () => {
  return axios.get(`${API_URL}/api/User`, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const getMangaById = (id) => {
  return axios.get(`${API_URL}/manage/Manga/${id}`, {
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

export const deleteManga = (id, undelete = false) => {
  return axios.delete(`${API_URL}/manage/manga/${id}`, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
    params: {
      undelete: undelete,
    },
  });
};

export const getLanguage = () => {
  return axios.get(`${API_URL}/Language`);
};

export const getCategory = (search) => {
  return axios.get(`${API_URL}/manage/category/?Search=${search}`, {
    params: {
      ExcludeDeleted: true,
    },
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const getAuthor = (search) => {
  return axios.get(`${API_URL}/manage/author/?Search=${search}`, {
    params: {
      ExcludeDeleted: true,
    },
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

// Admin manage Category

export const getCategoryList = (Search, Page) => {
  return axios.get(
    `${API_URL}/manage/category/?Search=${Search}&Page=${Page}`,
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

export const getCategoryByID = (id) => {
  return axios.get(`${API_URL}/manage/category/${id}`, {
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

export const deleteCategory = (id, undelete = false) => {
  return axios.delete(`${API_URL}/manage/category/${id}`, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
    params: {
      undelete: undelete,
    },
  });
};


// Admin manage Author

export const getAuthorList = (Search, Page) => {
  return axios.get(
    `${API_URL}/manage/author/?Search=${Search}&Page=${Page}`,
    {
      headers: {
        Authorization: `Bearer ${new Cookies().get("Token")}`,
      },
    }
  );
};

export const createAuthor = (data) => {
  return axios.post(`${API_URL}/manage/author`, data, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const getAuthorByID = (id) => {
  return axios.get(`${API_URL}/manage/author/${id}`,
  {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  }
  );
};

export const editAuthor = (id, data) => {
  return axios.put(`${API_URL}/manage/author/${id}`, data, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const deleteAuthor = (id, undelete = false) => {
  return axios.delete(`${API_URL}/manage/author/${id}`, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
    params: {
      undelete: undelete 
    }
  });
};

export const getUsers = (roleOption, search, page) => {
  return axios.get(`${API_URL}/manage/user/?RoleOption=${roleOption}&Search=${search}&Page=${page}`, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

