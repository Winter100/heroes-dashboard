import * as z from 'zod';

export const BattleEnum = ['melee', 'ranged'] as const;
export const Gender = ['male', 'female'] as const;

export const characterSchema = z.object({
  id: z.number().optional(),
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
      if (!files || files.length === 0) {
        return true;
      }

      return files.length === 1;
    }, '이미지 파일은 1개만 업로드할 수 있습니다.'),
});

export type CharacterFormValues = z.infer<typeof characterSchema>;
