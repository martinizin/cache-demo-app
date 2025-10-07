import Modal from "@/components/Modal";
import Cart from "@/components/Cart";

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  ids: number[];
  onRemove: (id: number) => void;
  onClear: () => void;
}

const CartModal = ({ open, onClose, ids, onRemove, onClear }: CartModalProps) => {
  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title="Carrito de Compras"
    >
      <div className="-m-6 p-0">
        <Cart 
          ids={ids}
          onRemove={onRemove}
          onClear={onClear}
        />
      </div>
    </Modal>
  );
};

export default CartModal;