import { useQuery } from '@tanstack/react-query';
import { Account } from '../../../src/types';

export const GET_ACCOUNTS = 'accounts';

export const useGetAccounts = () => {
  const fetchAccounts = async () => {
    const response = await fetch('http://localhost:3000/accounts');
    const data = await response.json();
    return data;
  };

  return useQuery<Account[], Error>({
    queryKey: [GET_ACCOUNTS],
    queryFn: fetchAccounts
  });
};
