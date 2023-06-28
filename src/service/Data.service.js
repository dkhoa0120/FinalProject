import axios from "axios";
import Cookies from "universal-cookie";

const API_URL = process.env.REACT_APP_API_URL; // Access the API_URL variable from the environment

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
  return axios.get(`${API_URL}/manage/author/?Search=${Search}&Page=${Page}`, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const createAuthor = (data) => {
  return axios.post(`${API_URL}/manage/author`, data, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const getAuthorByID = (id) => {
  return axios.get(`${API_URL}/manage/author/${id}`, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
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
      undelete: undelete,
    },
  });
};

export const getUsers = (roleOption, search, page) => {
  return axios.get(
    `${API_URL}/manage/user/?RoleOption=${roleOption}&Search=${search}&Page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${new Cookies().get("Token")}`,
      },
    }
  );
};
