import axios from 'axios';
import { getToken } from '../service/TokenService';

const HOST = 'http://localhost:8080';

export const getExchangeRates = (page, currency = 'USD') => {
    return axios.get(`${HOST}/api/v1/rates/paged?page=${page}&currency=${currency}`);
}

export const getDailyPhrase = () => {
    return axios.get(`${HOST}/api/v1/horoscope/dailyphrase`, {
        headers: {
            'Authorization': `${getToken()}`
        }
    });
}

export const getNumerolog = (numero) => {
    return axios.get(`${HOST}/api/v1/horoscope/numerolog?n=${numero}`, {
        headers: {
            'Authorization': `${getToken()}`
        }
    });
}

export const getSign = (sign) => {
    return axios.get(`${HOST}/api/v1/horoscope/sign?s=${sign}`, {
        headers: {
            'Authorization': `${getToken()}`
        }
    });
}

export const getPlans = () => {
    return axios.get(`${HOST}/api/v1/plans`);
}

export const getUserDetails = (username, token) => {
    return axios.get(`${HOST}/api/v1/users?username=${username}`, {
        headers: {
            'Authorization': `${token}`
        }
    });
}

export const authSignup = (user) => {
    return axios.post(`${HOST}/api/v1/auth/signup`, user);
}

export const authSignin = (username, password) => {
    return axios.post(`${HOST}/api/v1/auth/signin`, { username, password });
}

export const isValidToken = (token) => {
    return axios.get(`${HOST}/api/v1/auth/validate`, {
        headers: {
            'Authorization': `${token}`
        }
    })
};