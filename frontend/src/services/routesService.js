import axios from 'axios';

const TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2FvLmJvcmdlcyIsImV4cCI6MTY4NjI0MTYwN30.K2Q9NFGOU76YaEC_A4tH5fpNghtrFR8td4ds0NfAXqc4DkQBCH9FbIXsFQ6uy0YumuKS-9RmHbbYcTMT-pQWZA';

export const getExchangeRates = (page, currency = 'USD', token) => {
    return axios.get(`http://localhost:8080/api/v1/rates/paged?page=${page}&currency=${currency}`, {
        headers: {
            'Authorization': `${TOKEN}`
        }  
    });
}

export const getDailyHoroscope = () => {
    return axios.get("http://localhost:8080/api/v1/horoscope", {
        headers: {
            'Authorization': `${TOKEN}`
        }
    });
}