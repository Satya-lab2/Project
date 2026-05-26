import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// GET — fetch all pesawat
export async function GET() {
  try {
    const data = await sql`
      SELECT p.*, 
        COUNT(s.id) AS jumlah_awb,
        COALESCE(SUM(s.berat_barang), 0) AS total_berat
      FROM pesawat p
      LEFT JOIN shipments s ON s.pesawat_id = p.id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `;
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

// POST — create pesawat
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama_pesawat, kode_penerbangan, maskapai, kota_asal, kota_tujuan, kapasitas_muatan, status_pesawat } = body;

    const result = await sql`
      INSERT INTO pesawat (nama_pesawat, kode_penerbangan, maskapai, kota_asal, kota_tujuan, kapasitas_muatan, status_pesawat)
      VALUES (${nama_pesawat}, ${kode_penerbangan}, ${maskapai}, ${kota_asal}, ${kota_tujuan}, ${kapasitas_muatan}, ${status_pesawat || 'Tersedia'})
      RETURNING *
    `;
    return NextResponse.json({ data: result[0] }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Kode penerbangan sudah digunakan' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Gagal menambah data' }, { status: 500 });
  }
}
