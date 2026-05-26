import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

function generateNoResi() {
  const prefix = 'AWB';
  const ts = Date.now().toString().slice(-7);
  const rand = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${ts}${rand}`;
}

// GET — fetch all shipments (with optional search)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page') || '1');
  const limit = Number(searchParams.get('limit') || '8');
  const offset = (page - 1) * limit;

  try {
    const [data, countResult] = await Promise.all([
      sql`
        SELECT s.*, p.kode_penerbangan, p.maskapai
        FROM shipments s
        LEFT JOIN pesawat p ON p.id = s.pesawat_id
        WHERE
          s.no_resi           ILIKE ${`%${query}%`} OR
          s.nama_pengirim     ILIKE ${`%${query}%`} OR
          s.nama_penerima     ILIKE ${`%${query}%`} OR
          s.jenis_barang      ILIKE ${`%${query}%`} OR
          s.status_pengiriman ILIKE ${`%${query}%`} OR
          s.kota_asal         ILIKE ${`%${query}%`} OR
          s.kota_tujuan       ILIKE ${`%${query}%`}
        ORDER BY s.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      sql`
        SELECT COUNT(*) FROM shipments
        WHERE
          no_resi           ILIKE ${`%${query}%`} OR
          nama_pengirim     ILIKE ${`%${query}%`} OR
          nama_penerima     ILIKE ${`%${query}%`} OR
          jenis_barang      ILIKE ${`%${query}%`} OR
          status_pengiriman ILIKE ${`%${query}%`} OR
          kota_asal         ILIKE ${`%${query}%`} OR
          kota_tujuan       ILIKE ${`%${query}%`}
      `,
    ]);
    const total = Number(countResult[0].count);
    const totalPages = Math.ceil(total / limit);
    return NextResponse.json({ data, total, totalPages });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

// POST — create shipment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      tanggal_kirim, nama_pengirim, nama_penerima, no_telepon,
      kota_asal, kota_tujuan, jenis_barang, berat_barang,
      harga_tarif, jenis_pengiriman, status_pengiriman, deskripsi, pesawat_id,
    } = body;

    const no_resi = generateNoResi();

    const result = await sql`
      INSERT INTO shipments (
        no_resi, tanggal_kirim, nama_pengirim, nama_penerima, no_telepon,
        kota_asal, kota_tujuan, jenis_barang, berat_barang, harga_tarif,
        jenis_pengiriman, status_pengiriman, deskripsi, pesawat_id
      ) VALUES (
        ${no_resi}, ${tanggal_kirim}, ${nama_pengirim}, ${nama_penerima}, ${no_telepon},
        ${kota_asal}, ${kota_tujuan}, ${jenis_barang}, ${berat_barang}, ${harga_tarif},
        ${jenis_pengiriman}, ${status_pengiriman || 'Diproses'},
        ${deskripsi || null}, ${pesawat_id || null}
      )
      RETURNING *
    `;
    return NextResponse.json({ data: result[0] }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menambah data' }, { status: 500 });
  }
}
