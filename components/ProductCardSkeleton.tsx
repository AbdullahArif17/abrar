export function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-6 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-6 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="flex gap-3 pt-4">
          <div className="h-10 bg-gray-200 rounded-xl flex-1" />
          <div className="h-10 bg-gray-200 rounded-xl flex-1" />
        </div>
      </div>
    </div>
  );
}
