import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function dropAll() {
  await sql`DROP TABLE IF EXISTS tracking_logs CASCADE`;
  await sql`DROP TABLE IF EXISTS shipments CASCADE`;
  await sql`DROP TABLE IF EXISTS pesawat    CASCADE`;
  await sql`DROP TABLE IF EXISTS users      CASCADE`;
}

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id       UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name     VARCHAR(255) NOT NULL,
      email    TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `;
  const hashed = await bcrypt.hash('admin123', 10);
  await sql`
    INSERT INTO users (id, name, email, password)
    VALUES (
      '410544b2-4001-4271-9855-fec4b6a6442a'::uuid,
      'Admin Sistem', 'admin@kargo.com', ${hashed}
    )
    ON CONFLICT (id) DO NOTHING
  `;
}

async function seedPesawat() {
  await sql`
    CREATE TABLE IF NOT EXISTS pesawat (
      id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      nama_pesawat     VARCHAR(100) NOT NULL,
      kode_penerbangan VARCHAR(20)  NOT NULL UNIQUE,
      maskapai         VARCHAR(100) NOT NULL,
      kota_asal        VARCHAR(100) NOT NULL,
      kota_tujuan      VARCHAR(100) NOT NULL,
      kapasitas_muatan DECIMAL(10,2) NOT NULL DEFAULT 0,
      status_pesawat   VARCHAR(30)  NOT NULL DEFAULT 'Tersedia',
      created_at       TIMESTAMP DEFAULT NOW()
    )
  `;

  const pesawatData = [
    { nama: 'Garuda Cargo I', kode: 'GA-452', maskapai: 'Garuda Indonesia', asal: 'Jakarta', tujuan: 'Surabaya', kapasitas: 5000, status: 'Terbang' },
    { nama: 'Lion Air Cargo I', kode: 'JT-633', maskapai: 'Lion Air', asal: 'Jakarta', tujuan: 'Makassar', kapasitas: 6000, status: 'Tersedia' },
    { nama: 'Garuda Cargo II', kode: 'GA-716', maskapai: 'Garuda Indonesia', asal: 'Jakarta', tujuan: 'Denpasar', kapasitas: 5500, status: 'Tersedia' },
    { nama: 'Batik Air Cargo I', kode: 'ID-8821', maskapai: 'Batik Air', asal: 'Jakarta', tujuan: 'Manado', kapasitas: 4500, status: 'Maintenance' },
    { nama: 'Sriwijaya Cargo I', kode: 'SJ-220', maskapai: 'Sriwijaya Air', asal: 'Jakarta', tujuan: 'Padang', kapasitas: 3800, status: 'Tersedia' },
  ];

  const ids: Record<string, string> = {};
  for (const p of pesawatData) {
    const result = await sql`
      INSERT INTO pesawat (nama_pesawat, kode_penerbangan, maskapai, kota_asal, kota_tujuan, kapasitas_muatan, status_pesawat)
      VALUES (${p.nama}, ${p.kode}, ${p.maskapai}, ${p.asal}, ${p.tujuan}, ${p.kapasitas}, ${p.status})
      ON CONFLICT (kode_penerbangan) DO UPDATE SET nama_pesawat = EXCLUDED.nama_pesawat
      RETURNING id, kode_penerbangan
    `;
    ids[result[0].kode_penerbangan] = result[0].id;
  }
  return ids;
}

async function seedShipments(pesawatIds: Record<string, string>) {
  await sql`
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
      jenis_pengiriman  VARCHAR(20)   NOT NULL DEFAULT 'Biasa',
      status_pengiriman VARCHAR(30)   NOT NULL DEFAULT 'Diproses',
      deskripsi         TEXT,
      pesawat_id        UUID REFERENCES pesawat(id) ON DELETE SET NULL,
      created_at        TIMESTAMP DEFAULT NOW()
    )
  `;

  const shipmentsData = [
    {
      no_resi: 'AWB-2600101', tanggal_kirim: '2026-05-01',
      nama_pengirim: 'PT Sinar Jaya', nama_penerima: 'PT Mitra Surabaya',
      no_telepon: '08111234001', kota_asal: 'Jakarta', kota_tujuan: 'Surabaya',
      jenis_barang: 'Elektronik', berat_barang: 48.5, harga_tarif: 728000,
      jenis_pengiriman: 'Cepat', status_pengiriman: 'Selesai',
      deskripsi: 'Handle with care, barang elektronik sensitif',
      pesawat_kode: 'GA-452',
    },
    {
      no_resi: 'AWB-2600102', tanggal_kirim: '2026-05-05',
      nama_pengirim: 'CV Maju Bersama', nama_penerima: 'Toko Bali Indah',
      no_telepon: '08111234002', kota_asal: 'Jakarta', kota_tujuan: 'Denpasar',
      jenis_barang: 'Tekstil & Pakaian', berat_barang: 22.0, harga_tarif: 330000,
      jenis_pengiriman: 'Biasa', status_pengiriman: 'Dalam Pengiriman',
      deskripsi: null, pesawat_kode: 'GA-716',
    },
    {
      no_resi: 'AWB-2600103', tanggal_kirim: '2026-05-08',
      nama_pengirim: 'Apotek Kimia Farma', nama_penerima: 'RS Kanujoso Balikpapan',
      no_telepon: '08111234003', kota_asal: 'Jakarta', kota_tujuan: 'Balikpapan',
      jenis_barang: 'Alat Medis', berat_barang: 12.0, harga_tarif: 360000,
      jenis_pengiriman: 'VVIP', status_pengiriman: 'Selesai',
      deskripsi: 'Prioritas tinggi, alat medis steril', pesawat_kode: 'GA-452',
    },
    {
      no_resi: 'AWB-2600104', tanggal_kirim: '2026-05-10',
      nama_pengirim: 'PT Agro Makmur', nama_penerima: 'Depot Makassar',
      no_telepon: '08111234004', kota_asal: 'Jakarta', kota_tujuan: 'Makassar',
      jenis_barang: 'Alat Pertanian', berat_barang: 88.0, harga_tarif: 1320000,
      jenis_pengiriman: 'Biasa', status_pengiriman: 'Dalam Pengiriman',
      deskripsi: 'Butuh penanganan khusus', pesawat_kode: 'JT-633',
    },
    {
      no_resi: 'AWB-2600105', tanggal_kirim: '2026-05-12',
      nama_pengirim: 'Toko Elektro Mas', nama_penerima: 'PT Nusa Manado',
      no_telepon: '08111234005', kota_asal: 'Jakarta', kota_tujuan: 'Manado',
      jenis_barang: 'Komputer & Laptop', berat_barang: 15.0, harga_tarif: 450000,
      jenis_pengiriman: 'Cepat', status_pengiriman: 'Diproses',
      deskripsi: 'Fragile, jangan ditumpuk', pesawat_kode: 'ID-8821',
    },
    {
      no_resi: 'AWB-2600106', tanggal_kirim: '2026-05-15',
      nama_pengirim: 'CV Tekstil Nusantara', nama_penerima: 'PT Padang Store',
      no_telepon: '08111234006', kota_asal: 'Jakarta', kota_tujuan: 'Padang',
      jenis_barang: 'Pakaian & Aksesoris', berat_barang: 31.0, harga_tarif: 465000,
      jenis_pengiriman: 'Biasa', status_pengiriman: 'Sampai Tujuan',
      deskripsi: null, pesawat_kode: 'SJ-220',
    },
    {
      no_resi: 'AWB-2600107', tanggal_kirim: '2026-05-18',
      nama_pengirim: 'PT Garuda Logistik', nama_penerima: 'CV Bali Mandiri',
      no_telepon: '08111234007', kota_asal: 'Jakarta', kota_tujuan: 'Denpasar',
      jenis_barang: 'Furnitur Ringan', berat_barang: 60.0, harga_tarif: 900000,
      jenis_pengiriman: 'Biasa', status_pengiriman: 'Pending',
      deskripsi: 'Menunggu konfirmasi penerima', pesawat_kode: 'GA-716',
    },
    {
      no_resi: 'AWB-2600108', tanggal_kirim: '2026-05-20',
      nama_pengirim: 'PT Matahari Retail', nama_penerima: 'Toko Makassar Baru',
      no_telepon: '08111234008', kota_asal: 'Jakarta', kota_tujuan: 'Makassar',
      jenis_barang: 'Produk FMCG', berat_barang: 55.0, harga_tarif: 825000,
      jenis_pengiriman: 'Cepat', status_pengiriman: 'Dalam Pengiriman',
      deskripsi: 'Jaga suhu ruang, tidak boleh panas', pesawat_kode: 'JT-633',
    },
    {
      no_resi: 'AWB-2600109', tanggal_kirim: '2026-05-22',
      nama_pengirim: 'Budi Santoso', nama_penerima: 'Rina Wijaya',
      no_telepon: '08111234009', kota_asal: 'Jakarta', kota_tujuan: 'Makassar',
      jenis_barang: 'Kerajinan Tangan', berat_barang: 8.5, harga_tarif: 127500,
      jenis_pengiriman: 'Biasa', status_pengiriman: 'Diproses',
      deskripsi: 'Kerajinan handmade, fragile', pesawat_kode: 'JT-633',
    },
    {
      no_resi: 'AWB-2600110', tanggal_kirim: '2026-05-24',
      nama_pengirim: 'RS Siloam Jakarta', nama_penerima: 'RS Bhayangkara Padang',
      no_telepon: '08111234010', kota_asal: 'Jakarta', kota_tujuan: 'Padang',
      jenis_barang: 'Obat-obatan', berat_barang: 5.0, harga_tarif: 250000,
      jenis_pengiriman: 'VVIP', status_pengiriman: 'Dalam Pengiriman',
      deskripsi: 'Obat resep, jaga rantai dingin 2-8°C', pesawat_kode: 'SJ-220',
    },
  ];

  for (const s of shipmentsData) {
    const pesawatId = s.pesawat_kode ? pesawatIds[s.pesawat_kode] || null : null;
    await sql`
      INSERT INTO shipments (
        no_resi, tanggal_kirim, nama_pengirim, nama_penerima, no_telepon,
        kota_asal, kota_tujuan, jenis_barang, berat_barang, harga_tarif,
        jenis_pengiriman, status_pengiriman, deskripsi, pesawat_id
      ) VALUES (
        ${s.no_resi}, ${s.tanggal_kirim}, ${s.nama_pengirim}, ${s.nama_penerima}, ${s.no_telepon},
        ${s.kota_asal}, ${s.kota_tujuan}, ${s.jenis_barang}, ${s.berat_barang}, ${s.harga_tarif},
        ${s.jenis_pengiriman}, ${s.status_pengiriman}, ${s.deskripsi || null}, ${pesawatId}
      )
      ON CONFLICT (no_resi) DO NOTHING
    `;
  }
}


async function seedTrackingLogs() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS tracking_logs (
      id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
      no_resi     VARCHAR(20)  NOT NULL,
      status      VARCHAR(30)  NOT NULL,
      keterangan  TEXT,
      lokasi      VARCHAR(200),
      updated_by  VARCHAR(100),
      created_at  TIMESTAMP DEFAULT NOW()
    )
  `;

  // Ambil semua shipment yang sudah ada untuk buat log awal
  const shipments = await sql\`SELECT id, no_resi, status_pengiriman, kota_asal, created_at FROM shipments\`;
  for (const s of shipments) {
    await sql\`
      INSERT INTO tracking_logs (shipment_id, no_resi, status, keterangan, lokasi, updated_by, created_at)
      VALUES (
        \${s.id}, \${s.no_resi}, \${s.status_pengiriman},
        \${'Paket diterima dan diregistrasi di sistem'},
        \${s.kota_asal + ' — Gudang Kargo'},
        'system',
        \${s.created_at}
      )
    \`;
  }
}

export async function GET() {
  try {
    await dropAll();
    await seedUsers();
    const pesawatIds = await seedPesawat();
    await seedShipments(pesawatIds);
    await seedTrackingLogs();
    return Response.json({ message: 'Database kargo udara berhasil di-seed! ✅ Akses /dashboard untuk melihat data.' });
  } catch (error) {
    console.error('Seed error:', error);
    return Response.json({ error }, { status: 500 });
  }
}
