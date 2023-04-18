import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

type Props = {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export const Checkbox = ({ id, label, checked, onCheckedChange }: Props) => {
  return (
    <div className="flex items-center">
      <RadixCheckbox.Root
        defaultChecked
        id={id}
        className="w-6 h-6 bg-bg-black rounded-md cursor-pointer"
        aria-label={label}
        checked={checked}
        onCheckedChange={onCheckedChange}
      >
        <RadixCheckbox.Indicator>
          <Check size={24} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>

      <label htmlFor="numbers" className="pl-2 cursor-pointer">
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </label>
    </div>
  );
};
