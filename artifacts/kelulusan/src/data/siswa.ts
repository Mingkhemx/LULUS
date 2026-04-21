export interface Siswa {
  nisn: string;
  nama: string;
  kelas: string;
  jurusan: string;
  foto?: string;
  nilai?: number;
  predikat?: string;
  status: "LULUS" | "TIDAK_LULUS";
}

export const dataSiswa: Siswa[] = [
  { nisn: "1234567890", nama: "Ahmad Rizki Pratama", kelas: "XII IPA 1", jurusan: "Ilmu Pengetahuan Alam", nilai: 89.5, predikat: "Sangat Baik", status: "LULUS", foto: "/foto-siswa.jpg" },
  { nisn: "1234567891", nama: "Siti Nurhaliza Rahmah", kelas: "XII IPA 2", jurusan: "Ilmu Pengetahuan Alam", nilai: 92.3, predikat: "Sangat Baik", status: "LULUS" },
  { nisn: "1234567892", nama: "Budi Santoso Wijaya", kelas: "XII IPS 1", jurusan: "Ilmu Pengetahuan Sosial", nilai: 85.7, predikat: "Baik", status: "LULUS" },
  { nisn: "1234567893", nama: "Dewi Kusuma Wardani", kelas: "XII IPS 2", jurusan: "Ilmu Pengetahuan Sosial", nilai: 91.2, predikat: "Sangat Baik", status: "LULUS" },
  { nisn: "1234567894", nama: "Faisal Hakim Nugroho", kelas: "XII BAHASA", jurusan: "Bahasa dan Sastra", nilai: 87.4, predikat: "Baik", status: "LULUS" },
  { nisn: "1234567895", nama: "Ratna Sari Dewi", kelas: "XII IPA 1", jurusan: "Ilmu Pengetahuan Alam", nilai: 94.1, predikat: "Sangat Baik", status: "LULUS" },
  { nisn: "1234567896", nama: "Hendra Putra Wibowo", kelas: "XII IPS 1", jurusan: "Ilmu Pengetahuan Sosial", nilai: 78.9, predikat: "Baik", status: "LULUS" },
  { nisn: "1234567897", nama: "Indah Permata Sari", kelas: "XII IPA 3", jurusan: "Ilmu Pengetahuan Alam", nilai: 88.6, predikat: "Baik", status: "LULUS" },
  { nisn: "1234567898", nama: "Joko Purnomo Adi", kelas: "XII IPS 3", jurusan: "Ilmu Pengetahuan Sosial", nilai: 82.3, predikat: "Baik", status: "LULUS" },
  { nisn: "1234567899", nama: "Kartika Wulandari Putri", kelas: "XII IPA 2", jurusan: "Ilmu Pengetahuan Alam", nilai: 96.5, predikat: "Sangat Baik", status: "LULUS" },
  { nisn: "0000000001", nama: "Test Siswa Tidak Lulus", kelas: "XII IPS 1", jurusan: "Ilmu Pengetahuan Sosial", nilai: 55.0, predikat: "Kurang", status: "TIDAK_LULUS" },
];

export const TANGGAL_KELULUSAN = new Date("2026-05-17T09:00:00");

export const INFO_SEKOLAH = {
  nama: "SMK Negeri Pringsurat",
  tahunAjaran: "2025/2026",
  kepalaSekolah: "Mila Yutiana, S.Pd., M.MPar.",
};
