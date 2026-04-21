import { useEffect, useState } from "react";
import { fetchAllSiswa, insertSiswa, deleteSiswa, type Siswa, INFO_SEKOLAH, fetchGraduationDate, updateGraduationDate } from "@/data/siswa";

export function AdminPage() {
  const [siswaList, setSiswaList] = useState<Siswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // State untuk pengaturan tanggal
  const [targetDate, setTargetDate] = useState("");
  const [settingLoading, setSettingLoading] = useState(false);

  // Field Form Siswa
  const [nisn, setNisn] = useState("");
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [foto, setFoto] = useState("");
  const [nilai, setNilai] = useState("");
  const [predikat, setPredikat] = useState("");
  const [status, setStatus] = useState<"LULUS" | "TIDAK_LULUS">("LULUS");

  // Memuat data awal
  async function load() {
    setLoading(true);
    const [siswaData, dateData] = await Promise.all([
      fetchAllSiswa(),
      fetchGraduationDate()
    ]);
    setSiswaList(siswaData);
    // Format tanggal ke YYYY-MM-DDTHH:mm untuk input datetime-local
    const formattedDate = dateData.toISOString().slice(0, 16);
    setTargetDate(formattedDate);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  // Reset form setelah simpan
  function resetForm() {
    setNisn(""); setNama(""); setKelas(""); setJurusan("");
    setFoto(""); setNilai(""); setPredikat(""); setStatus("LULUS");
  }

  // Update tanggal kelulusan
  async function handleUpdateDate() {
    if (!targetDate) return;
    setSettingLoading(true);
    const res = await updateGraduationDate(targetDate);
    setSettingLoading(false);
    if (res.success) {
      setMsg({ type: "ok", text: "Tanggal kelulusan berhasil diperbarui!" });
    } else {
      setMsg({ type: "err", text: res.error || "Gagal memperbarui tanggal." });
    }
  }

  // Submit data siswa baru
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nisn || !nama || !kelas || !jurusan) {
      setMsg({ type: "err", text: "NISN, Nama, Kelas, dan Jurusan wajib diisi!" });
      return;
    }
    setSubmitting(true);
    const result = await insertSiswa({
      nisn,
      nama,
      kelas,
      jurusan,
      foto: foto || null,
      nilai: nilai ? parseFloat(nilai) : null,
      predikat: predikat || null,
      status,
    });
    setSubmitting(false);
    if (result.success) {
      setMsg({ type: "ok", text: `Siswa "${nama}" berhasil ditambahkan!` });
      resetForm();
      setShowForm(false);
      load();
    } else {
      setMsg({ type: "err", text: result.error || "Gagal menambahkan data." });
    }
  }

  // Hapus data siswa
  async function handleDelete(s: Siswa) {
    if (!confirm(`Hapus data ${s.nama} (${s.nisn})?`)) return;
    const result = await deleteSiswa(s.nisn);
    if (result.success) {
      setMsg({ type: "ok", text: `Data ${s.nama} berhasil dihapus.` });
      load();
    } else {
      setMsg({ type: "err", text: result.error || "Gagal menghapus." });
    }
  }

  // Styling Input Dasar
  const inputStyle: React.CSSProperties = {
    background: "hsl(195 20% 98%)",
    border: "1px solid hsl(195 20% 86%)",
    color: "hsl(195 30% 20%)",
    borderRadius: "6px",
    padding: "8px 12px",
    fontSize: "14px",
    width: "100%",
    outline: "none",
  };

  // Styling Label
  const labelStyle: React.CSSProperties = {
    color: "hsl(195 20% 40%)",
    fontSize: "12px",
    fontWeight: 600,
    marginBottom: "4px",
    display: "block",
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(195 20% 97%)" }}>
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Bagian Atas / Header */}
        <div className="flex items-center gap-4 mb-6">
          <img src="/logo-smk.png" width={52} height={52} alt="Logo" className="object-contain" />
          <div>
            <h1 className="text-xl font-bold" style={{ color: "hsl(195 100% 30%)" }}>
              Panel Admin — {INFO_SEKOLAH.nama}
            </h1>
            <p className="text-xs" style={{ color: "hsl(195 20% 50%)" }}>
              Kelola Data & Pengaturan Kelulusan
            </p>
          </div>
        </div>

        {/* Pesan Notifikasi */}
        {msg && (
          <div className="rounded-lg px-4 py-3 mb-4 text-sm font-medium" style={{
            background: msg.type === "ok" ? "hsl(120 50% 95%)" : "hsl(0 50% 95%)",
            border: `1px solid ${msg.type === "ok" ? "hsl(120 40% 80%)" : "hsl(0 40% 80%)"}`,
            color: msg.type === "ok" ? "hsl(120 60% 30%)" : "hsl(0 60% 40%)",
          }}>
            {msg.text}
            <button onClick={() => setMsg(null)} className="float-right font-bold text-lg leading-none">&times;</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Statistik Singkat */}
          <div className="md:col-span-2 rounded-lg p-5 flex items-center justify-between" style={{ background: "#fff", border: "1px solid hsl(195 20% 86%)" }}>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "hsl(195 20% 50%)" }}>Total Database</p>
              <h3 className="text-2xl font-black" style={{ color: "hsl(195 100% 30%)" }}>{siswaList.length} <span className="text-sm font-normal">Siswa</span></h3>
            </div>
            <button
              onClick={() => { setShowForm(!showForm); setMsg(null); }}
              className="px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm active:scale-95"
              style={{ background: "hsl(195 100% 45%)", color: "#fff" }}
            >
              {showForm ? "Tutup Form" : "+ Tambah Siswa"}
            </button>
          </div>

          {/* Pengaturan Countdown */}
          <div className="rounded-lg p-5" style={{ background: "#fff", border: "1px solid hsl(195 20% 86%)" }}>
            <label style={labelStyle}>Set Waktu Kelulusan</label>
            <div className="flex flex-col gap-2">
              <input 
                type="datetime-local" 
                value={targetDate} 
                onChange={e => setTargetDate(e.target.value)}
                style={inputStyle}
              />
              <button 
                onClick={handleUpdateDate}
                disabled={settingLoading}
                className="w-full py-2 rounded text-xs font-bold transition-colors"
                style={{ 
                  background: settingLoading ? "hsl(195 10% 90%)" : "hsl(195 20% 20%)", 
                  color: "#fff" 
                }}
              >
                {settingLoading ? "Sedang Update..." : "Simpan Waktu"}
              </button>
            </div>
          </div>
        </div>

        {/* Form Tambah Siswa */}
        {showForm && (
          <div className="rounded-lg p-6 mb-6 shadow-sm border-2 animate-in fade-in slide-in-from-top-4" style={{ background: "#fff", borderColor: "hsl(195 100% 45%)" }}>
            <h2 className="font-bold text-sm mb-4" style={{ color: "hsl(195 100% 30%)" }}>Input Data Siswa Baru</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label style={labelStyle}>NISN *</label>
                  <input type="text" value={nisn} onChange={e => setNisn(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="10 digit" style={inputStyle} inputMode="numeric" />
                </div>
                <div>
                  <label style={labelStyle}>Nama Lengkap *</label>
                  <input type="text" value={nama} onChange={e => setNama(e.target.value)} placeholder="Nama siswa" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Kelas *</label>
                  <select value={kelas} onChange={e => setKelas(e.target.value)} style={inputStyle}>
                    <option value="">— Pilih Kelas —</option>
                    {["DKV 1", "DKV 2", "DKV 3", "TJKT 1", "TJKT 2", "TKP 1", "TKP 2", "DPIB 1", "DPIB 2"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Jurusan / Program Studi *</label>
                  <select value={jurusan} onChange={e => setJurusan(e.target.value)} style={inputStyle}>
                    <option value="">— Pilih Jurusan —</option>
                    {[
                      "Desain Komunikasi Visual", 
                      "Teknik Jaringan Komputer dan Telekomunikasi", 
                      "Teknik Konstruksi dan Perumahan", 
                      "Desain Pemodelan dan Informasi Bangunan"
                    ].map(j => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>URL Foto (opsional)</label>
                  <input type="text" value={foto} onChange={e => setFoto(e.target.value)} placeholder="https://..." style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Nilai Rata-rata (opsional)</label>
                  <input type="number" step="0.1" min="0" max="100" value={nilai} onChange={e => setNilai(e.target.value)} placeholder="85.5" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Predikat (opsional)</label>
                  <select value={predikat} onChange={e => setPredikat(e.target.value)} style={inputStyle}>
                    <option value="">— Pilih —</option>
                    <option value="Sangat Baik">Sangat Baik</option>
                    <option value="Baik">Baik</option>
                    <option value="Cukup">Cukup</option>
                    <option value="Kurang">Kurang</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Status *</label>
                  <select value={status} onChange={e => setStatus(e.target.value as "LULUS" | "TIDAK_LULUS")} style={inputStyle}>
                    <option value="LULUS">LULUS</option>
                    <option value="TIDAK_LULUS">TIDAK LULUS</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={submitting}
                  className="px-8 py-2.5 rounded text-sm font-bold transition-colors shadow-md"
                  style={{ background: submitting ? "hsl(195 15% 85%)" : "hsl(120 70% 40%)", color: "#fff" }}>
                  {submitting ? "Menyimpan..." : "Simpan Data"}
                </button>
                <button type="button" onClick={() => { setShowForm(false); resetForm(); }}
                  className="px-8 py-2.5 rounded text-sm font-medium transition-colors"
                  style={{ border: "1px solid hsl(195 20% 80%)", color: "hsl(195 30% 40%)", background: "transparent" }}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Daftar Tabel */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: "hsl(195 20% 40%)" }}>Database Siswa</h2>
          <button onClick={load} className="text-xs font-bold py-1 px-3 rounded hover:bg-white transition-colors" style={{ color: "hsl(195 100% 40%)" }}>Refresh Tabel</button>
        </div>

        {loading ? (
          <div className="text-center py-20 rounded-lg" style={{ background: "#fff", border: "1px dotted hsl(195 20% 80%)" }}>
            <div className="inline-block animate-spin mb-4" style={{ border: "3px solid hsl(195 100% 85%)", borderTopColor: "hsl(195 100% 45%)", borderRadius: "50%", width: "24px", height: "24px" }}></div>
            <p className="text-sm font-medium" style={{ color: "hsl(195 20% 50%)" }}>Sinkronisasi data...</p>
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden shadow-sm" style={{ background: "#fff", border: "1px solid hsl(195 20% 86%)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "hsl(195 20% 96%)", borderBottom: "1px solid hsl(195 20% 86%)" }}>
                    <th className="px-4 py-3 text-left font-bold" style={{ color: "hsl(195 30% 30%)" }}>NISN</th>
                    <th className="px-4 py-3 text-left font-bold" style={{ color: "hsl(195 30% 30%)" }}>Nama</th>
                    <th className="px-4 py-3 text-left font-bold" style={{ color: "hsl(195 30% 30%)" }}>Kelas</th>
                    <th className="px-4 py-3 text-left font-bold" style={{ color: "hsl(195 30% 30%)" }}>Jurusan</th>
                    <th className="px-4 py-3 text-center font-bold" style={{ color: "hsl(195 30% 30%)" }}>Status</th>
                    <th className="px-4 py-3 text-center font-bold" style={{ color: "hsl(195 30% 30%)" }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {siswaList.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-12 text-center" style={{ color: "hsl(195 20% 50%)" }}>Database kosong. Silakan tambah data siswa.</td></tr>
                  ) : siswaList.map((s) => (
                    <tr key={s.nisn} style={{ borderBottom: "1px solid hsl(195 20% 92%)" }}
                      className="hover:bg-[hsl(195_20%_98%)] transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-bold" style={{ color: "hsl(195 20% 40%)" }}>{s.nisn}</td>
                      <td className="px-4 py-3 font-bold" style={{ color: "hsl(195 30% 20%)" }}>{s.nama}</td>
                      <td className="px-4 py-3">{s.kelas}</td>
                      <td className="px-4 py-3 text-xs">{s.jurusan}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-tighter" style={{
                          background: s.status === "LULUS" ? "hsl(120 50% 92%)" : "hsl(0 50% 92%)",
                          color: s.status === "LULUS" ? "hsl(120 70% 30%)" : "hsl(0 70% 40%)",
                          border: `1px solid ${s.status === "LULUS" ? "hsl(120 40% 80%)" : "hsl(0 40% 80%)"}`
                        }}>
                          {s.status === "LULUS" ? "LULUS" : "TIDAK LULUS"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => handleDelete(s)}
                          className="text-[10px] font-bold px-3 py-1 rounded transition-all hover:bg-red-50"
                          style={{ color: "hsl(0 70% 50%)", border: "1px solid hsl(0 50% 85%)" }}>
                          HAPUS
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bagian Bawah */}
        <div className="mt-12 text-center opacity-40">
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "hsl(195 20% 30%)" }}>
            {INFO_SEKOLAH.nama} &bull; Panel Administrasi v2.0
          </p>
        </div>
      </div>
    </div>
  );
}
