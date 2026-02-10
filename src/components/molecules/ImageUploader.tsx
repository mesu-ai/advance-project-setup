import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentPropsWithRef,
  type DragEvent,
} from 'react';

import PlusIcon from '@/assets/svg/PlusIcon';
import { useUploadFileMutation } from '@/store/api/endpoints/mediaEndpoints';
import Image from '../atoms/Image';
import toast from 'react-hot-toast';
import { MEDIA_BASE_URL } from '@/apis/config/baseURL';
import { useApiError } from '@/hooks/useApiError';

interface ImageUploaderProps extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'value'> {
  label: string;
  error?: string;
  value: string[];
  // onChangeImage: Dispatch<SetStateAction<string[]>>;
  onChangeImage: (images: string[] | ((prev: string[]) => string[])) => void;

  // value?: File | File[] | string;
  // onChange?: (file: File) => void;
}

const ImageUploader = ({
  label,
  error,
  required,
  className = '',
  value,
  onChangeImage,
  ...props
}: ImageUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const generatedId = useId();
  const isExternalFileDragRef = useRef(false);
  const dragItemRef = useRef<number | null>(null);
  const dragOverItemRef = useRef<number | null>(null);

  const [uploadImage, { isLoading: isUploading }] = useUploadFileMutation();
  const { handleApiError } = useApiError();

  // const fileName =
  //   value instanceof File ? value.name : typeof value === 'string' ? value.split('/').pop() : '';

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('files', file);

    try {
      const res = await uploadImage(formData).unwrap();
      if (!res.success || !res?.data?.files?.[0]) {
        return toast.error(res?.error || res?.message || 'Invalid upload response');
      }
      const uplodedFile = res.data.files[0];
      const newSrc = `${MEDIA_BASE_URL}${uplodedFile.path}`;
      onChangeImage((prev) => [...prev, newSrc]);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleUploadDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer?.types?.includes('Files')) {
      isExternalFileDragRef.current = true;

      if (!isDragOver) setIsDragOver(true);
      console.log('upload drag over', 'isDragOver:', isDragOver);
    }
  };

  const handleUploadDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isExternalFileDragRef.current) return;

    const related = e.relatedTarget as Node | null;
    if (e.currentTarget.contains(related)) return;
    isExternalFileDragRef.current = false;
    setIsDragOver(false);
    console.log('upload drag leave', 'isDragOver:', isDragOver);
  };

  const handleUploadOnDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    isExternalFileDragRef.current = false;
    setIsDragOver(false);

    console.log('upload drag drop');

    if (e.dataTransfer?.types?.includes('Files')) {
      const files = Array.from(e.dataTransfer?.files ?? []);
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
      } else {
        toast.error('Please upload a valid file');
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !file.type.startsWith('image/')) {
      return toast.error('Please upload a valid file');
    }

    handleImageUpload(file);
  };

  const handleImageDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation();

    e.dataTransfer.setData('application/x-internal-image', 'true');
    e.dataTransfer.effectAllowed = 'move';

    dragItemRef.current = index;
    console.log('image internat drag start');
  };

  const handleImageDragEnter = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation();

    if (!e.dataTransfer.types.includes('application/x-internal-image')) {
      return;
    }

    dragOverItemRef.current = index;
    console.log('image internat drag enter');
  };

  const handleImageDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('image internat drag end');

    if (!value || dragItemRef.current === null || dragOverItemRef.current === null) return;

    const newImages = [...value];
    const dragItem = newImages[dragItemRef.current];
    newImages.splice(dragItemRef.current, 1);
    newImages.splice(dragOverItemRef.current, 0, dragItem);

    dragItemRef.current = null;
    dragOverItemRef.current = null;
    onChangeImage(newImages);
  };

  return (
    <div className={className}>
      <label className="input-label" htmlFor={generatedId}>
        {label} {required && <span className="text-danger-500">*</span>}
      </label>

      <div>
        <label
          htmlFor={generatedId}
          onDrop={handleUploadOnDrop}
          onDragOver={handleUploadDragOver}
          onDragLeave={handleUploadDragLeave}
          className={`min-h-[60px] input-field border-dashed flex items-center justify-center gap-4 ${isDragOver && 'border-primary-500 '}`}
        >
          <div className="w-full relative flex flex-wrap items-center justify-center gap-4">
            <div
              className={`flex items-center justify-center gap-4 transition-opacity duration-300 ease-in-out ${isDragOver ? 'opacity-50' : 'opacity-100 pointer-events-auto'}`}
            >
              {value?.map((item, index) => (
                <div
                  key={index}
                  draggable={!isDragOver}
                  onDragStart={(e) => handleImageDragStart(e, index)}
                  onDragEnter={(e) => handleImageDragEnter(e, index)}
                  onDragEnd={handleImageDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className="size-10 border border-white-700 rounded cursor-move grid place-items-center"
                >
                  <Image
                    src={item}
                    alt={`preview-image-${index}`}
                    className="rounded aspect-square"
                  />
                </div>
              ))}
              {isUploading && (
                <div
                  role="status"
                  aria-label="Uploading"
                  className="size-10 grid place-items-center"
                >
                  <div className="animate-spin size-5 border-t border-r border-secondary-500 rounded-full" />
                </div>
              )}
            </div>

            <p className="size-10 bg-white-600 rounded grid place-items-center">
              <PlusIcon className="stroke-neutral-300" />
            </p>

            {isDragOver && (
              <div className="pointer-events-none rounded-lg bg-primary-50/80 text-secondary-500 z-10 absolute inset-0 flex items-center justify-center">
                Drop Your Image Here
              </div>
            )}
          </div>

          <input
            type="file"
            id={generatedId}
            className="hidden"
            onChange={handleChange}
            {...props}
          />
        </label>

        {/* <div className="absolute inset-0 flex items-center justify-center gap-x-4 pointer-events-none">
          <div
            className={`flex items-center justify-center gap-x-4 transition-opacity duration-300 ease-in-out ${isDragOver ? 'opacity-50' : 'opacity-100 pointer-events-auto'}`}
          >
            {value?.map((item, index) => (
              <div
                key={index}
                draggable={!isDragOver}
                onDragStart={(e) => handleImageDragStart(e, index)}
                onDragEnter={(e) => handleImageDragEnter(e, index)}
                onDragEnd={handleImageDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className="shrink-0 h-10 w-10 border border-white-700 rounded cursor-move flex justify-center items-center"
              >
                <Image
                  src={item}
                  alt={`preview-image-${index}`}
                  className="rounded aspect-square"
                />
              </div>
            ))}
            {isUploading && (
              <div className="w-10 h-10 flex justify-center items-center">
                <div className="animate-spin w-5 h-5 border-t border-secondary-500 rounded-full" />
              </div>
            )}
          </div>

          <span className="w-10 h-10 bg-white-600 rounded flex justify-center items-center">
            <PlusIcon className="stroke-neutral-300" />
          </span>

          {isDragOver && (
            <span className="rounded-lg bg-primary-50/80 text-secondary-500 z-10 absolute inset-0 flex items-center justify-center">
              Drop Your Image Here
            </span>
          )}
        </div> */}
      </div>

      {error && (
        <p id={`${generatedId}-error`} className="input-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
