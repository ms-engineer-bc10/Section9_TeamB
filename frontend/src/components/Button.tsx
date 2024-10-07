import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-orange-200 text-orange-800 rounded hover:bg-orange-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
