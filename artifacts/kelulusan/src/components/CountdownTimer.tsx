import { useEffect, useRef, useState } from "react";
import { fetchGraduationDate, TANGGAL_KELULUSAN_FALLBACK } from "@/data/siswa";

function calc(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    expired: false,
  };
}

function Block({ value, label }: { value: number; label: string }) {
  const [key, setKey] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value) {
      setKey(value);
      prev.current = value;
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="w-16 h-18 sm:w-20 sm:h-22 flex items-center justify-center rounded"
        style={{
          background: "hsl(0 0% 100%)",
          border: "1px solid hsl(195 20% 86%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,1), 0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <span
          key={key}
          className="number-block anim-tick text-4xl sm:text-5xl font-black"
          style={{ color: "hsl(195 100% 45%)", fontVariantNumeric: "tabular-nums" }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs uppercase tracking-wider"
        style={{ color: "hsl(195 20% 40%)", letterSpacing: "0.15em" }}>
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer() {
  const [target, setTarget] = useState<Date>(TANGGAL_KELULUSAN_FALLBACK);
  const [t, setT] = useState(() => calc(target));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGraduationDate().then(date => {
      setTarget(date);
      setT(calc(date));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (loading) {
     return (
       <div className="flex justify-center items-center py-10 opacity-30">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
       </div>
     );
  }

  return (
    <div className="text-center">
      <p className="text-sm mb-5" style={{ color: "hsl(195 30% 30%)" }}>
        Waktu menuju hari kelulusan &mdash;{" "}
        <span className="font-semibold" style={{ color: "hsl(195 100% 40%)" }}>
          {target.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
        </span>
      </p>

      {t.expired ? (
        <p className="text-2xl font-bold" style={{ color: "hsl(195 100% 45%)" }}>
          Hari kelulusan telah tiba
        </p>
      ) : (
        <div className="flex flex-wrap justify-center items-end gap-3 sm:gap-5">
          <Block value={t.days}    label="Hari"  />
          <span className="text-3xl font-thin mb-5" style={{ color: "hsl(195 20% 70%)" }}>:</span>
          <Block value={t.hours}   label="Jam"   />
          <span className="text-3xl font-thin mb-5" style={{ color: "hsl(195 20% 70%)" }}>:</span>
          <Block value={t.minutes} label="Menit" />
          <span className="text-3xl font-thin mb-5" style={{ color: "hsl(195 20% 70%)" }}>:</span>
          <Block value={t.seconds} label="Detik" />
        </div>
      )}
    </div>
  );
}
