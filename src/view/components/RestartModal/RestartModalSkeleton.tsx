import Modal from "@/components/molecule/Modal";

interface RestartModalSkeletonProps {
  isVisible: boolean;
  size?: "sm" | "md" | "lg";
}

function RestartModalSkeleton({
  size = "sm",
  isVisible,
}: RestartModalSkeletonProps) {
  return (
    <Modal size={size} isVisible={isVisible}>
      <div className="p-6">
        <div className="flex items-center gap-4 animate-pulse">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="h-8 w-44 bg-gray-300 rounded-md"></div>
        </div>

        <Modal.Body className="my-12 animate-pulse">
          <div className="w-3/4 mx-auto">
            <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        </Modal.Body>

        <div className="flex justify-end gap-4 animate-pulse">
          <div className="h-10 w-44 bg-gray-300 rounded-full"></div>
          <div className="h-10 w-44 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </Modal>
  );
}

export default RestartModalSkeleton;
