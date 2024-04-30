import { useGetAccounts } from '@/api/useGetAccounts';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { AddButton } from '../AddButton';

export const Accounts = () => {
  const { data: accounts } = useGetAccounts();

  const getTotal = () =>
    accounts?.reduce((a, b) => a + b.balances.current, 0).toFixed(2);

  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">All Accounts</h1>
          <p className="text-mediumGrey">Total: ${getTotal()}</p>
        </div>

        <AddButton type="button" onClick={() => null} />
      </div>
      <ul
        role="list"
        className="mt-4 divide-y divide-lightGrey border-b border-t border-lightGrey "
      >
        {accounts &&
          accounts.map((account) => (
            <li key={account.account_id} className="hover:text-empowerPinkDark">
              <Link to={`/accounts/${account.account_id}`}>
                <div className="flex items-center justify-between gap-4 p-6">
                  <div className="flex flex-col">
                    <p className="font-semibold">{account.name}</p>
                    <p className="text-sm text-mediumGrey first-letter:uppercase">
                      {account.subtype}
                      <span className="px-1">&#183;</span>
                      {account.account_id}
                    </p>
                  </div>

                  <div className=" flex gap-6">
                    <p className="text-sm text-black">
                      ${account.balances.current}
                    </p>
                    <ChevronRightIcon
                      className="h-5 w-5 flex-none text-mediumGrey"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};
