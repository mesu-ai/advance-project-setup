import DeleteIcon from '@/assets/svg/DeleteIcon';
import Modal from '@/components/organisms/Modal/Modal';

interface ConfirmModalProps {
  title?: string;
  isOpen: boolean;
  onClose: (value: boolean) => void;
  onConfirm: () => void | Promise<void>;
}

const ConfirmModal = ({ title, isOpen, onClose, onConfirm }: ConfirmModalProps) => {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <div className="min-w-xs">
        <div className="flex justify-center items-center gap-4">
          <DeleteIcon />
          <p className="max-w-[186px] font-medium">
            Are you sure you want to deactivate this employee?
          </p>
        </div>
        <div className="mt-6 font-semibold text-sm flex justify-center gap-4">
          <button
            type="button"
            onClick={() => onClose(false)}
            className="cursor-pointer outline outline-neutral-300 hover:bg-slate-100 rounded-lg w-[132px] py-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer bg-danger-500 hover:bg-danger-600 rounded-lg w-[132px] py-2 text-white"
          >
            Deactivate
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
