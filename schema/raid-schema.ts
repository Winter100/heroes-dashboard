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

export const raidSchema = z.object({
  raidId: z.number(),
  battle: z
    .string('전투명을 입력해주세요')
    .min(1, '전투명을 입력해주세요')
    .max(20, '최대 20글자'),
  boss: z.string(),
  level: z.number().min(1),
  image: imageZ,
});

export const raidEffectsSchema = z.object({
  effects: z
    .array(
      z.object({
        id: z.number(),
        stat_value: z.string().min(1, '수치를 입력해주세요'),
      }),
    )
    .superRefine((items, ctx) => {
      const seen = new Set<number>();

      items.forEach((item, index) => {
        if (seen.has(item.id)) {
          ctx.addIssue({
            code: 'custom',
            message: '이미 추가된 스탯입니다.',
            path: [index, 'id'],
          });
        }
        seen.add(item.id);
      });
    }),
});

export type RaidFormValues = z.infer<typeof raidSchema>;
export type RaidEffectsFormValues = z.infer<typeof raidEffectsSchema>;
