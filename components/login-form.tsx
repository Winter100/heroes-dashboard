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
import { toast } from './ui/toast';
import { useLoginMutation } from '@/hooks/use-sign';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const loginMutation = useLoginMutation();
  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (signinData: SigninFormValues) => {
    const mutate = loginMutation.mutateAsync(signinData);
    toast.promise(mutate, {
      loading: `로그인 중...`,
      success: () => {
        return {
          type: 'success',
          title: '로그인 성공',
          description: '안녕하세요. 관리자님',
        };
      },
      error: (error) => {
        return {
          type: 'error',
          title: '로그인',
          description:
            error instanceof Error
              ? error.message
              : '처리 중 오류가 발생했습니다.',
        };
      },
    });
  };

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
          <form
            id='signin'
            onSubmit={form.handleSubmit(onSubmit, (errors) =>
              console.log('유효성 검사 실패 목록:', errors),
            )}
          >
            <FieldGroup>
              <Controller
                name='email'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='email'>이메일</FieldLabel>
                    <Input
                      disabled={loginMutation.isPending}
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
                      disabled={loginMutation.isPending}
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
            <Button
              disabled={loginMutation.isPending}
              form='signin'
              type='submit'
            >
              Login
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
