export const raidKeys = {
  all: ['raids'] as const,
  steps: () => [...raidKeys.all, 'steps'] as const,
  lists: () => [...raidKeys.all, 'list'] as const,
  list: (filters: string) => [...raidKeys.lists(), { filters }] as const,
  details: () => [...raidKeys.all, 'detail'] as const,
  detail: (classId: string) => [...raidKeys.details(), classId] as const,
  stats: () => [...raidKeys.details(), 'stats'] as const,
  slots: () => [...raidKeys.details(), 'slots'] as const,
  basicId: () => [...raidKeys.details(), 'basicId'] as const,
  statistics: () => [...raidKeys.all, 'statistics'] as const,
};
