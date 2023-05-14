import { Dispatch, SetStateAction } from 'react';
import { SelectSVG } from '../Svg';
import useURLSearchParams from '@components/Main/hooks/useURLSearchParams';

type DropdownItemProps = {
  options: { [key: string]: string };
  name: string;
  value: string;
  selectedOption: string;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
};

const DropdownItem = ({
  options,
  name,
  value,
  selectedOption,
  setIsDropdownOpen,
}: DropdownItemProps) => {
  const { setURLSearchParams } = useURLSearchParams(() =>
    setIsDropdownOpen(prev => !prev)
  );

  return (
    <li
      onClick={() => setURLSearchParams(name, value)}
      className="w-full relative py-2 pl-3 pr-9 cursor-pointer hover:bg-indigo-100"
    >
      <div className="flex items-center">
        <span
          className={`${
            selectedOption === options[value] ? 'font-semibold' : 'font-normal'
          } ml-3 block`}
        >
          {options[value]}
        </span>
      </div>
      <span
        className={`${
          selectedOption === options[value] ? 'text-primary' : 'text-white'
        } absolute inset-y-0 right-0 flex items-center pr-4`}
      >
        <SelectSVG />
      </span>
    </li>
  );
};

export default DropdownItem;
