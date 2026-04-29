// ============================================================
// KARGO SYSTEM — Placeholder / Dummy Data
// ============================================================

// ============================================================
// 1. USERS
// ============================================================
export const users = [
  { id: '410544b2-4001-4271-9855-fec4b6a6442a', name: 'Admin Sistem',      email: 'admin@kargo.com',    password: 'admin123'    },
  { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Andika Supervisor',  email: 'andika@kargo.com',   password: 'super123'    },
  { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Budi Operator',      email: 'budi@kargo.com',     password: 'oper123'     },
  { id: '550e8400-e29b-41d4-a716-446655440003', name: 'Citra Dispatcher',   email: 'citra@kargo.com',    password: 'disp123'     },
  { id: '550e8400-e29b-41d4-a716-446655440004', name: 'Deni Warehouse',     email: 'deni@kargo.com',     password: 'ware123'     },
  { id: '550e8400-e29b-41d4-a716-446655440005', name: 'Eka CS',             email: 'eka@kargo.com',      password: 'cs123'       },
  { id: '550e8400-e29b-41d4-a716-446655440006', name: 'Fajar Kurir',        email: 'fajar@kargo.com',    password: 'kurir123'    },
  { id: '550e8400-e29b-41d4-a716-446655440007', name: 'Gita Keuangan',      email: 'gita@kargo.com',     password: 'keu123'      },
  { id: '550e8400-e29b-41d4-a716-446655440008', name: 'Hendra Manager',     email: 'hendra@kargo.com',   password: 'mgr123'      },
  { id: '550e8400-e29b-41d4-a716-446655440009', name: 'Indah IT Support',   email: 'indah@kargo.com',    password: 'it123'       },
];

// ============================================================
// 2. AIRPORTS
// ============================================================
export const airports = [
  { kode: 'CGK', nama: 'Bandar Udara Internasional Soekarno-Hatta',       kota: 'Tangerang',    provinsi: 'Banten',               latitude: -6.125300, longitude: 106.655900 },
  { kode: 'SUB', nama: 'Bandar Udara Internasional Juanda',               kota: 'Surabaya',     provinsi: 'Jawa Timur',           latitude: -7.379800, longitude: 112.787000 },
  { kode: 'DPS', nama: 'Bandar Udara Internasional Ngurah Rai',           kota: 'Denpasar',     provinsi: 'Bali',                 latitude: -8.748200, longitude: 115.167200 },
  { kode: 'MDC', nama: 'Bandar Udara Internasional Sam Ratulangi',        kota: 'Manado',       provinsi: 'Sulawesi Utara',       latitude:  1.549300, longitude: 124.926100 },
  { kode: 'UPG', nama: 'Bandar Udara Internasional Sultan Hasanuddin',    kota: 'Makassar',     provinsi: 'Sulawesi Selatan',     latitude: -5.061700, longitude: 119.554000 },
  { kode: 'PDG', nama: 'Bandar Udara Internasional Minangkabau',          kota: 'Padang',       provinsi: 'Sumatera Barat',       latitude: -0.878700, longitude: 100.353600 },
  { kode: 'BDJ', nama: 'Bandar Udara Internasional Syamsudin Noor',       kota: 'Banjarmasin',  provinsi: 'Kalimantan Selatan',   latitude: -3.442400, longitude: 114.762500 },
  { kode: 'PLM', nama: 'Bandar Udara Internasional Sultan Mahmud Badaruddin II', kota: 'Palembang', provinsi: 'Sumatera Selatan', latitude: -2.898200, longitude: 104.699900 },
  { kode: 'PKU', nama: 'Bandar Udara Internasional Sultan Syarif Kasim II', kota: 'Pekanbaru',  provinsi: 'Riau',                 latitude:  0.460786, longitude: 101.444900 },
  { kode: 'BPN', nama: 'Bandar Udara Internasional Sultan Aji Muhammad Sulaiman', kota: 'Balikpapan', provinsi: 'Kalimantan Timur', latitude: -1.268300, longitude: 116.893800 },
  { kode: 'JOG', nama: 'Bandar Udara Internasional Yogyakarta',           kota: 'Yogyakarta',   provinsi: 'DI Yogyakarta',        latitude: -7.905000, longitude: 110.052000 },
  { kode: 'SOC', nama: 'Bandar Udara Internasional Adi Soemarmo',         kota: 'Solo',         provinsi: 'Jawa Tengah',          latitude: -7.516000, longitude: 110.757000 },
];

// ============================================================
// 3. FLIGHTS
// ============================================================
export const flights = [
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', no_penerbangan: 'GA-452',  maskapai: 'Garuda Indonesia', asal: 'CGK', tujuan: 'SUB', etd: '08:30', eta: '10:15', tanggal: '2026-04-20', status: 'On Time',  kapasitas_kg: 5000 },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567802', no_penerbangan: 'GA-716',  maskapai: 'Garuda Indonesia', asal: 'CGK', tujuan: 'DPS', etd: '11:15', eta: '13:30', tanggal: '2026-04-20', status: 'Boarding', kapasitas_kg: 4500 },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567803', no_penerbangan: 'ID-8821', maskapai: 'Batik Air',         asal: 'CGK', tujuan: 'MDC', etd: '13:00', eta: '17:45', tanggal: '2026-04-20', status: 'Delayed',  kapasitas_kg: 3000 },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567804', no_penerbangan: 'JT-633',  maskapai: 'Lion Air',          asal: 'CGK', tujuan: 'UPG', etd: '06:45', eta: '10:10', tanggal: '2026-04-20', status: 'Departed', kapasitas_kg: 6000 },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567805', no_penerbangan: 'SJ-220',  maskapai: 'Sriwijaya Air',     asal: 'CGK', tujuan: 'PDG', etd: '14:30', eta: '16:00', tanggal: '2026-04-20', status: 'On Time',  kapasitas_kg: 3500 },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567806', no_penerbangan: 'JT-771',  maskapai: 'Lion Air',          asal: 'CGK', tujuan: 'BDJ', etd: '07:20', eta: '10:50', tanggal: '2026-04-20', status: 'Departed', kapasitas_kg: 5500 },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567807', no_penerbangan: 'GA-310',  maskapai: 'Garuda Indonesia', asal: 'CGK', tujuan: 'PLM', etd: '09:00', eta: '10:30', tanggal: '2026-04-20', status: 'On Time',  kapasitas_kg: 4000 },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567808', no_penerbangan: 'ID-6612', maskapai: 'Batik Air',         asal: 'CGK', tujuan: 'PKU', etd: '15:00', eta: '17:00', tanggal: '2026-04-20', status: 'On Time',  kapasitas_kg: 3200 },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567809', no_penerbangan: 'JT-502',  maskapai: 'Lion Air',          asal: 'CGK', tujuan: 'BPN', etd: '16:45', eta: '19:30', tanggal: '2026-04-20', status: 'Cancelled',kapasitas_kg: 5800 },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567810', no_penerbangan: 'IN-301',  maskapai: 'Wings Air',         asal: 'CGK', tujuan: 'JOG', etd: '10:00', eta: '11:15', tanggal: '2026-04-20', status: 'Arrived',  kapasitas_kg: 2000 },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567811', no_penerbangan: 'GA-228',  maskapai: 'Garuda Indonesia', asal: 'CGK', tujuan: 'SOC', etd: '12:30', eta: '13:45', tanggal: '2026-04-20', status: 'On Time',  kapasitas_kg: 3800 },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567812', no_penerbangan: 'IW-1836', maskapai: 'Wings Air',         asal: 'SUB', tujuan: 'DPS', etd: '08:00', eta: '09:10', tanggal: '2026-04-20', status: 'Departed', kapasitas_kg: 1500 },
];

