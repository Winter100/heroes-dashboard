import { useRecipesData } from '@/hooks/item/use-item';
import { useAdminCreateStepRecipe } from '@/hooks/item/use-admin-item';
import type { ItemRecipe, SelectedRecipe } from '@/types/item-type';
import { useState } from 'react';

export const useItemRecipeForm = ({ stepId }: { stepId: string }) => {
  const { recipes, stepRecipe } = useRecipesData(stepId);
  const { onCreateStepRecipe, isPending } = useAdminCreateStepRecipe(stepId);
  const [search, setSearch] = useState<string>('');
  const [selectedRecipes, setSelectedRecipes] = useState<SelectedRecipe[]>(() =>
    (stepRecipe?.materials ?? []).map((material) => ({
      id: material.materialId,
      name: material.name,
      image: material.image,
      quantity: material.quantity,
    })),
  );
  const [created, setCreated] = useState<boolean>(false);
  const searchTerm = search.trim().toLocaleLowerCase();
  const availableRecipes = recipes.filter(
    (recipe) =>
      recipe.id !== stepId &&
      !selectedRecipes.some((selected) => selected.id === recipe.id) &&
      (recipe.name.toLocaleLowerCase().includes(searchTerm) ||
        recipe.id.toLocaleLowerCase().includes(searchTerm)),
  );
  const targetRecipe = recipes.find((recipe) => recipe.id === stepId);

  const handleSubmit = async (formData: FormData): Promise<void> => {
    if (isPending || selectedRecipes.length === 0) return;

    const recipes = selectedRecipes.map((recipe) => ({
      stepId: recipe.id,
      quantity: Number(formData.get(recipe.id)),
    }));
    const hasValidQuantities = recipes.every(
      ({ quantity }) => Number.isSafeInteger(quantity) && quantity > 0,
    );
    if (!hasValidQuantities) return;
    setCreated(false);
    try {
      await onCreateStepRecipe(recipes);
      setCreated(true);
    } catch {
      setCreated(false);
    }
  };

  const addRecipe = (recipe: ItemRecipe) => {
    if (isPending) return;
    setSelectedRecipes((previous) =>
      previous.some((selected) => selected.id === recipe.id)
        ? previous
        : [...previous, { ...recipe, quantity: 1 }],
    );
    setCreated(false);
  };

  const removeRecipe = (recipeId: string) => {
    if (isPending) return;
    setSelectedRecipes((previous) =>
      previous.filter((recipe) => recipe.id !== recipeId),
    );
    setCreated(false);
  };

  const resetCreated = () => setCreated(false);

  return {
    stepRecipe,
    isPending,
    search,
    setSearch,
    selectedRecipes,
    availableRecipes,
    targetRecipe,
    created,
    addRecipe,
    removeRecipe,
    handleSubmit,
    resetCreated,
  };
};
