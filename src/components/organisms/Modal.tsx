import CloseIcon from '@/assets/svg/CloseIcon';
import { useEffect, useState, type FC, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  title?: string;
  open: boolean;
  onOpen: (value: boolean) => void;
  children: ReactNode;
  className?: string;
}

const Modal: FC<ModalProps> = ({ title, open, onOpen, children, className = 'max-w-3xl' }) => {
  const [shouldRender, setShouldRender] = useState(open);
  const [isVisible, setVisible] = useState(false);

  const handleClose = () => onOpen(false);

  const handleBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onOpen(false);
  };

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const timeout = setTimeout(() => setShouldRender(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onOpen]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!shouldRender) return null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleBackdrop}
      className={`z-50 fixed inset-0 flex justify-center items-center transition-opacity duration-200 ${isVisible ? 'bg-black-500/70 opacity-100' : 'bg-black/0 opacity-0'}`}
    >
      <div
        className={`rounded-xl bg-surface transform transition-all duration-200 ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'} ${className}`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b border-border">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="close-modal"
            className="cursor-pointer text-danger-500 hover:text-danger-600"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="px-5 py-4 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
