import { supabase } from "@/lib/supabase";

export interface Siswa {
  nisn: string;
  nama: string;
  kelas: string;
  jurusan: string;
  foto: string | null;
  nilai: number | null;
  predikat: string | null;
  status: "LULUS" | "TIDAK_LULUS";
}

// Fungsi untuk mengambil semua data siswa (digunakan di Panel Admin)
export async function fetchAllSiswa(): Promise<Siswa[]> {
  const { data, error } = await supabase
    .from("siswa")
    .select("*")
    .order("nama", { ascending: true });

  if (error || !data) return [];
  return data as Siswa[];
}

// Fungsi untuk mencari data siswa berdasarkan NISN (digunakan di Pencarian)
export async function fetchSiswaByNisn(nisn: string): Promise<Siswa | null> {
  const { data, error } = await supabase
    .from("siswa")
    .select("*")
    .eq("nisn", nisn)
    .single();

  if (error || !data) return null;
  return data as Siswa;
}

// Fungsi untuk menambah data siswa baru
export async function insertSiswa(siswa: Siswa): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("siswa").insert([siswa]);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

// Fungsi untuk menghapus data siswa
export async function deleteSiswa(nisn: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("siswa").delete().eq("nisn", nisn);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

// Pengaturan: Tanggal Kelulusan (Ambil dari database)
export async function fetchGraduationDate(): Promise<Date> {
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "tanggal_kelulusan")
    .single();

  if (error || !data) return new Date("2026-05-17T09:00:00");
  return new Date(data.value);
}

// Fungsi untuk update tanggal kelulusan di database
export async function updateGraduationDate(dateStr: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("settings")
    .upsert({ key: "tanggal_kelulusan", value: dateStr });
  
  if (error) return { success: false, error: error.message };
  return { success: true };
}

// Tanggal cadangan jika database tidak bisa diakses
export const TANGGAL_KELULUSAN_FALLBACK = new Date("2026-05-17T09:00:00");

// Informasi Dasar Sekolah
export const INFO_SEKOLAH = {
  nama: "SMK Negeri Pringsurat",
  tahunAjaran: "2025/2026",
  kepalaSekolah: "Mila Yutiana, S.Pd., M.MPar.",
};
