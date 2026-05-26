-- ============================================================
-- KARGO UDARA SYSTEM — Schema Database (CRUDS)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS
CREATE TABLE IF NOT EXISTS users (
  id       UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name     VARCHAR(255) NOT NULL,
  email    TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- 2. PESAWAT (Armada Kargo Udara)
CREATE TABLE IF NOT EXISTS pesawat (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nama_pesawat     VARCHAR(100) NOT NULL,
  kode_penerbangan VARCHAR(20)  NOT NULL UNIQUE,  -- e.g. GA-452, JT-633
  maskapai         VARCHAR(100) NOT NULL,
  kota_asal        VARCHAR(100) NOT NULL,
  kota_tujuan      VARCHAR(100) NOT NULL,
  kapasitas_muatan DECIMAL(10,2) NOT NULL DEFAULT 0,  -- dalam kg
  status_pesawat   VARCHAR(30)  NOT NULL DEFAULT 'Tersedia',  -- Tersedia, Terbang, Maintenance
  created_at       TIMESTAMP DEFAULT NOW()
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
  jenis_pengiriman  VARCHAR(20)   NOT NULL DEFAULT 'Biasa',  -- Biasa, Cepat, VVIP
  status_pengiriman VARCHAR(30)   NOT NULL DEFAULT 'Diproses',
  deskripsi         TEXT,
  pesawat_id        UUID REFERENCES pesawat(id) ON DELETE SET NULL,
  created_at        TIMESTAMP DEFAULT NOW()
);
