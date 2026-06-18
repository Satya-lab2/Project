import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Buat tabel jika belum ada (auto-migration ringan)
async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS pesan_kontak (
      id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      nama        VARCHAR(255) NOT NULL,
      no_telepon  VARCHAR(30)  NOT NULL,
      email       VARCHAR(255) NOT NULL,
      layanan     VARCHAR(100) NOT NULL,
      pesan       TEXT         NOT NULL,
      created_at  TIMESTAMP    DEFAULT NOW()
    )
  `;
}

export async function POST(request: NextRequest) {
  try {
    await ensureTable();

    const body = await request.json();
    const { nama, no_telepon, email, layanan, pesan } = body;

    // Validasi sederhana
    if (!nama?.trim() || !no_telepon?.trim() || !email?.trim() || !layanan?.trim() || !pesan?.trim()) {
      return NextResponse.json({ error: 'Semua field wajib diisi.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Format email tidak valid.' }, { status: 400 });
    }

    await sql`
      INSERT INTO pesan_kontak (nama, no_telepon, email, layanan, pesan)
      VALUES (${nama.trim()}, ${no_telepon.trim()}, ${email.trim()}, ${layanan.trim()}, ${pesan.trim()})
    `;

    return NextResponse.json({ message: 'Pesan berhasil dikirim!' }, { status: 201 });
  } catch (error) {
    console.error('Kontak error:', error);
    return NextResponse.json({ error: 'Gagal mengirim pesan. Coba beberapa saat lagi.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await ensureTable();
    const data = await sql`
      SELECT * FROM pesan_kontak ORDER BY created_at DESC
    `;
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}