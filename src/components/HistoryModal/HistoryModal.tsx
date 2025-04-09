import Modal from "../Modal";

function HistoryModal() {
  return (
    <Modal.Root size="sm" isVisible>
      <Modal.Header onClose={() => {}}>
        <p className="text-2xl font-semibold text-[#333333]">Mesa 2</p>
      </Modal.Header>

      <Modal.Body className="mb-8">
        <div className="w-full flex flex-col gap-2 mt-8">
          <p className="text-sm text-[#333333]">Data do pedido</p>
          <p className="text-[#333333] font-semibold">07/12/2022</p>
        </div>

        <div className="w-full flex flex-col gap-6 h-full mt-8">
          <p className="text-sm text-[#333333]">Itens</p>
          <div className="max-h-full overflow-y-auto">cards</div>
          <footer className="flex justify-between items-center">
            <p className="text-sm text-[#333333]">Total</p>
            <p className="text-[#333333] font-semibold">R$ 120,00</p>
          </footer>
        </div>
      </Modal.Body>

      <Modal.CustomFooter>
        <button className="text-[#D73035] font-semibold">
          Excluir Registro
        </button>
      </Modal.CustomFooter>
    </Modal.Root>
  );
}

export default HistoryModal;
