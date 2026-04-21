import { Header } from "@/components/Header";
import { CountdownTimer } from "@/components/CountdownTimer";
import { SearchNISN } from "@/components/SearchNISN";
import { INFO_SEKOLAH } from "@/data/siswa";

export function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "hsl(195 20% 98%)",
        backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -10%, hsl(195 100% 90%), transparent)",
      }}
    >
      <div className="max-w-2xl mx-auto px-4 pb-16">

        {/* Header */}
        <Header />

        {/* Countdown */}
        <section className="mb-8">
          <div className="rounded-lg px-6 py-6"
            style={{
              background: "hsl(0 0% 100%)",
              border: "1px solid hsl(195 20% 86%)",
            }}>
            <p className="text-xs uppercase tracking-widest mb-5"
              style={{ color: "hsl(195 20% 45%)", letterSpacing: "0.2em" }}>
              Hitung Mundur
            </p>
            <CountdownTimer />
          </div>
        </section>

        {/* Notice box */}
        <section className="mb-8">
          <div className="rounded-lg px-5 py-4 flex gap-3"
            style={{
              background: "hsl(195 100% 95%)",
              border: "1px solid hsl(195 100% 85%)",
            }}>
            <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="hsl(195 100% 45%)" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
            </svg>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(195 100% 30%)" }}>
              Pengumuman ini bersifat resmi. Apabila terdapat perbedaan data, harap menghubungi
              Tata Usaha {INFO_SEKOLAH.nama} pada jam kerja.
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="mb-12">
          <SearchNISN />
        </section>

        {/* Footer */}
        <footer style={{ borderTop: "1px solid hsl(195 20% 85%)" }}
          className="pt-6 space-y-1.5">
          <p className="text-xs text-center" style={{ color: "hsl(195 20% 50%)" }}>
            {INFO_SEKOLAH.nama} &nbsp;&bull;&nbsp; Tahun Pelajaran {INFO_SEKOLAH.tahunAjaran}
          </p>
          <p className="text-xs text-center" style={{ color: "hsl(195 20% 45%)" }}>
            Kepala Sekolah: {INFO_SEKOLAH.kepalaSekolah}
          </p>
          <p className="text-xs text-center" style={{ color: "hsl(195 20% 40%)" }}>
            &copy; {new Date().getFullYear()} &mdash; Sistem Informasi Kelulusan
          </p>
        </footer>
      </div>
    </div>
  );
}
