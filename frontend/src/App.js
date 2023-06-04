import './App.css';
import ExchangeRateComponent from './components/ExchangeRateComponent/ExchangeRateComponent';
import Atividade from './components/AtividadeComponent/AtividadeComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Atividade titulo="Atividade 1" description="Taxas de Conversão">
          <ExchangeRateComponent />
        </Atividade>
        <Atividade titulo="Atividade 2" description="....">
          
        </Atividade>
        <Atividade titulo="Atividade 3" description="....">
          
        </Atividade>
      </header>
    </div>
  );
}

export default App;
