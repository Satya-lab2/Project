// ============================================================
// KARGO SYSTEM — Placeholder / Dummy Data
// ============================================================

// ============================================================
// 1. USERS
// ============================================================
export const users = [
  { id: '410544b2-4001-4271-9855-fec4b6a6442a', name: 'Admin Sistem',     email: 'admin@kargo.com',   password: 'admin123'  },
  { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Andika Supervisor', email: 'andika@kargo.com',  password: 'super123'  },
  { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Budi Operator',     email: 'budi@kargo.com',    password: 'oper123'   },
  { id: '550e8400-e29b-41d4-a716-446655440003', name: 'Citra Dispatcher',  email: 'citra@kargo.com',   password: 'disp123'   },
  { id: '550e8400-e29b-41d4-a716-446655440004', name: 'Deni Warehouse',    email: 'deni@kargo.com',    password: 'ware123'   },
  { id: '550e8400-e29b-41d4-a716-446655440005', name: 'Eka CS',            email: 'eka@kargo.com',     password: 'cs123'     },
  { id: '550e8400-e29b-41d4-a716-446655440006', name: 'Fajar Kurir',       email: 'fajar@kargo.com',   password: 'kurir123'  },
  { id: '550e8400-e29b-41d4-a716-446655440007', name: 'Gita Keuangan',     email: 'gita@kargo.com',    password: 'keu123'    },
  { id: '550e8400-e29b-41d4-a716-446655440008', name: 'Hendra Manager',    email: 'hendra@kargo.com',  password: 'mgr123'    },
  { id: '550e8400-e29b-41d4-a716-446655440009', name: 'Indah IT Support',  email: 'indah@kargo.com',   password: 'it123'     },
];

// ============================================================
// 2. USER_PROFILES (One to One dengan users)
// ============================================================
export const userProfiles = [
  { user_id: '410544b2-4001-4271-9855-fec4b6a6442a', no_telp: '08111000001', jabatan: 'System Administrator', departemen: 'IT',         foto_url: null },
  { user_id: '550e8400-e29b-41d4-a716-446655440001', no_telp: '08111000002', jabatan: 'Supervisor Operasional', departemen: 'Operasional', foto_url: null },
  { user_id: '550e8400-e29b-41d4-a716-446655440002', no_telp: '08111000003', jabatan: 'Operator Gudang',        departemen: 'Gudang',      foto_url: null },
  { user_id: '550e8400-e29b-41d4-a716-446655440003', no_telp: '08111000004', jabatan: 'Dispatcher',             departemen: 'Operasional', foto_url: null },
  { user_id: '550e8400-e29b-41d4-a716-446655440004', no_telp: '08111000005', jabatan: 'Petugas Warehouse',      departemen: 'Gudang',      foto_url: null },
  { user_id: '550e8400-e29b-41d4-a716-446655440005', no_telp: '08111000006', jabatan: 'Customer Service',       departemen: 'CS',          foto_url: null },
  { user_id: '550e8400-e29b-41d4-a716-446655440006', no_telp: '08111000007', jabatan: 'Kurir',                  departemen: 'Pengiriman',  foto_url: null },
  { user_id: '550e8400-e29b-41d4-a716-446655440007', no_telp: '08111000008', jabatan: 'Staff Keuangan',         departemen: 'Keuangan',    foto_url: null },
  { user_id: '550e8400-e29b-41d4-a716-446655440008', no_telp: '08111000009', jabatan: 'Manajer Operasional',    departemen: 'Manajemen',   foto_url: null },
  { user_id: '550e8400-e29b-41d4-a716-446655440009', no_telp: '08111000010', jabatan: 'IT Support',             departemen: 'IT',          foto_url: null },
];

// ============================================================
// 3. AIRPORTS (Data Master)
// ============================================================
export const airports = [
  { kode: 'CGK', nama: 'Bandar Udara Internasional Soekarno-Hatta',              kota: 'Tangerang',   provinsi: 'Banten',             latitude: -6.125300, longitude: 106.655900 },
  { kode: 'SUB', nama: 'Bandar Udara Internasional Juanda',                      kota: 'Surabaya',    provinsi: 'Jawa Timur',         latitude: -7.379800, longitude: 112.787000 },
  { kode: 'DPS', nama: 'Bandar Udara Internasional Ngurah Rai',                  kota: 'Denpasar',    provinsi: 'Bali',               latitude: -8.748200, longitude: 115.167200 },
  { kode: 'MDC', nama: 'Bandar Udara Internasional Sam Ratulangi',               kota: 'Manado',      provinsi: 'Sulawesi Utara',     latitude:  1.549300, longitude: 124.926100 },
  { kode: 'UPG', nama: 'Bandar Udara Internasional Sultan Hasanuddin',           kota: 'Makassar',    provinsi: 'Sulawesi Selatan',   latitude: -5.061700, longitude: 119.554000 },
  { kode: 'PDG', nama: 'Bandar Udara Internasional Minangkabau',                 kota: 'Padang',      provinsi: 'Sumatera Barat',     latitude: -0.878700, longitude: 100.353600 },
  { kode: 'BDJ', nama: 'Bandar Udara Internasional Syamsudin Noor',              kota: 'Banjarmasin', provinsi: 'Kalimantan Selatan', latitude: -3.442400, longitude: 114.762500 },
  { kode: 'PLM', nama: 'Bandar Udara Internasional Sultan Mahmud Badaruddin II', kota: 'Palembang',   provinsi: 'Sumatera Selatan',   latitude: -2.898200, longitude: 104.699900 },
  { kode: 'PKU', nama: 'Bandar Udara Internasional Sultan Syarif Kasim II',      kota: 'Pekanbaru',   provinsi: 'Riau',               latitude:  0.460786, longitude: 101.444900 },
  { kode: 'BPN', nama: 'Bandar Udara Internasional Sultan Aji Muhammad Sulaiman',kota: 'Balikpapan',  provinsi: 'Kalimantan Timur',   latitude: -1.268300, longitude: 116.893800 },
  { kode: 'JOG', nama: 'Bandar Udara Internasional Yogyakarta',                  kota: 'Yogyakarta',  provinsi: 'DI Yogyakarta',      latitude: -7.905000, longitude: 110.052000 },
  { kode: 'SOC', nama: 'Bandar Udara Internasional Adi Soemarmo',                kota: 'Solo',        provinsi: 'Jawa Tengah',        latitude: -7.516000, longitude: 110.757000 },
];

// ============================================================
// 4. CUSTOMERS (Data Master)
// ============================================================
export const customers = [
  { id: 'c0000001-0000-0000-0000-000000000001', nama: 'PT Slamet Jaya',          email: 'info@slamet.co.id',      no_telp: '02155001001', alamat: 'Jl. Raya Industri No.12, Jakarta',        kota: 'Jakarta',     tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000002', nama: 'CV Sejahtera Abadi',       email: 'cs@sejahtera.co.id',     no_telp: '03155001002', alamat: 'Jl. Pemuda No.45, Surabaya',              kota: 'Surabaya',    tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000003', nama: 'Toko Buku Gramedia',       email: 'gramedia@buku.id',       no_telp: '02155001003', alamat: 'Jl. Sudirman No.21, Jakarta',             kota: 'Jakarta',     tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000004', nama: 'Universitas Indonesia',    email: 'logistik@ui.ac.id',      no_telp: '02155001004', alamat: 'Kampus UI, Depok',                        kota: 'Depok',       tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000005', nama: 'Boni Santoso',             email: 'boni.s@gmail.com',       no_telp: '08155001005', alamat: 'Jl. Wolter Monginsidi No.5, Manado',      kota: 'Manado',      tipe: 'Perorangan'  },
  { id: 'c0000001-0000-0000-0000-000000000006', nama: 'Satya Wijaya',             email: 'satya.w@gmail.com',      no_telp: '08155001006', alamat: 'Jl. Gatot Subroto No.88, Jakarta',        kota: 'Jakarta',     tipe: 'Perorangan'  },
  { id: 'c0000001-0000-0000-0000-000000000007', nama: 'PT Maju Bersama',          email: 'ops@majubersama.co.id',  no_telp: '02155001007', alamat: 'Kawasan MMTC, Jakarta',                   kota: 'Jakarta',     tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000008', nama: 'Depot Makassar Jaya',      email: 'depot@mksjaya.co.id',    no_telp: '04155001008', alamat: 'Jl. AP Pettarani No.10, Makassar',        kota: 'Makassar',    tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000009', nama: 'CV Cahaya Nusantara',      email: 'info@cahayanus.co.id',   no_telp: '02155001009', alamat: 'Jl. Daan Mogot No.17, Tangerang',         kota: 'Tangerang',   tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000010', nama: 'Toko Denpasar Utama',      email: 'toko@dpsutama.co.id',    no_telp: '03655001010', alamat: 'Jl. Teuku Umar No.7, Denpasar',           kota: 'Denpasar',    tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000011', nama: 'PT Banjar Alam',           email: 'logistik@banjaralam.id', no_telp: '02155001011', alamat: 'Jl. MT Haryono No.9, Jakarta',            kota: 'Jakarta',     tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000012', nama: 'UD Kalimantan Raya',       email: 'ud@kalraya.co.id',       no_telp: '05115001012', alamat: 'Jl. A Yani Km.5, Banjarmasin',            kota: 'Banjarmasin', tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000013', nama: 'RS Siloam Jakarta',        email: 'logistik@siloam.id',     no_telp: '02155001013', alamat: 'Jl. Garnisun No.2, Jakarta',              kota: 'Jakarta',     tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000014', nama: 'RS Bhayangkara Palembang', email: 'rs@bhayplm.co.id',       no_telp: '07115001014', alamat: 'Jl. Jend. Sudirman No.1, Palembang',      kota: 'Palembang',   tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000015', nama: 'CV Indo Fashion',          email: 'cs@indofashion.co.id',   no_telp: '02155001015', alamat: 'Jl. Cipadu No.88, Tangerang',             kota: 'Tangerang',   tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000016', nama: 'Butik Bali Indah',         email: 'butik@baliindah.co.id',  no_telp: '03615001016', alamat: 'Jl. Legian No.66, Kuta, Bali',            kota: 'Denpasar',    tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000017', nama: 'PT Nusantara Telco',       email: 'ops@nustelco.co.id',     no_telp: '02155001017', alamat: 'Jl. TB Simatupang, Jakarta',              kota: 'Jakarta',     tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000018', nama: 'PT Tower Bersama Pekanbaru',email:'tower@pku.co.id',        no_telp: '07615001018', alamat: 'Jl. Riau No.5, Pekanbaru',                kota: 'Pekanbaru',   tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000019', nama: 'UD Mekar Jaya',            email: 'ud@mekjaya.co.id',       no_telp: '02155001019', alamat: 'Jl. Penggilingan No.7, Jakarta',           kota: 'Jakarta',     tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000020', nama: 'CV Balikpapan Sejahtera',  email: 'cv@bpnsejahtera.co.id',  no_telp: '05425001020', alamat: 'Jl. Jend. Sudirman No.12, Balikpapan',    kota: 'Balikpapan',  tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000021', nama: 'PT Agro Nusantara',        email: 'agro@nusantara.co.id',   no_telp: '02155001021', alamat: 'Jl. Cikini No.30, Jakarta',               kota: 'Jakarta',     tipe: 'Perusahaan'  },
  { id: 'c0000001-0000-0000-0000-000000000022', nama: 'Koperasi Tani Solo',       email: 'koptani@solo.co.id',     no_telp: '02715001022', alamat: 'Jl. Slamet Riyadi No.9, Solo',            kota: 'Solo',        tipe: 'Perusahaan'  },
];

// ============================================================
// 5. FLIGHTS (One to Many dengan airports)
// ============================================================
export const flights = [
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', no_penerbangan: 'GA-452',  maskapai: 'Garuda Indonesia', asal: 'CGK', tujuan: 'SUB', etd: '08:30', eta: '10:15', tanggal: '2026-04-20', status: 'On Time',   kapasitas_kg: 5000, created_by: '550e8400-e29b-41d4-a716-446655440001' },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567802', no_penerbangan: 'GA-716',  maskapai: 'Garuda Indonesia', asal: 'CGK', tujuan: 'DPS', etd: '11:15', eta: '13:30', tanggal: '2026-04-20', status: 'Boarding',  kapasitas_kg: 4500, created_by: '550e8400-e29b-41d4-a716-446655440001' },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567803', no_penerbangan: 'ID-8821', maskapai: 'Batik Air',         asal: 'CGK', tujuan: 'MDC', etd: '13:00', eta: '17:45', tanggal: '2026-04-20', status: 'Delayed',   kapasitas_kg: 3000, created_by: '550e8400-e29b-41d4-a716-446655440003' },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567804', no_penerbangan: 'JT-633',  maskapai: 'Lion Air',          asal: 'CGK', tujuan: 'UPG', etd: '06:45', eta: '10:10', tanggal: '2026-04-20', status: 'Departed',  kapasitas_kg: 6000, created_by: '550e8400-e29b-41d4-a716-446655440003' },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567805', no_penerbangan: 'SJ-220',  maskapai: 'Sriwijaya Air',     asal: 'CGK', tujuan: 'PDG', etd: '14:30', eta: '16:00', tanggal: '2026-04-20', status: 'On Time',   kapasitas_kg: 3500, created_by: '550e8400-e29b-41d4-a716-446655440001' },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567806', no_penerbangan: 'JT-771',  maskapai: 'Lion Air',          asal: 'CGK', tujuan: 'BDJ', etd: '07:20', eta: '10:50', tanggal: '2026-04-20', status: 'Departed',  kapasitas_kg: 5500, created_by: '550e8400-e29b-41d4-a716-446655440003' },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567807', no_penerbangan: 'GA-310',  maskapai: 'Garuda Indonesia', asal: 'CGK', tujuan: 'PLM', etd: '09:00', eta: '10:30', tanggal: '2026-04-20', status: 'On Time',   kapasitas_kg: 4000, created_by: '550e8400-e29b-41d4-a716-446655440001' },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567808', no_penerbangan: 'ID-6612', maskapai: 'Batik Air',         asal: 'CGK', tujuan: 'PKU', etd: '15:00', eta: '17:00', tanggal: '2026-04-20', status: 'On Time',   kapasitas_kg: 3200, created_by: '550e8400-e29b-41d4-a716-446655440001' },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567809', no_penerbangan: 'JT-502',  maskapai: 'Lion Air',          asal: 'CGK', tujuan: 'BPN', etd: '16:45', eta: '19:30', tanggal: '2026-04-20', status: 'Cancelled', kapasitas_kg: 5800, created_by: '550e8400-e29b-41d4-a716-446655440003' },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567810', no_penerbangan: 'IN-301',  maskapai: 'Wings Air',         asal: 'CGK', tujuan: 'JOG', etd: '10:00', eta: '11:15', tanggal: '2026-04-20', status: 'Arrived',   kapasitas_kg: 2000, created_by: '550e8400-e29b-41d4-a716-446655440001' },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567811', no_penerbangan: 'GA-228',  maskapai: 'Garuda Indonesia', asal: 'CGK', tujuan: 'SOC', etd: '12:30', eta: '13:45', tanggal: '2026-04-20', status: 'On Time',   kapasitas_kg: 3800, created_by: '550e8400-e29b-41d4-a716-446655440001' },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567812', no_penerbangan: 'IW-1836', maskapai: 'Wings Air',         asal: 'SUB', tujuan: 'DPS', etd: '08:00', eta: '09:10', tanggal: '2026-04-20', status: 'Departed',  kapasitas_kg: 1500, created_by: '550e8400-e29b-41d4-a716-446655440003' },
];

