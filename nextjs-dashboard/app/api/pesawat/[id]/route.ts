import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// GET — ambil detail pesawat + daftar AWB di dalamnya
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const [pesawat, awbList] = await Promise.all([
      sql`SELECT * FROM pesawat WHERE id = ${id}`,
      sql`SELECT * FROM shipments WHERE pesawat_id = ${id} ORDER BY created_at DESC`,
    ]);
    if (pesawat.length === 0) return NextResponse.json({ error: 'Tidak ditemukan' }, { status: 404 });
    return NextResponse.json({ data: pesawat[0], awbList });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

// PUT — update pesawat
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { nama_pesawat, kode_penerbangan, maskapai, kota_asal, kota_tujuan, kapasitas_muatan, status_pesawat } = body;

    const result = await sql`
      UPDATE pesawat SET
        nama_pesawat     = ${nama_pesawat},
        kode_penerbangan = ${kode_penerbangan},
        maskapai         = ${maskapai},
        kota_asal        = ${kota_asal},
        kota_tujuan      = ${kota_tujuan},
        kapasitas_muatan = ${kapasitas_muatan},
        status_pesawat   = ${status_pesawat}
      WHERE id = ${id}
      RETURNING *
    `;
    if (result.length === 0) return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
    return NextResponse.json({ data: result[0] });
  } catch (error: any) {
    console.error(error);
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Kode penerbangan sudah digunakan' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Gagal mengupdate data' }, { status: 500 });
  }
}

// DELETE — hapus pesawat
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await sql`DELETE FROM pesawat WHERE id = ${id}`;
    return NextResponse.json({ message: 'Pesawat berhasil dihapus' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 });
  }
}
