import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// GET — ambil tracking logs berdasarkan no_resi atau shipment_id
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const no_resi = searchParams.get('no_resi');
  const shipment_id = searchParams.get('shipment_id');

  try {
    let data;
    if (no_resi) {
      data = await sql`
        SELECT * FROM tracking_logs
        WHERE no_resi = ${no_resi}
        ORDER BY created_at DESC
      `;
    } else if (shipment_id) {
      data = await sql`
        SELECT * FROM tracking_logs
        WHERE shipment_id = ${shipment_id}
        ORDER BY created_at DESC
      `;
    } else {
      data = await sql`SELECT * FROM tracking_logs ORDER BY created_at DESC LIMIT 50`;
    }
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengambil tracking logs' }, { status: 500 });
  }
}

// POST — tambah log baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { shipment_id, no_resi, status, keterangan, lokasi, updated_by } = body;

    if (!shipment_id || !no_resi || !status) {
      return NextResponse.json({ error: 'shipment_id, no_resi, dan status wajib diisi' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO tracking_logs (shipment_id, no_resi, status, keterangan, lokasi, updated_by)
      VALUES (${shipment_id}, ${no_resi}, ${status}, ${keterangan || null}, ${lokasi || null}, ${updated_by || 'system'})
      RETURNING *
    `;
    return NextResponse.json({ data: result[0] }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menyimpan tracking log' }, { status: 500 });
  }
}
