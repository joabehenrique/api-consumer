import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CryptoWallet = () => {
    const [wallets, setWallets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWallets = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/wallets');
                setWallets(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Erro ao buscar carteiras: ", error);
                setIsLoading(false);
            }
        }

        fetchWallets();
    }, []);

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h2>Carteiras de Criptomoedas</h2>
            {wallets.map(wallet => (
                <div key={wallet.id}>
                    <h3>{wallet.name}</h3>
                    <p>Saldo: {wallet.balance}</p>
                    {/* Adicione mais detalhes da carteira conforme necessário */}
                </div>
            ))}
        </div>
    );
};

export default CryptoWallet;