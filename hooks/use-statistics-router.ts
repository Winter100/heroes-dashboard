import { useRouter } from 'next/navigation';

export const useStatisicsRouter = (path: string) => {
  const router = useRouter();

  const handleSearch = (key: string, query: string) => {
    router.push(`${path}/filter?${key}=${query}`);
  };

  return { handleSearch };
};
