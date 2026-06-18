import postgres from 'postgres';
import { NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    const [shipmentStats, pesawatStats] = await Promise.all([
      sql`
        SELECT
          -- Total semua AWB termasuk Draft (konsisten dengan donut chart)
          COUNT(*) AS total_pengiriman,
          -- Counter Draft terpisah
          SUM(CASE WHEN status_pengiriman = 'Draft'            THEN 1 ELSE 0 END) AS draft,
          -- Counter per status aktif
          SUM(CASE WHEN status_pengiriman = 'Diproses'         THEN 1 ELSE 0 END) AS diproses,
          SUM(CASE WHEN status_pengiriman = 'Dalam Pengiriman' THEN 1 ELSE 0 END) AS dalam_pengiriman,
          SUM(CASE WHEN status_pengiriman = 'Sampai Tujuan'    THEN 1 ELSE 0 END) AS sampai_tujuan,
          SUM(CASE WHEN status_pengiriman = 'Pending'          THEN 1 ELSE 0 END) AS pending,
          SUM(CASE WHEN status_pengiriman IN ('Selesai', 'Diterima') THEN 1 ELSE 0 END) AS selesai,
          SUM(CASE WHEN status_pengiriman = 'Hilang'           THEN 1 ELSE 0 END) AS hilang,
          SUM(CASE WHEN status_pengiriman = 'Diterima'         THEN 1 ELSE 0 END) AS diterima
        FROM shipments
      `,
      sql`SELECT COUNT(*) AS total_pesawat FROM pesawat`,
    ]);
    return NextResponse.json({
      total_pengiriman: Number(shipmentStats[0].total_pengiriman),
      draft:            Number(shipmentStats[0].draft),
      diproses:         Number(shipmentStats[0].diproses),
      dalam_pengiriman: Number(shipmentStats[0].dalam_pengiriman),
      sampai_tujuan:    Number(shipmentStats[0].sampai_tujuan),
      pending:          Number(shipmentStats[0].pending),
      selesai:          Number(shipmentStats[0].selesai),
      hilang:           Number(shipmentStats[0].hilang),
      diterima:         Number(shipmentStats[0].diterima),
      total_pesawat:    Number(pesawatStats[0].total_pesawat),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengambil statistik' }, { status: 500 });
  }
}