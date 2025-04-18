import Modal from "@/components/Modal";

interface DeleteCategorieModalSkeletonProps {
  isVisible: boolean;
}

function DeleteCategorieModalSkeleton({ isVisible }: DeleteCategorieModalSkeletonProps) {
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

        <Modal.Body className="my-12">
          <div className="flex flex-col items-center justify-center gap-8 animate-pulse">
            <div className="h-5 w-64 bg-gray-300 rounded"></div>
            <div className="h-10 w-48 bg-gray-300 rounded-full"></div>
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

export default DeleteCategorieModalSkeleton;
