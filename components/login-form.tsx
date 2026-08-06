'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

/**
 * Todo
 * 1. 로그인 성공 시 /dashboard 페이지로 이동 되기
 * 2. 실패시 머물기
 * 3. 클라이언트에서 처리하기
 */

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();

  const onClick = (e: React.SubmitEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>망스비 대시보드</CardTitle>
          <CardDescription>
            게스트의 경우 수정 권한은 부여되지 않습니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onClick}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='email'>Email</FieldLabel>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  defaultValue='guest@guest.com'
                  required
                />
              </Field>
              <Field>
                <div className='flex items-center'>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                </div>
                <Input
                  id='password'
                  type='password'
                  defaultValue='guest1234'
                  required
                />
              </Field>
              <Field>
                <Button type='submit'>Login</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
