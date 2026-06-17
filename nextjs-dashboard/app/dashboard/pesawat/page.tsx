'use client';

import { useState, useEffect, useCallback } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon, EyeIcon } from '@heroicons/react/24/outline';

type Pesawat = {
  id: string;
  nama_pesawat: string;
  kode_penerbangan: string;
  maskapai: string;
  kota_asal: string;
  kota_tujuan: string;
  kapasitas_muatan: number;
  status_pesawat: string;
  created_at?: string;
  jumlah_awb: number;
  total_berat: number;
};

type AWB = {
  id: string;
  no_resi: string;
  nama_pengirim: string;
  nama_penerima: string;
  kota_asal: string;
  kota_tujuan: string;
  jenis_barang: string;
  berat_barang: number;
  harga_tarif: number;
  jenis_pengiriman: string;
  status_pengiriman: string;
};

const EMPTY_FORM = {
  nama_pesawat: '',
  kode_penerbangan: '',
  maskapai: '',
  kota_asal: '',
  kota_tujuan: '',
  kapasitas_muatan: '',
  status_pesawat: 'Tersedia',
};

const STATUS_COLORS: Record<string, string> = {
  'Tersedia': 'bg-green-100 text-green-700',
  'Terbang': 'bg-blue-100 text-blue-700',
  'Maintenance': 'bg-red-100 text-red-700',
};

const AWB_STATUS_COLORS: Record<string, string> = {
  'Diproses': 'bg-blue-100 text-blue-700',
  'Dalam Pengiriman': 'bg-yellow-100 text-yellow-700',
  'Sampai Tujuan': 'bg-green-100 text-green-700',
  'Pending': 'bg-orange-100 text-orange-700',
  'Selesai': 'bg-emerald-100 text-emerald-700',
  'Hilang': 'bg-red-100 text-red-700',
  'Diterima': 'bg-teal-100 text-teal-700',
};

function formatRupiah(n: number) {
  return 'Rp ' + Number(n).toLocaleString('id-ID');
}

