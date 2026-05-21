-- ============================================================
-- KARGO SYSTEM — Schema Database
-- Neon PostgreSQL (compatible)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. USERS (untuk autentikasi next-auth)
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id       UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name     VARCHAR(255) NOT NULL,
  email    TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- ============================================================
-- 2. USER_PROFILES (One to One dengan users)
-- ============================================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id    UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  no_telp    VARCHAR(20),
  jabatan    VARCHAR(100),
  departemen VARCHAR(100),
  foto_url   TEXT
);

-- ============================================================
-- 3. AIRPORTS (referensi bandara — Data Master)
-- ============================================================
CREATE TABLE IF NOT EXISTS airports (
  kode      VARCHAR(3)    PRIMARY KEY,
  nama      VARCHAR(255)  NOT NULL,
  kota      VARCHAR(100)  NOT NULL,
  provinsi  VARCHAR(100)  NOT NULL,
  latitude  DECIMAL(9,6)  NOT NULL,
  longitude DECIMAL(9,6)  NOT NULL
);

-- ============================================================
-- 4. CUSTOMERS (Data Master pengirim/penerima)
-- ============================================================
CREATE TABLE IF NOT EXISTS customers (
  id        UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nama      VARCHAR(255)  NOT NULL,
  email     TEXT,
  no_telp   VARCHAR(20),
  alamat    TEXT          NOT NULL,
  kota      VARCHAR(100)  NOT NULL,
  tipe      VARCHAR(20)   NOT NULL DEFAULT 'Perusahaan'
                          -- Perusahaan | Perorangan
);

-- ============================================================
-- 5. FLIGHTS (penerbangan kargo — One to Many dengan airports)
-- ============================================================
CREATE TABLE IF NOT EXISTS flights (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  no_penerbangan  VARCHAR(20)   NOT NULL UNIQUE,
  maskapai        VARCHAR(100)  NOT NULL,
  asal            VARCHAR(3)    NOT NULL REFERENCES airports(kode),
  tujuan          VARCHAR(3)    NOT NULL REFERENCES airports(kode),
  etd             TIME          NOT NULL,
  eta             TIME          NOT NULL,
  tanggal         DATE          NOT NULL,
  status          VARCHAR(30)   NOT NULL DEFAULT 'On Time',
  kapasitas_kg    INT           NOT NULL DEFAULT 5000,
  created_by      UUID          REFERENCES users(id)
);

-- ============================================================
-- 6. SHIPMENTS (kiriman / AWB — One to Many dengan customers)
-- ============================================================
CREATE TABLE IF NOT EXISTS shipments (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  no_awb          VARCHAR(20)   NOT NULL UNIQUE,
  customer_id     UUID          NOT NULL REFERENCES customers(id),
  penerima_id     UUID          NOT NULL REFERENCES customers(id),
  jenis_barang    VARCHAR(100)  NOT NULL,
  berat_kg        DECIMAL(8,2)  NOT NULL,
  layanan         VARCHAR(50)   NOT NULL,
  status          VARCHAR(30)   NOT NULL DEFAULT 'Proses',
  tanggal_kirim   DATE          NOT NULL,
  created_by      UUID          REFERENCES users(id),
  created_at      TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- 7. SHIPMENT_DETAILS (One to One dengan shipments)
-- ============================================================
CREATE TABLE IF NOT EXISTS shipment_details (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  shipment_id     UUID NOT NULL UNIQUE REFERENCES shipments(id) ON DELETE CASCADE,
  panjang_cm      DECIMAL(8,2),
  lebar_cm        DECIMAL(8,2),
  tinggi_cm       DECIMAL(8,2),
  berat_volume_kg DECIMAL(8,2),
  no_asuransi     VARCHAR(50),
  nilai_barang    DECIMAL(12,2),
  catatan         TEXT
);

-- ============================================================
-- 8. MANIFEST (Many to Many: flights <-> shipments)
-- ============================================================
CREATE TABLE IF NOT EXISTS manifest (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  flight_id   UUID NOT NULL REFERENCES flights(id) ON DELETE CASCADE,
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  posisi_muat VARCHAR(20) DEFAULT 'Bulk',
  UNIQUE (flight_id, shipment_id)
);

-- ============================================================
-- 9. TRACKING_EVENTS (One to Many dengan shipments)
-- ============================================================
CREATE TABLE IF NOT EXISTS tracking_events (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  waktu       TIMESTAMP NOT NULL,
  lokasi      VARCHAR(255) NOT NULL,
  keterangan  TEXT NOT NULL,
  urutan      INT NOT NULL DEFAULT 0
);