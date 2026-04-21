import { useRef, useState } from "react";
import { useLocation } from "wouter";

export function SearchNISN() {
  const [nisn, setNisn] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, navigate] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const val = nisn.trim();
    if (!val) { setError("NISN tidak boleh kosong"); return; }
    if (!/^\d{10}$/.test(val)) { setError("NISN harus 10 digit angka"); return; }
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    navigate(`/hasil/${val}`);
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="rounded-lg overflow-hidden"
        style={{ border: "1px solid hsl(195 20% 86%)" }}>

        {/* Card header */}
        <div className="px-6 py-4 flex items-center gap-3"
          style={{ background: "hsl(0 0% 100%)", borderBottom: "1px solid hsl(195 20% 86%)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="hsl(195 100% 45%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <h3 className="font-semibold text-sm" style={{ color: "hsl(195 100% 30%)" }}>
            Cek Status Kelulusan
          </h3>
        </div>

        <div className="p-6" style={{ background: "hsl(0 0% 100%)" }}>
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-xs mb-1.5"
                style={{ color: "hsl(195 20% 40%)" }}>
                Nomor Induk Siswa Nasional (NISN)
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  value={nisn}
                  onChange={e => {
                    setNisn(e.target.value.replace(/\D/g, "").slice(0, 10));
                    setError("");
                  }}
                  placeholder="Masukkan 10 digit NISN"
                  className="w-full px-4 py-2.5 text-sm rounded outline-none transition-colors duration-200"
                  style={{
                    background: "hsl(195 20% 98%)",
                    border: `1px solid ${error ? "hsl(0 62% 45%)" : "hsl(195 20% 86%)"}`,
                    color: "hsl(195 30% 20%)",
                    fontFamily: "monospace",
                    letterSpacing: "0.1em",
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = "hsl(195 100% 45%)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = error ? "hsl(0 62% 45%)" : "hsl(195 20% 86%)"; }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums"
                  style={{ color: "hsl(195 20% 50%)" }}>
                  {nisn.length}/10
                </span>
              </div>
              {error && (
                <p className="mt-1.5 text-xs" style={{ color: "hsl(0 62% 58%)" }}>{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded text-sm font-semibold transition-all duration-150"
              style={{
                background: loading ? "hsl(195 15% 90%)" : "hsl(195 100% 45%)",
                color: loading ? "hsl(195 20% 60%)" : "hsl(0 0% 100%)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "hsl(195 100% 40%)"; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = loading ? "hsl(195 15% 90%)" : "hsl(195 100% 45%)"; }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  Mencari...
                </span>
              ) : "Cari"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs" style={{ color: "hsl(195 20% 45%)" }}>
            Demo — coba NISN <span className="font-mono">1234567890</span> s/d <span className="font-mono">1234567899</span>
          </p>
        </div>
      </div>
    </div>
  );
}
