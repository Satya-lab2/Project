import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// PUT — update shipment
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      tanggal_kirim, nama_pengirim, nama_penerima, no_telepon,
      kota_asal, kota_tujuan, jenis_barang, berat_barang,
      harga_tarif, jenis_kendaraan, jenis_pengiriman,
      status_pengiriman, deskripsi, kendaraan_id,
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
        jenis_kendaraan   = ${jenis_kendaraan},
        jenis_pengiriman  = ${jenis_pengiriman},
        status_pengiriman = ${status_pengiriman},
        deskripsi         = ${deskripsi || null},
        kendaraan_id      = ${kendaraan_id || null}
      WHERE id = ${id}
      RETURNING *
    `;
    if (result.length === 0) {
      return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ data: result[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengupdate data' }, { status: 500 });
  }
}

// DELETE — delete shipment
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await sql`DELETE FROM shipments WHERE id = ${id}`;
    return NextResponse.json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 });
  }
}

// GET — single shipment
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const result = await sql`SELECT * FROM shipments WHERE id = ${id}`;
    if (result.length === 0) {
      return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ data: result[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}
