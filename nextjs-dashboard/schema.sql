-- ============================================================
-- KARGO SYSTEM — Schema Database (Simplified for CRUDS)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS
CREATE TABLE IF NOT EXISTS users (
  id       UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name     VARCHAR(255) NOT NULL,
  email    TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- 2. KENDARAAN
CREATE TABLE IF NOT EXISTS kendaraan (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nama_kendaraan  VARCHAR(100) NOT NULL,
  jenis_kendaraan VARCHAR(50)  NOT NULL,  -- Truk, Motor, Pesawat, Kapal
  plat_nomor      VARCHAR(20)  NOT NULL UNIQUE,
  kapasitas_muatan DECIMAL(10,2) NOT NULL DEFAULT 0,
  status_kendaraan VARCHAR(30) NOT NULL DEFAULT 'Tersedia',  -- Tersedia, Digunakan, Maintenance
  created_at      TIMESTAMP DEFAULT NOW()
);

-- 3. SHIPMENTS (Pengiriman / AWB)
CREATE TABLE IF NOT EXISTS shipments (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  no_resi           VARCHAR(20)   NOT NULL UNIQUE,
  tanggal_kirim     DATE          NOT NULL,
  nama_pengirim     VARCHAR(255)  NOT NULL,
  nama_penerima     VARCHAR(255)  NOT NULL,
  no_telepon        VARCHAR(20)   NOT NULL,
  kota_asal         VARCHAR(100)  NOT NULL,
  kota_tujuan       VARCHAR(100)  NOT NULL,
  jenis_barang      VARCHAR(100)  NOT NULL,
  berat_barang      DECIMAL(8,2)  NOT NULL,
  harga_tarif       DECIMAL(12,2) NOT NULL DEFAULT 0,
  jenis_kendaraan   VARCHAR(50)   NOT NULL DEFAULT 'Udara',
  jenis_pengiriman  VARCHAR(20)   NOT NULL DEFAULT 'Biasa',  -- Biasa, Cepat, VVIP
  status_pengiriman VARCHAR(30)   NOT NULL DEFAULT 'Diproses',
  deskripsi         TEXT,
  kendaraan_id      UUID REFERENCES kendaraan(id),
  created_at        TIMESTAMP DEFAULT NOW()
);
