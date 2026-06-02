'use client';

import { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon, PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

type Shipment = {
  id: string;
  no_resi: string;
  tanggal_kirim: string;
  nama_pengirim: string;
  nama_penerima: string;
  no_telepon: string;
  kota_asal: string;
  kota_tujuan: string;
  jenis_barang: string;
  berat_barang: number;
  harga_tarif: number;
  jenis_pengiriman: string;
  status_pengiriman: string;
  deskripsi?: string;
  pesawat_id?: string;
  kode_penerbangan?: string;
  maskapai?: string;
};

type Pesawat = {
  id: string;
  kode_penerbangan: string;
  maskapai: string;
  kota_asal: string;
  kota_tujuan: string;
  status_pesawat: string;
};

const EMPTY_FORM = {
  tanggal_kirim: '',
  nama_pengirim: '',
  nama_penerima: '',
  no_telepon: '',
  kota_asal: '',
  kota_tujuan: '',
  jenis_barang: '',
  berat_barang: '',
  harga_tarif: '',
  jenis_pengiriman: 'Biasa',
  status_pengiriman: 'Diproses',
  deskripsi: '',
  pesawat_id: '',
};

const STATUS_COLORS: Record<string, string> = {
  'Diproses': 'bg-blue-100 text-blue-700',
  'Dalam Pengiriman': 'bg-yellow-100 text-yellow-700',
  'Sampai Tujuan': 'bg-green-100 text-green-700',
  'Pending': 'bg-orange-100 text-orange-700',
  'Selesai': 'bg-emerald-100 text-emerald-700',
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${STATUS_COLORS[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

function formatRupiah(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

export default function ManifestPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [pesawatList, setPesawatList] = useState<Pesawat[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState('');

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast(msg); setToastType(type);
    setTimeout(() => setToast(''), 3500);
  };

  const fetchShipments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/shipments?query=${encodeURIComponent(query)}&page=${currentPage}&limit=8`);
      const data = await res.json();
      setShipments(data.data || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch {
      showToast('Gagal mengambil data', 'error');
    } finally {
      setLoading(false);
    }
  }, [query, currentPage]);

  const fetchPesawat = useCallback(async () => {
    try {
      const res = await fetch('/api/pesawat');
      const data = await res.json();
      setPesawatList(data.data || []);
    } catch { /* silent */ }
  }, []);

  useEffect(() => { fetchShipments(); }, [fetchShipments]);
  useEffect(() => { fetchPesawat(); }, [fetchPesawat]);

  useEffect(() => {
    const timer = setTimeout(() => { setCurrentPage(1); }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.tanggal_kirim) e.tanggal_kirim = 'Wajib diisi';
    if (!form.nama_pengirim) e.nama_pengirim = 'Wajib diisi';
    if (!form.nama_penerima) e.nama_penerima = 'Wajib diisi';
    if (!form.no_telepon) {
      e.no_telepon = 'Wajib diisi';
    } else if (!/^(\+62|62|0)[0-9]{8,13}$/.test(form.no_telepon.replace(/\s|-/g, ''))) {
      e.no_telepon = 'Format tidak valid (contoh: 08123456789)';
    }
    if (!form.kota_asal) e.kota_asal = 'Wajib diisi';
    if (!form.kota_tujuan) e.kota_tujuan = 'Wajib diisi';
    if (!form.jenis_barang) e.jenis_barang = 'Wajib diisi';
    if (!form.berat_barang || isNaN(Number(form.berat_barang))) e.berat_barang = 'Masukkan angka valid';
    if (!form.harga_tarif || isNaN(Number(form.harga_tarif))) e.harga_tarif = 'Masukkan angka valid';
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        berat_barang: Number(form.berat_barang),
        harga_tarif: Number(form.harga_tarif),
        pesawat_id: form.pesawat_id || null,
      };
      let res;
      if (editingId) {
        res = await fetch(`/api/shipments/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      } else {
        res = await fetch('/api/shipments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      }
      if (!res.ok) throw new Error();
      showToast(editingId ? 'AWB berhasil diupdate! ✓' : 'AWB berhasil ditambahkan! ✓');
      setShowForm(false); setEditingId(null); setForm({ ...EMPTY_FORM }); setErrors({});
      fetchShipments();
    } catch {
      showToast('Gagal menyimpan data. Coba lagi.', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  function openEdit(s: Shipment) {
    setEditingId(s.id);
    setForm({
      tanggal_kirim: s.tanggal_kirim?.split('T')[0] || '',
      nama_pengirim: s.nama_pengirim,
      nama_penerima: s.nama_penerima,
      no_telepon: s.no_telepon,
      kota_asal: s.kota_asal,
      kota_tujuan: s.kota_tujuan,
      jenis_barang: s.jenis_barang,
      berat_barang: String(s.berat_barang),
      harga_tarif: String(s.harga_tarif),
      jenis_pengiriman: s.jenis_pengiriman,
      status_pengiriman: s.status_pengiriman,
      deskripsi: s.deskripsi || '',
      pesawat_id: s.pesawat_id || '',
    });
    setErrors({}); setShowForm(true);
  }

  function openAdd() {
    setEditingId(null); setForm({ ...EMPTY_FORM }); setErrors({}); setShowForm(true);
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/shipments/${deleteId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      showToast('AWB berhasil dihapus! ✓');
      setDeleteId(null); fetchShipments();
    } catch {
      showToast('Gagal menghapus data.', 'error');
    }
  }

  const fieldCls = (key: string) =>
    `w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[key] ? 'border-red-400 bg-red-50' : 'border-gray-200'}`;

  return (
    <div className="min-h-screen">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-5 py-3 rounded-xl shadow-lg text-sm font-semibold text-white ${toastType === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
          {toast}
        </div>
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola AWB / Pengiriman</h1>
          <p className="text-sm text-gray-500">Kargo Udara — {total} total data</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
          <PlusIcon className="w-4 h-4" /> Tambah AWB
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative mb-4">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Cari No AWB, Pengirim, Penerima, Jenis Barang, Status, Kota..."
          className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-900 text-white text-xs">
                <th className="px-4 py-3 text-left">No AWB</th>
                <th className="px-4 py-3 text-left">Pengirim</th>
                <th className="px-4 py-3 text-left">Penerima</th>
                <th className="px-4 py-3 text-left">Rute</th>
                <th className="px-4 py-3 text-left">Barang</th>
                <th className="px-4 py-3 text-left">Berat</th>
                <th className="px-4 py-3 text-left">Harga</th>
                <th className="px-4 py-3 text-left">Pesawat</th>
                <th className="px-4 py-3 text-left">Layanan</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="border-t border-gray-50">
                    {[...Array(11)].map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : shipments.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-12 text-gray-400">
                    {query ? `Tidak ada hasil untuk "${query}"` : 'Belum ada data. Klik "+ Tambah AWB" untuk mulai.'}
                  </td>
                </tr>
              ) : (
                shipments.map(s => (
                  <tr key={s.id} className="border-t border-gray-50 hover:bg-blue-50/40 transition-colors">
                    <td className="px-4 py-3 font-mono text-blue-600 font-semibold text-xs">{s.no_resi}</td>
                    <td className="px-4 py-3 text-gray-700 text-xs max-w-[100px] truncate">{s.nama_pengirim}</td>
                    <td className="px-4 py-3 text-gray-700 text-xs max-w-[100px] truncate">{s.nama_penerima}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{s.kota_asal} → {s.kota_tujuan}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{s.jenis_barang}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{s.berat_barang} kg</td>
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{formatRupiah(s.harga_tarif)}</td>
                    <td className="px-4 py-3 text-xs font-mono font-semibold text-indigo-600">{s.kode_penerbangan || '—'}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{s.jenis_pengiriman}</td>
                    <td className="px-4 py-3"><StatusBadge status={s.status_pengiriman} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEdit(s)} className="p-1.5 rounded-md bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition-colors" title="Edit">
                          <PencilIcon className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => { setDeleteId(s.id); setDeleteName(s.no_resi); }} className="p-1.5 rounded-md bg-red-50 hover:bg-red-100 text-red-600 transition-colors" title="Hapus">
                          <TrashIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Halaman {currentPage} dari {totalPages} · {total} data</p>
            <div className="flex gap-1">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage <= 1} className="px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 disabled:opacity-40">‹</button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-md text-sm font-medium ${page === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}>
                  {page}
                </button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages} className="px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 disabled:opacity-40">›</button>
            </div>
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl mx-4 relative">
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <XMarkIcon className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-gray-800 mb-1">{editingId ? 'Edit AWB' : 'Tambah AWB Baru'}</h2>
            {!editingId && <p className="text-xs text-gray-500 mb-4">No AWB akan digenerate otomatis</p>}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal Kirim *</label>
                <input type="date" value={form.tanggal_kirim} onChange={e => setForm({ ...form, tanggal_kirim: e.target.value })} className={fieldCls('tanggal_kirim')} />
                {errors.tanggal_kirim && <p className="text-xs text-red-500 mt-0.5">{errors.tanggal_kirim}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">No Telepon *</label>
                <input type="tel" value={form.no_telepon} onChange={e => setForm({ ...form, no_telepon: e.target.value })} placeholder="08xxxxxxxxxx" className={fieldCls('no_telepon')} />
                {errors.no_telepon && <p className="text-xs text-red-500 mt-0.5">{errors.no_telepon}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Pengirim *</label>
                <input value={form.nama_pengirim} onChange={e => setForm({ ...form, nama_pengirim: e.target.value })} placeholder="Nama pengirim" className={fieldCls('nama_pengirim')} />
                {errors.nama_pengirim && <p className="text-xs text-red-500 mt-0.5">{errors.nama_pengirim}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Penerima *</label>
                <input value={form.nama_penerima} onChange={e => setForm({ ...form, nama_penerima: e.target.value })} placeholder="Nama penerima" className={fieldCls('nama_penerima')} />
                {errors.nama_penerima && <p className="text-xs text-red-500 mt-0.5">{errors.nama_penerima}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Kota Asal *</label>
                <input value={form.kota_asal} onChange={e => setForm({ ...form, kota_asal: e.target.value })} placeholder="Jakarta" className={fieldCls('kota_asal')} />
                {errors.kota_asal && <p className="text-xs text-red-500 mt-0.5">{errors.kota_asal}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Kota Tujuan *</label>
                <input value={form.kota_tujuan} onChange={e => setForm({ ...form, kota_tujuan: e.target.value })} placeholder="Surabaya" className={fieldCls('kota_tujuan')} />
                {errors.kota_tujuan && <p className="text-xs text-red-500 mt-0.5">{errors.kota_tujuan}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Jenis Barang *</label>
                <input value={form.jenis_barang} onChange={e => setForm({ ...form, jenis_barang: e.target.value })} placeholder="Elektronik, Dokumen..." className={fieldCls('jenis_barang')} />
                {errors.jenis_barang && <p className="text-xs text-red-500 mt-0.5">{errors.jenis_barang}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Berat Barang (kg) *</label>
                <input type="number" step="0.1" min="0" value={form.berat_barang} onChange={e => setForm({ ...form, berat_barang: e.target.value })} placeholder="10.5" className={fieldCls('berat_barang')} />
                {errors.berat_barang && <p className="text-xs text-red-500 mt-0.5">{errors.berat_barang}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Harga/Tarif (Rp) *</label>
                <input type="number" min="0" value={form.harga_tarif} onChange={e => setForm({ ...form, harga_tarif: e.target.value })} placeholder="150000" className={fieldCls('harga_tarif')} />
                {errors.harga_tarif && <p className="text-xs text-red-500 mt-0.5">{errors.harga_tarif}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Pesawat</label>
                <select value={form.pesawat_id} onChange={e => setForm({ ...form, pesawat_id: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">— Belum ditentukan —</option>
                  {pesawatList.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.kode_penerbangan} · {p.maskapai}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Jenis Pengiriman</label>
                <select value={form.jenis_pengiriman} onChange={e => setForm({ ...form, jenis_pengiriman: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Biasa</option>
                  <option>Cepat</option>
                  <option>VVIP</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Status Pengiriman</label>
                <select value={form.status_pengiriman} onChange={e => setForm({ ...form, status_pengiriman: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Diproses</option>
                  <option>Dalam Pengiriman</option>
                  <option>Sampai Tujuan</option>
                  <option>Pending</option>
                  <option>Selesai</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Deskripsi/Catatan Barang</label>
                <textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} placeholder="Catatan tambahan (opsional)" rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <button onClick={() => { setShowForm(false); setEditingId(null); }} className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-200 text-sm">Batal</button>
              <div className="flex gap-3">
                {!editingId && (
                  <button onClick={() => { setForm({ ...EMPTY_FORM }); setErrors({}); }} className="text-gray-500 px-5 py-2.5 rounded-lg hover:bg-gray-100 text-sm">Reset</button>
                )}
                <button onClick={handleSubmit} disabled={submitting} className="bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-800 text-sm disabled:opacity-60">
                  {submitting ? 'Menyimpan...' : editingId ? 'Update AWB' : 'Simpan AWB'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-7 max-w-sm w-full mx-4 text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">Hapus AWB?</h2>
            <p className="text-sm text-gray-500 mb-6">Yakin ingin menghapus <span className="font-bold text-red-600">{deleteName}</span>? Tindakan ini tidak bisa dibatalkan.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50">Batal</button>
              <button onClick={handleDelete} className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
