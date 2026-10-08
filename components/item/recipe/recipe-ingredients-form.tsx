import { FallbackImage } from '@/components/fallback-image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { SelectedRecipe } from '@/types/item-type';
import { CheckCircle2, Layers, Package, Plus, Trash2 } from 'lucide-react';
import type { FormEvent } from 'react';

type RecipeIngredientsFormProps = {
  recipes: SelectedRecipe[];
  created: boolean;
  isPending: boolean;
  onSubmit: (formData: FormData) => Promise<void>;
  onChange: () => void;
  onRemove: (recipeId: string) => void;
};

const RecipeIngredientsForm = ({
  recipes,
  created,
  isPending,
  onSubmit,
  onChange,
  onRemove,
}: RecipeIngredientsFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onSubmit(new FormData(event.currentTarget));
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={onChange}
      className='overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm'
    >
      <fieldset disabled={isPending} className='min-w-0 border-0 p-0'>
        <div className='space-y-2 border-b p-5 sm:p-6'>
          <div className='flex items-center justify-between gap-3'>
            <h2 className='text-base font-semibold'>선택한 재료</h2>
            <span className='rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium tabular-nums text-blue-700 dark:text-blue-300'>
              {recipes.length}개
            </span>
          </div>
          <p className='text-sm text-muted-foreground'>
            완성 아이템 제작에 필요한 수량을 입력해주세요.
          </p>
        </div>
        {recipes.length === 0 && (
          <div className='m-5 flex min-h-56 flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-muted/20 p-6 text-center'>
            <div className='flex size-12 items-center justify-center rounded-xl bg-muted'>
              <Layers
                aria-hidden='true'
                className='size-6 text-muted-foreground'
              />
            </div>
            <p className='text-sm font-medium'>아직 선택한 재료가 없습니다</p>
            <p className='text-xs text-muted-foreground'>
              검색 목록에서 재료를 하나 이상 추가해주세요.
            </p>
          </div>
        )}
        <ul className='space-y-3 p-5 empty:hidden sm:p-6'>
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              className='space-y-4 rounded-xl border bg-background/40 p-4'
            >
              <div className='flex items-start justify-between gap-3'>
                <div className='min-w-0 flex items-center gap-2'>
                  <div className='relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-background/60'>
                    {recipe?.image ? (
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
                  <p className='text-sm font-medium'>{recipe.name}</p>
                </div>

                <div className='ml-auto'>
                  <span className='text-xs text-muted-foreground mx-2 '>
                    x{' '}
                  </span>
                  <Input
                    className='h-10 w-28 rounded-lg bg-background text-right font-medium tabular-nums text-foreground'
                    name={recipe.id}
                    type='number'
                    min={1}
                    max={Number.MAX_SAFE_INTEGER}
                    step={1}
                    required
                    defaultValue={recipe.quantity}
                    aria-label={`${recipe.name} (${recipe.id}) 수량`}
                  />
                </div>

                <Button
                  type='button'
                  variant='ghost'
                  size='icon-sm'
                  className='text-muted-foreground hover:bg-destructive/10 hover:text-destructive'
                  aria-label={`${recipe.name} (${recipe.id}) 재료 삭제`}
                  onClick={() => onRemove(recipe.id)}
                >
                  <Trash2 aria-hidden='true' />
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <div className='space-y-3 border-t bg-muted/20 p-5 sm:p-6'>
          <Button
            type='submit'
            className='h-11 w-full rounded-xl'
            disabled={isPending || recipes.length === 0}
          >
            <Plus aria-hidden='true' />
            {isPending ? '등록 중...' : '레시피 생성'}
          </Button>
          <p
            role='status'
            className='flex min-h-5 items-center justify-center gap-2 text-center text-xs text-muted-foreground'
          >
            {created && (
              <>
                <CheckCircle2
                  aria-hidden='true'
                  className='size-4 shrink-0 text-emerald-600 dark:text-emerald-400'
                />
                레시피가 등록되었습니다.
              </>
            )}
          </p>
        </div>
      </fieldset>
    </form>
  );
};

export default RecipeIngredientsForm;
