export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-48 bg-white rounded-xl animate-pulse shadow-sm" />
      ))}
    </div>
  );
}
