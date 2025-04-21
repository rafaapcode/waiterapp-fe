import Modal from "@/components/Modal";

interface RemoveProductModalSkeletonProps {
  isVisible: boolean;
}

function RemoveProductModalSkeleton({ isVisible }: RemoveProductModalSkeletonProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <Modal.Root size="sm" isVisible={isVisible} priority>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
        </div>

        <Modal.Body className="my-2">
          <div className="flex flex-col gap-4 my-12 items-center animate-pulse">
            <div className="h-5 w-64 bg-gray-300 rounded mb-2"></div>
            <div className="h-[123px] flex rounded-lg border border-gray-200 overflow-hidden w-full">
              <div className="w-1/2 h-full flex justify-center items-center bg-gray-300"></div>
              <div className="w-1/2 h-full p-4 flex flex-col gap-2">
                <div className="h-5 w-24 bg-gray-300 rounded"></div>
                <div className="h-6 w-36 bg-gray-300 rounded"></div>
                <div className="h-5 w-20 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <div className="flex justify-between gap-4 animate-pulse">
          <div className="h-10 w-40 bg-gray-300 rounded-full"></div>
          <div className="h-10 w-40 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </Modal.Root>
  );
}

export default RemoveProductModalSkeleton;