// ============================================================
// 4. SHIPMENTS
// ============================================================
export const shipments = [
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', no_awb: 'AWB-71234097', pengirim: 'PT Slamet Jaya',        penerima: 'CV Sejahtera Abadi',      alamat_asal: 'Jl. Raya Industri No.12, Jakarta',    alamat_tujuan: 'Jl. Pemuda No.45, Surabaya',          jenis_barang: 'Elektronik',        berat_kg: 120.50, layanan: 'Regular',  status: 'Selesai',          tanggal_kirim: '2026-04-18' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678902', no_awb: 'AWB-11456136', pengirim: 'Toko Buku Gramedia',    penerima: 'Universitas Indonesia',   alamat_asal: 'Jl. Sudirman No.21, Jakarta',         alamat_tujuan: 'Kampus UI, Depok',                    jenis_barang: 'Buku & Dokumen',    berat_kg:  45.00, layanan: 'Express',  status: 'Expired',          tanggal_kirim: '2026-04-10' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678903', no_awb: 'AWB-70356764', pengirim: 'Boni Santoso',          penerima: 'Satya Wijaya',            alamat_asal: 'Jl. Wolter Monginsidi No.5, Manado',  alamat_tujuan: 'Jl. Gatot Subroto No.88, Jakarta',   jenis_barang: 'Pakaian',           berat_kg:  30.00, layanan: 'Same Day', status: 'Dalam Perjalanan', tanggal_kirim: '2026-04-20' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678904', no_awb: 'AWB-29648051', pengirim: 'Satya Wijaya',          penerima: 'Boni Santoso',            alamat_asal: 'Jl. Malioboro No.3, Yogyakarta',      alamat_tujuan: 'Jl. Wolter Monginsidi No.5, Manado', jenis_barang: 'Kerajinan Tangan',  berat_kg:  55.75, layanan: 'Regular',  status: 'Proses',           tanggal_kirim: '2026-04-20' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678905', no_awb: 'AWB-85431022', pengirim: 'PT Maju Bersama',       penerima: 'Depot Makassar Jaya',     alamat_asal: 'Kawasan MMTC, Jakarta',               alamat_tujuan: 'Jl. AP Pettarani No.10, Makassar',   jenis_barang: 'Spare Part Mesin',  berat_kg: 342.00, layanan: 'Express',  status: 'Selesai',          tanggal_kirim: '2026-04-19' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678906', no_awb: 'AWB-60912883', pengirim: 'CV Cahaya Nusantara',   penerima: 'Toko Denpasar Utama',     alamat_asal: 'Jl. Daan Mogot No.17, Tangerang',     alamat_tujuan: 'Jl. Teuku Umar No.7, Denpasar',      jenis_barang: 'Produk FMCG',       berat_kg: 210.00, layanan: 'Regular',  status: 'Dalam Perjalanan', tanggal_kirim: '2026-04-20' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678907', no_awb: 'AWB-33187645', pengirim: 'PT Banjar Alam',        penerima: 'UD Kalimantan Raya',      alamat_asal: 'Jl. MT Haryono No.9, Jakarta',        alamat_tujuan: 'Jl. A Yani Km.5, Banjarmasin',       jenis_barang: 'Alat Pertanian',    berat_kg: 480.00, layanan: 'Regular',  status: 'Proses',           tanggal_kirim: '2026-04-20' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678908', no_awb: 'AWB-44501293', pengirim: 'RS Siloam Jakarta',     penerima: 'RS Bhayangkara Palembang',alamat_asal: 'Jl. Garnisun No.2, Jakarta',           alamat_tujuan: 'Jl. Jend. Sudirman No.1, Palembang', jenis_barang: 'Alat Medis',        berat_kg:  88.00, layanan: 'Express',  status: 'Selesai',          tanggal_kirim: '2026-04-20' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678909', no_awb: 'AWB-55678234', pengirim: 'CV Indo Fashion',       penerima: 'Butik Bali Indah',        alamat_asal: 'Jl. Cipadu No.88, Tangerang',         alamat_tujuan: 'Jl. Legian No.66, Kuta, Bali',       jenis_barang: 'Tekstil & Pakaian', berat_kg: 145.00, layanan: 'Regular',  status: 'Selesai',          tanggal_kirim: '2026-04-19' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678910', no_awb: 'AWB-66789012', pengirim: 'PT Nusantara Telco',    penerima: 'PT Tower Bersama Pekanbaru', alamat_asal: 'Jl. TB Simatupang, Jakarta',        alamat_tujuan: 'Jl. Riau No.5, Pekanbaru',           jenis_barang: 'Perangkat Telekomunikasi', berat_kg: 520.00, layanan: 'Express', status: 'Dalam Perjalanan', tanggal_kirim: '2026-04-20' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678911', no_awb: 'AWB-77890123', pengirim: 'UD Mekar Jaya',         penerima: 'CV Balikpapan Sejahtera', alamat_asal: 'Jl. Penggilingan No.7, Jakarta',      alamat_tujuan: 'Jl. Jend. Sudirman No.12, Balikpapan',jenis_barang: 'Material Bangunan', berat_kg: 750.00, layanan: 'Regular',  status: 'Proses',           tanggal_kirim: '2026-04-20' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678912', no_awb: 'AWB-88901234', pengirim: 'PT Agro Nusantara',     penerima: 'Koperasi Tani Solo',      alamat_asal: 'Jl. Cikini No.30, Jakarta',           alamat_tujuan: 'Jl. Slamet Riyadi No.9, Solo',       jenis_barang: 'Pupuk & Bibit',     berat_kg:  95.50, layanan: 'Regular',  status: 'Proses',           tanggal_kirim: '2026-04-20' },
];

