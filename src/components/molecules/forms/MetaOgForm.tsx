import Checkbox from '@/components/atoms/Checkbox';
import ComboBox from '@/components/atoms/ComboBox';
import FileInput from '@/components/atoms/FileInput';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import { useState, type ChangeEvent } from 'react';
import {
  Controller,
  useFormContext,
  useFormState,
  type FieldPath,
  type FieldPathValue,
  type FieldValues,
} from 'react-hook-form';

type OgTypeOptionT = {
  label: string;
  value: string;
};

export interface MetaOgFieldNamesT<T extends FieldValues> {
  metaTitle: FieldPath<T>;
  metaDescription: FieldPath<T>;
  metaKeywords: FieldPath<T>;
  ogType: FieldPath<T>;
  ogTitle: FieldPath<T>;
  ogUrl: FieldPath<T>;
  ogDescription: FieldPath<T>;
  ogImage?: FieldPath<T>;
  urlSourceForOg?: FieldPath<T>;
}

interface MetaOgFormProps<T extends FieldValues> {
  fieldNames: MetaOgFieldNamesT<T>;
  ogTypeOptions?: OgTypeOptionT[];
  sameAsChecked?: boolean;
  onSameAsCheckedChange?: (checked: boolean) => void;
}

const defaultOgTypeOptions: OgTypeOptionT[] = [
  { label: 'Product', value: 'product' },
  { label: 'Blog', value: 'blog' },
  { label: 'Content', value: 'content' },
  { label: 'Career', value: 'career' },
  { label: 'Seller', value: 'seller' },
];

const getErrorMessage = <T extends FieldValues>(
  errors: Partial<Record<string, unknown>>,
  fieldPath: FieldPath<T> | undefined
): string | undefined => {
  if (!fieldPath) return undefined;

  const pathParts = String(fieldPath).split('.');
  let current: unknown = errors;

  for (const part of pathParts) {
    if (typeof current !== 'object' || current === null || !(part in current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  if (typeof current === 'object' && current !== null && 'message' in current) {
    const message = (current as { message?: unknown }).message;
    return typeof message === 'string' ? message : undefined;
  }

  return undefined;
};

const MetaOgForm = <T extends FieldValues>({
  // register,
  // control,
  // errors,
  // getValues,
  // setValue,
  fieldNames,
  ogTypeOptions = defaultOgTypeOptions,
  sameAsChecked,
  onSameAsCheckedChange,
}: MetaOgFormProps<T>) => {
  const [internalSameAsChecked, setInternalSameAsChecked] = useState(false);
  const isOgSameAsMeta = sameAsChecked ?? internalSameAsChecked;

  //   const context = useFormContext<T>();

  //   if (!context) {
  //     throw new Error(
  //       '[MetaOgForm] Must be rendered inside a <FormProvider>. ' +
  //         'Wrap your parent form with <FormProvider {...form}>.'
  //     );
  //   }

  //   const { register, control, getValues, setValue } = context;

  const { register, control, setValue, getValues } = useFormContext<T>();

  const { errors } = useFormState({
    control,
    name: Object.values(fieldNames).filter(Boolean) as FieldPath<T>[],
  });

  const setSameAsChecked = (checked: boolean) => {
    if (sameAsChecked === undefined) {
      setInternalSameAsChecked(checked);
    }

    onSameAsCheckedChange?.(checked);
  };

  const copyFieldValue = <
    SourceFieldPath extends FieldPath<T>,
    TargetFieldPath extends FieldPath<T>,
  >(
    sourcePath: SourceFieldPath,
    targetPath: TargetFieldPath
  ) => {
    setValue(targetPath, getValues(sourcePath) as FieldPathValue<T, TargetFieldPath>, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleSameAsMeta = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSameAsChecked(isChecked);

    if (!isChecked) {
      return;
    }

    copyFieldValue(fieldNames.metaTitle, fieldNames.ogTitle);
    copyFieldValue(fieldNames.metaDescription, fieldNames.ogDescription);

    if (fieldNames.urlSourceForOg) {
      copyFieldValue(fieldNames.urlSourceForOg, fieldNames.ogUrl);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        label="Meta Title"
        placeholder="Enter Meta Title"
        error={getErrorMessage(errors, fieldNames.metaTitle)}
        {...register(fieldNames.metaTitle)}
      />
      <div className="grid grid-cols-2 gap-3">
        <TextArea
          label="Meta Description"
          placeholder="Enter Meta Description"
          error={getErrorMessage(errors, fieldNames.metaDescription)}
          {...register(fieldNames.metaDescription)}
        />
        <TextArea
          label="Meta Keywords"
          placeholder="Enter Meta Keywords"
          required={false}
          error={getErrorMessage(errors, fieldNames.metaKeywords)}
          {...register(fieldNames.metaKeywords)}
        />
      </div>

      <div>
        <p className="input-label mb-1">OG Same As Meta?</p>
        <Checkbox label="Yes" checked={isOgSameAsMeta} onChange={handleSameAsMeta} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Controller
          name={fieldNames.ogType}
          control={control}
          render={({ field }) => (
            <ComboBox
              label="OG Type"
              options={ogTypeOptions}
              optionKeys={{ label: 'label', value: 'value' }}
              placeholder="Select og type"
              error={getErrorMessage(errors, fieldNames.ogType)}
              {...field}
            />
          )}
        />
        <Input
          label="OG Title"
          placeholder="Enter OG Title"
          error={getErrorMessage(errors, fieldNames.ogTitle)}
          {...register(fieldNames.ogTitle)}
        />
        <Input
          label="OG Url"
          placeholder="Enter OG Url"
          error={getErrorMessage(errors, fieldNames.ogUrl)}
          {...register(fieldNames.ogUrl)}
        />
      </div>

      <div className={fieldNames.ogImage ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-1 gap-3'}>
        <TextArea
          label="OG Description"
          placeholder="Enter OG Description"
          error={getErrorMessage(errors, fieldNames.ogDescription)}
          {...register(fieldNames.ogDescription)}
        />
        {fieldNames.ogImage && (
          <Controller
            name={fieldNames.ogImage}
            control={control}
            render={({ field: { value, onChange } }) => (
              <FileInput
                label="OG Image"
                error={getErrorMessage(errors, fieldNames.ogImage as FieldPath<T>)}
                errorSameRow={getErrorMessage(errors, fieldNames.ogDescription)}
                accept="image/png,image/jpeg"
                // value={
                //   value instanceof File || Array.isArray(value) || typeof value === 'string'
                //     ? value
                //     : undefined
                // }
                value={value}
                className="row-span-1"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onChange(file);
                }}
                onDrop={(file) => onChange(file)}
              />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default MetaOgForm;
