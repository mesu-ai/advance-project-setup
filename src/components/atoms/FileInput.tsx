import CloseIcon from '@/assets/svg/CloseIcon';
import PlusIcon from '@/assets/svg/PlusIcon';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type DragEvent,
  type MouseEvent,
} from 'react';

interface FileInputProps extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'value' | 'onDrop'> {
  label?: string;
  value?: File | File[] | string;
  onDrop?: (file: File) => void;
  onRemove?: () => void;
  isPreview?: boolean;
  error?: string;
  errorSameRow?: string;
}

const FileInput = ({
  label,
  className = '',
  error,
  errorSameRow,
  value,
  isPreview = true,
  required,
  onDrop,
  onRemove,
  ...props
}: FileInputProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dragDepth = useRef(0);
  const generatedId = useId();

  const fileName =
    value instanceof File ? value.name : typeof value === 'string' ? value.split('/').pop() : '';

  const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (!onDrop) return;
    dragDepth.current += 1;
    setIsDragOver(true);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault(); // required to allow drop
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (!onDrop) return;
    dragDepth.current -= 1;
    if (dragDepth.current <= 0) {
      dragDepth.current = 0;
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    dragDepth.current = 0;
    setIsDragOver(false);
    const file = e.dataTransfer?.files[0];
    if (file && onDrop) onDrop(file);
  };

  const handleImageRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onRemove?.();
  };

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    if (typeof value === 'string') {
      setPreview(value);
    }
  }, [value]); // isPreview intentionally excluded

  const labelHeight = !isPreview
    ? 'min-h-[35.73px]'
    : errorSameRow || error
      ? 'h-[calc(100%-48px)]'
      : 'h-[calc(100%-28px)]';

  return (
    <div className={className}>
      <label className="input-label" htmlFor={generatedId}>
        {label} {required && <span className="text-danger-500">*</span>}
      </label>

      <label
        htmlFor={generatedId}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`${labelHeight} input-field flex items-center justify-center border-dashed ${
          isDragOver ? 'border-primary-500' : ''
        }`}
      >
        {isPreview ? (
          <div className="relative flex w-full items-center justify-center gap-x-2">
            {preview && (
              <div className="relative">
                <img src={preview} alt="preview" className="max-h-20 object-contain" />
                <button
                  type="button"
                  onClick={handleImageRemove}
                  aria-label="remove preview image"
                  className="cursor-pointer absolute top-0 right-0 text-danger-500 hover:text-danger-300"
                >
                  <CloseIcon />
                </button>
              </div>
            )}
            {!preview && !isDragOver && (
              <span className="flex h-10 w-10 items-center justify-center rounded bg-white-600">
                <PlusIcon className="stroke-neutral-300" />
              </span>
            )}
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-primary-50/85 text-secondary-500 transition-opacity ${
                isDragOver ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Drop your file here
            </span>
          </div>
        ) : (
          <p className="w-full truncate text-start text-sm font-medium text-neutral-500">
            Choose File: <span className="font-normal">{fileName || 'No file chosen'}</span>
          </p>
        )}

        <input id={generatedId} type="file" ref={inputRef} className="sr-only" {...props} />
      </label>

      {error && (
        <p id={`${generatedId}-error`} className="input-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileInput;
