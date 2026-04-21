import { supabase } from "@/lib/supabase";

export interface Siswa {
  id?: string;
  nisn: string;
  nama: string;
  kelas: string;
  jurusan: string;
  foto?: string | null;
  nilai?: number | null;
  predikat?: string | null;
  status: "LULUS" | "TIDAK_LULUS";
}

// Fetch single student by NISN from Supabase
export async function fetchSiswaByNisn(nisn: string): Promise<Siswa | null> {
  const { data, error } = await supabase
    .from("siswa")
    .select("*")
    .eq("nisn", nisn)
    .single();

  if (error || !data) return null;
  return data as Siswa;
}

// Fetch all students from Supabase (for admin)
export async function fetchAllSiswa(): Promise<Siswa[]> {
  const { data, error } = await supabase
    .from("siswa")
    .select("*")
    .order("nama", { ascending: true });

  if (error || !data) return [];
  return data as Siswa[];
}

// Insert a new student
export async function insertSiswa(siswa: Omit<Siswa, "id">): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("siswa").insert([siswa]);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

// Delete a student by NISN
export async function deleteSiswa(nisn: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("siswa").delete().eq("nisn", nisn);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

// Update a student
export async function updateSiswa(nisn: string, updates: Partial<Siswa>): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("siswa").update(updates).eq("nisn", nisn);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

// Settings: Graduation Date
export async function fetchGraduationDate(): Promise<Date> {
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "tanggal_kelulusan")
    .single();

  if (error || !data) return new Date("2026-05-17T09:00:00");
  return new Date(data.value);
}

export async function updateGraduationDate(dateStr: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("settings")
    .upsert({ key: "tanggal_kelulusan", value: dateStr });
  
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export const TANGGAL_KELULUSAN_FALLBACK = new Date("2026-05-17T09:00:00");

export const INFO_SEKOLAH = {
  nama: "SMK Negeri Pringsurat",
  tahunAjaran: "2025/2026",
  kepalaSekolah: "Mila Yutiana, S.Pd., M.MPar.",
};
