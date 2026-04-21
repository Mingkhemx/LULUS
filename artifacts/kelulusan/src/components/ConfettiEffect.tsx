import { useEffect, useState } from "react";

interface Piece { id: number; x: number; color: string; size: number; dur: number; del: number; round: boolean; }

const COLORS = ["#c8a028","#a83232","#2a5298","#228b44","#e8c040","#e05050","#4070d0"];

export function ConfettiEffect({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (!active) return;
    setPieces(
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[i % COLORS.length],
        size: Math.random() * 8 + 5,
        dur: Math.random() * 2.5 + 2,
        del: Math.random() * 1.5,
        round: Math.random() > 0.5,
      }))
    );
    const t = setTimeout(() => setPieces([]), 5000);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}%`,
            top: 0,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.round ? "50%" : "2px",
            "--dur": `${p.dur}s`,
            "--del": `${p.del}s`,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}
