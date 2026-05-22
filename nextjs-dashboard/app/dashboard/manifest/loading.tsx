import { ShipmentsTableSkeleton } from '@/app/ui/manifest/skeletons';

export default function ManifestLoading() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-8 w-48 rounded-lg bg-gray-200 animate-pulse mb-2" />
          <div className="h-4 w-64 rounded bg-gray-100 animate-pulse" />
        </div>
      </div>

      {/* Search bar + button skeleton */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-10 rounded-md bg-gray-200 animate-pulse" />
        <div className="h-10 w-36 rounded-lg bg-gray-200 animate-pulse" />
      </div>

      {/* Table skeleton */}
      <ShipmentsTableSkeleton />

      {/* Pagination skeleton */}
      <div className="mt-5 flex w-full justify-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-10 rounded-md bg-gray-200 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
