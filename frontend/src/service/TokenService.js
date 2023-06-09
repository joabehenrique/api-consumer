import { isValidToken } from '../routes/AllRoutes';

export const setToken = (token) => {
    sessionStorage.setItem('jwtToken', token);
}

export const getToken = () => {
    return sessionStorage.getItem('jwtToken');
}

export const removeToken = () => {
    sessionStorage.removeItem('jwtToken');
}

export const validateToken = async (token) => {
    try {
        const response = await isValidToken(token);
        return response.data;
    } catch (error) {
        console.error('Erro ao validar token:', error);
        throw error;
    }
}