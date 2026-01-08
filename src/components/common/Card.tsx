import type React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {title && <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>}
      {children}
    </div>
  );
};
