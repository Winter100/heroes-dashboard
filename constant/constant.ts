export const revalidateTags = {
  enchantPreview: `enchants?category=ENCHANT`,
  enchantTable: `enchants/table`,
  enchantDetail: `enchants/name`,
  recipes: `items/recipe`,
  recipeDetail: `items/recipe/name`,
  recipeSSG: `items/recipe/ssg`,
  itemSetOption: `items/set-option`,
  raid: `raids/table`,
  raidDetail: `raids/name`,
  characterImage: `characters/image`,
  grind: 'items/grind',
} as const;

export type RevalidateTag =
  (typeof revalidateTags)[keyof typeof revalidateTags];
