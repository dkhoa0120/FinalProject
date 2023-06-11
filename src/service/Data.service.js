import axios from "axios";
import Cookies from "universal-cookie";

const API_URL = "https://localhost:7114/api/Manga";

export const getMangas = () => {
    return axios.get(API_URL)
};

export const deleteManga = (id) => {
    return axios.delete(`${API_URL}/${id}`)
};

export const updateManga = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data)
};

export const getMangaById = (id) => {
    return axios.get(`${API_URL}/${id}`)
};

export const addManga = (data) => {
    return axios.post(API_URL, data)
};

export const getMangasList = (option, page, itemPerPage) => {
    return axios.get(`${API_URL}/${option}/${page}/${itemPerPage}`)
};

export const totalItems = () => {
    return axios.get('https://localhost:7114/api/Manga/count')
}

export const loginAPI = (data) => {
    return axios.post("https://localhost:7114/api/Authenticate/SignIn", data);
};


export const registerAPI = (data) => {
    return axios.post("https://localhost:7114/api/Authenticate/SignUp", data);
};

export const getCurrentUserBasic = () => {
    return axios.get("https://localhost:7114/api/User", {
        headers: {
            Authorization: `Bearer ${new Cookies().get("Token")}`
        }
    });
}
