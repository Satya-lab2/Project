import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await sql`SELECT * FROM shipments WHERE id = ${id}`;
    if (data.length === 0) return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
    return NextResponse.json({ data: data[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      tanggal_kirim, nama_pengirim, nama_penerima, no_telepon,
      kota_asal, kota_tujuan, jenis_barang, berat_barang,
      harga_tarif, jenis_pengiriman, status_pengiriman, deskripsi, pesawat_id,
    } = body;

    const result = await sql`
      UPDATE shipments SET
        tanggal_kirim     = ${tanggal_kirim},
        nama_pengirim     = ${nama_pengirim},
        nama_penerima     = ${nama_penerima},
        no_telepon        = ${no_telepon},
        kota_asal         = ${kota_asal},
        kota_tujuan       = ${kota_tujuan},
        jenis_barang      = ${jenis_barang},
        berat_barang      = ${berat_barang},
        harga_tarif       = ${harga_tarif},
        jenis_pengiriman  = ${jenis_pengiriman},
        status_pengiriman = ${status_pengiriman},
        deskripsi         = ${deskripsi || null},
        pesawat_id        = ${pesawat_id || null}
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
    const { id } = await params;
    const result = await sql`DELETE FROM shipments WHERE id = ${id} RETURNING id`;
    if (result.length === 0) return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
    return NextResponse.json({ message: 'Shipment berhasil dihapus' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 });
  }
}
