'use client'

import { useEffect, useState } from 'react';

const flights = [
  { no: 'GA-452', maskapai: 'Garuda Indonesia', rute: 'CGK→SUB', etd: '08:30', eta: '10:15', totalKargo: '842 kg', awb: 18, status: 'On Time' },
  { no: 'GA-716', maskapai: 'Garuda Indonesia', rute: 'CGK→DPS', etd: '11:15', eta: '13:30', totalKargo: '1.240 kg', awb: 34, status: 'Boarding' },
  { no: 'ID-8821', maskapai: 'Batik Air', rute: 'CGK→MDC', etd: '13:00', eta: '17:45', totalKargo: '560 kg', awb: 12, status: 'Delayed +45m' },
  { no: 'JT-633', maskapai: 'Lion Air', rute: 'CGK→UPG', etd: '06:45', eta: '10:10', totalKargo: '1.820 kg', awb: 41, status: 'Departed' },
  { no: 'SJ-220', maskapai: 'Sriwijaya Air', rute: 'CGK→PDG', etd: '14:30', eta: '16:00', totalKargo: '390 kg', awb: 9, status: 'On Time' },
  { no: 'JT-771', maskapai: 'Lion Air', rute: 'CGK→BDJ', etd: '07:20', eta: '10:50', totalKargo: '2.100 kg', awb: 28, status: 'Departed' },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'On Time': 'bg-green-100 text-green-700',
    'Boarding': 'bg-blue-100 text-blue-700',
    'Delayed +45m': 'bg-orange-100 text-orange-700',
    'Departed': 'bg-gray-100 text-gray-600',
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${map[status] || 'bg-gray-100'}`}>
      {status}
    </span>
  );
}

export default function StatusKargoPage() {
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

    return (
        <div className="p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
            Status Kargo & Peta Rute
            </h1>
            <div className='flex items-center gap-3'>
                <span className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 font-mono shadow-sm">
                {time}
                </span>
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                AS
                </div>
            </div>
        </div>

        {/* MAP */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <h2 className="font-bold text-gray-700 text-sm mb-3">
            Peta Rute Kargo Aktif — Hub CGK
            </h2>

            <div className="bg-blue-50 rounded-lg h-48 flex items-center justify-center text-blue-300 text-sm border-2 border-dashed border-blue-200">
            🗺 Peta interaktif rute kargo CGK
            </div>

            <div className="flex gap-4 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Departed / Arrived
            </span>

            <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                Delayed
            </span>

            <span className="flex items-center gap-1 border-b-2 border-dashed border-gray-400">
                Active Route
            </span>
            </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">
                Status Kargo per Penerbangan
            </h2>

            <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Live
                </span>

                <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-semibold hover:bg-blue-700">
                Export CSV
                </button>
            </div>
            </div>

            <table className="w-full text-sm">
            <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <th className="px-5 py-3 text-left">No Penerbangan</th>
                <th className="px-5 py-3 text-left">Maskapai</th>
                <th className="px-5 py-3 text-left">Rute</th>
                <th className="px-5 py-3 text-left">Total Kargo</th>
                <th className="px-5 py-3 text-left">ETD</th>
                <th className="px-5 py-3 text-left">ETA</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Aksi</th>
                </tr>
            </thead>

            <tbody>
                {flights.map((f, i) => (
                <tr key={i} className="border-t hover:bg-blue-50/40 transition">
                    <td className="px-5 py-3 font-bold text-blue-600">{f.no}</td>
                    <td className="px-5 py-3">{f.maskapai}</td>
                    <td className="px-5 py-3 font-mono text-xs">{f.rute}</td>
                    <td className="px-5 py-3">{f.totalKargo} / {f.awb} AWB</td>
                    <td className="px-5 py-3">{f.etd}</td>
                    <td className="px-5 py-3">{f.eta}</td>
                    <td className="px-5 py-3">
                    <StatusBadge status={f.status} />
                    </td>
                    <td className="px-5 py-3">
                    <button className="bg-blue-900 text-white text-xs px-3 py-1 rounded font-semibold hover:bg-blue-800">
                        Detail
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

        </div>
        </div>
    );
    }