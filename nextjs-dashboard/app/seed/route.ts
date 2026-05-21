import bcrypt from 'bcrypt';
import postgres from 'postgres';
import {
  users, userProfiles,
  airports,
  customers,
  flights,
  shipments, shipmentDetails,
  manifest,
  trackingEvents,
} from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function dropAll() {
  await sql`DROP TABLE IF EXISTS tracking_events  CASCADE`;
  await sql`DROP TABLE IF EXISTS manifest         CASCADE`;
  await sql`DROP TABLE IF EXISTS shipment_details CASCADE`;
  await sql`DROP TABLE IF EXISTS shipments        CASCADE`;
  await sql`DROP TABLE IF EXISTS customers        CASCADE`;
  await sql`DROP TABLE IF EXISTS flights          CASCADE`;
  await sql`DROP TABLE IF EXISTS airports         CASCADE`;
  await sql`DROP TABLE IF EXISTS user_profiles    CASCADE`;
  await sql`DROP TABLE IF EXISTS users            CASCADE`;
}

// 1. USERS
async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id       UUID PRIMARY KEY,
      name     VARCHAR(255) NOT NULL,
      email    TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `;
  for (const u of users) {
    const hashed = await bcrypt.hash(u.password, 10);
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${u.id}::uuid, ${u.name}, ${u.email}, ${hashed})
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

// 2. USER_PROFILES — One to One dengan users
async function seedUserProfiles() {
  await sql`
    CREATE TABLE IF NOT EXISTS user_profiles (
      id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id    UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      no_telp    VARCHAR(20),
      jabatan    VARCHAR(100),
      departemen VARCHAR(100),
      foto_url   TEXT
    )
  `;
  for (const p of userProfiles) {
    await sql`
      INSERT INTO user_profiles (user_id, no_telp, jabatan, departemen, foto_url)
      VALUES (${p.user_id}::uuid, ${p.no_telp}, ${p.jabatan}, ${p.departemen}, ${p.foto_url})
      ON CONFLICT (user_id) DO NOTHING
    `;
  }
}

// 3. AIRPORTS — Data Master
async function seedAirports() {
  await sql`
    CREATE TABLE IF NOT EXISTS airports (
      kode      VARCHAR(3)   PRIMARY KEY,
      nama      VARCHAR(255) NOT NULL,
      kota      VARCHAR(100) NOT NULL,
      provinsi  VARCHAR(100) NOT NULL,
      latitude  DECIMAL(9,6) NOT NULL,
      longitude DECIMAL(9,6) NOT NULL
    )
  `;
  for (const a of airports) {
    await sql`
      INSERT INTO airports (kode, nama, kota, provinsi, latitude, longitude)
      VALUES (${a.kode}, ${a.nama}, ${a.kota}, ${a.provinsi}, ${a.latitude}, ${a.longitude})
      ON CONFLICT (kode) DO NOTHING
    `;
  }
}

// 4. CUSTOMERS — Data Master
async function seedCustomers() {
  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id      UUID PRIMARY KEY,
      nama    VARCHAR(255) NOT NULL,
      email   TEXT,
      no_telp VARCHAR(20),
      alamat  TEXT         NOT NULL,
      kota    VARCHAR(100) NOT NULL,
      tipe    VARCHAR(20)  NOT NULL DEFAULT 'Perusahaan'
    )
  `;
  for (const c of customers) {
    await sql`
      INSERT INTO customers (id, nama, email, no_telp, alamat, kota, tipe)
      VALUES (${c.id}::uuid, ${c.nama}, ${c.email}, ${c.no_telp}, ${c.alamat}, ${c.kota}, ${c.tipe})
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

// 5. FLIGHTS — One to Many dengan airports, FK ke users
async function seedFlights() {
  await sql`
    CREATE TABLE IF NOT EXISTS flights (
      id              UUID PRIMARY KEY,
      no_penerbangan  VARCHAR(20)  NOT NULL UNIQUE,
      maskapai        VARCHAR(100) NOT NULL,
      asal            VARCHAR(3)   NOT NULL REFERENCES airports(kode),
      tujuan          VARCHAR(3)   NOT NULL REFERENCES airports(kode),
      etd             TIME         NOT NULL,
      eta             TIME         NOT NULL,
      tanggal         DATE         NOT NULL,
      status          VARCHAR(30)  NOT NULL DEFAULT 'On Time',
      kapasitas_kg    INT          NOT NULL DEFAULT 5000,
      created_by      UUID         REFERENCES users(id)
    )
  `;
  for (const f of flights) {
    await sql`
      INSERT INTO flights (id, no_penerbangan, maskapai, asal, tujuan, etd, eta, tanggal, status, kapasitas_kg, created_by)
      VALUES (
        ${f.id}::uuid, ${f.no_penerbangan}, ${f.maskapai},
        ${f.asal}, ${f.tujuan},
        ${f.etd}::time, ${f.eta}::time, ${f.tanggal}::date,
        ${f.status}, ${f.kapasitas_kg}, ${f.created_by}::uuid
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

// 6. SHIPMENTS — One to Many dengan customers, FK ke users
async function seedShipments() {
  await sql`
    CREATE TABLE IF NOT EXISTS shipments (
      id              UUID PRIMARY KEY,
      no_awb          VARCHAR(20)    NOT NULL UNIQUE,
      customer_id     UUID           NOT NULL REFERENCES customers(id),
      penerima_id     UUID           NOT NULL REFERENCES customers(id),
      jenis_barang    VARCHAR(100)   NOT NULL,
      berat_kg        DECIMAL(8,2)   NOT NULL,
      harga_per_kg    DECIMAL(10,2)  NOT NULL DEFAULT 0,
      total_biaya     DECIMAL(12,2)  NOT NULL DEFAULT 0,
      layanan         VARCHAR(50)    NOT NULL,
      status          VARCHAR(30)    NOT NULL DEFAULT 'Proses',
      tanggal_kirim   DATE           NOT NULL,
      created_by      UUID           REFERENCES users(id),
      created_at      TIMESTAMP      DEFAULT NOW()
    )
  `;
  for (const s of shipments) {
    await sql`
      INSERT INTO shipments (id, no_awb, customer_id, penerima_id, jenis_barang, berat_kg, harga_per_kg, total_biaya, layanan, status, tanggal_kirim, created_by)
      VALUES (
        ${s.id}::uuid, ${s.no_awb},
        ${s.customer_id}::uuid, ${s.penerima_id}::uuid,
        ${s.jenis_barang}, ${s.berat_kg}, ${s.harga_per_kg}, ${s.total_biaya},
        ${s.layanan}, ${s.status}, ${s.tanggal_kirim}::date, ${s.created_by}::uuid
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

// 7. SHIPMENT_DETAILS — One to One dengan shipments
async function seedShipmentDetails() {
  await sql`
    CREATE TABLE IF NOT EXISTS shipment_details (
      id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      shipment_id     UUID           NOT NULL UNIQUE REFERENCES shipments(id) ON DELETE CASCADE,
      panjang_cm      DECIMAL(8,2),
      lebar_cm        DECIMAL(8,2),
      tinggi_cm       DECIMAL(8,2),
      berat_volume_kg DECIMAL(8,2),
      no_asuransi     VARCHAR(50),
      nilai_barang    DECIMAL(12,2),
      catatan         TEXT
    )
  `;
  for (const d of shipmentDetails) {
    await sql`
      INSERT INTO shipment_details (shipment_id, panjang_cm, lebar_cm, tinggi_cm, berat_volume_kg, no_asuransi, nilai_barang, catatan)
      VALUES (
        ${d.shipment_id}::uuid,
        ${d.panjang_cm}, ${d.lebar_cm}, ${d.tinggi_cm}, ${d.berat_volume_kg},
        ${d.no_asuransi}, ${d.nilai_barang}, ${d.catatan}
      )
      ON CONFLICT (shipment_id) DO NOTHING
    `;
  }
}

// 8. MANIFEST — Many to Many: flights <-> shipments
async function seedManifest() {
  await sql`
    CREATE TABLE IF NOT EXISTS manifest (
      id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      flight_id   UUID NOT NULL REFERENCES flights(id)   ON DELETE CASCADE,
      shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
      posisi_muat VARCHAR(20) DEFAULT 'Bulk',
      UNIQUE (flight_id, shipment_id)
    )
  `;
  for (const m of manifest) {
    await sql`
      INSERT INTO manifest (flight_id, shipment_id, posisi_muat)
      VALUES (${m.flight_id}::uuid, ${m.shipment_id}::uuid, ${m.posisi_muat})
      ON CONFLICT (flight_id, shipment_id) DO NOTHING
    `;
  }
}

// 9. TRACKING_EVENTS — One to Many dengan shipments
async function seedTrackingEvents() {
  await sql`
    CREATE TABLE IF NOT EXISTS tracking_events (
      id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
      waktu       TIMESTAMP    NOT NULL,
      lokasi      VARCHAR(255) NOT NULL,
      keterangan  TEXT         NOT NULL,
      urutan      INT          NOT NULL DEFAULT 0
    )
  `;
  for (const t of trackingEvents) {
    await sql`
      INSERT INTO tracking_events (shipment_id, waktu, lokasi, keterangan, urutan)
      VALUES (${t.shipment_id}::uuid, ${t.waktu}::timestamp, ${t.lokasi}, ${t.keterangan}, ${t.urutan})
    `;
  }
}

export async function GET() {
  try {
    await dropAll();
    await seedUsers();
    await seedUserProfiles();
    await seedAirports();
    await seedCustomers();
    await seedFlights();
    await seedShipments();
    await seedShipmentDetails();
    await seedManifest();
    await seedTrackingEvents();
    return Response.json({ message: 'Database kargo berhasil di-seed! ✅' });
  } catch (error) {
    console.error('Seed error:', error);
    return Response.json({ error }, { status: 500 });
  }
}
