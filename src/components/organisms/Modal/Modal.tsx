import CloseIcon from '@/assets/svg/CloseIcon';
import { useEffect, useRef, useState, type FC, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose: (value: boolean) => void;
  children: ReactNode;
  className?: string;
}

const Modal: FC<ModalProps> = ({ title, isOpen, onClose, children, className = 'max-w-3xl' }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setVisible] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => onClose(false);

  const handleBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => setVisible(true));
      window.history.pushState(null, '');
    } else {
      setVisible(false);
      const timeout = setTimeout(() => setShouldRender(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handlePopstate = () => {
      if (isOpen) onClose(false);
    };
    window.addEventListener('popstate', handlePopstate);

    return () => window.removeEventListener('popstate', handlePopstate);
  }, [isOpen, onClose]);

  useEffect(() => {
    const body = document.body;
    const scrollbarWidth = window.innerWidth - body.clientWidth;

    if (isOpen) {
      body.style.overflowY = 'hidden';
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      body.style.overflowY = 'auto';
      body.style.paddingRight = '0';
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleBackdrop}
      className={`z-50 fixed inset-0 flex justify-center items-center transition-opacity duration-200 ${isVisible ? 'bg-black-500/70 opacity-100' : 'bg-black/0 opacity-0'}`}
    >
      <div
        ref={modalRef}
        className={`rounded-xl bg-surface transform transition-all duration-200 ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'} ${className}`}
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
