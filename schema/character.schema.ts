import * as z from 'zod';

export const BattleEnum = ['melee', 'ranged'] as const;
export const Gender = ['male', 'female'] as const;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];

export const characterSchema = z.object({
  name: z
    .string('직업을 입력해주세요')
    .min(1, '최소 1글자')
    .max(20, '최대 20글자'),
  gender: z.enum(Gender, '성별이 필요합니다'),
  releaseDate: z.string('출시일이 필요합니다'),
  image: z
    .any()
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return files.length === 1;
    }, '이미지 파일은 1개만 업로드할 수 있습니다.')
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return files[0] instanceof File;
    }, '올바른 파일이 아닙니다.')
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return ACCEPTED_IMAGE_TYPES.includes(files[0]?.type);
    }, '이미지 파일(jpg, png, webp, gif)만 업로드할 수 있습니다.')
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return files[0]?.size <= MAX_FILE_SIZE;
    }, '이미지 파일은 5MB 이하만 업로드할 수 있습니다.'),
});

export type CharacterFormValues = z.infer<typeof characterSchema>;
