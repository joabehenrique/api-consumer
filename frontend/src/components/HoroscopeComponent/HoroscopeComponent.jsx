import React, { useState, useEffect } from 'react';
import { getDailyHoroscope } from '../../services/routesService';

const Horoscope = ({ userSign }) => {
    const [horoscopeData, setHoroscopeData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getDailyHoroscope(userSign).then(response => {
            setHoroscopeData(response.data);
            console.log(`meu console: ${response.data}`)
        }).catch(err => {
            setError(err.toString());
        });
    }, [userSign]);

    if (error)
        return <p>Erro: {error}</p>

    if (!horoscopeData) 
        return <p>Carregando.T.T.</p>;
    

    return (
        <div>
            <h2>Horóscopo diário para {userSign}</h2>
            <p>Mensagem do dia: {horoscopeData.dailyMessage}</p>
            <p>Número da sorte: {horoscopeData.luckyNumber}</p>
        </div>
    );
};

export default Horoscope;