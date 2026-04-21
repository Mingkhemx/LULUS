import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { fetchSiswaByNisn, type Siswa, INFO_SEKOLAH, TANGGAL_KELULUSAN } from "@/data/siswa";
import { ConfettiEffect } from "@/components/ConfettiEffect";

interface Props { nisn: string; }

export function HasilPage({ nisn }: Props) {
  const [, navigate] = useLocation();
  const [confetti, setConfetti] = useState(false);
  const [siswa, setSiswa] = useState<Siswa | null>(null);
  const [loading, setLoading] = useState(true);
  const lulus = siswa?.status === "LULUS";

  useEffect(() => {
    setLoading(true);
    fetchSiswaByNisn(nisn).then((data) => {
      setSiswa(data);
      setLoading(false);
    });
  }, [nisn]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    
    if (lulus) {
      t1 = setTimeout(() => setConfetti(true), 400);
      t2 = setTimeout(() => setConfetti(false), 5500);
    }
    
    return () => {
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
    };
  }, [lulus]);

  const tgl = TANGGAL_KELULUSAN.toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="min-h-screen" style={{
      background: "hsl(195 20% 98%)",
      backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -10%, hsl(195 100% 90%), transparent)",
    }}>
      <ConfettiEffect active={confetti} />

      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <svg className="animate-spin mx-auto mb-4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(195 100% 45%)" strokeWidth="2.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            <p className="text-sm" style={{ color: "hsl(195 20% 50%)" }}>Memuat data siswa...</p>
          </div>
        </div>
      ) : (
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Back link */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm mb-8 group"
          style={{ color: "hsl(195 20% 45%)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="transition-transform group-hover:-translate-x-0.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Kembali ke halaman utama
        </button>

        {/* School header strip */}
        <div className="flex items-center gap-3 mb-8 pb-6"
          style={{ borderBottom: "1px solid hsl(195 20% 86%)" }}>
          <img src="/logo-smk.png" width={52} height={52} alt="Logo" className="drop-shadow-md object-contain w-[52px] h-[52px]" />
          <div>
            <p className="text-xs" style={{ color: "hsl(195 20% 50%)" }}>
              Pemerintah Provinsi · Dinas Pendidikan
            </p>
            <p className="font-semibold text-sm" style={{ color: "hsl(195 100% 30%)" }}>
              {INFO_SEKOLAH.nama}
            </p>
          </div>
        </div>

        {/* Page title */}
        <h1 className="text-2xl font-black mb-8 uppercase tracking-tight"
          style={{ color: "hsl(195 30% 20%)" }}>
          Hasil Kelulusan
        </h1>

        {/* Not found */}
        {!siswa && (
          <div className="rounded-lg p-8 text-center"
            style={{ border: "1px solid hsl(0 60% 85%)", background: "hsl(0 0% 100%)" }}>
            <p className="font-bold text-lg mb-2" style={{ color: "hsl(0 70% 50%)" }}>
              Data Tidak Ditemukan
            </p>
            <p className="text-sm mb-1" style={{ color: "hsl(195 20% 40%)" }}>
              NISN <span className="font-mono">{nisn}</span> tidak terdaftar dalam sistem.
            </p>
            <p className="text-sm mb-6" style={{ color: "hsl(195 20% 45%)" }}>
              Pastikan NISN sudah benar atau hubungi pihak sekolah.
            </p>
            <button onClick={() => navigate("/")}
              className="px-5 py-2 rounded text-sm transition-colors"
              style={{
                border: "1px solid hsl(195 20% 80%)",
                color: "hsl(195 30% 40%)",
                background: "transparent",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "hsl(195 20% 95%)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
              Coba lagi
            </button>
          </div>
        )}

        {/* Found */}
        {siswa && (
          <div className="space-y-4">
             {/* Status card */}
             <div className="rounded-lg overflow-hidden shadow-sm"
              style={{ border: `1px solid ${lulus ? "hsl(120 40% 70%)" : "hsl(0 40% 80%)"}`, background: "hsl(0 0% 100%)" }}>

              {/* Status header */}
              <div className="px-6 py-6 flex items-center justify-between"
                style={{
                  background: lulus ? "hsl(120 50% 95%)" : "hsl(0 50% 97%)",
                  borderBottom: `1px solid ${lulus ? "hsl(120 30% 85%)" : "hsl(0 30% 90%)"}`,
                }}>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1.5"
                    style={{ color: lulus ? "hsl(120 80% 30%)" : "hsl(0 70% 50%)", letterSpacing: "0.2em" }}>
                    Dinyatakan
                  </p>
                  <p className="text-3xl font-black"
                    style={{ color: lulus ? "hsl(120 75% 35%)" : "hsl(0 70% 45%)" }}>
                    {lulus ? "LULUS" : "TIDAK LULUS"}
                  </p>
                </div>

                {/* Stamp */}
                <div className="flex-shrink-0 w-18 h-18 rounded-full flex items-center justify-center"
                  style={{
                    width: "64px",
                    height: "64px",
                    border: `3px double ${lulus ? "hsl(120 80% 40%)" : "hsl(0 70% 50%)"}`,
                    transform: "rotate(-6deg)",
                  }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke={lulus ? "hsl(120 80% 40%)" : "hsl(0 70% 50%)"}
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {lulus
                      ? <polyline points="20 6 9 17 4 12"/>
                      : <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                    }
                  </svg>
                </div>
              </div>

              {/* Student details */}
              <div className="p-6 flex flex-col sm:flex-row gap-6 relative" style={{ background: "hsl(0 0% 100%)" }}>
                <div className="flex-1">
                  <div className="mb-5">
                    <p className="text-xs mb-0.5 uppercase tracking-wider"
                      style={{ color: "hsl(195 20% 50%)", letterSpacing: "0.15em" }}>
                      Nama Lengkap
                    </p>
                    <p className="text-2xl font-bold" style={{ color: "hsl(195 40% 20%)" }}>
                      {siswa.nama}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {[
                      { label: "NISN",            value: siswa.nisn },
                      { label: "Kelas",           value: siswa.kelas },
                      { label: "Program Studi",   value: siswa.jurusan },
                      { label: "Nilai Rata-rata", value: siswa.nilai?.toFixed(1) ?? "—" },
                      ...(siswa.predikat ? [{ label: "Predikat", value: siswa.predikat }] : []),
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-xs mb-0.5" style={{ color: "hsl(195 20% 50%)" }}>{label}</p>
                        <p className="text-sm font-medium" style={{ color: "hsl(195 30% 30%)" }}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photo section */}
                <div className="flex-shrink-0 flex items-start sm:justify-center">
                  <div className="w-24 h-32 sm:w-28 sm:h-36 rounded overflow-hidden shadow-sm"
                    style={{ background: "hsl(195 20% 96%)", border: "1px solid hsl(195 20% 86%)" }}>
                    {siswa.foto ? (
                      <img src={siswa.foto} alt={`Foto ${siswa.nama}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <svg className="w-full h-full pt-4 px-2" style={{ color: "hsl(195 20% 85%)" }} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Official note */}
            <div className="rounded-lg px-5 py-4"
              style={{
                background: "hsl(195 100% 96%)",
                border: "1px solid hsl(195 100% 88%)",
              }}>
              <p className="text-xs leading-relaxed" style={{ color: "hsl(195 20% 40%)" }}>
                Ditetapkan di {INFO_SEKOLAH.nama} pada {tgl}.
                Kepala Sekolah: <span style={{ color: "hsl(195 30% 30%)" }}>{INFO_SEKOLAH.kepalaSekolah}</span>
              </p>
              <p className="text-xs mt-1.5" style={{ color: "hsl(195 40% 30%)" }}>
                {lulus
                  ? "Siswa yang bersangkutan dinyatakan telah memenuhi seluruh persyaratan kelulusan."
                  : "Siswa yang bersangkutan belum memenuhi persyaratan kelulusan. Silakan menghubungi Tata Usaha untuk informasi lebih lanjut."}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button onClick={() => navigate("/")}
                className="flex-1 py-2.5 rounded text-sm transition-colors"
                style={{
                  border: "1px solid hsl(195 20% 80%)",
                  color: "hsl(195 30% 35%)",
                  background: "transparent",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "hsl(195 20% 95%)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                Cari NISN Lain
              </button>
              {lulus && (
                <button
                  onClick={() => { setConfetti(true); setTimeout(() => setConfetti(false), 5000); }}
                  className="flex-1 py-2.5 rounded text-sm font-semibold transition-colors"
                  style={{ background: "hsl(120 70% 40%)", color: "hsl(0 0% 100%)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "hsl(120 70% 35%)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "hsl(120 70% 40%)"; }}>
                  Rayakan
                </button>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 text-center"
          style={{ borderTop: "1px solid hsl(195 20% 86%)" }}>
          <p className="text-xs" style={{ color: "hsl(195 20% 50%)" }}>
            Sistem Informasi Kelulusan &mdash; {INFO_SEKOLAH.nama}
          </p>
        </div>
      </div>
      )}
    </div>
  );
}
