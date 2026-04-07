import CloseIcon from '@/assets/svg/CloseIcon';

interface DrawerProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer = ({ isOpen, onClose, title, children }: DrawerProps) => {
  return (
    <div
      className={`z-30 fixed inset-0 transition-opacity duration-300 
        ${isOpen ? 'bg-black-500/70 opacity-100 pointer-events-auto' : 'bg-black/0 opacity-0 pointer-events-none'}`}
    >
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={`absolute top-0 right-0 h-full min-w-xs transform bg-white shadow-md transition-transform duration-400 ease-in  
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between px-5 py-4 border-b border-neutral-300">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="close-modal"
            className="cursor-pointer text-danger-500 hover:text-danger-600"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="px-5 py-4 h-[calc(100%-4rem)]">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
