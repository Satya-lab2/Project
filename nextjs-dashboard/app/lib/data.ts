import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// ============================================================
// DASHBOARD STATS
// ============================================================
export async function fetchDashboardStats() {
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
    return {
      total_pengiriman: Number(shipmentStats[0].total_pengiriman),
      dalam_pengiriman: Number(shipmentStats[0].dalam_pengiriman),
      selesai: Number(shipmentStats[0].selesai),
      pending: Number(shipmentStats[0].pending),
      total_kendaraan: Number(kendaraanStats[0].total_kendaraan),
    };
  } catch (error) {
    console.error('DB Error:', error);
    return { total_pengiriman: 0, dalam_pengiriman: 0, selesai: 0, pending: 0, total_kendaraan: 0 };
  }
}

// ============================================================
// SHIPMENTS — READ ALL
// ============================================================
export async function fetchShipments() {
  try {
    const data = await sql`
      SELECT * FROM shipments ORDER BY created_at DESC
    `;
    return data;
  } catch (error) {
    console.error('DB Error:', error);
    throw new Error('Gagal mengambil data shipment.');
  }
}

// ============================================================
// SHIPMENTS — FILTERED & PAGINATED (Search + Pagination)
// ============================================================
const ITEMS_PER_PAGE = 8;

export async function fetchFilteredShipments(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql`
      SELECT * FROM shipments
      WHERE
        no_resi           ILIKE ${`%${query}%`} OR
        nama_pengirim     ILIKE ${`%${query}%`} OR
        nama_penerima     ILIKE ${`%${query}%`} OR
        jenis_barang      ILIKE ${`%${query}%`} OR
        status_pengiriman ILIKE ${`%${query}%`} OR
        kota_asal         ILIKE ${`%${query}%`} OR
        kota_tujuan       ILIKE ${`%${query}%`}
      ORDER BY created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return data;
  } catch (error) {
    console.error('DB Error:', error);
    throw new Error('Gagal mengambil data shipment.');
  }
}

export async function fetchShipmentsPages(query: string) {
  try {
    const data = await sql`
      SELECT COUNT(*) FROM shipments
      WHERE
        no_resi           ILIKE ${`%${query}%`} OR
        nama_pengirim     ILIKE ${`%${query}%`} OR
        nama_penerima     ILIKE ${`%${query}%`} OR
        jenis_barang      ILIKE ${`%${query}%`} OR
        status_pengiriman ILIKE ${`%${query}%`} OR
        kota_asal         ILIKE ${`%${query}%`} OR
        kota_tujuan       ILIKE ${`%${query}%`}
    `;
    return Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('DB Error:', error);
    throw new Error('Gagal menghitung halaman shipment.');
  }
}

// ============================================================
// SHIPMENTS — GET BY ID
// ============================================================
export async function fetchShipmentById(id: string) {
  try {
    const data = await sql`SELECT * FROM shipments WHERE id = ${id}`;
    return data[0] ?? null;
  } catch (error) {
    console.error('DB Error:', error);
    throw new Error('Gagal mengambil data shipment.');
  }
}

// ============================================================
// KENDARAAN — READ ALL
// ============================================================
export async function fetchKendaraan() {
  try {
    const data = await sql`SELECT * FROM kendaraan ORDER BY created_at DESC`;
    return data;
  } catch (error) {
    console.error('DB Error:', error);
    throw new Error('Gagal mengambil data kendaraan.');
  }
}

// ============================================================
// KENDARAAN — GET BY ID
// ============================================================
export async function fetchKendaraanById(id: string) {
  try {
    const data = await sql`SELECT * FROM kendaraan WHERE id = ${id}`;
    return data[0] ?? null;
  } catch (error) {
    console.error('DB Error:', error);
    throw new Error('Gagal mengambil data kendaraan.');
  }
}

// ============================================================
// HELPER — Generate No Resi
// ============================================================
export async function generateNoResi() {
  const prefix = 'KRG';
  const ts = Date.now().toString().slice(-7);
  const rand = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${ts}${rand}`;
}
