'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function AddShipmentButton() {
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({
    pengirim: '', penerima: '', alamatAsal: '', alamatTujuan: '',
    jenisBarang: '', berat: '', tanggal: '', layanan: 'Reguler (3-5 hari)',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    // TODO: integrate with server action / API
    setToast('Shipment berhasil ditambahkan!');
    setShowForm(false);
    setForm({ pengirim: '', penerima: '', alamatAsal: '', alamatTujuan: '', jenisBarang: '', berat: '', tanggal: '', layanan: 'Reguler (3-5 hari)' });
    setErrors({});
    setTimeout(() => setToast(''), 3000);
  }

  if (showForm) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}>
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Tambah Shipment Baru</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Nama Pengirim', key: 'pengirim', placeholder: 'Masukkan nama pengirim' },
              { label: 'Nama Penerima', key: 'penerima', placeholder: 'Masukkan nama penerima' },
              { label: 'Alamat Asal', key: 'alamatAsal', placeholder: 'Masukkan alamat asal' },
              { label: 'Alamat Tujuan', key: 'alamatTujuan', placeholder: 'Masukkan alamat tujuan' },
              { label: 'Jenis Barang', key: 'jenisBarang', placeholder: 'Contoh: Elektronik, Dokumen' },
              { label: 'Berat Barang (kg)', key: 'berat', placeholder: 'Masukkan berat dalam kg' },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <input
                  type="text"
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
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
                onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm ${errors.tanggal ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.tanggal && <p className="text-xs text-red-500 mt-1">{errors.tanggal}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Layanan Pengiriman</label>
              <select
                value={form.layanan}
                onChange={(e) => setForm({ ...form, layanan: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm"
              >
                <option>Reguler (3-5 hari)</option>
                <option>Express (1-2 hari)</option>
                <option>Same Day</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={() => setShowForm(false)} className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-200">
              ← Batal
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => setForm({ pengirim: '', penerima: '', alamatAsal: '', alamatTujuan: '', jenisBarang: '', berat: '', tanggal: '', layanan: 'Reguler (3-5 hari)' })}
                className="text-gray-500 px-5 py-2.5 rounded-lg hover:bg-gray-100"
              >
                Reset
              </button>
              <button onClick={handleSubmit} className="bg-blue-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-800">
                Simpan Shipment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-semibold">
          ✓ {toast}
        </div>
      )}
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
      >
        + Tambah Shipment
      </button>
    </>
  );
}
