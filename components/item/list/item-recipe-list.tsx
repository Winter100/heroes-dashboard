'use client';

import { FallbackImage } from '@/components/fallback-image';
import DetailRevalidateButton from '@/components/common/detail-revalidate-button';
import { revalidateTags } from '@/constant/constant';
import RecipeIngredientsForm from '@/components/item/recipe/recipe-ingredients-form';
import RecipeSearch from '@/components/item/recipe/recipe-search';
import { useItemRecipeForm } from '@/hooks/item/use-item-recipe-form';
import { Hammer, Package } from 'lucide-react';

const ItemRecipeList = ({ stepId }: { stepId: string }) => {
  const {
    search,
    setSearch,
    selectedRecipes,
    availableRecipes,
    targetRecipe,
    created,
    isPending,
    addRecipe,
    removeRecipe,
    handleSubmit,
    resetCreated,
  } = useItemRecipeForm({ stepId });
  return (
    <div className='mx-auto w-full max-w-6xl space-y-6 px-4 py-2 sm:px-6'>
      <header className='space-y-5'>
        <div className='flex items-center gap-3'>
          <div className='flex size-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300'>
            <Hammer aria-hidden='true' className='size-5' />
          </div>
          <div>
            <h1 className='text-xl font-semibold tracking-tight sm:text-2xl'>
              제작 레시피 생성
            </h1>
            <p className='mt-1 text-sm text-muted-foreground'>
              제작에 사용할 재료와 수량을 구성해주세요.
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-3 rounded-2xl border bg-card p-5 text-card-foreground shadow-sm sm:flex-row sm:items-center sm:justify-between'>
          <div className='min-w-0 space-y-1'>
            <p className='text-xs font-medium text-muted-foreground'>
              완성 아이템
            </p>
            <div className='flex items-center gap-2'>
              <div className='relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-background/60'>
                {targetRecipe?.image ? (
                  <FallbackImage
                    className='size-7 object-contain'
                    src={targetRecipe.image}
                    alt={targetRecipe.name}
                    width={28}
                    height={28}
                  />
                ) : (
                  <Package
                    aria-hidden='true'
                    className='size-5 text-muted-foreground'
                  />
                )}
              </div>
              <p className='font-semibold'>{targetRecipe?.name}</p>
            </div>
          </div>
          <div className='flex shrink-0 flex-wrap items-center gap-3'>
            <span className='w-fit rounded-full border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground'>
              재료 선택 → 수량 입력 → 생성
            </span>
            {targetRecipe?.name && (
              <DetailRevalidateButton
                tag={revalidateTags.recipeDetail}
                id={targetRecipe.name}
                resourceName='레시피 갱신'
              />
            )}
          </div>
        </div>
      </header>
      <div className='grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]'>
        <RecipeSearch
          search={search}
          recipes={availableRecipes}
          onSearchChange={setSearch}
          onAdd={addRecipe}
          disabled={isPending}
        />
        <RecipeIngredientsForm
          recipes={selectedRecipes}
          created={created}
          isPending={isPending}
          onSubmit={handleSubmit}
          onChange={resetCreated}
          onRemove={removeRecipe}
        />
      </div>
    </div>
  );
};

export default ItemRecipeList;
