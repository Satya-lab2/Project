import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { users, airports, flights, shipments, manifest, trackingEvents } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function dropAll() {
  // Drop dalam urutan terbalik (yang punya foreign key dulu)
  await sql`DROP TABLE IF EXISTS tracking_events CASCADE`;
  await sql`DROP TABLE IF EXISTS manifest CASCADE`;
  await sql`DROP TABLE IF EXISTS shipments CASCADE`;
  await sql`DROP TABLE IF EXISTS flights CASCADE`;
  await sql`DROP TABLE IF EXISTS airports CASCADE`;
  await sql`DROP TABLE IF EXISTS users CASCADE`;
}

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
      kapasitas_kg    INT          NOT NULL DEFAULT 5000
    )
  `;
  for (const f of flights) {
    await sql`
      INSERT INTO flights (id, no_penerbangan, maskapai, asal, tujuan, etd, eta, tanggal, status, kapasitas_kg)
      VALUES (${f.id}::uuid, ${f.no_penerbangan}, ${f.maskapai}, ${f.asal}, ${f.tujuan}, ${f.etd}::time, ${f.eta}::time, ${f.tanggal}::date, ${f.status}, ${f.kapasitas_kg})
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

async function seedShipments() {
  await sql`
    CREATE TABLE IF NOT EXISTS shipments (
      id              UUID PRIMARY KEY,
      no_awb          VARCHAR(20)  NOT NULL UNIQUE,
      pengirim        VARCHAR(255) NOT NULL,
      penerima        VARCHAR(255) NOT NULL,
      alamat_asal     TEXT         NOT NULL,
      alamat_tujuan   TEXT         NOT NULL,
      jenis_barang    VARCHAR(100) NOT NULL,
      berat_kg        DECIMAL(8,2) NOT NULL,
      layanan         VARCHAR(50)  NOT NULL,
      status          VARCHAR(30)  NOT NULL DEFAULT 'Proses',
      tanggal_kirim   DATE         NOT NULL,
      created_at      TIMESTAMP    DEFAULT NOW()
    )
  `;
  for (const s of shipments) {
    await sql`
      INSERT INTO shipments (id, no_awb, pengirim, penerima, alamat_asal, alamat_tujuan, jenis_barang, berat_kg, layanan, status, tanggal_kirim)
      VALUES (${s.id}::uuid, ${s.no_awb}, ${s.pengirim}, ${s.penerima}, ${s.alamat_asal}, ${s.alamat_tujuan}, ${s.jenis_barang}, ${s.berat_kg}, ${s.layanan}, ${s.status}, ${s.tanggal_kirim}::date)
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

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
    await seedAirports();
    await seedFlights();
    await seedShipments();
    await seedManifest();
    await seedTrackingEvents();
    return Response.json({ message: 'Database kargo berhasil di-seed! ✅' });
  } catch (error) {
    console.error('Seed error:', error);
    return Response.json({ error }, { status: 500 });
  }
}
