import Modal from "@/components/Modal";

interface NewCategorieModalSkeletonProps {
  isVisible: boolean;
}

function NewCategorieModalSkeleton({ isVisible }: NewCategorieModalSkeletonProps) {
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

        <Modal.Body className="my-12">
          <div className="flex flex-col gap-8 animate-pulse">
            <div className="flex flex-col gap-2">
              <div className="h-5 w-16 bg-gray-300 rounded"></div>
              <div className="h-14 w-full bg-gray-300 rounded-md"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="h-5 w-40 bg-gray-300 rounded"></div>
              <div className="h-14 w-full bg-gray-300 rounded-md"></div>
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

export default NewCategorieModalSkeleton;
