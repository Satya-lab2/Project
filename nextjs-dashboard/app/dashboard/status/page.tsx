'use client'

import { Suspense } from 'react';
import FlightTable from '@/app/ui/status/flight-table';

function FlightTableSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="h-5 w-52 rounded bg-gray-200 animate-pulse mb-1" />
        <div className="h-3 w-32 rounded bg-gray-100 animate-pulse" />
      </div>
      <div className="px-5 py-3">
        <div className="h-10 w-full rounded-md bg-gray-200 animate-pulse" />
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            {['Kode','Maskapai','Rute','Total AWB','Berat','Kapasitas','Status','Aksi'].map(h => (
              <th key={h} className="px-5 py-3 text-left">
                <div className="h-3 w-16 rounded bg-gray-200" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-t">
              {[...Array(8)].map((_, j) => (
                <td key={j} className="px-5 py-3">
                  <div className="h-4 w-20 rounded bg-gray-100" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function StatusKargoPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Status Kargo per Pesawat</h1>
        <p className="text-sm text-gray-500 mt-1">Pantau manifest AWB dan muatan setiap armada pesawat</p>
      </div>

      <Suspense fallback={<FlightTableSkeleton />}>
        <FlightTable />
      </Suspense>
    </div>
  );
}
