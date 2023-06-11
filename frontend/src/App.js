import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExchangeRateComponent from './components/ExchangeRateComponent/ExchangeRateComponent';
import Atividade from './components/AtividadeComponent/AtividadeComponent';
import CryptoWallet from './components/CryptoWalletComponent/CryptoWalletComponent';
import HoroscopeComponent from './components/HoroscopeComponent/HoroscopeComponent';
import Auth from './components/AuthComponent/AuthComponent';
import React, { useState } from 'react';
import './App.css';

function App() {
  const initialActivity = Number(localStorage.getItem("currentActivity")) || 1;
  const [currentActivity, setCurrentActivity] = useState(initialActivity);

  const handleClick = (activityNumber) => {
    setCurrentActivity(activityNumber);
    localStorage.setItem("currentActivity", activityNumber);
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="nav-bar">
            <Link  to="/atividade1" onClick={() => handleClick(1)}>Atividade 1</Link >
            <Link  to="/atividade2" onClick={() => handleClick(2)}>Atividade 2</Link >
            <Link  to="/atividade3" onClick={() => handleClick(3)}>Atividade 3</Link >
            <div className={`animation start-${currentActivity}`}></div>
          </nav>
          <Routes>
            <Route path="/atividade1" element={
              <Atividade titulo="Atividade 1" description="Taxas de Conversão">
                <ExchangeRateComponent />
              </Atividade>
            } />
            <Route path="/atividade2" element={
              <Atividade titulo="Atividade 2" description="Consultas Astrológicas">
                <Auth/>
              </Atividade>
            } />
            <Route path="/atividade3" element={
              <Atividade titulo="Atividade 3" description="Carteiras de Criptomoedas">
                <CryptoWallet/>
              </Atividade>
            } />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
