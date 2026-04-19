'use client';
import { useState, useEffect } from 'react';

export default function TrackingPage() {
  const [awb, setAwb] = useState('');
  const [result, setResult] = useState<any>(null);

  // 🔥 REALTIME CLOCK
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

  // 🔥 DUMMY DATABASE TRACKING
  const trackingDB: Record<string, any> = {
    '601-48291087': {
      pengirim: 'CV Maju Bersama',
      penerima: 'Toko Bali Indah',
      status: 'Loaded',
      timeline: [
        { time: '08:00', desc: 'Barang diterima di gudang CGK' },
        { time: '09:30', desc: 'Proses sortasi' },
        { time: '10:15', desc: 'Loaded ke pesawat' },
      ]
    },
    '601-48291034': {
      pengirim: 'PT Sinar Jaya',
      penerima: 'PT Mitra Surabaya',
      status: 'Arrived',
      timeline: [
        { time: '07:00', desc: 'Barang diterima di CGK' },
        { time: '08:30', desc: 'Berangkat dari CGK' },
        { time: '10:15', desc: 'Tiba di SUB' },
      ]
    }
  };

  function handleTracking() {
    const data = trackingDB[awb];

    if (data) {
      setResult(data);
    } else {
      setResult({ error: 'AWB tidak ditemukan' });
    }
  }

  return (
    <div className="min-h-screen">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Tracking Airway Bill (AWB)
        </h1>

        {/* 🔥 JAM REALTIME */}
        <div className='flex items-center gap-3'>
            <span className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 font-mono shadow-sm">
            {time}
            </span>
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                AS
            </div>
        </div>
      </div>

      {/* CARD INPUT */}
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
        <h2 className="font-bold text-gray-800 mb-2">
          Tracking Airway Bill
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Masukkan nomor AWB untuk melihat status kargo
        </p>

        <label className="text-sm font-semibold text-gray-700">
          NOMOR AIRWAY BILL (AWB)
        </label>

        <input
          value={awb}
          onChange={(e) => setAwb(e.target.value)}
          placeholder="Contoh: 601-48291087"
          className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleTracking}
          className="mt-4 w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Lacak Status Kargo
        </button>
      </div>

      {/* HASIL TRACKING */}
      {result && (
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6 max-w-2xl">

          {result.error ? (
            <p className="text-red-500 font-semibold">
              {result.error}
            </p>
          ) : (
            <>
              <h3 className="font-bold text-lg mb-3">
                Detail Kargo
              </h3>

              <div className="mb-4 text-sm text-gray-700 space-y-1">
                <p><b>Pengirim:</b> {result.pengirim}</p>
                <p><b>Penerima:</b> {result.penerima}</p>
                <p><b>Status:</b> {result.status}</p>
              </div>

              <h4 className="font-semibold mb-3">
                Timeline Perjalanan
              </h4>

              <div className="space-y-3">
                {result.timeline.map((t: any, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-xs text-gray-400 font-mono">
                        {t.time}
                      </p>
                      <p className="text-sm text-gray-700">
                        {t.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      )}

    </div>
  );
}