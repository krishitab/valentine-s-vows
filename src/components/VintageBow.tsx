import React from "react";

interface VintageBowProps {
  variant?: "ribbon" | "rosette" | "simple";
  size?: "sm" | "md" | "lg";
  className?: string;
  color?: string;
}

const VintageBow: React.FC<VintageBowProps> = ({
  variant = "ribbon",
  size = "md",
  className = "",
  color,
}) => {
  const sizeMap = { sm: 40, md: 70, lg: 110 };
  const s = sizeMap[size];

  if (variant === "rosette") {
    return (
      <svg
        width={s}
        height={s}
        viewBox="0 0 100 100"
        className={`${className}`}
        fill="none"
      >
        {/* Rosette petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <ellipse
            key={angle}
            cx="50"
            cy="50"
            rx="18"
            ry="30"
            fill={color || "hsl(350, 40%, 65%)"}
            opacity="0.7"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
        {/* Center knot */}
        <circle cx="50" cy="50" r="12" fill={color || "hsl(350, 50%, 30%)"} />
        <circle cx="50" cy="50" r="7" fill={color || "hsl(350, 40%, 65%)"} opacity="0.6" />
      </svg>
    );
  }

  if (variant === "simple") {
    return (
      <svg
        width={s}
        height={s * 0.6}
        viewBox="0 0 100 60"
        className={`${className}`}
        fill="none"
      >
        {/* Left loop */}
        <path
          d="M50 30 Q20 0 10 25 Q5 40 50 30"
          fill={color || "hsl(340, 35%, 75%)"}
          stroke={color || "hsl(350, 50%, 30%)"}
          strokeWidth="1"
        />
        {/* Right loop */}
        <path
          d="M50 30 Q80 0 90 25 Q95 40 50 30"
          fill={color || "hsl(340, 35%, 75%)"}
          stroke={color || "hsl(350, 50%, 30%)"}
          strokeWidth="1"
        />
        {/* Knot */}
        <ellipse cx="50" cy="30" rx="6" ry="5" fill={color || "hsl(350, 50%, 30%)"} />
      </svg>
    );
  }

  // Ribbon bow with tails
  return (
    <svg
      width={s}
      height={s * 1.2}
      viewBox="0 0 100 120"
      className={`${className}`}
      fill="none"
    >
      {/* Left loop */}
      <path
        d="M50 40 Q15 5 8 30 Q3 50 50 40"
        fill={color || "hsl(350, 40%, 65%)"}
        stroke={color || "hsl(350, 50%, 30%)"}
        strokeWidth="1.5"
      />
      {/* Right loop */}
      <path
        d="M50 40 Q85 5 92 30 Q97 50 50 40"
        fill={color || "hsl(350, 40%, 65%)"}
        stroke={color || "hsl(350, 50%, 30%)"}
        strokeWidth="1.5"
      />
      {/* Left tail */}
      <path
        d="M50 45 Q30 70 20 100 Q25 95 35 80 Q40 70 50 45"
        fill={color || "hsl(340, 35%, 75%)"}
        stroke={color || "hsl(350, 50%, 30%)"}
        strokeWidth="1"
      />
      {/* Right tail */}
      <path
        d="M50 45 Q70 70 80 100 Q75 95 65 80 Q60 70 50 45"
        fill={color || "hsl(340, 35%, 75%)"}
        stroke={color || "hsl(350, 50%, 30%)"}
        strokeWidth="1"
      />
      {/* Knot */}
      <ellipse cx="50" cy="42" rx="8" ry="7" fill={color || "hsl(350, 50%, 30%)"} />
    </svg>
  );
};

export default VintageBow;
