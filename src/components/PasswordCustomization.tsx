import * as Slider from '@radix-ui/react-slider';
import * as RadioGroup from '@radix-ui/react-radio-group';

import { usePassword } from '../hooks/password';

import { Checkbox } from './Checkbox';

export const PasswordCustomization = () => {
  const {
    password,
    setPassword,
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
              value={Number(password.length)}
              min={4}
              max={40}
              className="w-12 pl-2 mr-4 bg-white text-bg-black rounded-md"
              onChange={e =>
                setPassword({
                  type: 'SET_LENGTH',
                  payload: [Number(e.target.value)],
                })
              }
            />

            <Slider.Root
              defaultValue={[4]}
              step={1}
              min={4}
              max={40}
              value={password.length}
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
          <Checkbox
            id="lowercase"
            label="Toggle lowercase"
            checked={password.hasLowercase}
            onCheckedChange={handleHasLowercase}
          />

          <Checkbox
            id="uppercase"
            label="Toggle uppercase"
            checked={password.hasUppercase}
            onCheckedChange={handleHasUppercase}
          />

          <Checkbox
            id="numbers"
            label="Toggle numbers"
            checked={password.hasNumbers}
            onCheckedChange={handleHasNumbers}
          />

          <Checkbox
            id="symbols"
            label="Toggle symbols"
            checked={password.hasSymbols}
            onCheckedChange={handleHasSymbols}
          />
        </div>
      </div>
    </div>
  );
};
