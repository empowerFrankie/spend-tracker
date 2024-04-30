interface Props {
  width: number;
}

export const ProgressBar = ({ width }: Props) => {
  return (
    <div className="h-2.5 w-full rounded-full bg-gray-200/75">
      <div
        className={`h-2.5 rounded-full bg-empowerBlue`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};
