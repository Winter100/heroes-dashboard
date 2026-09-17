export const enchantKeys = {
  all: ['enchants'] as const,
  lists: () => [...enchantKeys.all, 'list'] as const,
  list: (filters: string) => [...enchantKeys.lists(), { filters }] as const,
  details: () => [...enchantKeys.all, 'detail'] as const,
  detail: (enchantId: string) => [...enchantKeys.details(), enchantId] as const,
  statistics: () => [...enchantKeys.all, 'statistics'] as const,
};
