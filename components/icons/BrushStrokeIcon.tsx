import React from 'react';

interface BrushStrokeIconProps {
  className?: string;
}

const BrushStrokeIcon: React.FC<BrushStrokeIconProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 400 100" 
      preserveAspectRatio="none" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M5 50 C 50 10, 150 10, 200 50 C 250 90, 350 90, 395 50"
        stroke="currentColor"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BrushStrokeIcon;
