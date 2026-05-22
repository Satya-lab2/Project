import { Suspense } from 'react';
import { fetchShipmentsPages } from '@/app/lib/data';
import Search from '@/app/ui/search';
import ShipmentsTable from '@/app/ui/manifest/table';
import ManifestPagination from '@/app/ui/manifest/pagination';
import { ShipmentsTableSkeleton } from '@/app/ui/manifest/skeletons';
import AddShipmentButton from '@/app/ui/manifest/add-button';

export default async function ManifestPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchShipmentsPages(query);

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Daftar Shipment</h1>
          <p className="text-sm text-gray-500">
            Kelola dan pantau semua pengiriman kargo
          </p>
        </div>
      </div>

      {/* SEARCH + TAMBAH */}
      <div className="flex items-center gap-3 mb-4">
        <Search placeholder="Cari AWB, pengirim, penerima, status..." />
        <AddShipmentButton />
      </div>

      {/* TABLE dengan Suspense */}
      <Suspense key={query + currentPage} fallback={<ShipmentsTableSkeleton />}>
        <ShipmentsTable query={query} currentPage={currentPage} />
      </Suspense>

      {/* PAGINATION */}
      <div className="mt-5 flex w-full justify-center">
        <ManifestPagination totalPages={totalPages} />
      </div>
    </div>
  );
}
