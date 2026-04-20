import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// ============================================================
// FLIGHTS
// ============================================================
export async function fetchFlights() {
  try {
    const data = await sql`
      SELECT
        f.id, f.no_penerbangan, f.maskapai,
        f.asal, f.tujuan, f.etd, f.eta,
        f.tanggal, f.status, f.kapasitas_kg,
        a1.kota AS kota_asal,
        a2.kota AS kota_tujuan,
        COUNT(m.shipment_id) AS total_awb,
        COALESCE(SUM(s.berat_kg), 0) AS total_kargo_kg
      FROM flights f
      JOIN airports a1 ON f.asal   = a1.kode
      JOIN airports a2 ON f.tujuan = a2.kode
      LEFT JOIN manifest m  ON m.flight_id   = f.id
      LEFT JOIN shipments s ON s.id          = m.shipment_id
      GROUP BY f.id, a1.kota, a2.kota
      ORDER BY f.etd ASC
    `;
    return data;
  } catch (error) {
    console.error('DB Error:', error);
    throw new Error('Gagal mengambil data penerbangan.');
  }
}

export async function fetchFlightById(id: string) {
  try {
    const data = await sql`
      SELECT f.*, a1.nama AS nama_asal, a2.nama AS nama_tujuan
      FROM flights f
      JOIN airports a1 ON f.asal   = a1.kode
      JOIN airports a2 ON f.tujuan = a2.kode
      WHERE f.id = ${id}
    `;
    return data[0];
  } catch (error) {
    console.error('DB Error:', error);
    throw new Error('Gagal mengambil detail penerbangan.');
  }
}

// ============================================================
// SHIPMENTS (AWB)
// ============================================================
export async function fetchShipments() {
  try {
    const data = await sql`
      SELECT * FROM shipments
      ORDER BY created_at DESC
    `;
    return data;
  } catch (error) {
    console.error('DB Error:', error);
    throw new Error('Gagal mengambil data shipment.');
  }
}

export async function fetchShipmentByAwb(no_awb: string) {
  try {
    const data = await sql`
      SELECT * FROM shipments
      WHERE no_awb = ${no_awb}
    `;
    return data[0] ?? null;
  } catch (error) {
    console.error('DB Error:', error);
    throw new Error('Gagal mencari AWB.');
  }
}

// ============================================================
// TRACKING EVENTS
// ============================================================
export async function fetchTrackingByAwb(no_awb: string) {
  try {
    const data = await sql`
      SELECT te.waktu, te.lokasi, te.keterangan, te.urutan
      FROM tracking_events te
      JOIN shipments s ON s.id = te.shipment_id
      WHERE s.no_awb = ${no_awb}
      ORDER BY te.urutan ASC
    `;
    return data;
  } catch (error) {
    console.error('DB Error:', error);
    throw new Error('Gagal mengambil data tracking.');
  }
}

// ============================================================
// MANIFEST
// ============================================================
export async function fetchManifestByFlight(flight_id: string) {
  try {
    const data = await sql`
      SELECT
        s.no_awb, s.pengirim, s.penerima,
        s.jenis_barang, s.berat_kg, s.layanan, s.status,
        m.posisi_muat
      FROM manifest m
      JOIN shipments s ON s.id = m.shipment_id
      WHERE m.flight_id = ${flight_id}
      ORDER BY s.no_awb ASC
    `;
    return data;
  } catch (error) {
    console.error('DB Error:', error);
    throw new Error('Gagal mengambil manifest penerbangan.');
  }
}

// ============================================================
// DASHBOARD SUMMARY
// ============================================================
export async function fetchDashboardStats() {
  try {
    const [flightStats, shipmentStats] = await Promise.all([
      sql`
        SELECT
          COUNT(*) AS total_penerbangan,
          SUM(CASE WHEN status = 'Departed' OR status = 'Arrived' THEN 1 ELSE 0 END) AS sudah_berangkat,
          SUM(CASE WHEN status = 'Delayed' THEN 1 ELSE 0 END) AS delayed
        FROM flights
        WHERE tanggal = CURRENT_DATE
      `,
      sql`
        SELECT
          COUNT(*) AS total_awb,
          SUM(berat_kg) AS total_kg,
          SUM(CASE WHEN status = 'Selesai' THEN 1 ELSE 0 END) AS selesai,
          SUM(CASE WHEN status = 'Dalam Perjalanan' THEN 1 ELSE 0 END) AS dalam_perjalanan
        FROM shipments
      `,
    ]);
    return {
      flights: flightStats[0],
      shipments: shipmentStats[0],
    };
  } catch (error) {
    console.error('DB Error:', error);
    throw new Error('Gagal mengambil statistik dashboard.');
  }
}

// ============================================================
// AIRPORTS
// ============================================================
export async function fetchAirports() {
  try {
    const data = await sql`SELECT * FROM airports ORDER BY kode ASC`;
    return data;
  } catch (error) {
    console.error('DB Error:', error);
    throw new Error('Gagal mengambil data bandara.');
  }
}
