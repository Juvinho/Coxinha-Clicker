import React, { useState, useEffect } from 'react';

const HEADLINES = [
    "Cientistas confirmam: O universo tem formato de coxinha.",
    "Preço da farinha cai após descoberta de mina de massa infinita.",
    "Vovó Cozinheira ganha prêmio Nobel da Paz por receita secreta.",
    "Nova tendência: Casamentos substituem bolo por torre de coxinhas.",
    "Gatos agora preferem coxinhas a sachê, diz estudo.",
    "Economistas sugerem adotar a Coxinha como moeda oficial do Brasil.",
    "Alienígenas visitam a Terra e pedem 'uma de frango com catupiry'.",
    "Fritadeira Industrial explode em sabor e cobre cidade de aroma.",
    "Rei do Camarote afirma: 'Coxinha é o novo caviar'.",
    "Clima: Previsão de chuva de azeite para o fim de semana.",
    "Fãs acampam na porta da Pastelaria esperando lote fresco.",
    "NASA detecta sinal de rádio vindo de Andrômeda: 'Tem ketchup?'."
];

const NewsTicker: React.FC = () => {
  const [activeHeadline, setActiveHeadline] = useState(HEADLINES[0]);

  // Rotate random headlines in CSS ticker if desired, but for simple CSS infinite scroll 
  // we usually put all text in one long strip.
  // Let's create a long string.
  
  return (
    <div className="absolute top-0 left-0 w-full z-50 pointer-events-none">
      <div className="ticker-wrap h-8 flex items-center bg-black/80 border-b border-amber-800">
        <div className="ticker text-sm text-amber-100 font-mono tracking-wide">
           {HEADLINES.join("  +++  ")}  +++  {HEADLINES.join("  +++  ")}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
