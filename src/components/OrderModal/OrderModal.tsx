import CloseIcon from "../../assets/images/close-icon.svg";

type OrderModalProps = {
  visible: boolean;
}

function OrderModal({visible}: OrderModalProps) {
  if(!visible) {
    return null;
  }

  return (
    <div className="fixed w-full h-full top-0 left-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-1/4 rounded-lg p-8">
        <header className="flex items-center justify-between">
          <strong className="text-2xl">Mesa 2</strong>
          <button type="button" className="leading-[0px]">
            <img src={CloseIcon} alt="close-icon" />
          </button>
        </header>
        <div className="mt-8">
          <small className="text-sm opacity-80">Status do pedido</small>
          <div className="flex gap-2 items-center mt-2">
            <span>🕛</span>
            <strong>Em espera</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderModal
