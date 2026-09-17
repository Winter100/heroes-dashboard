import { revalidateTags } from '@/constant/constant';
import { apiClient, REVALIDATE } from '@/utils/api-client';

const revalidateOptions = {
  headers: { 'revalidate-secret': REVALIDATE },
};

export const revalidateApi = {
  enchant: async <T>() =>
    apiClient<T>(`/revalidate/${revalidateTags.enchant}`, revalidateOptions),
  itemSetOption: async () =>
    apiClient(
      `/revalidate/${revalidateTags.itemSetOption}`,
      revalidateOptions,
    ),
  characterImage: async <T>() =>
    apiClient<T>(
      `/revalidate/${revalidateTags.characterImage}`,
      revalidateOptions,
    ),
  recipes: async () =>
    apiClient(`/revalidate/${revalidateTags.recipes}`, revalidateOptions),
  recipeSSG: async () =>
    apiClient(`/revalidate/${revalidateTags.recipeSSG}`, revalidateOptions),
  raid: async () =>
    apiClient(`/revalidate/${revalidateTags.raid}`, revalidateOptions),
};
