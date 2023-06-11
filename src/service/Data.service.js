import axios from "axios";
import Cookies from "universal-cookie";


export const getMangaList = () => {
    return axios.get("https://localhost:7036/user/Manga")
};


export const getMangas = (option, page, itemPerPage) => {
    return axios.get(`https://localhost:7036/user/Manga/${option}/${page}/${itemPerPage}`)
};

export const totalItems = () => {
    return axios.get('https://localhost:7036/user/Manga/count')
}

export const loginAPI = (data) => {
    return axios.post("https://localhost:7036/api/Authenticate/SignIn", data);
};


export const registerAPI = (data) => {
    return axios.post("https://localhost:7036/api/Authenticate/SignUp", data);
};

export const getCurrentUserBasic = () => {
    return axios.get("https://localhost:7036/api/User", {
        headers: {
            Authorization: `Bearer ${new Cookies().get("Token")}`
        }
    });
}
export const getMangaById = (id) => {
    return axios.get(`https://localhost:7036/user/Manga/${id}`)
};
