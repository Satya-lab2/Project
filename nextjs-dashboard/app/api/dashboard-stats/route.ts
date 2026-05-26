import postgres from 'postgres';
import { NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    const [shipmentStats, kendaraanStats] = await Promise.all([
      sql`
        SELECT
          COUNT(*) AS total_pengiriman,
          SUM(CASE WHEN status_pengiriman = 'Dalam Pengiriman' THEN 1 ELSE 0 END) AS dalam_pengiriman,
          SUM(CASE WHEN status_pengiriman = 'Selesai' THEN 1 ELSE 0 END) AS selesai,
          SUM(CASE WHEN status_pengiriman = 'Pending' THEN 1 ELSE 0 END) AS pending
        FROM shipments
      `,
      sql`SELECT COUNT(*) AS total_kendaraan FROM kendaraan`,
    ]);
    return NextResponse.json({
      total_pengiriman: Number(shipmentStats[0].total_pengiriman),
      dalam_pengiriman: Number(shipmentStats[0].dalam_pengiriman),
      selesai: Number(shipmentStats[0].selesai),
      pending: Number(shipmentStats[0].pending),
      total_kendaraan: Number(kendaraanStats[0].total_kendaraan),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengambil statistik' }, { status: 500 });
  }
}
