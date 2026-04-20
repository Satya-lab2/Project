// ============================================================
// KARGO SYSTEM — Type Definitions
// ============================================================

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Airport = {
  kode: string;
  nama: string;
  kota: string;
  provinsi: string;
  latitude: number;
  longitude: number;
};

export type Flight = {
  id: string;
  no_penerbangan: string;
  maskapai: string;
  asal: string;
  tujuan: string;
  etd: string;
  eta: string;
  tanggal: string;
  status: 'On Time' | 'Boarding' | 'Delayed' | 'Departed' | 'Arrived' | 'Cancelled';
  kapasitas_kg: number;
  kota_asal?: string;
  kota_tujuan?: string;
  total_awb?: number;
  total_kargo_kg?: number;
};

export type Shipment = {
  id: string;
  no_awb: string;
  pengirim: string;
  penerima: string;
  alamat_asal: string;
  alamat_tujuan: string;
  jenis_barang: string;
  berat_kg: number;
  layanan: 'Regular' | 'Express' | 'Same Day';
  status: 'Proses' | 'Dalam Perjalanan' | 'Selesai' | 'Expired';
  tanggal_kirim: string;
  created_at?: string;
};

export type TrackingEvent = {
  waktu: string;
  lokasi: string;
  keterangan: string;
  urutan: number;
};

export type ManifestItem = {
  no_awb: string;
  pengirim: string;
  penerima: string;
  jenis_barang: string;
  berat_kg: number;
  layanan: string;
  status: string;
  posisi_muat: string;
};

export type DashboardStats = {
  flights: {
    total_penerbangan: number;
    sudah_berangkat: number;
    delayed: number;
  };
  shipments: {
    total_awb: number;
    total_kg: number;
    selesai: number;
    dalam_perjalanan: number;
  };
};
