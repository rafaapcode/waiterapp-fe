function SelectSkeleton() {
  return (
    <div className="space-y-2">
      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
      <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default SelectSkeleton;
