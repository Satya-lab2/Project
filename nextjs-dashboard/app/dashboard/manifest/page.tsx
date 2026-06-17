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
  kapasitas_muatan: number;
  total_berat: number;
  status_pesawat: string;
  jadwal_berangkat?: string;
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
  // Default status baru adalah Draft agar data bisa diedit sebelum diproses
  status_pengiriman: 'Draft',
  deskripsi: '',
  pesawat_id: '',
  jadwal_berangkat: '',
};

const STATUS_COLORS: Record<string, string> = {
  // Status baru: Draft — kuning abu, menandakan belum dikonfirmasi
  'Draft': 'bg-gray-100 text-gray-500 border border-dashed border-gray-300',
  'Diproses': 'bg-blue-100 text-blue-700',
  'Dalam Pengiriman': 'bg-yellow-100 text-yellow-700',
  'Sampai Tujuan': 'bg-green-100 text-green-700',
  'Pending': 'bg-orange-100 text-orange-700',
  'Selesai': 'bg-emerald-100 text-emerald-700',
  'Hilang': 'bg-red-100 text-red-700',
  'Diterima': 'bg-teal-100 text-teal-700',
};

const JADWAL_OPTIONS = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

// Status yang dianggap sudah "on-boarding" — data dikunci, hanya status yang bisa diubah
const LOCKED_STATUSES = ['Diproses', 'Dalam Pengiriman', 'Sampai Tujuan', 'Pending', 'Selesai', 'Hilang', 'Diterima'];

