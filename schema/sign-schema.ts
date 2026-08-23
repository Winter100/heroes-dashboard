import * as z from 'zod';

export const signinSchema = z.object({
  email: z.email('이메일을 입력해주세요').min(1, '최소 1'),
  password: z
    .string('비밀번호를 입력해주세요')
    .min(4, '최소 4자 이상')
    .max(20, '최대 20자 이하'),
});

export type SigninFormValues = z.infer<typeof signinSchema>;
