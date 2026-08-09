'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '../ui/button';
import { useState } from 'react';
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

type Props = {
  onSubmit: (
    data: z.infer<typeof characterSkillSchema>,
    mode: 'create' | 'update',
    optional?: () => void,
  ) => void;
  mode: 'create' | 'update';
  onCancel: () => void;
  defaultData?: CharacterSkillFormValues;
};

const ChracterEditSkill = ({
  defaultData,
  onSubmit,
  mode,
  onCancel,
}: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof characterSkillSchema>>({
    resolver: zodResolver(characterSkillSchema),
    defaultValues: {
      name: defaultData ? defaultData.name : '',
      description: defaultData ? defaultData.description : '',
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
    onSubmit(data, mode, onClickCancel);
  };

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader className='flex items-center justify-end gap-0'>
        <Button type='button' variant='secondary' onClick={onClickCancel}>
          취소
        </Button>
        <Button type='submit' variant='secondary' form='form-skill'>
          등록
        </Button>
      </CardHeader>
      <CardContent>
        <form id='form-skill' onSubmit={form.handleSubmit(onSubmtForm)}>
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
                        className='flex h-20 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed'
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

export default ChracterEditSkill;
