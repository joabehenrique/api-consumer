import React, { useState, useEffect } from 'react';
import { getDailyHoroscope } from '../../routes/AllRoutes';


const Horoscope = ({ userSign }) => {
    const [horoscopeData, setHoroscopeData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        getDailyHoroscope(userSign).then(response => {
            setHoroscopeData(response.data);
        }).catch(err => {
            setError(err.toString());
        });
    }, [userSign]);

    if (error)
        return <div class="error">Erro: {error}</div>

    if (!horoscopeData)
        return <div class="load">Carregando...</div>
    
    return (
        <div>
            <p>Mensagem do dia: {userSign} | {horoscopeData.dailyMessage}</p>
            <p>Número da sorte: {horoscopeData.luckyNumber}</p> 
        </div>
        
    );
};

export default Horoscope;