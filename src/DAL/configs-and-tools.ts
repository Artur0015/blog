import axios from 'axios';

export const baseURL = process.env.REACT_APP_BACKEND_URL + 'api/'

export const instanceWithToken = axios.create({baseURL})

instanceWithToken.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = 'Bearer ' + token
    return config
})

export const instanceWithoutToken = axios.create({baseURL})