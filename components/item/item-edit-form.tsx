import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
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
import z from 'zod';

const ItemEditForm = ({
  mode,
  mutate,
  defaultValues,
  disabled = false,
  basicId,
}: {
  mode: 'create' | 'update';
  mutate: (data: ItemFormValues) => void;
  disabled: boolean;
  basicId: {
    category: { id: string; name: string }[];
    tier: { id: string; name: string }[];
    slot: { id: number; name: string; value: string }[];
  };
  defaultValues?: ItemStepType;
}) => {
  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      description: defaultValues?.description || '',
      categoryId: defaultValues?.category?.id || undefined,
      tierId: defaultValues?.tier?.id || undefined,
      slotId: defaultValues?.slot?.id || undefined,
    },
  });

  const categoryId = useWatch({
    control: form.control,
    name: 'categoryId',
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
                    value={field.value?.toString() ?? ''}
                    onValueChange={(val) => field.onChange(Number(val))}
                  >
                    <SelectTrigger
                      id='categoryId'
                      aria-invalid={fieldState.invalid}
                      className=''
                    >
                      <SelectValue placeholder='카테고리'>
                        {field.value
                          ? basicId.category.find(
                              (c) => Number(c.id) === Number(field.value),
                            )?.name
                          : '카테고리'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {basicId.category.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
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
            {categoryId === 1 && (
              <Controller
                name='slotId'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='slotId'>슬롯</FieldLabel>
                    <Select
                      disabled={disabled}
                      name={field.name}
                      value={field.value?.toString() ?? ''}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger
                        id='slotId'
                        aria-invalid={fieldState.invalid}
                        className=''
                      >
                        <SelectValue placeholder='슬롯'>
                          {field.value
                            ? basicId.slot.find(
                                (c) => Number(c.id) === Number(field.value),
                              )?.name
                            : '슬롯'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {basicId.slot.map((slot) => (
                          <SelectItem key={slot.id} value={slot.id}>
                            {slot.name}
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
            )}
            <Controller
              name='tierId'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='tierId'>등급</FieldLabel>
                  <Select
                    disabled={disabled}
                    name={field.name}
                    value={field.value?.toString() ?? ''}
                    onValueChange={(val) => field.onChange(Number(val))}
                  >
                    <SelectTrigger
                      id='tierId'
                      aria-invalid={fieldState.invalid}
                      className=''
                    >
                      <SelectValue placeholder='티어'>
                        {field.value
                          ? basicId.tier.find(
                              (t) => Number(t.id) === field.value,
                            )?.name
                          : '티어'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {basicId.tier.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.name}
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
