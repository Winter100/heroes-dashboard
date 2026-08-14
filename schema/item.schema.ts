import * as z from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const imageZ = z
  .instanceof(File, {
    message: '이미지를 선택해주세요.',
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: '이미지 크기는 5MB 이하만 가능합니다.',
  })
  .refine((file) => file.type.startsWith('image/'), {
    message: '이미지 파일만 업로드할 수 있습니다.',
  })
  .optional();

export const itemSchema = z.object({
  name: z
    .string('이름을 입력해주세요')
    .min(1, '이름을 입력해주세요')
    .max(20, '최대 20글자'),
  description: z
    .string('설명을 입력해주세요')
    .min(1, '설명을 입력해주세요')
    .optional(),
  categoryId: z
    .number('카테고리를 선택해주세요')
    .positive('카테고리를 선택해주세요'),

  tierId: z.number('등급을 선택해주세요').positive('카테고리를 선택해주세요'),

  image: imageZ,
});

export type ItemFormValues = z.infer<typeof itemSchema>;
