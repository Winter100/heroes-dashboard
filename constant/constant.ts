export const revalidateTags = {
  enchantTable: `enchants/table`,
  enchantDetail: `enchants/name`,
  recipes: `items/recipe`,
  recipeSSG: `items/recipe/ssg`,
  itemSetOption: `items/set-option`,
  raid: `raids/table`,
  raidDetail: `raids/name`,
  characterImage: `characters/image`,
} as const;

export type RevalidateTag =
  (typeof revalidateTags)[keyof typeof revalidateTags];
