import React, { useEffect, useRef, useState } from "react";
import VintageBow from "@/components/VintageBow";

/* ─── Photo data (placeholders — replace src with real uploads) ─── */
const photos = [
  { src: "IMG_4912.JPG.jpeg", caption: "Us being ridiculously cute 💕" },
  { src: "IMG_3201.PNG", caption: "My favorite person in the world 🌸" },
  { src: "IMG_2747.JPG.jpeg", caption: "Every moment with you is magic ✨" },
  { src: "IMG_7889.jpg", caption: "Forever & always 💗" },
];

/* ─── Scroll-triggered fade-in hook ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

const RevealDiv: React.FC<{ children: React.ReactNode; className?: string; delay?: string }> = ({
  children, className = "", delay = "0s"
}) => {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
};

/* ─── Hearts Section ─── */
const FlyingHearts: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const progress = Math.max(0, -rect.top / (rect.height || 1));
        setScrollY(progress);
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const hearts = Array.from({ length: 18 }).map((_, i) => ({
    emoji: ["💕", "💗", "💝", "🌸", "💖", "❤️"][i % 6],
    left: `${5 + (i * 5.3) % 90}%`,
    size: 18 + (i % 4) * 8,
    delay: i * 0.15,
  }));

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Bows */}
      <VintageBow variant="ribbon" size="lg" className="absolute top-6 left-6 opacity-40 animate-sway hidden sm:block" />
      <VintageBow variant="rosette" size="md" className="absolute top-10 right-10 opacity-35" />
      <VintageBow variant="simple" size="sm" className="absolute bottom-20 left-10 opacity-30 hidden md:block" />
      <VintageBow variant="ribbon" size="sm" className="absolute bottom-10 right-6 opacity-40 animate-sway" />

      {/* Hearts */}
      {hearts.map((h, i) => (
        <span
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: h.left,
            bottom: `${10 + (i % 5) * 15}%`,
            fontSize: h.size,
            transform: `translateY(${-scrollY * (200 + i * 30)}px)`,
            transition: "transform 0.1s linear",
            opacity: Math.max(0, 1 - scrollY * 1.5),
          }}
        >
          {h.emoji}
        </span>
      ))}

      {/* Title */}
      <h1 className="relative z-10 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground text-center px-6 italic leading-tight">
        Everyday is Valentine's
        <br />
        <span className="font-script text-accent text-5xl sm:text-6xl md:text-7xl lg:text-8xl not-italic">
          with you
        </span>
      </h1>
    </section>
  );
};

/* ─── Photo Gallery ─── */
const PhotoGallery: React.FC = () => (
  <section className="py-20 px-4 bg-warm-beige/40">
    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">
      {photos.map((photo, i) => (
        <RevealDiv key={i} delay={`${i * 0.15}s`} className="flex flex-col items-center">
          {/* Vintage frame */}
          <div
            className="relative bg-card p-3 sm:p-4 shadow-xl border-4 border-accent/20 rounded"
            style={{
              transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
              boxShadow: "6px 6px 20px hsl(350 40% 45% / 0.15), inset 0 0 30px hsl(36 33% 96% / 0.3)",
            }}
          >
            {/* Inner ornate border */}
            <div className="border-2 border-accent/10 p-1 rounded-sm">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-48 sm:h-64 object-cover rounded-sm"
                loading="lazy"
              />
            </div>
          </div>
          <p className="mt-4 font-script text-xl sm:text-2xl text-foreground/80 text-center">
            {photo.caption}
          </p>
        </RevealDiv>
      ))}
    </div>
  </section>
);

/* ─── Princess Message ─── */
const PrincessMessage: React.FC = () => {
  const scrollToItinerary = () => {
    document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 px-4 bg-background relative">
      <VintageBow variant="rosette" size="md" className="absolute top-6 right-10 opacity-30 hidden sm:block" />
      <VintageBow variant="simple" size="sm" className="absolute bottom-6 left-8 opacity-25" />

      <RevealDiv className="max-w-2xl mx-auto">
        <div
          className="bg-card p-8 sm:p-12 rounded-lg shadow-lg border border-accent/20 relative"
          style={{
            boxShadow: "0 10px 40px hsl(350 40% 45% / 0.1)",
          }}
        >
          {/* Decorative top bow */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <VintageBow variant="ribbon" size="md" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl text-foreground text-center mb-6 pt-4 italic">
            👑 Princess for a Day
          </h2>
          <p className="font-body text-lg sm:text-xl text-foreground/80 text-center leading-relaxed italic">
            "You've been officially appointed Princess for a Day. Duties include looking gorgeous,
            holding my hand, and allowing me to spoil you dramatically."
          </p>
          <div className="flex justify-center mt-8">
            <button
              onClick={scrollToItinerary}
              className="px-8 py-3 bg-primary text-primary-foreground font-display text-lg rounded-lg
                         shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105
                         border border-burgundy/20"
            >
              Tell me more about it 💌
            </button>
          </div>
        </div>
      </RevealDiv>
    </section>
  );
};

/* ─── Itinerary ─── */
const Itinerary: React.FC = () => {
  const items = [
    { time: "📍", text: "I cannot disclose where we're going. What I can disclose is that you should prepare to feel adored, slightly confused, and very handsome." },
    { time: "1:00 PM", text: "You get picked up by your very professional chauffeur (me)" },
    { time: "1:00:02 PM", text: "You tell me how amazing I am" },
    { time: "1:03 PM", text: "I get kisses and you get to relax hehehe" },
    { time: "Rest of the day", text: "Classified but fun, I promise. 🤫" },
  ];

  return (
    <section id="itinerary" className="py-20 px-4 bg-warm-beige/40 relative">
      <VintageBow variant="ribbon" size="sm" className="absolute top-8 left-6 opacity-30 animate-sway" />
      <VintageBow variant="rosette" size="sm" className="absolute bottom-10 right-8 opacity-25" />

      <RevealDiv className="max-w-2xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl text-foreground text-center mb-12 italic">
          📋 The Itinerary
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-accent/30 hidden sm:block" />

          <div className="space-y-6">
            {items.map((item, i) => (
              <RevealDiv key={i} delay={`${i * 0.12}s`}>
                <div className="flex gap-4 items-start sm:pl-14 relative">
                  {/* Timeline dot */}
                  <div className="hidden sm:block absolute left-4 top-3 w-4 h-4 rounded-full bg-primary border-2 border-card shadow" />

                  <div className="bg-card p-5 rounded-lg shadow-md border border-accent/15 flex-1">
                    <span className="font-display text-sm font-semibold text-primary block mb-1">
                      {item.time}
                    </span>
                    <p className="font-body text-foreground/80 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </RevealDiv>
    </section>
  );
};

/* ─── Footer ─── */
const Footer: React.FC = () => (
  <footer className="py-16 px-4 bg-background relative overflow-hidden">
    <VintageBow variant="ribbon" size="md" className="absolute top-4 left-1/4 opacity-25 animate-sway" />
    <VintageBow variant="rosette" size="sm" className="absolute top-8 right-1/4 opacity-20" />

    <div className="text-center">
      <div className="text-4xl mb-4">💕 🎀 💕</div>
      <p className="font-script text-4xl sm:text-5xl text-foreground">
        With loveee, Krishuuu {"<3"}
      </p>
    </div>
  </footer>
);

/* ─── Main Page ─── */
const Valentine: React.FC = () => (
  <main className="min-h-screen">
    <FlyingHearts />
    <PhotoGallery />
    <PrincessMessage />
    <Itinerary />
    <Footer />
  </main>
);

export default Valentine;
