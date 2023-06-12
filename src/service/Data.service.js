import axios from "axios";
import Cookies from "universal-cookie";


const API_URL = process.env.REACT_APP_API_URL; // Access the API_URL variable from the environment

export const getMangaList = () => {
    return axios.get(`${API_URL}/user/Manga`)
};


export const getMangas = (option, page, itemPerPage) => {
    return axios.get(`${API_URL}/user/Manga/${option}/${page}/${itemPerPage}`)
};

export const totalItems = () => {
    return axios.get(`${API_URL}/user/Manga/count`)
}

export const getMangaById = (id) => {
    return axios.get(`${API_URL}/user/Manga/${id}`)
};

//AUthentical

export const loginAPI = (data) => {
    return axios.post(`${API_URL}/api/Authenticate/SignIn`, data);
};


export const registerAPI = (data) => {
    return axios.post(`${API_URL}/api/Authenticate/SignUp`, data);
};

export const getCurrentUserBasic = () => {
    return axios.get(`${API_URL}/api/User`, {
        headers: {
            Authorization: `Bearer ${new Cookies().get("Token")}`
        }
    });
}

export const createManga = (formData) => {
    return axios.post(`${API_URL}/admin/manga`, formData, {
        headers: {
            Authorization: `Bearer ${new Cookies().get("Token")}`,
        },
    });
};

export const getLanguage = () => {
    return axios.get(`${API_URL}/admin/manga/languages`, {
        headers: {
            Authorization: `Bearer ${new Cookies().get("Token")}`,
        },
    });
};

