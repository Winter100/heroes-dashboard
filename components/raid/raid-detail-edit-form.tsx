import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldLegend,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { useId } from 'react';
import { RaidEffectsFormValues, raidEffectsSchema } from '@/schema/raid-schema';

interface Stat {
  id: string;
  name: string;
}

interface RaidDetailEditFormProps {
  mode: 'ENTRY' | 'LIMIT';
  mutate: (mode: string, data: RaidEffectsFormValues) => void;
  defaultValues?: RaidEffectsFormValues;
  disabled?: boolean;
  stats: Stat[];
}

const RaidDetailEditForm = ({
  mode,
  mutate,
  defaultValues,
  disabled = false,
  stats,
}: RaidDetailEditFormProps) => {
  const formId = useId();
  const form = useForm<RaidEffectsFormValues>({
    resolver: zodResolver(raidEffectsSchema),
    defaultValues: defaultValues || {
      effects: [{ id: undefined, stat_value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'effects',
  });

  return (
    <Card className='w-full sm:max-w-xl'>
      <CardHeader>
        <CardTitle>{mode === 'ENTRY' ? '빠른전투' : '상한'}</CardTitle>
        <CardDescription>전투 컷을 설정해주세요</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id={formId}
          onSubmit={form.handleSubmit(
            (raidData) => mutate(mode, raidData),
            (errors) => console.error('유효성 검사 실패 목록:', errors),
          )}
          className='space-y-6'
        >
          {/* 스탯 (Effects) 동적 입력 필드 */}
          <FieldSet>
            <div className='flex items-center justify-between mb-2'>
              <FieldLegend variant='label'>스탯 효과</FieldLegend>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() => append({ id: 0, stat_value: '' })}
                disabled={disabled}
              >
                <Plus className='w-4 h-4 mr-1' /> 스탯 추가
              </Button>
            </div>

            <FieldGroup className='gap-3'>
              {fields.map((field, index) => (
                <div key={field.id} className='flex items-start gap-2'>
                  {/* 스탯 선택 (Select) */}
                  <div className='flex-1'>
                    <Controller
                      name={`effects.${index}.id`}
                      control={form.control}
                      render={({ field: selectField, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Select
                            disabled={disabled}
                            value={
                              selectField.value ? String(selectField.value) : ''
                            }
                            onValueChange={(val) =>
                              selectField.onChange(Number(val))
                            }
                          >
                            <SelectTrigger aria-invalid={fieldState.invalid}>
                              <SelectValue
                                placeholder='스탯 선택'
                                className='w-20'
                              >
                                {selectField.value
                                  ? stats.find(
                                      (stat) =>
                                        stat.id.toString() ===
                                        selectField.value.toString(),
                                    )?.name
                                  : '스탯 선택'}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {stats.map((stat) => (
                                <SelectItem key={stat.id} value={stat.id}>
                                  {stat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  {/* 수치 입력 (Input) */}
                  <div className='flex-1'>
                    <Controller
                      name={`effects.${index}.stat_value`}
                      control={form.control}
                      render={({ field: inputField, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Input
                            {...inputField}
                            type='number'
                            placeholder='수치 (예: 10)'
                            disabled={disabled}
                            onChange={(e) =>
                              inputField.onChange(String(e.target.value))
                            }
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  {/* 삭제 버튼 */}
                  <Button
                    type='button'
                    variant='destructive'
                    size='icon'
                    disabled={disabled || fields.length === 1}
                    onClick={() => remove(index)}
                  >
                    <Trash2 className='w-4 h-4' />
                  </Button>
                </div>
              ))}
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          disabled={disabled}
          type='submit'
          form={formId}
          className='w-full'
        >
          수정
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RaidDetailEditForm;
