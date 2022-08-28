import * as Slider from '@radix-ui/react-slider';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { Check } from 'phosphor-react';

import { usePassword } from '../hooks/password';

export const PasswordCustomization = () => {
  const {
    length,
    setLength,
    hasLowercase,
    hasUppercase,
    hasNumbers,
    hasSymbols,
    handlePasswordLength,
    handleHasLowercase,
    handleHasUppercase,
    handleHasNumbers,
    handleHasSymbols,
    handleShortcutPasswordConfig,
  } = usePassword();

  return (
    <div className="bg-blue-900 p-6 rounded-lg">
      <h1 className="pb-3 text-2xl border-b-2 border-b-sky-600">
        Customize your password
      </h1>

      <div className="mt-4 flex flex-col gap-10 sm:flex-row sm:gap-0 sm:justify-between">
        <div>
          Password Length
          <div className="flex items-center mt-2">
            <input
              type="number"
              value={Number(length)}
              min={4}
              max={40}
              className="w-12 pl-2 mr-4 bg-white text-bg-black rounded-md"
              onChange={e => setLength([Number(e.target.value)])}
            />

            <Slider.Root
              defaultValue={[4]}
              step={1}
              min={4}
              max={40}
              value={length}
              orientation="horizontal"
              aria-label="Length"
              className="w-48 h-3 relative flex items-center select-none touch-none"
              onValueChange={handlePasswordLength}
            >
              <Slider.Track className="w-2 h-2 relative flex-grow rounded-full bg-[#aebed7]">
                <Slider.Range className="h-full absolute rounded-full bg-blue-400" />
              </Slider.Track>

              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-md rounded-lg cursor-pointer"
                aria-label="Set password length"
              />
            </Slider.Root>
          </div>
        </div>

        <RadioGroup.Root
          defaultValue="all-characters"
          aria-label="Settings"
          onValueChange={handleShortcutPasswordConfig}
        >
          <div className="flex items-center mb-3">
            <RadioGroup.Item
              value="only-letters"
              id="only-letters"
              className="w-5 h-5 rounded-full bg-bg-black mr-2"
              aria-label="Include only letters"
            >
              <RadioGroup.Indicator className="w-full h-full relative flex justify-center after:content-['•']" />
            </RadioGroup.Item>

            <label htmlFor="only-letters">Only letters</label>
          </div>

          <div className="flex items-center">
            <RadioGroup.Item
              value="all-characters"
              id="all-characters"
              className="w-5 h-5 rounded-full bg-bg-black mr-2"
              aria-label="Include all characters"
            >
              <RadioGroup.Indicator className="w-full h-full relative flex justify-center after:content-['•'] after:block after:w-2 after:h-2 after:rounded-full" />
            </RadioGroup.Item>

            <label htmlFor="all-characters">All characters</label>
          </div>
        </RadioGroup.Root>

        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <Checkbox.Root
              defaultChecked
              id="lowercase"
              className="w-6 h-6 bg-bg-black rounded-md cursor-pointer"
              aria-label="Toggle lowercase"
              checked={hasLowercase}
              onCheckedChange={handleHasLowercase}
            >
              <Checkbox.Indicator>
                <Check size={24} />
              </Checkbox.Indicator>
            </Checkbox.Root>

            <label htmlFor="lowercase" className="pl-2 cursor-pointer">
              Lowercase
            </label>
          </div>

          <div className="flex items-center">
            <Checkbox.Root
              defaultChecked
              id="uppercase"
              className="w-6 h-6 bg-bg-black rounded-md cursor-pointer"
              aria-label="Toggle uppercase"
              checked={hasUppercase}
              onCheckedChange={handleHasUppercase}
            >
              <Checkbox.Indicator>
                <Check size={24} />
              </Checkbox.Indicator>
            </Checkbox.Root>

            <label htmlFor="uppercase" className="pl-2 cursor-pointer">
              Uppercase
            </label>
          </div>

          <div className="flex items-center">
            <Checkbox.Root
              defaultChecked
              id="numbers"
              className="w-6 h-6 bg-bg-black rounded-md cursor-pointer"
              aria-label="Toggle numbers"
              checked={hasNumbers}
              onCheckedChange={handleHasNumbers}
            >
              <Checkbox.Indicator>
                <Check size={24} />
              </Checkbox.Indicator>
            </Checkbox.Root>

            <label htmlFor="numbers" className="pl-2 cursor-pointer">
              Numbers
            </label>
          </div>

          <div className="flex items-center">
            <Checkbox.Root
              defaultChecked
              id="symbols"
              className="w-6 h-6 bg-bg-black rounded-md cursor-pointer"
              aria-label="Toggle symbols"
              checked={hasSymbols}
              onCheckedChange={handleHasSymbols}
            >
              <Checkbox.Indicator>
                <Check size={24} />
              </Checkbox.Indicator>
            </Checkbox.Root>

            <label htmlFor="symbols" className="pl-2 cursor-pointer">
              Symbols
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
