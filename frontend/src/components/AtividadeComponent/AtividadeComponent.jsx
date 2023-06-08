import React from 'react';
import './AtividadeComponent.css';

const Atividade = ({ titulo, children, description }) => (
  <div className="atividade">
    <h2>{titulo}</h2>
    <h5>{description}</h5>
    {children}
  </div>
);

export default Atividade;