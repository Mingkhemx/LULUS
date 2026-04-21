import { INFO_SEKOLAH, TANGGAL_KELULUSAN } from "@/data/siswa";

export function Header() {
  const tgl = TANGGAL_KELULUSAN.toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <header className="relative pt-10 pb-6 px-4">
      {/* Top colored bar */}
      <div className="h-1 w-full mb-8 rounded-full" style={{
        background: "linear-gradient(90deg, #1aa38b 0%, #00bfff 50%, #1aa38b 100%)"
      }} />

      {/* School identity row */}
      <div className="flex flex-col sm:flex-row items-center gap-5 mb-8">
        <img src="/logo-smk.png" width={88} height={88} alt="Logo Sekolah" className="drop-shadow-lg object-contain w-[88px] h-[88px]" />
        <div className="text-center sm:text-left">
          <div className="text-xs tracking-widest uppercase mb-1"
            style={{ color: "hsl(195 100% 40%)", letterSpacing: "0.2em" }}>
            Pemerintah Provinsi · Dinas Pendidikan
          </div>
          <h2 className="text-xl sm:text-2xl font-bold leading-tight"
            style={{ color: "hsl(195 100% 35%)" }}>
            {INFO_SEKOLAH.nama}
          </h2>
          <div className="text-sm mt-1" style={{ color: "hsl(195 20% 50%)" }}>
            Akreditasi B &nbsp;·&nbsp; NPSN 20344570 &nbsp;·&nbsp; Tahun Pelajaran {INFO_SEKOLAH.tahunAjaran}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-b py-3 mb-6 text-center"
        style={{ borderColor: "hsl(195 30% 85%)" }}>
        <p className="text-xs uppercase tracking-widest"
          style={{ color: "hsl(195 100% 45%)", letterSpacing: "0.25em" }}>
          Pengumuman Resmi
        </p>
      </div>

      {/* Main title */}
      <div className="text-center mb-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight"
          style={{
            background: "linear-gradient(180deg, hsl(195 100% 45%) 0%, hsl(195 100% 30%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
          Pengumuman<br/>Kelulusan
        </h1>
        <p className="mt-3 text-sm" style={{ color: "hsl(195 20% 50%)" }}>
          Hari {tgl}
        </p>
      </div>
    </header>
  );
}
