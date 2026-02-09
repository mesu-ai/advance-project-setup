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

interface ImageUploaderProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  label: string;
  error?: string;
  // value?: File | File[] | string;
  // onChange?: (file: File) => void;
}

const ImageUploader = ({
  label,
  error,
  required,
  className = '',
  ...props
}: ImageUploaderProps) => {
  const [images, setImages] = useState<string[]>([
    'https://prod.saraemart.com/uploads/images/7bff7f55-3c3d-4f16-a3db-8c7a9b88a160.png',
    'https://prod.saraemart.com/uploads/images/805af629-d328-49a5-a6a8-20dd871ccf3c.png',
    'https://prod.saraemart.com/uploads/images/3507850e-5962-477e-bc0e-563b84524e47.png',
    'https://prod.saraemart.com/uploads/images/4e1be5c4-4e12-4e15-9b42-b610a66a2fbe.jpeg',
    'https://prod.saraemart.com/uploads/images/c50863d4-739e-48fd-a5d0-c0e0951ab6a1.png',
    'https://prod.saraemart.com/uploads/images/e588323a-80ea-432b-bc51-a54eee0415b0.jpg',
    'https://prod.saraemart.com/uploads/images/fd8854f0-7763-477a-9db8-7a5c1b28ae65.png',
    'https://prod.saraemart.com/uploads/images/49a49fa0-1d8c-48be-afb3-dd4600234db3.jpg',
    'https://prod.saraemart.com/uploads/images/1119b24a-0cf6-4bee-9c3c-d41cf1270496.png',
    'https://prod.saraemart.com/uploads/images/7908fed7-6884-479b-96dc-3bebc87e24eb.webp',
    'https://prod.saraemart.com/uploads/images/17a61093-df3a-426c-afe7-c307f5e58a23.png',
    'https://prod.saraemart.com/uploads/images/73a08592-9c08-41c2-b135-f7302549d333.jpg',
    'https://prod.saraemart.com/uploads/images/e772b0a3-0c56-4389-96a0-dd7f27aabd3c.png',
    'https://prod.saraemart.com/uploads/images/97d457dd-9f88-4931-946b-4426f99a96ba.png',
    'https://prod.saraemart.com/uploads/images/472713ed-fd94-4411-9c84-31742b89aff6.jpg',
    'https://prod.saraemart.com/uploads/images/7bb9132f-5c6c-4805-8504-a05b9cd72e65.png',
    'https://prod.saraemart.com/uploads/images/28a808d6-aca4-4723-a85d-03b8c8dea460.png',
    'https://prod.saraemart.com/uploads/images/40804020-6a2f-41a3-b913-ed1a84be7881.png',
    'https://prod.saraemart.com/uploads/images/8d6ad608-6128-4900-8164-758cc1d5f6e7.png',
    'https://prod.saraemart.com/uploads/images/59a8f6c3-c30b-455e-abed-c41da643893d.jpeg',
    'https://prod.saraemart.com/uploads/images/4af5decd-6712-43a1-9ab4-d3e4ebbd08c9.png',
    'https://prod.saraemart.com/uploads/images/5838463d-9cd6-45b8-8e70-fecf4277e277.jpeg',
  ]);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const generatedId = useId();
  const isExternalFileDragRef = useRef(false);
  const dragItemRef = useRef<number | null>(null);
  const dragOverItemRef = useRef<number | null>(null);

  const [uploadImage, { isLoading: isUploading }] = useUploadFileMutation();
  const { handleApiError } = useApiError();

  // const fileName =
  //   value instanceof File ? value.name : typeof value === 'string' ? value.split('/').pop() : '';

  // console.log({ isDragOver, images });

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
      setImages((prev) => [...prev, newSrc]);
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

    if (!images || dragItemRef.current === null || dragOverItemRef.current === null) return;

    const newImages = [...images];
    const dragItem = newImages[dragItemRef.current];
    newImages.splice(dragItemRef.current, 1);
    newImages.splice(dragOverItemRef.current, 0, dragItem);

    dragItemRef.current = null;
    dragOverItemRef.current = null;
    setImages(newImages);
  };

  return (
    <div className={className}>
      <label className="input-label" htmlFor={generatedId}>
        {label} {required && <span className="text-danger-500">*</span>}
      </label>

      <div className="">
        <label
          htmlFor={generatedId}
          onDrop={handleUploadOnDrop}
          onDragOver={handleUploadDragOver}
          onDragLeave={handleUploadDragLeave}
          className={`min-h-[60px] input-field border-dashed flex items-center justify-center gap-4 ${isDragOver && 'border-primary-500 '}`}
        >
          <div className="relative flex flex-wrap items-center justify-center gap-4 pointer-events-none">
            <div
              className={`flex items-center justify-center gap-4 transition-opacity duration-300 ease-in-out ${isDragOver ? 'opacity-50' : 'opacity-100 pointer-events-auto'}`}
            >
              {images?.map((item, index) => (
                <div
                  key={index}
                  draggable={!isDragOver}
                  onDragStart={(e) => handleImageDragStart(e, index)}
                  onDragEnter={(e) => handleImageDragEnter(e, index)}
                  onDragEnd={handleImageDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className=" h-10 w-10 border border-white-700 rounded cursor-move flex justify-center items-center"
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

            <p className="w-10 h-10 bg-white-600 rounded flex justify-center items-center">
              <PlusIcon className="stroke-neutral-300" />
            </p>

            {isDragOver && (
              <p className="rounded-lg bg-primary-50/80 text-secondary-500 z-10 absolute inset-0 flex items-center justify-center">
                Drop Your Image Here
              </p>
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
            {images?.map((item, index) => (
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
