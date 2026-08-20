import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import z from 'zod';
import { RaidFormValues, raidSchema } from '@/schema/raid-schema';
import { RaidType } from '@/types/raid-type';
import { Plus } from 'lucide-react';

const RAID = {
  7: '아르드리',
  8: '오르나',
  9: '와드네',
  10: '에리우',
  11: '스페셜 전투',
  12: '시공간 왜곡',
  13: '결사대',
  14: '결사대 [헬]',
  15: '시즌3',
  16: '미분류',
};
// 레이드는 상수로 처리하기

// 기본 레이드 데이터 입력
const RaidEditForm = ({
  mode,
  mutate,
  defaultValues,
  disabled = false,
}: {
  mode: 'create' | 'update';
  mutate: (data: RaidFormValues) => void;
  disabled: boolean;
  defaultValues?: RaidType;
}) => {
  const form = useForm<RaidFormValues>({
    resolver: zodResolver(raidSchema),
    defaultValues: {
      raidId: defaultValues?.raidTitle.id || undefined,
      battle: defaultValues?.battle || '',
      boss: defaultValues?.battle || '',
      level: defaultValues?.level || 0,
    },
  });

  // const { fields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: 'effects',
  // });

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle>{mode === 'create' ? '등록' : '수정'}</CardTitle>
        <CardDescription>레이드를 입력해주세요</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id='form-enchant'
          onSubmit={form.handleSubmit(mutate, (errors) =>
            console.log('유효성 검사 실패 목록:', errors),
          )}
        >
          <FieldGroup>
            <Controller
              name='raidId'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='rankId'>레이드</FieldLabel>
                  <Select
                    disabled={disabled}
                    name={field.name}
                    value={field.value?.toString() ?? ''}
                    onValueChange={(val) => field.onChange(Number(val))}
                  >
                    <SelectTrigger
                      id='rankId'
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder='레이드'>
                        {field.value
                          ? RAID[field.value as keyof typeof RAID]
                          : '레이드'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(RAID).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              disabled={disabled}
              name='battle'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='battle'>전투</FieldLabel>
                  <Input
                    {...field}
                    id='battle'
                    aria-invalid={fieldState.invalid}
                    placeholder='전투'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              disabled={disabled}
              name='boss'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='boss'>보스</FieldLabel>
                  <Input
                    {...field}
                    id='boss'
                    aria-invalid={fieldState.invalid}
                    placeholder='보스'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              disabled={disabled}
              name='level'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='level'>레벨</FieldLabel>
                  <Input
                    {...field}
                    type='number'
                    id='level'
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => {
                      field.onChange(
                        e.target.value === ''
                          ? undefined
                          : Number(e.target.value),
                      );
                    }}
                    placeholder='레벨'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              disabled={disabled}
              name='image'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor='image'>이미지</FieldLabel>
                  <Input
                    disabled={disabled}
                    type='file'
                    id='image'
                    accept='image/*'
                    multiple={false}
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        field.onChange(file);
                      }
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />

                  {fieldState.error && (
                    <p className='text-sm text-destructive'>
                      {fieldState.error.message}
                    </p>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation='horizontal'>
          <Button
            disabled={disabled}
            type='submit'
            form='form-enchant'
            className='mx-auto'
          >
            {mode === 'create' ? '생성' : '수정'}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default RaidEditForm;
