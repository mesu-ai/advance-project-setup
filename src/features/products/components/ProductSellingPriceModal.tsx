import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Modal from '@/components/organisms/Modal/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const priceModalSchema = z.object({
  sellingPrice: z.coerce
    .number<number>('Invalid price')
    .positive('Selling price must be positive')
    .optional(),
  startDate: z.iso.datetime({ local: true }),
  endDate: z.iso.datetime({ local: true }),
});

export type PriceFormData = z.infer<typeof priceModalSchema>;

interface SellingPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PriceFormData) => void;
  initialValues?: PriceFormData;
}

const ProductSellingPriceModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}: SellingPriceModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<PriceFormData>({
    resolver: zodResolver(priceModalSchema),
    defaultValues: initialValues ?? {},
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit((data) => {
      onSubmit(data);
      reset();
    })(e);
  };

  const handleClose = () => {
    reset(); // Reset form when closing
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Selling Price">
      <form onSubmit={handleFormSubmit} className="min-w-xl space-y-4">
        <Input
          label="Selling Price"
          placeholder="Enter Selling Price"
          error={errors.sellingPrice?.message}
          {...register('sellingPrice')}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            type="datetime-local"
            label="Start Date"
            placeholder="Select Selling Date"
            error={errors.startDate?.message}
            {...register('startDate')}
            required
          />
          <Input
            type="datetime-local"
            label="End Date"
            placeholder="Select Selling Date"
            error={errors.endDate?.message}
            {...register('endDate')}
            required
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button onClick={handleClose} variant="cancel">
            Cancel
          </Button>
          <Button type="submit" variant="save" disabled={isSubmitting}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductSellingPriceModal;
