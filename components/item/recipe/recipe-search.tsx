import { FallbackImage } from '@/components/fallback-image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ItemRecipe } from '@/types/item-type';
import { Package, Plus, Search } from 'lucide-react';

type RecipeSearchProps = {
  search: string;
  disabled?: boolean;
  recipes: ItemRecipe[];
  onSearchChange: (value: string) => void;
  onAdd: (recipe: ItemRecipe) => void;
};

const RecipeSearch = ({
  search,
  disabled = false,
  recipes,
  onSearchChange,
  onAdd,
}: RecipeSearchProps) => {
  return (
    <section
      className='overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm'
      aria-labelledby='recipe-search-label'
    >
      <div className='space-y-4 border-b p-5 sm:p-6'>
        <div className='flex items-center justify-between gap-3'>
          <label
            id='recipe-search-label'
            htmlFor='recipe-search'
            className='text-base font-semibold'
          >
            재료 검색
          </label>
          <span className='rounded-full bg-muted px-2.5 py-1 text-xs tabular-nums text-muted-foreground'>
            {recipes.length}개
          </span>
        </div>
        <p className='text-sm text-muted-foreground'>
          필요한 아이템을 검색해 제작 재료로 추가해주세요.
        </p>
        <div className='relative'>
          <Search
            aria-hidden='true'
            className='pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground'
          />
          <Input
            id='recipe-search'
            type='search'
            className='h-11 rounded-xl bg-background/60 pl-10 dark:bg-background/40'
            placeholder='아이템 이름 또는 ID 검색'
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
      </div>
      <ul className='max-h-128 space-y-1 overflow-y-auto p-3 sm:p-4'>
        {recipes.map((recipe) => (
          <li
            key={recipe.id}
            className='flex items-center justify-between gap-3 rounded-xl border border-transparent p-3 transition-colors hover:border-border hover:bg-muted/50'
          >
            <div className='flex min-w-0 items-center gap-3'>
              <div className='relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-background/60'>
                {recipe.image ? (
                  <FallbackImage
                    className='size-7 object-contain'
                    src={recipe.image}
                    alt={recipe.name}
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
              <div className='min-w-0'>
                <p className='text-sm font-medium'>{recipe.name}</p>
                {recipe.level && (
                  <p className='mt-1 text-xs text-muted-foreground'>
                    {recipe.level}
                  </p>
                )}
              </div>
            </div>
            <Button
              type='button'
              disabled={disabled}
              variant='outline'
              size='sm'
              className='rounded-lg'
              aria-label={`${recipe.name} (${recipe.id}) 재료 추가`}
              onClick={() => onAdd(recipe)}
            >
              <Plus aria-hidden='true' />
              추가
            </Button>
          </li>
        ))}
        {recipes.length === 0 && (
          <li className='flex min-h-48 flex-col items-center justify-center gap-3 p-6 text-center'>
            <Search
              aria-hidden='true'
              className='size-7 text-muted-foreground/60'
            />
            <p className='text-sm text-muted-foreground'>
              선택할 수 있는 재료가 없습니다.
            </p>
          </li>
        )}
      </ul>
    </section>
  );
};

export default RecipeSearch;
