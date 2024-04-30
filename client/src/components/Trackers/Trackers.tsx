import { FormEvent, useEffect, useState } from 'react';
import { getPercentage } from '@/utils';
import { useGetTrackers } from '@/api/useGetTrackers';
import { useGetCategories } from '@/api/useGetCategories';
import { Pencil1Icon } from '@radix-ui/react-icons';
// import { useGetTransactions } from '@/api/useGetTransactions';
import { ProgressBar } from '../ProgressBar';
import { AddButton } from '../AddButton';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Tracker } from './types';
import { Transaction } from '../../../../src/types';

export const Trackers = () => {
  const { data: trackersData } = useGetTrackers();
  // const { data: transactions } = useGetTransactions();
  const { data: categories } = useGetCategories();
  // temporary
  const transactions: Transaction[] = [];

  const [trackers, setTrackers] = useState(trackersData);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTracker, setSelected] = useState<Tracker | null>(null);

  useEffect(() => {
    if (!trackers) {
      setTrackers(trackersData);
    }
  }, [trackers, trackersData]);

  useEffect(() => {
    if (selectedTracker) {
      setModalOpen(true);
    }
  }, [selectedTracker]);

  const getWeeklyTotal = () =>
    trackers?.reduce((a, b) => a + b.budget, 0).toFixed(2);
  const weeklyBudget = Number(getWeeklyTotal());

  const getTotalSpent = () =>
    transactions?.reduce((a, b) => a + b.amount, 0).toFixed(2);
  const totalSpent = Number(getTotalSpent());

  const getTrackerTotal = (id: string) =>
    Number(
      transactions
        ?.filter((x) => x.account_id === id)
        .reduce((a, b) => a + b.amount, 0)
        .toFixed(2)
    );

  const getCategoryName = (id: string) =>
    categories?.find((x) => x.id === id)?.name;

  const isOptionDisabled = (id: string) => {
    const foundTracker = trackers?.find((t) => t.categoryId === id);
    if (foundTracker && selectedTracker?.categoryId !== id) return true;
    return false;
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelected(null);
  };

  const handleEditClick = (x: Tracker) => {
    setSelected(x);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const result = {
      id: formData.get('id'),
      categoryId: formData.get('category'),
      budget: Number(formData.get('budget'))
    } as Tracker;

    // handle update tracker state
    if (selectedTracker) {
      const index = trackers?.indexOf(selectedTracker);

      if (index !== undefined) {
        const newState = [...trackers!];
        newState[index] = result;
        setTrackers(newState);
        setSelected(null);
        setModalOpen(false);
        return;
      }
    }

    // set new tracker in state
    setTrackers((x) => [...(x as Tracker[]), result]);
    setModalOpen(false);
  };

  const handleRemoveTracker = (x: Tracker) => {
    const index = trackers?.indexOf(x);
    const newState = [...trackers!];

    // delete tracker from state
    if (index !== undefined) {
      newState.splice(index, 1);

      setTrackers(newState);
      setSelected(null);
      setModalOpen(false);
    }
  };

  return (
    <section className="border-light rounded-md border p-6">
      <div className="mb-4 flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Trackers</h1>
          <p className="text-mediumGrey">Weekly budget: ${weeklyBudget}</p>
          <p className="text-mediumGrey">Total spent: ${totalSpent}</p>
        </div>

        <AddButton type="button" onClick={() => setModalOpen(true)} />
      </div>

      <div className="flex flex-col gap-6">
        {trackers?.length &&
          trackers.map((tracker, i) => {
            const trackerTotal = getTrackerTotal(tracker.categoryId);
            const trackerPercentage = getPercentage(
              trackerTotal,
              tracker.budget
            );

            return (
              <div key={`${tracker.categoryId}-${i}`}>
                <div className="mb-2 flex justify-between">
                  <div>
                    <p>
                      {getCategoryName(tracker.categoryId)}
                      <button
                        className="ml-2"
                        onClick={() => handleEditClick(tracker)}
                      >
                        <Pencil1Icon />
                      </button>
                    </p>
                    <p className="text-sm text-mediumGrey">
                      {trackerPercentage}%
                    </p>
                  </div>
                  <div className="text-sm">
                    <p>${trackerTotal.toFixed(2)}</p>
                    <p className="text-mediumGrey">of ${tracker.budget}</p>
                  </div>
                </div>
                <ProgressBar
                  width={trackerPercentage > 100 ? 100 : trackerPercentage}
                />
              </div>
            );
          })}
      </div>

      <Modal title="Add New Tracker" isOpen={modalOpen} setOpen={closeModal}>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <select
            defaultValue={selectedTracker?.categoryId}
            name="category"
            className="w-full rounded-md border border-black bg-transparent px-4 py-2"
          >
            {categories?.map((option, i) => (
              <option
                defaultChecked={selectedTracker?.categoryId === option.id}
                key={`${option.id}-${i}`}
                value={option.id}
                disabled={isOptionDisabled(option.id)}
              >
                {option.name}
              </option>
            ))}
          </select>
          <input
            name="id"
            className="hidden"
            defaultValue={
              selectedTracker?.id ?? (trackers?.length && trackers.length + 1)
            }
          />
          <Input
            name="budget"
            className="border-black"
            placeholder="Budget Amount"
            type="number"
            defaultValue={selectedTracker?.budget}
          />
          <div className="flex items-baseline justify-between">
            <button
              className="w-min rounded-full bg-black px-6 py-3 text-white"
              type="submit"
            >
              Submit
            </button>
            {selectedTracker && (
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleRemoveTracker(selectedTracker)}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </Modal>
    </section>
  );
};
