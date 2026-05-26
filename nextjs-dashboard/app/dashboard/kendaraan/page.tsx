'use client';

import { useState, useEffect, useCallback } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

type Kendaraan = {
  id: string;
  nama_kendaraan: string;
  jenis_kendaraan: string;
  plat_nomor: string;
  kapasitas_muatan: number;
  status_kendaraan: string;
  created_at?: string;
};

const EMPTY_FORM = {
  nama_kendaraan: '',
  jenis_kendaraan: 'Truk',
  plat_nomor: '',
  kapasitas_muatan: '',
  status_kendaraan: 'Tersedia',
};

const STATUS_COLORS: Record<string, string> = {
  'Tersedia': 'bg-green-100 text-green-700',
  'Digunakan': 'bg-yellow-100 text-yellow-700',
  'Maintenance': 'bg-red-100 text-red-700',
};

export default function KendaraanPage() {
  const [kendaraan, setKendaraan] = useState<Kendaraan[]>([]);
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

  const fetchKendaraan = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/kendaraan');
      const data = await res.json();
      setKendaraan(data.data || []);
    } catch { showToast('Gagal mengambil data', 'error'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchKendaraan(); }, [fetchKendaraan]);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.nama_kendaraan) e.nama_kendaraan = 'Wajib diisi';
    if (!form.plat_nomor) e.plat_nomor = 'Wajib diisi';
    if (!form.kapasitas_muatan || isNaN(Number(form.kapasitas_muatan))) e.kapasitas_muatan = 'Masukkan angka valid';
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSubmitting(true);
    try {
      const payload = { ...form, kapasitas_muatan: Number(form.kapasitas_muatan) };
      let res;
      if (editingId) {
        res = await fetch(`/api/kendaraan/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      } else {
        res = await fetch('/api/kendaraan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      }
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error');
      }
      showToast(editingId ? 'Kendaraan berhasil diupdate! ✓' : 'Kendaraan berhasil ditambahkan! ✓');
      setShowForm(false); setEditingId(null); setForm({ ...EMPTY_FORM }); setErrors({});
      fetchKendaraan();
    } catch (err: any) {
      showToast(err.message || 'Gagal menyimpan data.', 'error');
    } finally { setSubmitting(false); }
  }

  function openEdit(k: Kendaraan) {
    setEditingId(k.id);
    setForm({
      nama_kendaraan: k.nama_kendaraan,
      jenis_kendaraan: k.jenis_kendaraan,
      plat_nomor: k.plat_nomor,
      kapasitas_muatan: String(k.kapasitas_muatan),
      status_kendaraan: k.status_kendaraan,
    });
    setErrors({}); setShowForm(true);
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/kendaraan/${deleteId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      showToast('Kendaraan berhasil dihapus! ✓');
      setDeleteId(null); fetchKendaraan();
    } catch { showToast('Gagal menghapus data.', 'error'); }
  }

  const fieldCls = (key: string) =>
    `w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[key] ? 'border-red-400 bg-red-50' : 'border-gray-200'}`;

  return (
    <div className="min-h-screen">
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-5 py-3 rounded-xl shadow-lg text-sm font-semibold text-white ${toastType === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Daftar Kendaraan</h1>
          <p className="text-sm text-gray-500">Kelola semua kendaraan operasional kargo</p>
        </div>
        <button onClick={() => { setEditingId(null); setForm({ ...EMPTY_FORM }); setErrors({}); setShowForm(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700">
          <PlusIcon className="w-4 h-4" /> Tambah Kendaraan
        </button>
      </div>

      {/* CARDS */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="h-40 bg-white rounded-xl animate-pulse shadow-sm" />)}
        </div>
      ) : kendaraan.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-400 shadow-sm">
          Belum ada data kendaraan. Klik "+ Tambah Kendaraan" untuk mulai.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kendaraan.map(k => (
            <div key={k.id} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-lg">
                    {k.jenis_kendaraan === 'Pesawat' ? '✈️' : k.jenis_kendaraan === 'Kapal' ? '🚢' : k.jenis_kendaraan === 'Motor' ? '🏍️' : '🚛'}
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm mt-1">{k.nama_kendaraan}</h3>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${STATUS_COLORS[k.status_kendaraan] || 'bg-gray-100 text-gray-600'}`}>
                  {k.status_kendaraan}
                </span>
              </div>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex justify-between"><span className="text-gray-400">Jenis:</span><span>{k.jenis_kendaraan}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Plat/Kode:</span><span className="font-mono font-semibold">{k.plat_nomor}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Kapasitas:</span><span>{Number(k.kapasitas_muatan).toLocaleString('id-ID')} kg</span></div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => openEdit(k)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-700 text-xs font-semibold transition-colors">
                  <PencilIcon className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => { setDeleteId(k.id); setDeleteName(k.nama_kendaraan); }} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition-colors">
                  <TrashIcon className="w-3.5 h-3.5" /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 relative">
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <XMarkIcon className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-gray-800 mb-4">{editingId ? 'Edit Kendaraan' : 'Tambah Kendaraan Baru'}</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Kendaraan *</label>
                <input value={form.nama_kendaraan} onChange={e => setForm({ ...form, nama_kendaraan: e.target.value })} placeholder="Garuda Cargo 01" className={fieldCls('nama_kendaraan')} />
                {errors.nama_kendaraan && <p className="text-xs text-red-500 mt-0.5">{errors.nama_kendaraan}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Jenis Kendaraan</label>
                <select value={form.jenis_kendaraan} onChange={e => setForm({ ...form, jenis_kendaraan: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Pesawat</option>
                  <option>Truk</option>
                  <option>Motor</option>
                  <option>Kapal</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Plat Nomor / Kode *</label>
                <input value={form.plat_nomor} onChange={e => setForm({ ...form, plat_nomor: e.target.value })} placeholder="B 1234 KRG" className={fieldCls('plat_nomor')} />
                {errors.plat_nomor && <p className="text-xs text-red-500 mt-0.5">{errors.plat_nomor}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Kapasitas Muatan (kg) *</label>
                <input type="number" min="0" value={form.kapasitas_muatan} onChange={e => setForm({ ...form, kapasitas_muatan: e.target.value })} placeholder="5000" className={fieldCls('kapasitas_muatan')} />
                {errors.kapasitas_muatan && <p className="text-xs text-red-500 mt-0.5">{errors.kapasitas_muatan}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Status Kendaraan</label>
                <select value={form.status_kendaraan} onChange={e => setForm({ ...form, status_kendaraan: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Tersedia</option>
                  <option>Digunakan</option>
                  <option>Maintenance</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between mt-5">
              <button onClick={() => { setShowForm(false); setEditingId(null); }} className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-200 text-sm">Batal</button>
              <button onClick={handleSubmit} disabled={submitting} className="bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-800 text-sm disabled:opacity-60">
                {submitting ? 'Menyimpan...' : editingId ? 'Update' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-7 max-w-sm w-full mx-4 text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">Hapus Kendaraan?</h2>
            <p className="text-sm text-gray-500 mb-6">Yakin ingin menghapus <span className="font-bold text-red-600">{deleteName}</span>?</p>
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
