import React from 'react'

const CircularProgressBar = ({ progress, currentStep }: { progress: number, currentStep: number }) => {
  const size = 40;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate stroke offset based on progress
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="relative">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e5e7eb" // Tailwind gray-300
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#3b82f6" // Tailwind blue-500
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-300"
        style={{
          transform: "rotate(-90deg)", // Rotate the progress to start at 0 degrees
          transformOrigin: "50% 50%", // Rotate around the center
        }}
      />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-lg font-bold"
        fill="#000"
      >
        {currentStep}
      </text>
    </svg>
  );
};

export default CircularProgressBar