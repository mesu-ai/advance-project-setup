interface SubmitLabelT {
  idle: string;
  submitting: string;
}

type SubmitModeT = 'create' | 'edit';

const sumbitLabelMap: Record<SubmitModeT, SubmitLabelT> = {
  create: {
    idle: 'Save',
    submitting: 'Saving...',
  },
  edit: {
    idle: 'Update',
    submitting: 'Updating...',
  },
};

export const submitLabel = (mode: SubmitModeT, isSubmitting: boolean) =>
  isSubmitting ? sumbitLabelMap[mode].submitting : sumbitLabelMap[mode].idle;