// ============================================================
// 6. SHIPMENTS (One to Many dengan customers, FK ke users)
// ============================================================
export const shipments = [
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', no_awb: 'AWB-71234097', customer_id: 'c0000001-0000-0000-0000-000000000001', penerima_id: 'c0000001-0000-0000-0000-000000000002', jenis_barang: 'Elektronik',              berat_kg: 120.50, layanan: 'Regular',  status: 'Selesai',          tanggal_kirim: '2026-04-18', created_by: '550e8400-e29b-41d4-a716-446655440002' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678902', no_awb: 'AWB-11456136', customer_id: 'c0000001-0000-0000-0000-000000000003', penerima_id: 'c0000001-0000-0000-0000-000000000004', jenis_barang: 'Buku & Dokumen',          berat_kg:  45.00, layanan: 'Express',  status: 'Expired',          tanggal_kirim: '2026-04-10', created_by: '550e8400-e29b-41d4-a716-446655440005' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678903', no_awb: 'AWB-70356764', customer_id: 'c0000001-0000-0000-0000-000000000005', penerima_id: 'c0000001-0000-0000-0000-000000000006', jenis_barang: 'Pakaian',                 berat_kg:  30.00, layanan: 'Same Day', status: 'Dalam Perjalanan', tanggal_kirim: '2026-04-20', created_by: '550e8400-e29b-41d4-a716-446655440005' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678904', no_awb: 'AWB-29648051', customer_id: 'c0000001-0000-0000-0000-000000000006', penerima_id: 'c0000001-0000-0000-0000-000000000005', jenis_barang: 'Kerajinan Tangan',        berat_kg:  55.75, layanan: 'Regular',  status: 'Proses',           tanggal_kirim: '2026-04-20', created_by: '550e8400-e29b-41d4-a716-446655440002' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678905', no_awb: 'AWB-85431022', customer_id: 'c0000001-0000-0000-0000-000000000007', penerima_id: 'c0000001-0000-0000-0000-000000000008', jenis_barang: 'Spare Part Mesin',        berat_kg: 342.00, layanan: 'Express',  status: 'Selesai',          tanggal_kirim: '2026-04-19', created_by: '550e8400-e29b-41d4-a716-446655440002' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678906', no_awb: 'AWB-60912883', customer_id: 'c0000001-0000-0000-0000-000000000009', penerima_id: 'c0000001-0000-0000-0000-000000000010', jenis_barang: 'Produk FMCG',             berat_kg: 210.00, layanan: 'Regular',  status: 'Dalam Perjalanan', tanggal_kirim: '2026-04-20', created_by: '550e8400-e29b-41d4-a716-446655440002' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678907', no_awb: 'AWB-33187645', customer_id: 'c0000001-0000-0000-0000-000000000011', penerima_id: 'c0000001-0000-0000-0000-000000000012', jenis_barang: 'Alat Pertanian',          berat_kg: 480.00, layanan: 'Regular',  status: 'Proses',           tanggal_kirim: '2026-04-20', created_by: '550e8400-e29b-41d4-a716-446655440004' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678908', no_awb: 'AWB-44501293', customer_id: 'c0000001-0000-0000-0000-000000000013', penerima_id: 'c0000001-0000-0000-0000-000000000014', jenis_barang: 'Alat Medis',              berat_kg:  88.00, layanan: 'Express',  status: 'Selesai',          tanggal_kirim: '2026-04-20', created_by: '550e8400-e29b-41d4-a716-446655440002' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678909', no_awb: 'AWB-55678234', customer_id: 'c0000001-0000-0000-0000-000000000015', penerima_id: 'c0000001-0000-0000-0000-000000000016', jenis_barang: 'Tekstil & Pakaian',       berat_kg: 145.00, layanan: 'Regular',  status: 'Selesai',          tanggal_kirim: '2026-04-19', created_by: '550e8400-e29b-41d4-a716-446655440005' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678910', no_awb: 'AWB-66789012', customer_id: 'c0000001-0000-0000-0000-000000000017', penerima_id: 'c0000001-0000-0000-0000-000000000018', jenis_barang: 'Perangkat Telekomunikasi', berat_kg: 520.00, layanan: 'Express',  status: 'Dalam Perjalanan', tanggal_kirim: '2026-04-20', created_by: '550e8400-e29b-41d4-a716-446655440002' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678911', no_awb: 'AWB-77890123', customer_id: 'c0000001-0000-0000-0000-000000000019', penerima_id: 'c0000001-0000-0000-0000-000000000020', jenis_barang: 'Material Bangunan',       berat_kg: 750.00, layanan: 'Regular',  status: 'Proses',           tanggal_kirim: '2026-04-20', created_by: '550e8400-e29b-41d4-a716-446655440004' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678912', no_awb: 'AWB-88901234', customer_id: 'c0000001-0000-0000-0000-000000000021', penerima_id: 'c0000001-0000-0000-0000-000000000022', jenis_barang: 'Pupuk & Bibit',           berat_kg:  95.50, layanan: 'Regular',  status: 'Proses',           tanggal_kirim: '2026-04-20', created_by: '550e8400-e29b-41d4-a716-446655440004' },
];

