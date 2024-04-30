import { Accounts } from '@/components/Accounts';
import { MonthlyBreakdown } from '@/components/Trackers/MonthlyBreakdown';
import { Trackers } from '@/components/Trackers/Trackers';

export const Dashboard = () => {
  return (
    <div className="flex w-full flex-col gap-10">
      <Accounts />
      <div className="grid grid-cols-2 gap-10">
        <Trackers />
        <MonthlyBreakdown />
      </div>
    </div>
  );
};
