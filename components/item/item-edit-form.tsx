import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ItemFormValues, itemSchema } from '@/schema/item.schema';
import { ItemStepType } from '@/types/item-type';
import { Textarea } from '../ui/textarea';

const CATEGORY = {
  1: '장비',
  2: '소모품',
  3: '재료',
  4: '인챈트',
  5: '기타',
};

const TIER = {
  1: '일반',
  2: '초급',
  3: '중급',
  4: '고급',
  5: '레어',
  6: '전설',
  7: '미분류',
};

const ItemEditForm = ({
  mode,
  mutate,
  defaultValues,
  disabled = false,
}: {
  mode: 'create' | 'update';
  mutate: (data: ItemFormValues) => void;
  defaultValues?: ItemStepType;
  disabled: boolean;
}) => {
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      description: defaultValues?.description || '',
      categoryId: defaultValues?.category.id || 0,
      tierId: defaultValues?.tier.id || 0,
    },
  });

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle>{mode === 'create' ? '등록' : '수정'}</CardTitle>
        <CardDescription>아이템을 입력해주세요</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id='form-character'
          onSubmit={form.handleSubmit(mutate, (errors) =>
            console.log('유효성 검사 실패 목록:', errors),
          )}
        >
          <FieldGroup>
            <Controller
              disabled={disabled}
              name='name'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='name'>아이템</FieldLabel>
                  <Input
                    {...field}
                    id='name'
                    aria-invalid={fieldState.invalid}
                    placeholder='아이템 이름'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='categoryId'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='categoryId'>카테고리</FieldLabel>
                  <Select
                    disabled={disabled}
                    name={field.name}
                    value={field.value ? String(field.value) : undefined}
                    onValueChange={(val) => field.onChange(Number(val))}
                  >
                    <SelectTrigger
                      id='categoryId'
                      aria-invalid={fieldState.invalid}
                      className=''
                    >
                      <SelectValue placeholder='카테고리'>
                        {field.value
                          ? CATEGORY[field.value as keyof typeof CATEGORY]
                          : '카테고리'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(CATEGORY).map(([key, value]) => (
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
              name='tierId'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='tierId'>등급</FieldLabel>
                  <Select
                    disabled={disabled}
                    name={field.name}
                    value={field.value ? String(field.value) : undefined}
                    onValueChange={(val) => field.onChange(Number(val))}
                  >
                    <SelectTrigger
                      id='tierId'
                      aria-invalid={fieldState.invalid}
                      className=''
                    >
                      <SelectValue placeholder='티어'>
                        {field.value
                          ? TIER[field.value as keyof typeof TIER]
                          : '티어'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(TIER).map(([key, value]) => (
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
            <Controller
              disabled={disabled}
              name='description'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-textarea'>설명</FieldLabel>
                  <Textarea
                    {...field}
                    id='form-textarea'
                    aria-invalid={fieldState.invalid}
                    placeholder='아이템 설명'
                    className='h-60 resize-none'
                  />
                  <FieldDescription>
                    인게임 아이템 설명을 그대로 입력해주세요.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
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
            form='form-character'
            className='mx-auto'
          >
            {mode === 'create' ? '생성' : '수정'}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default ItemEditForm;
