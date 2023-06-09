import { setToken } from './TokenService'; 
import { authSignin } from '../routes/AllRoutes';

export const signin = async (username, password) => { 
    try {
        const response = await authSignin(username, password);
        setToken(response.data.token);
        return response;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
}