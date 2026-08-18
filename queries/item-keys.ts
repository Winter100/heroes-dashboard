export const itemKeys = {
  all: ['items'] as const,
  steps: () => [...itemKeys.all, 'steps'] as const,
  lists: () => [...itemKeys.all, 'list'] as const,
  list: (filters: string) => [...itemKeys.lists(), { filters }] as const,
  details: () => [...itemKeys.all, 'detail'] as const,
  detail: (classId: string) => [...itemKeys.details(), classId] as const,
  stats: () => [...itemKeys.details(), 'stats'] as const,
  slots: () => [...itemKeys.details(), 'slots'] as const,
  basicId: () => [...itemKeys.details(), 'basicId'] as const,
  statistics: () => [...itemKeys.all, 'statistics'] as const,
};
