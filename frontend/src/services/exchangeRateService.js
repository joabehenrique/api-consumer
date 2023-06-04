import axios from 'axios';

export const getExchangeRates = (page, currency = 'USD') => {
    return axios.get(`http://localhost:8080/api/v1/rates/paged?page=${page}&currency=${currency}`);
}