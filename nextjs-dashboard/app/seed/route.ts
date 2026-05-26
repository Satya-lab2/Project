import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function dropAll() {
  await sql`DROP TABLE IF EXISTS shipments    CASCADE`;
  await sql`DROP TABLE IF EXISTS kendaraan    CASCADE`;
  await sql`DROP TABLE IF EXISTS users        CASCADE`;
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

async function seedKendaraan() {
  await sql`
    CREATE TABLE IF NOT EXISTS kendaraan (
      id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      nama_kendaraan   VARCHAR(100) NOT NULL,
      jenis_kendaraan  VARCHAR(50)  NOT NULL,
      plat_nomor       VARCHAR(20)  NOT NULL UNIQUE,
      kapasitas_muatan DECIMAL(10,2) NOT NULL DEFAULT 0,
      status_kendaraan VARCHAR(30)  NOT NULL DEFAULT 'Tersedia',
      created_at       TIMESTAMP DEFAULT NOW()
    )
  `;

  const kendaraanData = [
    { nama: 'Garuda Cargo GA-452', jenis: 'Pesawat', plat: 'GA-452', kapasitas: 5000, status: 'Digunakan' },
    { nama: 'Lion Air Cargo JT-633', jenis: 'Pesawat', plat: 'JT-633', kapasitas: 6000, status: 'Tersedia' },
    { nama: 'Truk Ekspedisi Satu', jenis: 'Truk', plat: 'B 1234 KRG', kapasitas: 8000, status: 'Tersedia' },
    { nama: 'Truk Ekspedisi Dua', jenis: 'Truk', plat: 'B 5678 KRG', kapasitas: 8000, status: 'Digunakan' },
    { nama: 'Motor Kurir 01', jenis: 'Motor', plat: 'B 1001 AB', kapasitas: 50, status: 'Tersedia' },
    { nama: 'Kapal Laut Nusantara', jenis: 'Kapal', plat: 'KL-NUS-01', kapasitas: 50000, status: 'Tersedia' },
  ];

  for (const k of kendaraanData) {
    await sql`
      INSERT INTO kendaraan (nama_kendaraan, jenis_kendaraan, plat_nomor, kapasitas_muatan, status_kendaraan)
      VALUES (${k.nama}, ${k.jenis}, ${k.plat}, ${k.kapasitas}, ${k.status})
      ON CONFLICT (plat_nomor) DO NOTHING
    `;
  }
}

async function seedShipments() {
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
      jenis_kendaraan   VARCHAR(50)   NOT NULL DEFAULT 'Udara',
      jenis_pengiriman  VARCHAR(20)   NOT NULL DEFAULT 'Biasa',
      status_pengiriman VARCHAR(30)   NOT NULL DEFAULT 'Diproses',
      deskripsi         TEXT,
      kendaraan_id      UUID REFERENCES kendaraan(id),
      created_at        TIMESTAMP DEFAULT NOW()
    )
  `;

  const shipmentsData = [
    {
      no_resi: 'KRG-2600101', tanggal_kirim: '2026-05-01',
      nama_pengirim: 'PT Sinar Jaya', nama_penerima: 'PT Mitra Surabaya',
      no_telepon: '08111234001', kota_asal: 'Jakarta', kota_tujuan: 'Surabaya',
      jenis_barang: 'Elektronik', berat_barang: 48.5, harga_tarif: 728000,
      jenis_kendaraan: 'Pesawat', jenis_pengiriman: 'Cepat', status_pengiriman: 'Selesai',
      deskripsi: 'Handle with care, barang elektronik sensitif',
    },
    {
      no_resi: 'KRG-2600102', tanggal_kirim: '2026-05-05',
      nama_pengirim: 'CV Maju Bersama', nama_penerima: 'Toko Bali Indah',
      no_telepon: '08111234002', kota_asal: 'Bandung', kota_tujuan: 'Denpasar',
      jenis_barang: 'Tekstil & Pakaian', berat_barang: 22.0, harga_tarif: 330000,
      jenis_kendaraan: 'Pesawat', jenis_pengiriman: 'Biasa', status_pengiriman: 'Dalam Pengiriman',
      deskripsi: null,
    },
    {
      no_resi: 'KRG-2600103', tanggal_kirim: '2026-05-08',
      nama_pengirim: 'Apotek Kimia Farma', nama_penerima: 'RS Kanujoso Balikpapan',
      no_telepon: '08111234003', kota_asal: 'Jakarta', kota_tujuan: 'Balikpapan',
      jenis_barang: 'Alat Medis', berat_barang: 12.0, harga_tarif: 360000,
      jenis_kendaraan: 'Pesawat', jenis_pengiriman: 'VVIP', status_pengiriman: 'Selesai',
      deskripsi: 'Prioritas tinggi, alat medis steril',
    },
    {
      no_resi: 'KRG-2600104', tanggal_kirim: '2026-05-10',
      nama_pengirim: 'PT Agro Makmur', nama_penerima: 'Depot Banjarmasin',
      no_telepon: '08111234004', kota_asal: 'Surabaya', kota_tujuan: 'Banjarmasin',
      jenis_barang: 'Alat Pertanian', berat_barang: 88.0, harga_tarif: 880000,
      jenis_kendaraan: 'Kapal', jenis_pengiriman: 'Biasa', status_pengiriman: 'Dalam Pengiriman',
      deskripsi: 'Butuh forklift untuk bongkar muat',
    },
    {
      no_resi: 'KRG-2600105', tanggal_kirim: '2026-05-12',
      nama_pengirim: 'Toko Elektro Mas', nama_penerima: 'PT Nusa Manado',
      no_telepon: '08111234005', kota_asal: 'Jakarta', kota_tujuan: 'Manado',
      jenis_barang: 'Komputer & Laptop', berat_barang: 15.0, harga_tarif: 450000,
      jenis_kendaraan: 'Pesawat', jenis_pengiriman: 'Cepat', status_pengiriman: 'Diproses',
      deskripsi: 'Fragile, jangan ditumpuk',
    },
    {
      no_resi: 'KRG-2600106', tanggal_kirim: '2026-05-15',
      nama_pengirim: 'CV Tekstil Nusantara', nama_penerima: 'PT Palembang Store',
      no_telepon: '08111234006', kota_asal: 'Bandung', kota_tujuan: 'Palembang',
      jenis_barang: 'Pakaian & Aksesoris', berat_barang: 31.0, harga_tarif: 310000,
      jenis_kendaraan: 'Truk', jenis_pengiriman: 'Biasa', status_pengiriman: 'Sampai Tujuan',
      deskripsi: null,
    },
    {
      no_resi: 'KRG-2600107', tanggal_kirim: '2026-05-18',
      nama_pengirim: 'PT Garuda Logistik', nama_penerima: 'CV Lombok Mandiri',
      no_telepon: '08111234007', kota_asal: 'Surabaya', kota_tujuan: 'Mataram',
      jenis_barang: 'Furniture', berat_barang: 120.0, harga_tarif: 1800000,
      jenis_kendaraan: 'Kapal', jenis_pengiriman: 'Biasa', status_pengiriman: 'Pending',
      deskripsi: 'Menunggu konfirmasi penerima',
    },
    {
      no_resi: 'KRG-2600108', tanggal_kirim: '2026-05-20',
      nama_pengirim: 'PT Matahari Retail', nama_penerima: 'Toko Ambon Baru',
      no_telepon: '08111234008', kota_asal: 'Jakarta', kota_tujuan: 'Ambon',
      jenis_barang: 'Produk FMCG', berat_barang: 55.0, harga_tarif: 825000,
      jenis_kendaraan: 'Pesawat', jenis_pengiriman: 'Cepat', status_pengiriman: 'Dalam Pengiriman',
      deskripsi: 'Jaga suhu ruang, tidak boleh panas',
    },
    {
      no_resi: 'KRG-2600109', tanggal_kirim: '2026-05-22',
      nama_pengirim: 'Budi Santoso', nama_penerima: 'Rina Wijaya',
      no_telepon: '08111234009', kota_asal: 'Yogyakarta', kota_tujuan: 'Makassar',
      jenis_barang: 'Kerajinan Tangan', berat_barang: 8.5, harga_tarif: 127500,
      jenis_kendaraan: 'Pesawat', jenis_pengiriman: 'Biasa', status_pengiriman: 'Diproses',
      deskripsi: 'Kerajinan handmade, fragile',
    },
    {
      no_resi: 'KRG-2600110', tanggal_kirim: '2026-05-24',
      nama_pengirim: 'RS Siloam Jakarta', nama_penerima: 'RS Bhayangkara Padang',
      no_telepon: '08111234010', kota_asal: 'Jakarta', kota_tujuan: 'Padang',
      jenis_barang: 'Obat-obatan', berat_barang: 5.0, harga_tarif: 250000,
      jenis_kendaraan: 'Pesawat', jenis_pengiriman: 'VVIP', status_pengiriman: 'Dalam Pengiriman',
      deskripsi: 'Obat resep, jaga rantai dingin 2-8°C',
    },
  ];

  for (const s of shipmentsData) {
    await sql`
      INSERT INTO shipments (
        no_resi, tanggal_kirim, nama_pengirim, nama_penerima, no_telepon,
        kota_asal, kota_tujuan, jenis_barang, berat_barang, harga_tarif,
        jenis_kendaraan, jenis_pengiriman, status_pengiriman, deskripsi
      ) VALUES (
        ${s.no_resi}, ${s.tanggal_kirim}, ${s.nama_pengirim}, ${s.nama_penerima}, ${s.no_telepon},
        ${s.kota_asal}, ${s.kota_tujuan}, ${s.jenis_barang}, ${s.berat_barang}, ${s.harga_tarif},
        ${s.jenis_kendaraan}, ${s.jenis_pengiriman}, ${s.status_pengiriman}, ${s.deskripsi || null}
      )
      ON CONFLICT (no_resi) DO NOTHING
    `;
  }
}

export async function GET() {
  try {
    await dropAll();
    await seedUsers();
    await seedKendaraan();
    await seedShipments();
    return Response.json({ message: 'Database kargo berhasil di-seed! ✅ Akses /dashboard untuk melihat data.' });
  } catch (error) {
    console.error('Seed error:', error);
    return Response.json({ error }, { status: 500 });
  }
}
