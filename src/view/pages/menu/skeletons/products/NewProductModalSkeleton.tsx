import Modal from "@/components/Modal";

interface NewProductModalSkeletonProps {
  isVisible: boolean;
}

function NewProductModalSkeleton({ isVisible }: NewProductModalSkeletonProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <Modal.Root size="lg" isVisible={isVisible}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
        </div>

        <Modal.Body className="my-4">
          <div className="grid grid-cols-2 gap-6 w-full">
            {/* Left Column */}
            <div className="space-y-6 pl-2 animate-pulse">
              {/* Image Upload Skeleton */}
              <div>
                <div className="h-5 w-24 bg-gray-300 rounded mb-4"></div>
                <div className="border rounded-lg overflow-hidden h-[230px]">
                  <div className="bg-gray-300 h-[75%] flex items-center justify-center"></div>
                  <div className="h-14 bg-gray-200 border-t flex items-center justify-center">
                    <div className="h-5 w-32 bg-gray-300 rounded-md"></div>
                  </div>
                </div>
              </div>

              {/* Product Name Skeleton */}
              <div>
                <div className="h-5 w-36 bg-gray-300 rounded mb-2"></div>
                <div className="h-14 w-full bg-gray-300 rounded-md"></div>
              </div>

              {/* Description Skeleton */}
              <div>
                <div className="h-5 w-24 bg-gray-300 rounded mb-2"></div>
                <div className="h-24 w-full bg-gray-300 rounded-md"></div>
                <div className="h-3 w-40 bg-gray-300 rounded mt-2"></div>
              </div>

              {/* Category Skeleton */}
              <div>
                <div className="h-5 w-24 bg-gray-300 rounded mb-2"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-10 w-28 bg-gray-300 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Ingredients */}
            <div className="animate-pulse">
              <div className="flex justify-between items-center">
                <div className="h-6 w-32 bg-gray-300 rounded"></div>
                <div className="h-5 w-36 bg-gray-300 rounded"></div>
              </div>

              {/* Search input */}
              <div className="my-6">
                <div className="h-5 w-40 bg-gray-300 rounded mb-2"></div>
                <div className="h-14 w-full bg-gray-300 rounded-md"></div>
              </div>

              {/* Ingredients list */}
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-14 w-full bg-gray-300 rounded-md"></div>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>

        <div className="w-full flex justify-end mt-4 animate-pulse">
          <div className="h-10 w-36 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </Modal.Root>
  );
}

export default NewProductModalSkeleton;
