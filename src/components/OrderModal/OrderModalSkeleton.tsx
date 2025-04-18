import Modal from "../Modal";

interface OrderModalSkeletonProps {
  visible: boolean;
}

function OrderModalSkeleton({ visible }: OrderModalSkeletonProps) {
  if (!visible) {
    return null;
  }

  return (
    <Modal.Root isVisible={visible} size="sm">
      <div className="p-6">

        <div className="flex items-center justify-between">
          <div className="h-8 w-32 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
        </div>


        <div className="mt-8 animate-pulse">
          <div className="h-4 w-32 bg-gray-300 rounded mb-3"></div>
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
            <div className="h-5 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>


        <div className="mt-8 animate-pulse">
          <div className="h-5 w-16 bg-gray-300 rounded mb-4"></div>
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex justify-between p-2 border border-gray-200 rounded-md">
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
        </div>


        <div className="flex justify-between items-center mt-6 animate-pulse">
          <div className="h-4 w-12 bg-gray-300 rounded"></div>
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
        </div>


        <div className="mt-8 flex flex-col gap-4 animate-pulse">
          <div className="h-12 w-full bg-gray-300 rounded-full"></div>
          <div className="h-12 w-full bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </Modal.Root>
  );
}

export default OrderModalSkeleton;
