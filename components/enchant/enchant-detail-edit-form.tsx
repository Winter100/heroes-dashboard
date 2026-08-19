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
import {
  EnchantDetailFormValues,
  enchantDetailSchema,
} from '@/schema/enchant-schema';

interface Stat {
  id: string;
  name: string;
}

interface ItemStepEditFormProps {
  mode: 'create' | 'update';
  mutate: (data: EnchantDetailFormValues) => void;
  defaultValues?: EnchantDetailFormValues;
  disabled?: boolean;
  stats: Stat[];
  slots: { id: number; name: string; value: string }[];
}

const EnchantDetailEditForm = ({
  mode,
  mutate,
  defaultValues,
  disabled = false,
  stats,
  slots,
}: ItemStepEditFormProps) => {
  const formId = useId();
  const form = useForm<EnchantDetailFormValues>({
    resolver: zodResolver(enchantDetailSchema),
    defaultValues: defaultValues || {
      slotsId: [{ slotId: undefined }],
      effects: [{ statId: undefined, value: undefined }],
    },
  });

  const {
    fields: slotsFields,
    append: slotsAppend,
    remove: slotsRemove,
  } = useFieldArray({
    control: form.control,
    name: 'slotsId',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'effects',
  });

  return (
    <Card className='w-full sm:max-w-xl'>
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? '인챈트 등록' : '인챈트 수정'}
        </CardTitle>
        <CardDescription>인챈트 수치를 설정해주세요.</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id={formId}
          onSubmit={form.handleSubmit(mutate, (errors) =>
            console.error('유효성 검사 실패 목록:', errors),
          )}
          className='space-y-6'
        >
          {/* 슬롯 입력 필드 */}
          <FieldSet>
            <div className='flex items-center justify-between mb-2'>
              <FieldLegend variant='label'>슬롯</FieldLegend>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() => slotsAppend({ slotId: 0 })}
                disabled={disabled}
              >
                <Plus className='w-4 h-4 mr-1' /> 슬롯 추가
              </Button>
            </div>

            <FieldGroup className='gap-3'>
              {slotsFields.map((field, index) => (
                <div key={field.id} className='flex items-start gap-2'>
                  {/* 슬롯 선택 (Select) */}
                  <div className='flex-1'>
                    <Controller
                      name={`slotsId.${index}.slotId`}
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
                                placeholder='슬롯 선택'
                                className='w-20'
                              >
                                {selectField.value
                                  ? slots.find(
                                      (slot) =>
                                        Number(slot.id) === selectField.value,
                                    )?.name
                                  : '슬롯 선택'}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {slots.map((slot) => (
                                <SelectItem
                                  key={slot.id}
                                  value={String(slot.id)}
                                >
                                  {slot.name}
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
                  {/* 삭제 버튼 */}
                  <Button
                    type='button'
                    variant='destructive'
                    size='icon'
                    disabled={disabled || fields.length === 1}
                    onClick={() => slotsRemove(index)}
                  >
                    <Trash2 className='w-4 h-4' />
                  </Button>
                </div>
              ))}
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <div className='flex items-center justify-between mb-2'>
              <FieldLegend variant='label'>스탯 효과</FieldLegend>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() => append({ statId: 0, value: '' })}
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
                      name={`effects.${index}.statId`}
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
                                        Number(stat.id) === selectField.value,
                                    )?.name
                                  : '스탯 선택'}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {stats.map((stat) => (
                                <SelectItem
                                  key={stat.id}
                                  value={String(stat.id)}
                                >
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
                      name={`effects.${index}.value`}
                      control={form.control}
                      render={({ field: inputField, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Input
                            {...inputField}
                            placeholder='수치 (예: 10)'
                            disabled={disabled}
                            onChange={(e) =>
                              inputField.onChange(Number(e.target.value))
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
          {mode === 'create' ? '생성' : '수정'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EnchantDetailEditForm;
