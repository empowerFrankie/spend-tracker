import { useQuery } from '@tanstack/react-query';
import { Category } from '@/components/Trackers/types';

export const GET_CATEGORIES = 'categories';

export const useGetCategories = () => {
  const fetchCategories = async () => {
    const response = await fetch('http://localhost:3000/accounts');
    const data = await response.json();
    return data;
  };

  return useQuery<Category[], Error>({
    queryKey: [GET_CATEGORIES],
    queryFn: fetchCategories
  });
};