// ============================================================
// 7. SHIPMENT_DETAILS (One to One dengan shipments)
// ============================================================
export const shipmentDetails = [
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', panjang_cm:  60, lebar_cm:  40, tinggi_cm: 30, berat_volume_kg:  28.80, no_asuransi: 'ASR-2026-0001', nilai_barang:  15000000, catatan: 'Fragile, handle with care' },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678902', panjang_cm:  50, lebar_cm:  35, tinggi_cm: 25, berat_volume_kg:  14.58, no_asuransi: null,            nilai_barang:   1500000, catatan: 'Buku referensi akademik' },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678903', panjang_cm:  40, lebar_cm:  30, tinggi_cm: 20, berat_volume_kg:   8.00, no_asuransi: null,            nilai_barang:   2000000, catatan: null },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678904', panjang_cm:  45, lebar_cm:  35, tinggi_cm: 30, berat_volume_kg:  13.13, no_asuransi: null,            nilai_barang:   3500000, catatan: 'Kerajinan handmade, fragile' },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678905', panjang_cm: 120, lebar_cm:  80, tinggi_cm: 60, berat_volume_kg: 384.00, no_asuransi: 'ASR-2026-0005', nilai_barang:  85000000, catatan: 'Berat aktual dipakai karena lebih besar dari volume' },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678906', panjang_cm:  80, lebar_cm:  60, tinggi_cm: 50, berat_volume_kg: 160.00, no_asuransi: null,            nilai_barang:  32000000, catatan: 'FMCG, jaga suhu ruang' },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678907', panjang_cm: 150, lebar_cm: 100, tinggi_cm: 80, berat_volume_kg: 800.00, no_asuransi: 'ASR-2026-0007', nilai_barang:  60000000, catatan: 'Alat pertanian berat, butuh forklift' },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678908', panjang_cm:  70, lebar_cm:  50, tinggi_cm: 40, berat_volume_kg:  93.33, no_asuransi: 'ASR-2026-0008', nilai_barang: 120000000, catatan: 'Alat medis steril, jaga kebersihan' },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678909', panjang_cm:  90, lebar_cm:  60, tinggi_cm: 40, berat_volume_kg: 144.00, no_asuransi: null,            nilai_barang:  28000000, catatan: null },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678910', panjang_cm: 100, lebar_cm:  80, tinggi_cm: 70, berat_volume_kg: 373.33, no_asuransi: 'ASR-2026-0010', nilai_barang: 200000000, catatan: 'Perangkat telco sensitif, jangan ditumpuk' },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678911', panjang_cm: 200, lebar_cm: 100, tinggi_cm: 80, berat_volume_kg: 1066.67,no_asuransi: 'ASR-2026-0011', nilai_barang:  95000000, catatan: 'Material bangunan, gunakan crane' },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678912', panjang_cm:  60, lebar_cm:  50, tinggi_cm: 40, berat_volume_kg:  80.00, no_asuransi: null,            nilai_barang:   8500000, catatan: 'Pupuk organik, jauhkan dari panas' },
];

