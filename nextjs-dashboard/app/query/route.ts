import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function queryTest() {
  const data = await sql`
    SELECT
      s.no_awb,
      s.pengirim,
      s.penerima,
      s.berat_kg,
      s.status,
      f.no_penerbangan,
      f.asal,
      f.tujuan
    FROM shipments s
    LEFT JOIN manifest m  ON m.shipment_id = s.id
    LEFT JOIN flights  f  ON f.id          = m.flight_id
    ORDER BY s.tanggal_kirim DESC
    LIMIT 10
  `;
  return data;
}

export async function GET() {
  try {
    return Response.json(await queryTest());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}