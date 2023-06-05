import React, { useState, useEffect } from 'react';
import { getExchangeRates } from '../../services/exchangeRateService';
import './ExchangeRateComponent.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const ExchangeRateComponent = () => {
  const [rates, setRates] = useState(null);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('USD');
  const [error, setError] = useState(null);

  useEffect(() => {
    getExchangeRates(page, currency).then(response => {
      setRates(response.data);
    })
      .catch(err => {
        setError(err.toString());
      });
  }, [page, currency]);

  if (error)
    return <div>Erro: {error}</div>

  if (!rates)
    return <div>Carregando...</div>

  return (
    <div class="divbody">
      <table>
        <thead>
          <tr>
            <th>
              <div class="divcurrency">
                <div class="cambio">
                  Câmbio
                </div>
                <div class="currency">
                  {currency}
                </div>
              </div>
            </th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(rates).map((currency) => (
            <tr key={currency}>
              <td>{currency}</td>
              <td>{rates[currency].toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div class="buttons">
        <div class="button" onClick={() => setPage(prevPage => prevPage > 0 ? prevPage - 1 : prevPage)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div class="button" onClick={() => setPage(prevPage => prevPage + 1)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <icon onClick={() => setCurrency('EUR')}>
        EUR
      </icon>
      <icon onClick={() => setCurrency('BRL')}>
        BRL
      </icon>
      <icon onClick={() => setCurrency('JPY')}>
        JPY
      </icon>
      <icon onClick={() => setCurrency('GBP')}>
        GBP
      </icon>
    </div>
  );
};

export default ExchangeRateComponent;