// ============================================================
// 8. MANIFEST (Many to Many: flights <-> shipments)
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
// 9. TRACKING_EVENTS (semua 12 shipment terisi)
// ============================================================
export const trackingEvents = [
  // AWB-71234097 (Selesai)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', waktu: '2026-04-18 07:00:00', lokasi: 'Gudang CGK',               keterangan: 'Barang diterima di gudang CGK',               urutan: 1 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', waktu: '2026-04-18 08:30:00', lokasi: 'Gudang CGK',               keterangan: 'Proses sortasi dan penimbangan',              urutan: 2 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', waktu: '2026-04-18 09:15:00', lokasi: 'CGK - Apron',              keterangan: 'Barang dimuat ke pesawat GA-452',             urutan: 3 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', waktu: '2026-04-18 10:45:00', lokasi: 'Bandara Juanda, SUB',      keterangan: 'Pesawat mendarat di SUB',                     urutan: 4 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', waktu: '2026-04-18 12:00:00', lokasi: 'Gudang SUB',               keterangan: 'Barang diterima penerima — Selesai',          urutan: 5 },
  // AWB-11456136 (Expired)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678902', waktu: '2026-04-10 08:00:00', lokasi: 'Gudang CGK',               keterangan: 'Barang diterima di gudang CGK',               urutan: 1 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678902', waktu: '2026-04-10 09:00:00', lokasi: 'Gudang CGK',               keterangan: 'Sortasi selesai, menunggu penerbangan',       urutan: 2 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678902', waktu: '2026-04-17 10:00:00', lokasi: 'Gudang CGK',               keterangan: 'Barang tidak diambil — status Expired',       urutan: 3 },
  // AWB-70356764 (Dalam Perjalanan)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678903', waktu: '2026-04-20 06:00:00', lokasi: 'Gudang CGK',               keterangan: 'Barang diterima di gudang CGK',               urutan: 1 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678903', waktu: '2026-04-20 07:30:00', lokasi: 'CGK - Apron',              keterangan: 'Barang dimuat ke pesawat',                    urutan: 2 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678903', waktu: '2026-04-20 08:00:00', lokasi: 'Udara',                    keterangan: 'Pesawat berangkat menuju MDC',                urutan: 3 },
  // AWB-29648051 (Proses)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678904', waktu: '2026-04-20 09:00:00', lokasi: 'Gudang CGK',               keterangan: 'Barang diterima, menunggu sortasi',           urutan: 1 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678904', waktu: '2026-04-20 10:30:00', lokasi: 'Gudang CGK',               keterangan: 'Proses penimbangan dan verifikasi dokumen',   urutan: 2 },
  // AWB-85431022 (Selesai)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678905', waktu: '2026-04-19 05:30:00', lokasi: 'Gudang CGK',               keterangan: 'Barang diterima di gudang CGK',               urutan: 1 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678905', waktu: '2026-04-19 06:30:00', lokasi: 'CGK - Apron',              keterangan: 'Dimuat ke pesawat JT-633',                    urutan: 2 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678905', waktu: '2026-04-19 10:30:00', lokasi: 'Bandara Hasanuddin, UPG',  keterangan: 'Pesawat mendarat di UPG',                     urutan: 3 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678905', waktu: '2026-04-19 13:00:00', lokasi: 'Gudang UPG',               keterangan: 'Barang diserahkan ke penerima — Selesai',     urutan: 4 },
  // AWB-60912883 (Dalam Perjalanan)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678906', waktu: '2026-04-20 07:00:00', lokasi: 'Gudang CGK',               keterangan: 'Barang diterima di gudang CGK',               urutan: 1 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678906', waktu: '2026-04-20 09:00:00', lokasi: 'Gudang CGK',               keterangan: 'Sortasi dan pengecekan FMCG selesai',         urutan: 2 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678906', waktu: '2026-04-20 10:30:00', lokasi: 'CGK - Apron',              keterangan: 'Barang dimuat ke pesawat GA-716',             urutan: 3 },
  // AWB-33187645 (Proses)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678907', waktu: '2026-04-20 08:00:00', lokasi: 'Gudang CGK',               keterangan: 'Alat pertanian diterima di gudang',           urutan: 1 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678907', waktu: '2026-04-20 09:30:00', lokasi: 'Gudang CGK',               keterangan: 'Menunggu forklift untuk muat ke apron',       urutan: 2 },
  // AWB-44501293 (Selesai)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678908', waktu: '2026-04-20 06:00:00', lokasi: 'Gudang CGK',               keterangan: 'Alat medis diterima, penanganan prioritas',   urutan: 1 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678908', waktu: '2026-04-20 07:30:00', lokasi: 'CGK - Apron',              keterangan: 'Dimuat ke pesawat GA-310 (Priority)',         urutan: 2 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678908', waktu: '2026-04-20 10:45:00', lokasi: 'Bandara SMB II, PLM',      keterangan: 'Pesawat mendarat di Palembang',               urutan: 3 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678908', waktu: '2026-04-20 12:00:00', lokasi: 'RS Bhayangkara, Palembang',keterangan: 'Alat medis diterima penerima — Selesai',      urutan: 4 },
  // AWB-55678234 (Selesai)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678909', waktu: '2026-04-19 07:00:00', lokasi: 'Gudang CGK',               keterangan: 'Tekstil diterima dan dicek di gudang',        urutan: 1 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678909', waktu: '2026-04-19 09:00:00', lokasi: 'CGK - Apron',              keterangan: 'Barang dimuat ke pesawat GA-716',             urutan: 2 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678909', waktu: '2026-04-19 13:00:00', lokasi: 'Bandara Ngurah Rai, DPS',  keterangan: 'Pesawat mendarat di Denpasar',                urutan: 3 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678909', waktu: '2026-04-19 15:00:00', lokasi: 'Butik Bali Indah, DPS',    keterangan: 'Barang diterima penerima — Selesai',          urutan: 4 },
  // AWB-66789012 (Dalam Perjalanan)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678910', waktu: '2026-04-20 13:00:00', lokasi: 'Gudang CGK',               keterangan: 'Perangkat telco diterima dan diverifikasi',   urutan: 1 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678910', waktu: '2026-04-20 14:30:00', lokasi: 'CGK - Apron',              keterangan: 'Dimuat ke pesawat ID-6612',                   urutan: 2 },
  // AWB-77890123 (Proses)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678911', waktu: '2026-04-20 07:30:00', lokasi: 'Gudang CGK',               keterangan: 'Material bangunan diterima di gudang',        urutan: 1 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678911', waktu: '2026-04-20 09:00:00', lokasi: 'Gudang CGK',               keterangan: 'Pengecekan volume dan berat selesai',         urutan: 2 },
  // AWB-88901234 (Proses)
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678912', waktu: '2026-04-20 08:30:00', lokasi: 'Gudang CGK',               keterangan: 'Pupuk & bibit diterima, cek dokumen karantina',urutan: 1 },
  { shipment_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678912', waktu: '2026-04-20 10:00:00', lokasi: 'Gudang CGK',               keterangan: 'Dokumen karantina disetujui, siap muat',      urutan: 2 },
];