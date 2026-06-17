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

    // Ambil data lama
    const existing = await sql`SELECT no_resi, status_pengiriman FROM shipments WHERE id = ${id}`;
    if (existing.length === 0) return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
    const oldStatus = existing[0].status_pengiriman;
    const no_resi = existing[0].no_resi;

    let result;

    if (body.editOnly) {
      // On-boarding mode: only update status
      const { status_pengiriman } = body;
      result = await sql`
        UPDATE shipments SET
          status_pengiriman = ${status_pengiriman}
        WHERE id = ${id}
        RETURNING *
      `;
    } else {
      // Full update (for any other API consumers)
      const {
        tanggal_kirim, nama_pengirim, nama_penerima, no_telepon,
        kota_asal, kota_tujuan, jenis_barang, berat_barang,
        harga_tarif, jenis_pengiriman, status_pengiriman, deskripsi, pesawat_id,
      } = body;

      result = await sql`
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
    }

    // Log tracking if status changed
    const newStatus = body.status_pengiriman || result[0]?.status_pengiriman;
    if (oldStatus !== newStatus) {
      try {
        await sql`
          INSERT INTO tracking_logs (shipment_id, no_resi, status, keterangan, updated_by)
          VALUES (
            ${id},
            ${no_resi},
            ${newStatus},
            ${'Status diubah dari ' + oldStatus + ' menjadi ' + newStatus},
            'admin'
          )
        `;
      } catch {
        // Silent — tabel tracking_logs mungkin belum ada
      }
    }

    return NextResponse.json({ data: result[0] });
  } catch (error) {
    console.error('PUT shipment error:', error);
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
