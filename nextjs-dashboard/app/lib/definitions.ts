// ============================================================
// KARGO SYSTEM — Type Definitions
// ============================================================

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Kendaraan = {
  id: string;
  nama_kendaraan: string;
  jenis_kendaraan: string;
  plat_nomor: string;
  kapasitas_muatan: number;
  status_kendaraan: string;
  created_at?: string;
};

export type Shipment = {
  id: string;
  no_resi: string;
  tanggal_kirim: string;
  nama_pengirim: string;
  nama_penerima: string;
  no_telepon: string;
  kota_asal: string;
  kota_tujuan: string;
  jenis_barang: string;
  berat_barang: number;
  harga_tarif: number;
  jenis_kendaraan: string;
  jenis_pengiriman: 'Biasa' | 'Cepat' | 'VVIP';
  status_pengiriman: 'Diproses' | 'Dalam Pengiriman' | 'Sampai Tujuan' | 'Pending' | 'Selesai';
  deskripsi?: string;
  kendaraan_id?: string;
  created_at?: string;
};

export type DashboardStats = {
  total_pengiriman: number;
  dalam_pengiriman: number;
  selesai: number;
  total_kendaraan: number;
};
