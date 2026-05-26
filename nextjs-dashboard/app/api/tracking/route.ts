import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const awb = searchParams.get('awb')?.trim();

  if (!awb) {
    return NextResponse.json({ error: 'Nomor AWB wajib diisi' }, { status: 400 });
  }

  try {
    const data = await sql`
      SELECT
        s.*,
        p.kode_penerbangan,
        p.maskapai,
        p.kota_asal AS pesawat_asal,
        p.kota_tujuan AS pesawat_tujuan,
        p.status_pesawat
      FROM shipments s
      LEFT JOIN pesawat p ON p.id = s.pesawat_id
      WHERE UPPER(s.no_resi) = UPPER(${awb})
    `;

    if (data.length === 0) {
      return NextResponse.json({ error: 'AWB tidak ditemukan. Pastikan nomor AWB sudah benar.' }, { status: 404 });
    }

    const shipment = data[0];

    // Build timeline berdasarkan status
    const timeline = buildTimeline(shipment);

    return NextResponse.json({
      data: {
        no_resi: shipment.no_resi,
        nama_pengirim: shipment.nama_pengirim,
        nama_penerima: shipment.nama_penerima,
        no_telepon: shipment.no_telepon,
        kota_asal: shipment.kota_asal,
        kota_tujuan: shipment.kota_tujuan,
        jenis_barang: shipment.jenis_barang,
        berat_barang: shipment.berat_barang,
        harga_tarif: shipment.harga_tarif,
        jenis_pengiriman: shipment.jenis_pengiriman,
        status_pengiriman: shipment.status_pengiriman,
        tanggal_kirim: shipment.tanggal_kirim,
        deskripsi: shipment.deskripsi,
        pesawat: shipment.kode_penerbangan ? {
          kode_penerbangan: shipment.kode_penerbangan,
          maskapai: shipment.maskapai,
          status_pesawat: shipment.status_pesawat,
        } : null,
        timeline,
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengambil data tracking' }, { status: 500 });
  }
}

function buildTimeline(shipment: any) {
  const timeline: { time: string; desc: string; done: boolean }[] = [];

  const tanggal = shipment.tanggal_kirim
    ? new Date(shipment.tanggal_kirim).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
    : '-';

  const statusOrder = ['Diproses', 'Dalam Pengiriman', 'Sampai Tujuan', 'Selesai'];
  const currentStatus = shipment.status_pengiriman;
  const currentIndex = statusOrder.indexOf(currentStatus);

  const steps = [
    { status: 'Diproses', desc: `Paket diterima dan sedang diproses di ${shipment.kota_asal}`, time: tanggal },
    {
      status: 'Dalam Pengiriman',
      desc: shipment.kode_penerbangan
        ? `Dimuat ke pesawat ${shipment.kode_penerbangan} (${shipment.maskapai}) menuju ${shipment.kota_tujuan}`
        : `Dalam perjalanan menuju ${shipment.kota_tujuan}`,
      time: tanggal,
    },
    { status: 'Sampai Tujuan', desc: `Paket tiba di ${shipment.kota_tujuan}`, time: tanggal },
    { status: 'Selesai', desc: `Paket telah diterima oleh ${shipment.nama_penerima}`, time: tanggal },
  ];

  // Jika status Pending, tambahkan keterangan khusus
  if (currentStatus === 'Pending') {
    timeline.push({ time: tanggal, desc: `Paket diterima di ${shipment.kota_asal}`, done: true });
    timeline.push({ time: '-', desc: 'Pengiriman tertunda — menunggu konfirmasi lebih lanjut', done: false });
    return timeline;
  }

  for (let i = 0; i < steps.length; i++) {
    timeline.push({
      time: i <= currentIndex ? steps[i].time : '-',
      desc: steps[i].desc,
      done: i <= currentIndex,
    });
  }

  return timeline;
}
