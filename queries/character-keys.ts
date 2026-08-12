export const characterKeys = {
  all: ['characters'] as const,
  lists: () => [...characterKeys.all, 'list'] as const,
  list: (filters: string) => [...characterKeys.lists(), { filters }] as const,
  details: () => [...characterKeys.all, 'detail'] as const,
  detail: (classId: string) => [...characterKeys.details(), classId] as const,
  statistics: () => [...characterKeys.all, 'statistics'] as const,
  skills: () => [...characterKeys.all, 'skill'] as const,
  skill: (classId: string) => [...characterKeys.skills(), classId] as const,
};
