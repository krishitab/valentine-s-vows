import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VintageBow from "@/components/VintageBow";

const Invitation: React.FC = () => {
  const navigate = useNavigate();
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [moved, setMoved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const dodgeNo = useCallback(() => {
    const maxX = window.innerWidth < 640 ? 120 : 200;
    const maxY = window.innerWidth < 640 ? 80 : 150;
    const newX = (Math.random() - 0.5) * maxX * 2;
    const newY = (Math.random() - 0.5) * maxY * 2;
    setNoPos({ x: newX, y: newY });
    setMoved(true);
  }, []);

  const handleYes = () => {
    setShowConfetti(true);
    setTimeout(() => navigate("/valentine"), 1500);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
    >
      {/* Decorative bows */}
      <VintageBow variant="ribbon" size="lg" className="absolute top-4 left-4 opacity-60 animate-sway hidden sm:block" />
      <VintageBow variant="rosette" size="md" className="absolute top-8 right-8 opacity-50" />
      <VintageBow variant="simple" size="sm" className="absolute bottom-12 left-8 opacity-40" />
      <VintageBow variant="ribbon" size="md" className="absolute bottom-8 right-4 opacity-50 animate-sway" />
      <VintageBow variant="rosette" size="sm" className="absolute top-1/4 left-1/4 opacity-30 hidden md:block" />
      <VintageBow variant="simple" size="lg" className="absolute bottom-1/4 right-1/4 opacity-25 hidden md:block" />
      <VintageBow variant="ribbon" size="sm" className="absolute top-1/2 right-8 opacity-35 hidden lg:block" />
      <VintageBow variant="rosette" size="lg" className="absolute bottom-4 left-1/3 opacity-20 hidden sm:block" />

      {/* Decorative corner flourishes */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-accent/30 rounded-tl-3xl m-4" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-accent/30 rounded-tr-3xl m-4" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-accent/30 rounded-bl-3xl m-4" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-accent/30 rounded-br-3xl m-4" />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-lg">
        <div className="mb-6 text-5xl">💌</div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-4 italic">
          You've been officially invited to a date...
        </h1>
        <p className="font-script text-2xl sm:text-3xl text-accent mb-12">
          wanna come?
        </p>

        <div className="flex items-center justify-center gap-6 relative">
          <button
            onClick={handleYes}
            className="px-10 py-4 bg-primary text-primary-foreground font-display text-xl rounded-lg
                       shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
                       border-2 border-burgundy/20"
          >
            Yes! 💕
          </button>

          <button
            onMouseEnter={dodgeNo}
            onTouchStart={dodgeNo}
            onClick={dodgeNo}
            className="px-10 py-4 bg-secondary text-secondary-foreground font-display text-xl rounded-lg
                       shadow-md transition-all duration-300 border-2 border-border"
            style={{
              transform: `translate(${noPos.x}px, ${noPos.y}px)`,
              transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              position: moved ? "absolute" : "relative",
            }}
          >
            No
          </button>
        </div>
      </div>

      {/* Confetti on Yes */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                fontSize: `${16 + Math.random() * 20}px`,
              }}
            >
              {["💕", "💗", "✨", "🎀", "💝", "🌸"][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Invitation;