export default function PesawatPage() {
  const [pesawat, setPesawat] = useState<Pesawat[]>([]);
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

  // Detail / AWB view
  const [detailPesawat, setDetailPesawat] = useState<Pesawat | null>(null);
  const [awbList, setAwbList] = useState<AWB[]>([]);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast(msg); setToastType(type);
    setTimeout(() => setToast(''), 3500);
  };

  const fetchPesawat = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/pesawat');
      const data = await res.json();
      setPesawat(data.data || []);
    } catch { showToast('Gagal mengambil data', 'error'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPesawat(); }, [fetchPesawat]);

  async function openDetail(p: Pesawat) {
    setDetailPesawat(p);
    setLoadingDetail(true);
    try {
      const res = await fetch(`/api/pesawat/${p.id}`);
      const data = await res.json();
      setAwbList(data.awbList || []);
    } catch { setAwbList([]); }
    finally { setLoadingDetail(false); }
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.nama_pesawat) e.nama_pesawat = 'Wajib diisi';
    if (!form.kode_penerbangan) e.kode_penerbangan = 'Wajib diisi';
    if (!form.maskapai) e.maskapai = 'Wajib diisi';
    if (!form.kota_asal) e.kota_asal = 'Wajib diisi';
    if (!form.kota_tujuan) e.kota_tujuan = 'Wajib diisi';
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
        res = await fetch(`/api/pesawat/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      } else {
        res = await fetch('/api/pesawat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      }
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error');
      }
      showToast(editingId ? 'Pesawat berhasil diupdate! ✓' : 'Pesawat berhasil ditambahkan! ✓');
      setShowForm(false); setEditingId(null); setForm({ ...EMPTY_FORM }); setErrors({});
      fetchPesawat();
    } catch (err: any) {
      showToast(err.message || 'Gagal menyimpan data.', 'error');
    } finally { setSubmitting(false); }
  }

  function openEdit(p: Pesawat) {
    setEditingId(p.id);
    setForm({
      nama_pesawat: p.nama_pesawat,
      kode_penerbangan: p.kode_penerbangan,
      maskapai: p.maskapai,
      kota_asal: p.kota_asal,
      kota_tujuan: p.kota_tujuan,
      kapasitas_muatan: String(p.kapasitas_muatan),
      status_pesawat: p.status_pesawat,
    });
    setErrors({}); setShowForm(true);
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/pesawat/${deleteId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      showToast('Pesawat berhasil dihapus! ✓');
      setDeleteId(null); fetchPesawat();
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

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola Pesawat Kargo</h1>
          <p className="text-sm text-gray-500">Armada penerbangan & manifest AWB per pesawat</p>
        </div>
        <button
          onClick={() => { setEditingId(null); setForm({ ...EMPTY_FORM }); setErrors({}); setShowForm(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700"
        >
          <PlusIcon className="w-4 h-4" /> Tambah Pesawat
        </button>
      </div>

      {/* CARDS */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="h-52 bg-white rounded-xl animate-pulse shadow-sm" />)}
        </div>
      ) : pesawat.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-400 shadow-sm">
          Belum ada data pesawat. Klik &quot;+ Tambah Pesawat&quot; untuk mulai.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pesawat.map(p => {
            const pctLoad = p.kapasitas_muatan > 0 ? Math.min(100, (Number(p.total_berat) / Number(p.kapasitas_muatan)) * 100) : 0;
            return (
              <div key={p.id} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-2xl">✈️</div>
                    <h3 className="font-bold text-gray-800 text-sm mt-1">{p.nama_pesawat}</h3>
                    <div className="text-xs font-mono font-bold text-blue-600 mt-0.5">{p.kode_penerbangan}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${STATUS_COLORS[p.status_pesawat] || 'bg-gray-100 text-gray-600'}`}>
                    {p.status_pesawat}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-gray-600 mb-3">
                  <div className="flex justify-between"><span className="text-gray-400">Maskapai:</span><span>{p.maskapai}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Rute:</span><span className="font-semibold">{p.kota_asal} → {p.kota_tujuan}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Kapasitas:</span><span>{Number(p.kapasitas_muatan).toLocaleString('id-ID')} kg</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Total AWB:</span><span className="font-bold text-indigo-600">{p.jumlah_awb} AWB</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Total Berat:</span><span>{Number(p.total_berat).toLocaleString('id-ID')} kg</span></div>
                </div>
                {/* Load bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Muatan terisi</span>
                    <span>{pctLoad.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${pctLoad >= 90 ? 'bg-red-500' : pctLoad >= 60 ? 'bg-yellow-400' : 'bg-green-500'}`}
                      style={{ width: `${pctLoad}%` }}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openDetail(p)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors">
                    <EyeIcon className="w-3.5 h-3.5" /> Lihat AWB
                  </button>
                  <button onClick={() => openEdit(p)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-700 text-xs font-semibold transition-colors">
                    <PencilIcon className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => { setDeleteId(p.id); setDeleteName(p.nama_pesawat); }} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition-colors">
                    <TrashIcon className="w-3.5 h-3.5" /> Hapus
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAIL / AWB LIST MODAL */}
      {detailPesawat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 relative">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-800">✈️ {detailPesawat.nama_pesawat}</h2>
                <p className="text-xs text-gray-500">{detailPesawat.kode_penerbangan} · {detailPesawat.maskapai} · {detailPesawat.kota_asal} → {detailPesawat.kota_tujuan}</p>
              </div>
              <button onClick={() => setDetailPesawat(null)} className="text-gray-400 hover:text-gray-600">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="flex gap-4 mb-4 text-sm">
                <div className="bg-indigo-50 rounded-xl px-4 py-3 text-center flex-1">
                  <div className="text-2xl font-bold text-indigo-700">{detailPesawat.jumlah_awb}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Total AWB</div>
                </div>
                <div className="bg-blue-50 rounded-xl px-4 py-3 text-center flex-1">
                  <div className="text-2xl font-bold text-blue-700">{Number(detailPesawat.total_berat).toLocaleString('id-ID')}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Total Berat (kg)</div>
                </div>
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-center flex-1">
                  <div className="text-2xl font-bold text-gray-700">{Number(detailPesawat.kapasitas_muatan).toLocaleString('id-ID')}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Kapasitas (kg)</div>
                </div>
              </div>

              <h3 className="font-bold text-gray-700 text-sm mb-2">Daftar AWB dalam pesawat ini</h3>
              {loadingDetail ? (
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />)}
                </div>
              ) : awbList.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">Belum ada AWB yang ditugaskan ke pesawat ini.</div>
              ) : (
                <div className="overflow-x-auto max-h-72 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-gray-50">
                      <tr className="text-gray-500 uppercase tracking-wide">
                        <th className="px-3 py-2 text-left">No AWB</th>
                        <th className="px-3 py-2 text-left">Pengirim</th>
                        <th className="px-3 py-2 text-left">Penerima</th>
                        <th className="px-3 py-2 text-left">Barang</th>
                        <th className="px-3 py-2 text-left">Berat</th>
                        <th className="px-3 py-2 text-left">Harga</th>
                        <th className="px-3 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {awbList.map(a => (
                        <tr key={a.id} className="border-t border-gray-50 hover:bg-blue-50/30">
                          <td className="px-3 py-2 font-mono text-blue-600 font-semibold">{a.no_resi}</td>
                          <td className="px-3 py-2 text-gray-700 max-w-[100px] truncate">{a.nama_pengirim}</td>
                          <td className="px-3 py-2 text-gray-700 max-w-[100px] truncate">{a.nama_penerima}</td>
                          <td className="px-3 py-2 text-gray-600">{a.jenis_barang}</td>
                          <td className="px-3 py-2 text-gray-600">{a.berat_barang} kg</td>
                          <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{formatRupiah(a.harga_tarif)}</td>
                          <td className="px-3 py-2">
                            <span className={`px-2 py-0.5 rounded-full font-semibold ${AWB_STATUS_COLORS[a.status_pengiriman] || 'bg-gray-100 text-gray-600'}`}>
                              {a.status_pengiriman}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => setDetailPesawat(null)} className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200 text-sm font-semibold">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg mx-4 relative">
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <XMarkIcon className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-gray-800 mb-4">{editingId ? 'Edit Pesawat' : 'Tambah Pesawat Baru'}</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Pesawat *</label>
                <input value={form.nama_pesawat} onChange={e => setForm({ ...form, nama_pesawat: e.target.value })} placeholder="Garuda Cargo I" className={fieldCls('nama_pesawat')} />
                {errors.nama_pesawat && <p className="text-xs text-red-500 mt-0.5">{errors.nama_pesawat}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Kode Penerbangan *</label>
                <input value={form.kode_penerbangan} onChange={e => setForm({ ...form, kode_penerbangan: e.target.value })} placeholder="GA-452" className={fieldCls('kode_penerbangan')} />
                {errors.kode_penerbangan && <p className="text-xs text-red-500 mt-0.5">{errors.kode_penerbangan}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Maskapai *</label>
                <input value={form.maskapai} onChange={e => setForm({ ...form, maskapai: e.target.value })} placeholder="Garuda Indonesia" className={fieldCls('maskapai')} />
                {errors.maskapai && <p className="text-xs text-red-500 mt-0.5">{errors.maskapai}</p>}
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
                <label className="block text-xs font-semibold text-gray-700 mb-1">Kapasitas Muatan (kg) *</label>
                <input type="number" min="0" value={form.kapasitas_muatan} onChange={e => setForm({ ...form, kapasitas_muatan: e.target.value })} placeholder="5000" className={fieldCls('kapasitas_muatan')} />
                {errors.kapasitas_muatan && <p className="text-xs text-red-500 mt-0.5">{errors.kapasitas_muatan}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Status Pesawat</label>
                <select value={form.status_pesawat} onChange={e => setForm({ ...form, status_pesawat: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Tersedia</option>
                  <option>Terbang</option>
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
            <h2 className="text-lg font-bold text-gray-800 mb-2">Hapus Pesawat?</h2>
            <p className="text-sm text-gray-500 mb-6">Yakin ingin menghapus <span className="font-bold text-red-600">{deleteName}</span>? AWB terkait tidak akan terhapus.</p>
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
