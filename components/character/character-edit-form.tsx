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
  CharacterFormValues,
  characterSchema,
  Gender,
} from '@/schema/character.schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Character } from '@/types/character-type';
import { formatDate } from '@/lib/utils';

const CharacterEditForm = ({
  mode,
  mutate,
  defaultValues,
}: {
  mode: 'create' | 'update';
  mutate: (data: CharacterFormValues) => void;
  defaultValues?: Character;
}) => {
  const form = useForm<CharacterFormValues>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      releaseDate: formatDate(defaultValues?.releaseDate || new Date()),
      gender: defaultValues?.gender || 'female',
    },
  });

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle>{mode === 'create' ? '등록' : '수정'}</CardTitle>
        <CardDescription>캐릭터 직업 정보를 수정할 수 있습니다</CardDescription>
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
              name='name'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='name'>직업명</FieldLabel>
                  <Input
                    {...field}
                    id='name'
                    aria-invalid={fieldState.invalid}
                    placeholder='캐릭터 이름'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='gender'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='gender'>성별</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id='gender'
                      aria-invalid={fieldState.invalid}
                      className=''
                    >
                      <SelectValue placeholder='성별' />
                    </SelectTrigger>
                    <SelectContent>
                      {Gender.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
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
              name='releaseDate'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='releaseDate'>출시일</FieldLabel>
                  <Input
                    {...field}
                    type='date'
                    id='releaseDate'
                    aria-invalid={fieldState.invalid}
                    placeholder='yyyy-mm-dd'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='image'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor='image'>이미지</FieldLabel>

                  <Input
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
          <Button type='submit' form='form-character'>
            {mode === 'create' ? '생성' : '수정'}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default CharacterEditForm;
