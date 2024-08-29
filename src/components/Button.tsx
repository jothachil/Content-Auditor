import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className=" bg-orange-500 text-white text-xss p-2 rounded w-full hover:bg-orange-700 transition-all font-medium"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
