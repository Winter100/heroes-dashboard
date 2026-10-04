'use client';

import { cn } from '@/lib/utils';
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
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninFormValues, signinSchema } from '@/schema/sign-schema';

type Props = React.ComponentProps<'div'> & {
  handleSubmit: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
  isPending: boolean;
};

export function LoginForm({
  handleSubmit,
  isPending,
  className,
  ...props
}: Props) {
  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>망스비 대시보드</CardTitle>
          <CardDescription>
            테스트 유저의 경우 수정 권한은 부여되지 않습니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id='signin' onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <Controller
                name='email'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='email'>이메일</FieldLabel>
                    <Input
                      disabled={isPending}
                      {...field}
                      type='email'
                      id='email'
                      aria-invalid={fieldState.invalid}
                      placeholder='이메일'
                      autoComplete='off'
                      defaultValue='test@test.com'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name='password'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='password'>비밀번호</FieldLabel>
                    <Input
                      {...field}
                      disabled={isPending}
                      type='password'
                      id='password'
                      aria-invalid={fieldState.invalid}
                      placeholder='비밀번호'
                      autoComplete='off'
                      defaultValue='test'
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
        <CardFooter>
          <Field>
            <Button disabled={isPending} form='signin' type='submit'>
              Login
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
