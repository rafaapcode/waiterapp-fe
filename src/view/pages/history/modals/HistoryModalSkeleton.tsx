import Modal from "@/components/Modal";

interface HistoryModalSkeletonProps {
  isVisible: boolean;
}

function HistoryModalSkeleton({ isVisible }: HistoryModalSkeletonProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <Modal.Root size="sm" isVisible={isVisible}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-32 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
        </div>

        <div className="w-full flex flex-col gap-2 mt-8 animate-pulse">
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
          <div className="h-6 w-40 bg-gray-300 rounded mt-2"></div>
        </div>

        <Modal.Body className="w-full flex flex-col gap-6 mt-8">
          <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
          <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto">
            {Array.from({length: 3}).map((_, i) => (
              <div key={i} className="flex justify-between p-2 border border-gray-200 rounded-md animate-pulse">
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-300 rounded"></div>
                  <div className="flex flex-col gap-2">
                    <div className="h-5 w-32 bg-gray-300 rounded"></div>
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div className="h-6 w-16 bg-gray-300 rounded self-center"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center animate-pulse">
            <div className="h-4 w-12 bg-gray-300 rounded"></div>
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
          </div>
        </Modal.Body>

        <div className="flex justify-center mt-8 animate-pulse">
          <div className="h-10 w-40 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </Modal.Root>
  );
}

export default HistoryModalSkeleton;
