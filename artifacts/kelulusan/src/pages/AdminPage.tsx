import { useEffect, useState } from "react";
import { fetchAllSiswa, insertSiswa, deleteSiswa, type Siswa, INFO_SEKOLAH } from "@/data/siswa";

export function AdminPage() {
  const [siswaList, setSiswaList] = useState<Siswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // Form fields
  const [nisn, setNisn] = useState("");
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [foto, setFoto] = useState("");
  const [nilai, setNilai] = useState("");
  const [predikat, setPredikat] = useState("");
  const [status, setStatus] = useState<"LULUS" | "TIDAK_LULUS">("LULUS");

  async function load() {
    setLoading(true);
    const data = await fetchAllSiswa();
    setSiswaList(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function resetForm() {
    setNisn(""); setNama(""); setKelas(""); setJurusan("");
    setFoto(""); setNilai(""); setPredikat(""); setStatus("LULUS");
  }

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

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <img src="/logo-smk.png" width={52} height={52} alt="Logo" className="object-contain" />
          <div>
            <h1 className="text-xl font-bold" style={{ color: "hsl(195 100% 30%)" }}>
              Panel Admin — {INFO_SEKOLAH.nama}
            </h1>
            <p className="text-xs" style={{ color: "hsl(195 20% 50%)" }}>
              Kelola Data Siswa Kelulusan
            </p>
          </div>
        </div>

        {/* Message */}
        {msg && (
          <div className="rounded-lg px-4 py-3 mb-4 text-sm" style={{
            background: msg.type === "ok" ? "hsl(120 50% 95%)" : "hsl(0 50% 95%)",
            border: `1px solid ${msg.type === "ok" ? "hsl(120 40% 80%)" : "hsl(0 40% 80%)"}`,
            color: msg.type === "ok" ? "hsl(120 60% 30%)" : "hsl(0 60% 40%)",
          }}>
            {msg.text}
            <button onClick={() => setMsg(null)} className="float-right font-bold">&times;</button>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => { setShowForm(!showForm); setMsg(null); }}
            className="px-4 py-2 rounded text-sm font-semibold transition-colors"
            style={{ background: "hsl(195 100% 45%)", color: "#fff" }}
          >
            {showForm ? "Tutup Form" : "+ Tambah Siswa"}
          </button>
          <span className="text-sm" style={{ color: "hsl(195 20% 50%)" }}>
            Total: <strong>{siswaList.length}</strong> siswa
          </span>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="rounded-lg p-6 mb-6 shadow-sm" style={{ background: "#fff", border: "1px solid hsl(195 20% 86%)" }}>
            <h2 className="font-bold text-sm mb-4" style={{ color: "hsl(195 100% 30%)" }}>Tambah Siswa Baru</h2>
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
                  <input type="text" value={kelas} onChange={e => setKelas(e.target.value)} placeholder="XII IPA 1" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Jurusan / Program Studi *</label>
                  <input type="text" value={jurusan} onChange={e => setJurusan(e.target.value)} placeholder="Teknik Komputer" style={inputStyle} />
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
              <div className="flex gap-3">
                <button type="submit" disabled={submitting}
                  className="px-5 py-2 rounded text-sm font-semibold transition-colors"
                  style={{ background: submitting ? "hsl(195 15% 85%)" : "hsl(120 70% 40%)", color: "#fff" }}>
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
                <button type="button" onClick={() => { setShowForm(false); resetForm(); }}
                  className="px-5 py-2 rounded text-sm transition-colors"
                  style={{ border: "1px solid hsl(195 20% 80%)", color: "hsl(195 30% 40%)", background: "transparent" }}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-sm" style={{ color: "hsl(195 20% 50%)" }}>Memuat data...</p>
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden shadow-sm" style={{ background: "#fff", border: "1px solid hsl(195 20% 86%)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "hsl(195 20% 96%)", borderBottom: "1px solid hsl(195 20% 86%)" }}>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: "hsl(195 30% 30%)" }}>NISN</th>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: "hsl(195 30% 30%)" }}>Nama</th>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: "hsl(195 30% 30%)" }}>Kelas</th>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: "hsl(195 30% 30%)" }}>Jurusan</th>
                    <th className="px-4 py-3 text-center font-semibold" style={{ color: "hsl(195 30% 30%)" }}>Nilai</th>
                    <th className="px-4 py-3 text-center font-semibold" style={{ color: "hsl(195 30% 30%)" }}>Status</th>
                    <th className="px-4 py-3 text-center font-semibold" style={{ color: "hsl(195 30% 30%)" }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {siswaList.length === 0 ? (
                    <tr><td colSpan={7} className="px-4 py-8 text-center" style={{ color: "hsl(195 20% 50%)" }}>Belum ada data siswa.</td></tr>
                  ) : siswaList.map((s) => (
                    <tr key={s.nisn} style={{ borderBottom: "1px solid hsl(195 20% 92%)" }}
                      className="hover:bg-[hsl(195_20%_98%)] transition-colors">
                      <td className="px-4 py-3 font-mono text-xs">{s.nisn}</td>
                      <td className="px-4 py-3 font-medium" style={{ color: "hsl(195 30% 20%)" }}>{s.nama}</td>
                      <td className="px-4 py-3">{s.kelas}</td>
                      <td className="px-4 py-3">{s.jurusan}</td>
                      <td className="px-4 py-3 text-center">{s.nilai?.toFixed(1) ?? "—"}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 rounded text-xs font-bold" style={{
                          background: s.status === "LULUS" ? "hsl(120 50% 92%)" : "hsl(0 50% 92%)",
                          color: s.status === "LULUS" ? "hsl(120 70% 30%)" : "hsl(0 70% 40%)",
                        }}>
                          {s.status === "LULUS" ? "LULUS" : "TIDAK LULUS"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => handleDelete(s)}
                          className="text-xs px-2 py-1 rounded transition-colors"
                          style={{ color: "hsl(0 70% 50%)", border: "1px solid hsl(0 50% 85%)" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "hsl(0 50% 95%)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs" style={{ color: "hsl(195 20% 55%)" }}>
            Panel Admin — {INFO_SEKOLAH.nama} &mdash; Tahun Pelajaran {INFO_SEKOLAH.tahunAjaran}
          </p>
        </div>
      </div>
    </div>
  );
}