function isLocked(status: string) {
  return LOCKED_STATUSES.includes(status);
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${STATUS_COLORS[status] || 'bg-gray-100 text-gray-600'}`}>
      {status === 'Draft' ? '📝 Draft' : status}
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
  const [editingStatus, setEditingStatus] = useState<string>(''); // status asli saat edit dibuka
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [capacityError, setCapacityError] = useState('');

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState('');

  const [statusFilter, setStatusFilter] = useState('');

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast(msg); setToastType(type);
    setTimeout(() => setToast(''), 3500);
  };

  const fetchShipments = useCallback(async () => {
    setLoading(true);
    try {
      let url = `/api/shipments?query=${encodeURIComponent(query)}&page=${currentPage}&limit=8`;
      if (statusFilter) url += `&status=${encodeURIComponent(statusFilter)}`;
      const res = await fetch(url);
      const data = await res.json();
      setShipments(data.data || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch {
      showToast('Gagal mengambil data', 'error');
    } finally {
      setLoading(false);
    }
  }, [query, currentPage, statusFilter]);

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
  }, [query, statusFilter]);

  // Cek kapasitas pesawat saat pesawat atau berat berubah
  useEffect(() => {
    if (!form.pesawat_id || !form.berat_barang) { setCapacityError(''); return; }
    const pesawat = pesawatList.find(p => p.id === form.pesawat_id);
    if (!pesawat) { setCapacityError(''); return; }
    const newBerat = parseFloat(form.berat_barang) || 0;
    const currentLoad = parseFloat(String(pesawat.total_berat)) || 0;
    const kapasitas = parseFloat(String(pesawat.kapasitas_muatan)) || 0;
    const projected = currentLoad + newBerat;
    if (projected > kapasitas) {
      setCapacityError(
        `⚠️ Kapasitas pesawat terlampaui! Kapasitas: ${kapasitas} kg, Terisi: ${currentLoad} kg, Tambahan: ${newBerat} kg, Total: ${projected} kg (melebihi ${(projected - kapasitas).toFixed(1)} kg)`
      );
    } else {
      setCapacityError('');
    }
  }, [form.pesawat_id, form.berat_barang, pesawatList]);

  function validate(fullValidation: boolean) {
    const e: Record<string, string> = {};
    // Full validation dipakai untuk Draft (edit penuh) dan Add baru
    if (fullValidation) {
      if (!form.tanggal_kirim) e.tanggal_kirim = 'Wajib diisi';
      if (!form.nama_pengirim.trim()) {
        e.nama_pengirim = 'Wajib diisi';
      } else if (form.nama_pengirim.trim().length < 3) {
        e.nama_pengirim = 'Minimal 3 karakter';
      }
      if (!form.nama_penerima.trim()) {
        e.nama_penerima = 'Wajib diisi';
      } else if (form.nama_penerima.trim().length < 3) {
        e.nama_penerima = 'Minimal 3 karakter';
      }
      if (!form.no_telepon) {
        e.no_telepon = 'Wajib diisi';
      } else {
        const digits = form.no_telepon.replace(/\D/g, '');
        if (digits.length !== 12) e.no_telepon = 'Nomor telepon harus 12 angka';
      }
      if (!form.kota_asal) e.kota_asal = 'Wajib diisi';
      if (!form.kota_tujuan) e.kota_tujuan = 'Wajib diisi';
      if (!form.jenis_barang) e.jenis_barang = 'Wajib diisi';
      if (!form.berat_barang || isNaN(Number(form.berat_barang))) e.berat_barang = 'Masukkan angka valid';
      if (!form.harga_tarif || isNaN(Number(form.harga_tarif))) e.harga_tarif = 'Masukkan angka valid';
    }
    // Untuk edit locked: tidak perlu validasi field lain, cukup status
    return e;
  }

  async function handleSubmit() {
    // Tentukan apakah ini edit penuh (Draft) atau hanya update status (Locked)
    const isDraftEdit = !!editingId && !isLocked(editingStatus);
    const isLockedEdit = editingId && isLocked(editingStatus);
    const isAdd = !editingId;

    const needsFullValidation = isAdd || isDraftEdit;
    const e = validate(needsFullValidation);
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    if (capacityError && needsFullValidation) {
      showToast('Kapasitas pesawat terlampaui, pilih pesawat lain atau kurangi berat.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      let res;

      if (isLockedEdit) {
        // Hanya update status
        res = await fetch(`/api/shipments/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status_pengiriman: form.status_pengiriman, editOnly: true }),
        });
      } else if (isDraftEdit) {
        // Update semua field (AWB masih Draft)
        const payload = {
          ...form,
          berat_barang: Number(form.berat_barang),
          harga_tarif: Number(form.harga_tarif),
          pesawat_id: form.pesawat_id || null,
        };
        res = await fetch(`/api/shipments/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        // Tambah baru
        const payload = {
          ...form,
          berat_barang: Number(form.berat_barang),
          harga_tarif: Number(form.harga_tarif),
          pesawat_id: form.pesawat_id || null,
        };
        res = await fetch('/api/shipments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error();

      const successMsg = isLockedEdit
        ? 'Status AWB berhasil diupdate! ✓'
        : isDraftEdit
          ? 'Data AWB Draft berhasil diperbarui! ✓'
          : 'AWB berhasil ditambahkan! ✓';

      showToast(successMsg);
      setShowForm(false);
      setEditingId(null);
      setEditingStatus('');
      setForm({ ...EMPTY_FORM });
      setErrors({});
      fetchShipments();
      fetchPesawat();
    } catch {
      showToast('Gagal menyimpan data. Coba lagi.', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  function openEdit(s: Shipment) {
    setEditingId(s.id);
    setEditingStatus(s.status_pengiriman); // simpan status asli untuk menentukan mode
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
      jadwal_berangkat: '',
    });
    setErrors({});
    setCapacityError('');
    setShowForm(true);
  }

  function openAdd() {
    setEditingId(null);
    setEditingStatus('');
    setForm({ ...EMPTY_FORM });
    setErrors({});
    setCapacityError('');
    setShowForm(true);
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/shipments/${deleteId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      showToast('AWB berhasil dihapus! ✓');
      setDeleteId(null);
      fetchShipments();
      fetchPesawat();
    } catch {
      showToast('Gagal menghapus data.', 'error');
    }
  }

  const fieldCls = (key: string, disabled = false) =>
    `w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[key] ? 'border-red-400 bg-red-50' : 'border-gray-200'} ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`;

  const selectedPesawat = pesawatList.find(p => p.id === form.pesawat_id);

  // Mode edit yang sedang aktif
  const isDraftEdit = editingId !== null && !isLocked(editingStatus);
  const isLockedEdit = editingId !== null && isLocked(editingStatus);

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

      {/* FILTER BAR */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cari No AWB, Pengirim, Penerima, Kota..."
            className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        >
          <option value="">Semua Status</option>
          <option>Draft</option>
          <option>Diproses</option>
          <option>Dalam Pengiriman</option>
          <option>Sampai Tujuan</option>
          <option>Pending</option>
          <option>Selesai</option>
          <option>Hilang</option>
          <option>Diterima</option>
        </select>
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
                    {query || statusFilter ? 'Tidak ada hasil ditemukan.' : 'Belum ada data. Klik "+ Tambah AWB" untuk mulai.'}
                  </td>
                </tr>
              ) : (
                shipments.map(s => (
                  <tr key={s.id} className={`border-t border-gray-50 hover:bg-blue-50/40 transition-colors ${s.status_pengiriman === 'Draft' ? 'bg-gray-50/60' : ''}`}>
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
                        <button
                          onClick={() => openEdit(s)}
                          className={`p-1.5 rounded-md transition-colors ${
                            s.status_pengiriman === 'Draft'
                              ? 'bg-blue-50 hover:bg-blue-100 text-blue-600'
                              : 'bg-yellow-50 hover:bg-yellow-100 text-yellow-600'
                          }`}
                          title={s.status_pengiriman === 'Draft' ? 'Edit Data (Draft)' : 'Edit Status'}
                        >
                          <PencilIcon className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => { setDeleteId(s.id); setDeleteName(s.no_resi); }}
                          className="p-1.5 rounded-md bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          title="Hapus"
                        >
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
            <button onClick={() => { setShowForm(false); setEditingId(null); setEditingStatus(''); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <XMarkIcon className="w-5 h-5" />
            </button>

            {/* ─── MODE: EDIT LOCKED (Diproses ke atas) ─── */}
            {isLockedEdit && (
              <>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Edit Status AWB</h2>
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 mb-4">
                  <span className="text-amber-600">🔒</span>
                  <p className="text-xs text-amber-700 font-medium">
                    AWB sudah <strong>{editingStatus}</strong> — data dikunci. Hanya <strong>Status Pengiriman</strong> yang dapat diubah.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Tanggal Kirim</label>
                    <div className="w-full border border-gray-100 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-400">{form.tanggal_kirim || '—'}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Nama Pengirim</label>
                    <div className="w-full border border-gray-100 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-400">{form.nama_pengirim}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Nama Penerima</label>
                    <div className="w-full border border-gray-100 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-400">{form.nama_penerima}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Rute</label>
                    <div className="w-full border border-gray-100 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-400">{form.kota_asal} → {form.kota_tujuan}</div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Status Pengiriman <span className="text-blue-600">(dapat diubah)</span>
                  </label>
                  <select value={form.status_pengiriman} onChange={e => setForm({ ...form, status_pengiriman: e.target.value })} className="w-full border border-blue-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Diproses</option>
                    <option>Dalam Pengiriman</option>
                    <option>Sampai Tujuan</option>
                    <option>Pending</option>
                    <option>Selesai</option>
                    <option>Hilang</option>
                    <option>Diterima</option>
                  </select>
                </div>
              </>
            )}

            {/* ─── MODE: EDIT DRAFT (data bisa diedit semua) ─── */}
            {isDraftEdit && (
              <>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Edit AWB Draft</h2>
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 mb-4">
                  <span>📝</span>
                  <p className="text-xs text-blue-700 font-medium">
                    AWB masih berstatus <strong>Draft</strong> — semua data masih dapat diubah. Ubah status ke <strong>"Diproses"</strong> untuk mengunci data.
                  </p>
                </div>

                {capacityError && (
                  <div className="mb-4 bg-red-50 border border-red-300 rounded-lg px-4 py-3 text-xs text-red-700">{capacityError}</div>
                )}
                {selectedPesawat && (
                  <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-xs text-blue-700 flex items-center gap-3">
                    <span>✈️</span>
                    <div>
                      <span className="font-semibold">{selectedPesawat.kode_penerbangan}</span>
                      <span className="mx-2">·</span>
                      Kapasitas: <span className="font-semibold">{selectedPesawat.kapasitas_muatan} kg</span>
                      <span className="mx-2">·</span>
                      Terisi: <span className="font-semibold">{parseFloat(String(selectedPesawat.total_berat)).toFixed(1)} kg</span>
                      <span className="mx-2">·</span>
                      Sisa: <span className="font-semibold text-green-700">{(parseFloat(String(selectedPesawat.kapasitas_muatan)) - parseFloat(String(selectedPesawat.total_berat))).toFixed(1)} kg</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal Kirim *</label>
                    <input type="date" value={form.tanggal_kirim} onChange={e => setForm({ ...form, tanggal_kirim: e.target.value })} className={fieldCls('tanggal_kirim')} />
                    {errors.tanggal_kirim && <p className="text-xs text-red-500 mt-0.5">{errors.tanggal_kirim}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">No Telepon * <span className="text-gray-400 font-normal">(12 digit)</span></label>
                    <input
                      type="tel"
                      value={form.no_telepon}
                      onChange={e => { const digits = e.target.value.replace(/\D/g, '').slice(0, 12); setForm({ ...form, no_telepon: digits }); }}
                      placeholder="081234567890"
                      maxLength={12}
                      className={fieldCls('no_telepon')}
                    />
                    <p className="text-xs text-gray-400 mt-0.5">{form.no_telepon.length}/12 digit</p>
                    {errors.no_telepon && <p className="text-xs text-red-500 mt-0.5">{errors.no_telepon}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Pengirim * <span className="text-gray-400 font-normal">(min. 3 karakter)</span></label>
                    <input value={form.nama_pengirim} onChange={e => setForm({ ...form, nama_pengirim: e.target.value })} placeholder="Nama pengirim" className={fieldCls('nama_pengirim')} />
                    {errors.nama_pengirim && <p className="text-xs text-red-500 mt-0.5">{errors.nama_pengirim}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Penerima * <span className="text-gray-400 font-normal">(min. 3 karakter)</span></label>
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
                    <label className="block text-xs font-semibold text-gray-700 mb-1">No Penerbangan</label>
                    <select value={form.pesawat_id} onChange={e => setForm({ ...form, pesawat_id: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">— Belum ditentukan —</option>
                      {pesawatList.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.kode_penerbangan} · {p.maskapai} (Sisa: {(parseFloat(String(p.kapasitas_muatan)) - parseFloat(String(p.total_berat))).toFixed(0)} kg)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Jadwal Keberangkatan</label>
                    <select value={form.jadwal_berangkat} onChange={e => setForm({ ...form, jadwal_berangkat: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">— Pilih Jadwal —</option>
                      {JADWAL_OPTIONS.map(j => <option key={j} value={j}>{j} WIB</option>)}
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
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Status Pengiriman
                      <span className="ml-1 text-blue-500 font-normal">(ubah ke "Diproses" untuk mengunci data)</span>
                    </label>
                    <select value={form.status_pengiriman} onChange={e => setForm({ ...form, status_pengiriman: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="Draft">📝 Draft (masih bisa diedit)</option>
                      <option value="Diproses">Diproses (data dikunci)</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Deskripsi/Catatan Barang</label>
                    <textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} placeholder="Catatan tambahan (opsional)" rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  </div>
                </div>
              </>
            )}

            {/* ─── MODE: TAMBAH BARU ─── */}
            {!editingId && (
              <>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Tambah AWB Baru</h2>
                <p className="text-xs text-gray-500 mb-4">
                  No AWB digenerate otomatis · AWB masuk sebagai <strong>Draft</strong> — data bisa diedit sampai diubah ke "Diproses"
                </p>

                {capacityError && (
                  <div className="mb-4 bg-red-50 border border-red-300 rounded-lg px-4 py-3 text-xs text-red-700">{capacityError}</div>
                )}
                {selectedPesawat && (
                  <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-xs text-blue-700 flex items-center gap-3">
                    <span>✈️</span>
                    <div>
                      <span className="font-semibold">{selectedPesawat.kode_penerbangan}</span>
                      <span className="mx-2">·</span>
                      Kapasitas: <span className="font-semibold">{selectedPesawat.kapasitas_muatan} kg</span>
                      <span className="mx-2">·</span>
                      Terisi: <span className="font-semibold">{parseFloat(String(selectedPesawat.total_berat)).toFixed(1)} kg</span>
                      <span className="mx-2">·</span>
                      Sisa: <span className="font-semibold text-green-700">{(parseFloat(String(selectedPesawat.kapasitas_muatan)) - parseFloat(String(selectedPesawat.total_berat))).toFixed(1)} kg</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal Kirim *</label>
                    <input type="date" value={form.tanggal_kirim} onChange={e => setForm({ ...form, tanggal_kirim: e.target.value })} className={fieldCls('tanggal_kirim')} />
                    {errors.tanggal_kirim && <p className="text-xs text-red-500 mt-0.5">{errors.tanggal_kirim}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">No Telepon * <span className="text-gray-400 font-normal">(12 digit)</span></label>
                    <input
                      type="tel"
                      value={form.no_telepon}
                      onChange={e => { const digits = e.target.value.replace(/\D/g, '').slice(0, 12); setForm({ ...form, no_telepon: digits }); }}
                      placeholder="081234567890"
                      maxLength={12}
                      className={fieldCls('no_telepon')}
                    />
                    <p className="text-xs text-gray-400 mt-0.5">{form.no_telepon.length}/12 digit</p>
                    {errors.no_telepon && <p className="text-xs text-red-500 mt-0.5">{errors.no_telepon}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Pengirim * <span className="text-gray-400 font-normal">(min. 3 karakter)</span></label>
                    <input value={form.nama_pengirim} onChange={e => setForm({ ...form, nama_pengirim: e.target.value })} placeholder="Nama pengirim" className={fieldCls('nama_pengirim')} />
                    {errors.nama_pengirim && <p className="text-xs text-red-500 mt-0.5">{errors.nama_pengirim}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Penerima * <span className="text-gray-400 font-normal">(min. 3 karakter)</span></label>
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
                    <label className="block text-xs font-semibold text-gray-700 mb-1">No Penerbangan</label>
                    <select value={form.pesawat_id} onChange={e => setForm({ ...form, pesawat_id: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">— Belum ditentukan —</option>
                      {pesawatList.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.kode_penerbangan} · {p.maskapai} (Sisa: {(parseFloat(String(p.kapasitas_muatan)) - parseFloat(String(p.total_berat))).toFixed(0)} kg)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Jadwal Keberangkatan</label>
                    <select value={form.jadwal_berangkat} onChange={e => setForm({ ...form, jadwal_berangkat: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">— Pilih Jadwal —</option>
                      {JADWAL_OPTIONS.map(j => <option key={j} value={j}>{j} WIB</option>)}
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
                  {/* Status saat tambah baru selalu Draft, tidak bisa diubah dari sini */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Status Awal</label>
                    <div className="w-full border border-dashed border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-500">
                      📝 Draft <span className="text-xs text-gray-400 ml-1">(otomatis, bisa diubah setelah disimpan)</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Deskripsi/Catatan Barang</label>
                    <textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} placeholder="Catatan tambahan (opsional)" rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  </div>
                </div>
              </>
            )}

            {/* Footer buttons */}
            <div className="flex justify-between mt-5">
              <button
                onClick={() => { setShowForm(false); setEditingId(null); setEditingStatus(''); }}
                className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-200 text-sm"
              >
                Batal
              </button>
              <div className="flex gap-3">
                {!editingId && (
                  <button
                    onClick={() => { setForm({ ...EMPTY_FORM }); setErrors({}); setCapacityError(''); }}
                    className="text-gray-500 px-5 py-2.5 rounded-lg hover:bg-gray-100 text-sm"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={submitting || (!!capacityError && !isLockedEdit)}
                  className="bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-800 text-sm disabled:opacity-60"
                >
                  {submitting
                    ? 'Menyimpan...'
                    : isLockedEdit
                      ? 'Update Status'
                      : isDraftEdit
                        ? 'Simpan Perubahan'
                        : 'Simpan AWB'}
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