// ============================================================
// 5. MANIFEST
// ============================================================
export const manifest = [
  { flight_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', posisi_muat: 'ULD'      },
  { flight_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678902', posisi_muat: 'Bulk'     },
  { flight_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567802', shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678906', posisi_muat: 'Bulk'     },
  { flight_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567802', shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678909', posisi_muat: 'ULD'      },
  { flight_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567804', shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678905', posisi_muat: 'Priority' },
  { flight_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567806', shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678907', posisi_muat: 'Bulk'     },
  { flight_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567807', shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678908', posisi_muat: 'Priority' },
  { flight_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567808', shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678910', posisi_muat: 'ULD'      },
  { flight_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567809', shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678911', posisi_muat: 'Bulk'     },
  { flight_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567810', shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678904', posisi_muat: 'Bulk'     },
  { flight_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567811', shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678912', posisi_muat: 'Bulk'     },
  { flight_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567812', shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678903', posisi_muat: 'Priority' },
];

// ============================================================
// 6. TRACKING_EVENTS
// ============================================================
export const trackingEvents = [
  // AWB-71234097 (Selesai)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', waktu: '2026-04-18 07:00:00', lokasi: 'Gudang CGK',               keterangan: 'Barang diterima di gudang CGK',              urutan: 1 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', waktu: '2026-04-18 08:30:00', lokasi: 'Gudang CGK',               keterangan: 'Proses sortasi dan penimbangan',             urutan: 2 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', waktu: '2026-04-18 09:15:00', lokasi: 'CGK - Apron',              keterangan: 'Barang dimuat ke pesawat GA-452',            urutan: 3 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', waktu: '2026-04-18 10:45:00', lokasi: 'Bandara Juanda, SUB',      keterangan: 'Pesawat mendarat di SUB',                    urutan: 4 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', waktu: '2026-04-18 12:00:00', lokasi: 'Gudang SUB',               keterangan: 'Barang diterima penerima — Selesai',         urutan: 5 },
  // AWB-70356764 (Dalam Perjalanan)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678903', waktu: '2026-04-20 06:00:00', lokasi: 'Gudang CGK',               keterangan: 'Barang diterima di gudang CGK',              urutan: 1 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678903', waktu: '2026-04-20 07:30:00', lokasi: 'CGK - Apron',              keterangan: 'Barang dimuat ke pesawat',                   urutan: 2 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678903', waktu: '2026-04-20 08:00:00', lokasi: 'Udara',                    keterangan: 'Pesawat berangkat menuju MDC',               urutan: 3 },
  // AWB-85431022 (Selesai)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678905', waktu: '2026-04-19 05:30:00', lokasi: 'Gudang CGK',               keterangan: 'Barang diterima di gudang CGK',              urutan: 1 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678905', waktu: '2026-04-19 06:30:00', lokasi: 'CGK - Apron',              keterangan: 'Dimuat ke pesawat JT-633',                   urutan: 2 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678905', waktu: '2026-04-19 10:30:00', lokasi: 'Bandara Hasanuddin, UPG',  keterangan: 'Pesawat mendarat di UPG',                    urutan: 3 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678905', waktu: '2026-04-19 13:00:00', lokasi: 'Gudang UPG',               keterangan: 'Barang diserahkan ke penerima — Selesai',    urutan: 4 },
  // AWB-29648051 (Proses)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678904', waktu: '2026-04-20 09:00:00', lokasi: 'Gudang CGK',               keterangan: 'Barang diterima, menunggu sortasi',          urutan: 1 },
  // AWB-44501293 (Selesai - Alat Medis)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678908', waktu: '2026-04-20 06:00:00', lokasi: 'Gudang CGK',               keterangan: 'Barang medis diterima, penanganan prioritas',urutan: 1 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678908', waktu: '2026-04-20 07:30:00', lokasi: 'CGK - Apron',              keterangan: 'Dimuat ke pesawat GA-310 (Priority)',        urutan: 2 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678908', waktu: '2026-04-20 10:45:00', lokasi: 'Bandara SMB II, PLM',      keterangan: 'Pesawat mendarat di Palembang',              urutan: 3 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678908', waktu: '2026-04-20 12:00:00', lokasi: 'RS Bhayangkara, Palembang',keterangan: 'Alat medis diterima penerima — Selesai',     urutan: 4 },
  // AWB-66789012 (Dalam Perjalanan)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678910', waktu: '2026-04-20 13:00:00', lokasi: 'Gudang CGK',               keterangan: 'Perangkat telco diterima dan diverifikasi',  urutan: 1 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678910', waktu: '2026-04-20 14:30:00', lokasi: 'CGK - Apron',              keterangan: 'Dimuat ke pesawat ID-6612',                  urutan: 2 },
];