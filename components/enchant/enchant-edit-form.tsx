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
import z from 'zod';
import { EnchantFormValues, enchantSchema } from '@/schema/enchant-schema';
import { EnchantType } from '@/types/enchant-type';

const AFFIX = { 1: '접두', 2: '접미' };
const RANK = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 'A' };

const EnchantEditForm = ({
  mode,
  mutate,
  defaultValues,
  disabled = false,
}: {
  mode: 'create' | 'update';
  mutate: (data: EnchantFormValues) => void;
  disabled: boolean;
  defaultValues?: EnchantType;
}) => {
  const form = useForm<z.infer<typeof enchantSchema>>({
    resolver: zodResolver(enchantSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      category: 'ENCHANT',
      tierId: 2,
      affixId: defaultValues?.affixId || undefined,
      rankId: defaultValues?.rankId || undefined,
    },
  });

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle>{mode === 'create' ? '등록' : '수정'}</CardTitle>
        <CardDescription>인챈트를 입력해주세요</CardDescription>
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
              name='affixId'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='affixId'>접사</FieldLabel>
                  <Select
                    disabled={disabled}
                    name={field.name}
                    value={field.value?.toString() ?? ''}
                    onValueChange={(val) => field.onChange(Number(val))}
                  >
                    <SelectTrigger
                      id='affixId'
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder='접사'>
                        {field.value
                          ? AFFIX[field.value as keyof typeof AFFIX]
                          : '접사'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(AFFIX).map(([key, value]) => (
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
              name='rankId'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='rankId'>랭크</FieldLabel>
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
                      <SelectValue placeholder='랭크'>
                        {field.value
                          ? RANK[field.value as keyof typeof RANK]
                          : '랭크'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(RANK).map(([key, value]) => (
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

export default EnchantEditForm;
