import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // ✅ Tambahkan await di sini
    const { id } = await params; 
    
    const body = await request.json();
    const { nama_kendaraan, jenis_kendaraan, plat_nomor, kapasitas_muatan, status_kendaraan } = body;

    const result = await sql`
      UPDATE kendaraan SET
        nama_kendaraan   = ${nama_kendaraan},
        jenis_kendaraan  = ${jenis_kendaraan},
        plat_nomor       = ${plat_nomor},
        kapasitas_muatan = ${kapasitas_muatan},
        status_kendaraan = ${status_kendaraan}
      WHERE id = ${id}
      RETURNING *
    `;
    if (result.length === 0) return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
    return NextResponse.json({ data: result[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengupdate data' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // ✅ Tambahkan await di sini juga
    const { id } = await params; 
    
    await sql`DELETE FROM kendaraan WHERE id = ${id}`;
    return NextResponse.json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 });
  }
}