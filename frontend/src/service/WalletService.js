import axios from 'axios';

const HOST = 'http://localhost:8080/api/v1';

export const getWallets = () => {
    return axios.get(`${HOST}/wallets`);
};

export const getWalletByAccountId = (accountId) => {
    return axios.get(`${HOST}/wallets/${accountId}`);
};

export const createWallet = (wallet) => {
    return axios.post(`${HOST}/wallets`, wallet);
};

export const updateWallet = (id, wallet) => {
    return axios.put(`${HOST}/wallets/${id}`, wallet);
};

export const deleteWallet = (id) => {
    return axios.delete(`${HOST}/wallets/${id}`);
};