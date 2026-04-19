'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const initialShipments = [
  { awb: 'AWB-71234097', pengirim: 'PT Slamet Jaya', penerima: 'CV Sejahtera Abadi', rute: 'P.Marau → Surabaya', layanan: 'Regular', status: 'Selesai' },
  { awb: 'AWB-11456136', pengirim: 'Toko Buku Gramedia', penerima: 'Universitas Indonesia', rute: 'P.Marau → Jakarta', layanan: 'Express', status: 'Expired' },
  { awb: 'AWB-70356764', pengirim: 'Boni', penerima: 'Satya', rute: 'Manado → Jakarta', layanan: 'Same Day', status: 'Proses' },
  { awb: 'AWB-29648051', pengirim: 'Satya', penerima: 'Boni', rute: 'Jogyakarta → Manado', layanan: 'Regular (3-5 hari)', status: 'Proses' },
  { awb: 'AWB-85431022', pengirim: 'PT Maju Bersama', penerima: 'Depot Makassar', rute: 'CGK → UPG', layanan: 'Express', status: 'Selesai' },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'Selesai': 'bg-green-100 text-green-700',
    'Expired': 'bg-red-100 text-red-700',
    'Proses': 'bg-blue-100 text-blue-700',
  };
  return <span className={`text-xs px-2 py-1 rounded-full font-semibold ${map[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>;
}

export default function ManifestPage() {
  const [shipments, setShipments] = useState(initialShipments);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({
    pengirim: '', penerima: '', alamatAsal: '', alamatTujuan: '',
    jenisBarang: '', berat: '', tanggal: '', layanan: 'Reguler (3-5 hari)',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filtered = shipments.filter(s =>
    s.awb.toLowerCase().includes(search.toLowerCase()) ||
    s.pengirim.toLowerCase().includes(search.toLowerCase()) ||
    s.penerima.toLowerCase().includes(search.toLowerCase()) ||
    s.rute.toLowerCase().includes(search.toLowerCase())
  );

  function validate() {
    const e: Record<string, string> = {};
    if (!form.pengirim) e.pengirim = 'Nama pengirim wajib diisi';
    if (!form.penerima) e.penerima = 'Nama penerima wajib diisi';
    if (!form.alamatAsal) e.alamatAsal = 'Alamat asal wajib diisi';
    if (!form.alamatTujuan) e.alamatTujuan = 'Alamat tujuan wajib diisi';
    if (!form.jenisBarang) e.jenisBarang = 'Jenis barang wajib diisi';
    if (!form.berat) e.berat = 'Berat barang wajib diisi';
    if (!form.tanggal) e.tanggal = 'Tanggal pengiriman wajib diisi';
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const newAwb = 'AWB-' + Math.floor(10000000 + Math.random() * 90000000);
    setShipments([...shipments, {
      awb: newAwb, pengirim: form.pengirim, penerima: form.penerima,
      rute: `${form.alamatAsal} → ${form.alamatTujuan}`, layanan: form.layanan, status: 'Proses',
    }]);
    setToast(`Shipment ${newAwb} berhasil ditambahkan`);
    setShowForm(false);
    setForm({ pengirim: '', penerima: '', alamatAsal: '', alamatTujuan: '', jenisBarang: '', berat: '', tanggal: '', layanan: 'Reguler (3-5 hari)' });
    setErrors({});
    setTimeout(() => setToast(''), 3000);
  }

  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(`${formatted} WIB`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (showForm) {
    return (
      <div className="min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Tambah Shipment Baru</h1>
            <p className="text-sm text-gray-500">Buat pengiriman baru untuk sistem ekspedisi udara</p>
          </div>
          <span className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 font-mono shadow-sm">
            {time}
          </span>
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            AS
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Nama Pengirim', key: 'pengirim', placeholder: 'Masukkan nama pengirim' },
              { label: 'Nama Penerima', key: 'penerima', placeholder: 'Masukkan nama penerima' },
              { label: 'Alamat Asal', key: 'alamatAsal', placeholder: 'Masukkan alamat asal' },
              { label: 'Alamat Tujuan', key: 'alamatTujuan', placeholder: 'Masukkan alamat tujuan' },
              { label: 'Jenis Barang', key: 'jenisBarang', placeholder: 'Contoh: Elektronik, Dokumen, Pakaian' },
              { label: 'Berat Barang (kg)', key: 'berat', placeholder: 'Masukkan berat dalam kg' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <input
                  type="text"
                  value={form[f.key as keyof typeof form]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[f.key] ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors[f.key] && <p className="text-xs text-red-500 mt-1">{errors[f.key]}</p>}
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Pengiriman</label>
              <input
                type="date"
                value={form.tanggal}
                onChange={e => setForm({ ...form, tanggal: e.target.value })}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.tanggal ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.tanggal && <p className="text-xs text-red-500 mt-1">{errors.tanggal}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Layanan Pengiriman</label>
              <select
                value={form.layanan}
                onChange={e => setForm({ ...form, layanan: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Reguler (3-5 hari)</option>
                <option>Express (1-2 hari)</option>
                <option>Same Day</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={() => setShowForm(false)} className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              ← Back
            </button>
            <div className="flex gap-3">
              <button onClick={() => setForm({ pengirim: '', penerima: '', alamatAsal: '', alamatTujuan: '', jenisBarang: '', berat: '', tanggal: '', layanan: 'Reguler (3-5 hari)' })} className="text-gray-500 px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                Reset
              </button>
              <button onClick={handleSubmit} className="bg-blue-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                Simpan Shipment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Shipment</h1>
        <div className='flex items-center gap-3'>
          <span className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 font-mono shadow-sm">
            {time}
          </span>
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            AS
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari AWB, pengirim, penerima, rute..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap">
            + Tambah Shipment
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-blue-900 text-white text-xs">
              <th className="px-5 py-3 text-left font-semibold">No AWB</th>
              <th className="px-5 py-3 text-left font-semibold">Pengirim</th>
              <th className="px-5 py-3 text-left font-semibold">Penerima</th>
              <th className="px-5 py-3 text-left font-semibold">Rute</th>
              <th className="px-5 py-3 text-left font-semibold">Layanan</th>
              <th className="px-5 py-3 text-left font-semibold">Status</th>
              <th className="px-5 py-3 text-left font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-8 text-gray-400">Tidak ada data shipment</td></tr>
            ) : filtered.map((s, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-blue-50/40 transition-colors">
                <td className="px-5 py-3 font-semibold text-blue-600 text-xs font-mono">{s.awb}</td>
                <td className="px-5 py-3 text-gray-700">{s.pengirim}</td>
                <td className="px-5 py-3 text-gray-700">{s.penerima}</td>
                <td className="px-5 py-3 text-gray-600 text-xs">{s.rute}</td>
                <td className="px-5 py-3 text-gray-600 text-xs">{s.layanan}</td>
                <td className="px-5 py-3"><StatusBadge status={s.status} /></td>
                <td className="px-5 py-3">
                  <button className="bg-blue-900 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-800 transition-colors">Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-semibold animate-pulse">
          ✓ {toast}
        </div>
      )}
    </div>
  );
}