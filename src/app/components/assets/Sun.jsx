import React from 'react';

const Sun = ({
  className,
  style,
  onClick,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 544 544"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <g filter="url(#filter0_f_455_1199)">
        <circle
          cx="272"
          cy="272"
          r="254"
          fill="url(#paint0_linear_455_1199)"
        ></circle>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_455_1199"
          x1="272"
          x2="272"
          y1="18"
          y2="526"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D02D30"></stop>
          <stop offset="0.188" stopColor="#FF5C3F"></stop>
          <stop offset="0.75"></stop>
        </linearGradient>
        <filter
          id="filter0_f_455_1199"
          width="543.4"
          height="543.4"
          x="0.3"
          y="0.3"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            result="effect1_foregroundBlur_455_1199"
            stdDeviation="8.85"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
};

export default Sun; 