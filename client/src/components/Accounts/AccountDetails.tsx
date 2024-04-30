import { useGetAccounts } from '@/api/useGetAccounts';
// import { useGetTransactions } from '@/api/useGetTransactions';
import { useParams } from 'react-router-dom';

export const AccountDetails = () => {
  const params = useParams();
  const { data: accounts } = useGetAccounts();
  //const { data: transactions } = useGetTransactions();

  const account = accounts?.find((x) => x.account_id === params.id);

  return (
    <section>
      <h1 className="text-2xl font-semibold">{account?.name}</h1>
    </section>
  );
};
