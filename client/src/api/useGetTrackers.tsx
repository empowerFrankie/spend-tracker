import { useQuery } from '@tanstack/react-query';
import { Tracker } from '@/components/Trackers/types';

export const GET_TRACKERS = 'trackers';

export const useGetTrackers = () => {
  const fetchTrackers = async () => {
    const response = await fetch('http://localhost:3000/trackers');
    const data = await response.json();
    return data;
  };

  return useQuery<Tracker[], Error>({
    queryKey: [GET_TRACKERS],
    queryFn: fetchTrackers
  });
};
