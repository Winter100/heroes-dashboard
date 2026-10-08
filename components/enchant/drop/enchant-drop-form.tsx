'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useEnchantDropForm } from '@/hooks/enchant/use-enchant-drop-form';
import { Plus, Search, Swords, Trash2 } from 'lucide-react';
import type { FormEvent } from 'react';
import BattleSummary from './battle-summary';

const EnchantDropForm = ({ enchantId }: { enchantId: string }) => {
  const {
    search,
    setSearch,
    availableRaids,
    selectedRaids,
    created,
    isPending,
    validationError,
    selectBattle,
    removeBattle,
    handleSubmit,
  } = useEnchantDropForm(enchantId);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit();
  };

  return (
    <div className='mx-auto w-full max-w-6xl space-y-6 px-4 py-2 sm:px-6'>
      <header className='space-y-2'>
        <h1 className='text-xl font-semibold sm:text-2xl'>인챈트 드롭 등록</h1>
        <p className='text-sm text-muted-foreground'>
          인챈트가 드롭되는 배틀을 여러 개 선택할 수 있습니다.
        </p>
        <p className='break-all font-mono text-xs text-muted-foreground'>
          인챈트 ID: {enchantId}
        </p>
      </header>
      <div className='grid items-start gap-6 lg:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>배틀 검색</CardTitle>
            <CardDescription>드롭 장소로 등록할 배틀을 추가해주세요.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='relative'>
              <Search
                aria-hidden='true'
                className='pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground'
              />
              <Input
                id='battle-search'
                aria-label='배틀 이름 또는 ID 검색'
                type='search'
                className='h-11 rounded-xl bg-background/40 pl-10'
                placeholder='배틀 이름 또는 ID 검색'
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <ul className='max-h-128 space-y-1 overflow-y-auto'>
              {availableRaids.map((raid) => (
                <li
                  key={raid.id}
                  className='flex items-center justify-between gap-3 rounded-xl p-3 hover:bg-muted/50'
                >
                  <BattleSummary raid={raid} />
                  <Button
                    type='button'
                    disabled={isPending}
                    variant='outline'
                    size='sm'
                    aria-label={`${raid.battle} (${raid.id}) 추가`}
                    onClick={() => selectBattle(raid.id)}
                  >
                    <Plus aria-hidden='true' />
                    추가
                  </Button>
                </li>
              ))}
              {availableRaids.length === 0 && (
                <li className='p-6 text-center text-sm text-muted-foreground'>
                  선택할 수 있는 배틀이 없습니다.
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>선택한 배틀 ({selectedRaids.length})</CardTitle>
            <CardDescription>선택한 배틀을 확인하고 드롭 장소로 등록해주세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitForm} className='space-y-6'>
              {selectedRaids.length > 0 ? (
                <ul className='space-y-3'>
                  {selectedRaids.map((raid) => (
                    <li
                      key={raid.id}
                      className='flex items-center justify-between gap-3 rounded-xl border bg-background/40 p-3'
                    >
                      <BattleSummary raid={raid} />
                      <Button
                        type='button'
                        disabled={isPending}
                        variant='ghost'
                        size='icon-sm'
                        className='text-muted-foreground hover:bg-destructive/10 hover:text-destructive'
                        aria-label={`${raid.battle} (${raid.id}) 삭제`}
                        onClick={() => removeBattle(raid.id)}
                      >
                        <Trash2 aria-hidden='true' />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className='flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-muted/20 p-6'>
                  <Swords aria-hidden='true' className='size-7 text-muted-foreground' />
                  <p className='text-center text-sm text-muted-foreground'>
                    검색 목록에서 배틀을 하나 이상 추가해주세요.
                  </p>
                </div>
              )}
              <Button
                type='submit'
                className='h-11 w-full rounded-xl'
                disabled={isPending || selectedRaids.length === 0}
              >
                {isPending ? '등록 중...' : '드롭 등록'}
              </Button>
              {validationError && (
                <p role='alert' className='text-sm text-destructive'>{validationError}</p>
              )}
              <p role='status' className='min-h-5 text-center text-xs text-muted-foreground'>
                {created ? '인챈트 드롭이 등록되었습니다.' : ''}
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnchantDropForm;
