import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`relative transition-transform duration-300 shadow-md py-2 px-5 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white-50 outline-none overflow-hidden text-base hover:scale-105 hover:border-white ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
