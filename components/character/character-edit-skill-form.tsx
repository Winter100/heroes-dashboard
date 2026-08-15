'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '../ui/button';
import { useId, useState } from 'react';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import {
  CharacterSkillFormValues,
  characterSkillSchema,
} from '@/schema/character.schema';
import { Textarea } from '../ui/textarea';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  mode: 'create' | 'update';
  disabled: boolean;
  onSubmit: (data: CharacterSkillFormValues, optional?: () => void) => void;
  onCancel: () => void;
  defaultValues?: CharacterSkillFormValues;
};

const CharacterEditSkillForm = ({
  mode,
  disabled = false,
  onSubmit,
  onCancel,
  defaultValues,
}: Props) => {
  const formId = useId();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<CharacterSkillFormValues>({
    resolver: zodResolver(characterSkillSchema),
    defaultValues: {
      name: defaultValues ? defaultValues.name : '',
      description: defaultValues ? defaultValues.description : '',
    },
  });

  const onClickCancel = () => {
    if (mode === 'create') {
      form.reset();
    } else {
      onCancel();
    }
  };

  const onSubmtForm = (data: z.infer<typeof characterSkillSchema>) => {
    onSubmit(data, onClickCancel);
  };

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader className='flex items-center justify-end gap-0'>
        <Button
          disabled={disabled}
          type='button'
          variant='secondary'
          onClick={onClickCancel}
        >
          취소
        </Button>
        <Button
          disabled={disabled}
          type='submit'
          variant='secondary'
          form={formId}
        >
          등록
        </Button>
      </CardHeader>
      <CardContent>
        <form id={formId} onSubmit={form.handleSubmit(onSubmtForm)}>
          <FieldGroup>
            <div className='flex items-center gap-2'>
              <div className='w-40'>
                <Controller
                  name='image'
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <label
                        htmlFor='picture'
                        className={cn(
                          'flex h-20 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed',
                        )}
                      >
                        {preview ? (
                          <Image
                            src={preview}
                            alt='이미지 미리보기'
                            fill
                            className='object-cover'
                          />
                        ) : (
                          <span className='text-2xl  block text-muted-foreground'>
                            +
                          </span>
                        )}
                      </label>
                      <Input
                        disabled={disabled}
                        id='picture'
                        type='file'
                        accept='image/*'
                        className='hidden'
                        onChange={(event) => {
                          const file = event.target.files?.[0];

                          if (!file) {
                            return;
                          }

                          field.onChange(file);

                          const previewUrl = URL.createObjectURL(file);
                          setPreview(previewUrl);
                        }}
                      />
                    </Field>
                  )}
                />
              </div>

              <Controller
                disabled={disabled}
                name='name'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='form-title'>스킬명</FieldLabel>
                    <Input
                      {...field}
                      id='form-title'
                      aria-invalid={fieldState.invalid}
                      placeholder='스킬명'
                      autoComplete='off'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              disabled={disabled}
              name='description'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form--textarea'>스킬 설명</FieldLabel>
                  <Textarea
                    {...field}
                    id='form--textarea'
                    aria-invalid={fieldState.invalid}
                    placeholder='스킬 설명'
                    className='h-72 resize-none'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default CharacterEditSkillForm;
