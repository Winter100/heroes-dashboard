import * as z from 'zod';

export const enchantSchema = z.object({
  name: z
    .string('이름을 입력해주세요')
    .min(1, '이름을 입력해주세요')
    .max(20, '최대 20글자'),
  affixId: z.number('접사를 선택해주세요'),
  category: z.enum(['ENCHANT', 'INFUSION']),
  tierId: z.number(),
  rankId: z.number('랭크를 선택해주세요'),
});

export const enchantDetailSchema = z.object({
  slotsId: z
    .array(
      z.object({
        slotId: z.number().positive('슬롯을 선택해주세요'),
      }),
    )
    .superRefine((items, ctx) => {
      const seen = new Set<number>();

      items.forEach((item, index) => {
        if (seen.has(item.slotId)) {
          ctx.addIssue({
            code: 'custom',
            message: '이미 선택된 슬롯입니다.',
            path: [index, 'slotId'],
          });
        }
        seen.add(item.slotId);
      });
    }),
  effects: z
    .array(
      z.object({
        statId: z.number().min(1, '스탯을 선택해주세요'),
        value: z.string().optional(),
      }),
    )
    .superRefine((items, ctx) => {
      const seen = new Set<number>();

      items.forEach((item, index) => {
        if (seen.has(item.statId)) {
          ctx.addIssue({
            code: 'custom',
            message: '이미 추가된 스탯입니다.',
            path: [index, 'statId'],
          });
        }
        seen.add(item.statId);
      });
    }),
});

export type EnchantFormValues = z.infer<typeof enchantSchema>;
export type EnchantDetailFormValues = z.infer<typeof enchantDetailSchema>;
