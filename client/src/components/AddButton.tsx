import { PlusIcon } from '@radix-ui/react-icons';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const AddButton = ({ onClick, type }: Props) => {
  return (
    <button
      className="h-min rounded-full bg-black p-2 text-white"
      type={type}
      onClick={onClick}
    >
      <PlusIcon />
    </button>
  );
};
