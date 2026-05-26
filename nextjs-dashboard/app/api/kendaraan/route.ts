import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// GET — fetch all kendaraan
export async function GET() {
  try {
    const data = await sql`SELECT * FROM kendaraan ORDER BY created_at DESC`;
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

// POST — create kendaraan
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama_kendaraan, jenis_kendaraan, plat_nomor, kapasitas_muatan, status_kendaraan } = body;

    const result = await sql`
      INSERT INTO kendaraan (nama_kendaraan, jenis_kendaraan, plat_nomor, kapasitas_muatan, status_kendaraan)
      VALUES (${nama_kendaraan}, ${jenis_kendaraan}, ${plat_nomor}, ${kapasitas_muatan}, ${status_kendaraan || 'Tersedia'})
      RETURNING *
    `;
    return NextResponse.json({ data: result[0] }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menambah data' }, { status: 500 });
  }
}
