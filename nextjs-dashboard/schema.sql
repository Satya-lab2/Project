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
-- 2. AIRPORTS (referensi bandara)
-- ============================================================
CREATE TABLE IF NOT EXISTS airports (
  kode      VARCHAR(3)    PRIMARY KEY,        -- IATA code: CGK, SUB, dll
  nama      VARCHAR(255)  NOT NULL,
  kota      VARCHAR(100)  NOT NULL,
  provinsi  VARCHAR(100)  NOT NULL,
  latitude  DECIMAL(9,6)  NOT NULL,
  longitude DECIMAL(9,6)  NOT NULL
);

-- ============================================================
-- 3. FLIGHTS (penerbangan kargo)
-- ============================================================
CREATE TABLE IF NOT EXISTS flights (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  no_penerbangan  VARCHAR(20)   NOT NULL UNIQUE,
  maskapai        VARCHAR(100)  NOT NULL,
  asal            VARCHAR(3)    NOT NULL REFERENCES airports(kode),
  tujuan          VARCHAR(3)    NOT NULL REFERENCES airports(kode),
  etd             TIME          NOT NULL,   -- Estimated Time of Departure
  eta             TIME          NOT NULL,   -- Estimated Time of Arrival
  tanggal         DATE          NOT NULL,
  status          VARCHAR(30)   NOT NULL DEFAULT 'On Time',
                                            -- On Time | Boarding | Delayed | Departed | Arrived | Cancelled
  kapasitas_kg    INT           NOT NULL DEFAULT 5000
);

-- ============================================================
-- 4. SHIPMENTS (kiriman / AWB)
-- ============================================================
CREATE TABLE IF NOT EXISTS shipments (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  no_awb          VARCHAR(20)   NOT NULL UNIQUE,
  pengirim        VARCHAR(255)  NOT NULL,
  penerima        VARCHAR(255)  NOT NULL,
  alamat_asal     TEXT          NOT NULL,
  alamat_tujuan   TEXT          NOT NULL,
  jenis_barang    VARCHAR(100)  NOT NULL,
  berat_kg        DECIMAL(8,2)  NOT NULL,
  layanan         VARCHAR(50)   NOT NULL,   -- Regular | Express | Same Day
  status          VARCHAR(30)   NOT NULL DEFAULT 'Proses',
                                            -- Proses | Dalam Perjalanan | Selesai | Expired
  tanggal_kirim   DATE          NOT NULL,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- 5. MANIFEST (relasi penerbangan ↔ shipment)
-- ============================================================
CREATE TABLE IF NOT EXISTS manifest (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  flight_id   UUID NOT NULL REFERENCES flights(id) ON DELETE CASCADE,
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  posisi_muat VARCHAR(20) DEFAULT 'Bulk',   -- Bulk | ULD | Priority
  UNIQUE (flight_id, shipment_id)
);

-- ============================================================
-- 6. TRACKING_EVENTS (timeline perjalanan per AWB)
-- ============================================================
CREATE TABLE IF NOT EXISTS tracking_events (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  waktu       TIMESTAMP NOT NULL,
  lokasi      VARCHAR(255) NOT NULL,
  keterangan  TEXT NOT NULL,
  urutan      INT NOT NULL DEFAULT 0        -- untuk sorting timeline
);
