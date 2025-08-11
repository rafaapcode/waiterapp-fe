import Modal from "@/components/Modal";

interface NewUserModalSkeletonProps {
  isVisible: boolean;
}

function NewUserModalSkeleton({ isVisible }: NewUserModalSkeletonProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <Modal.Root size="sm" isVisible={isVisible}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
        </div>

        <div className="my-12 animate-pulse">
          <div className="flex flex-col gap-8">
            {/* Nome field */}
            <div className="flex flex-col gap-2">
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
              <div className="h-14 w-full bg-gray-300 rounded-md"></div>
            </div>

            {/* Email field */}
            <div className="flex flex-col gap-2">
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
              <div className="h-14 w-full bg-gray-300 rounded-md"></div>
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-2">
              <div className="h-4 w-20 bg-gray-300 rounded"></div>
              <div className="h-14 w-full bg-gray-300 rounded-md"></div>
            </div>

            {/* Role type */}
            <div className="flex flex-col gap-2">
              <div className="h-4 w-12 bg-gray-300 rounded"></div>
              <div className="flex gap-8">
                <div className="flex gap-2 items-center">
                  <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-16 bg-gray-300 rounded"></div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-16 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end animate-pulse">
          <div className="h-12 w-full bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </Modal.Root>
  );
}

export default NewUserModalSkeleton;
