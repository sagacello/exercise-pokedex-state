import React from "react";
import "./App.css";

const Button = ({ className, children, disabled, onClick }) => (
  <button
    onClick={onClick}
    className={`button-text ${className}`}
    disabled={disabled}
    // caracteristica de dentro do botão
  >
    {children} 
  </button>
  // children vai fora do botao
);

export default Button;