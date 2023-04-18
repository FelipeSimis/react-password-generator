import { useCallback, useEffect, useState } from 'react';
import { Copy, ArrowsClockwise } from 'phosphor-react';
import * as Progress from '@radix-ui/react-progress';

import { usePassword } from '../hooks/password';

const levels = [
  { length: 0, progress: 0, color: 'bg-[#df6661]' },
  { length: 5, progress: 25, color: 'bg-[#df6661]' },
  { length: 9, progress: 50, color: 'bg-[#efc20f]' },
  { length: 10, progress: 75, color: 'bg-[#00a878]' },
  { length: Infinity, progress: 100, color: 'bg-[#006b4d]' },
];

export const GeneratedPasswordBox = () => {
  const { password, handleGeneratePassword } = usePassword();
  const [progress, setProgress] = useState(50);
  const [progressColor, setProgressColor] = useState('bg-[#efc20f]');

  const copyPasswordToClipboard = () => {
    if (navigator) {
      navigator.clipboard.writeText(password.password || '');
    }
  };

  const handlePasswordStrength = useCallback(() => {
    const passwordLength = password.password.length;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { progress: tempProgress, color } = levels.find(
      ({ length }) => passwordLength < length
    )!;

    setProgress(tempProgress);
    setProgressColor(color);
  }, [password.password.length]);

  useEffect(() => {
    handlePasswordStrength();
  }, [handlePasswordStrength]);

  return (
    <div className="relative mt-6 mb-4 p-6 flex flex-wrap justify-between items-center bg-blue-900 rounded-lg">
      <div
        className="flex-1 font-medium text-xl tracking-wider xsm:mr-1"
        style={{ lineBreak: 'anywhere' }}
      >
        {password.password}
      </div>

      <div className="w-full flex items-center justify-evenly mt-2 xsm:w-auto xsm:mt-0 xsm:justify-start">
        <button
          type="button"
          className="mr-2 hover:scale-125 transition-all duration-200"
          aria-label="Copy password"
          title="Copy"
          onClick={copyPasswordToClipboard}
        >
          <Copy size={24} />
        </button>

        <button
          type="button"
          className="hover:scale-125 transition-all duration-200"
          aria-label="Generate a new password"
          title="Generate"
          onClick={handleGeneratePassword}
        >
          <ArrowsClockwise size={24} />
        </button>
      </div>

      <Progress.Root
        value={progress}
        className={`w-full h-2 absolute left-0 bottom-0 overflow-hidden rounded-full ${progressColor}`}
      >
        <Progress.Indicator
          className="w-full h-full bg-white"
          style={{
            transform: `translateX(${progress}%)`,
            transition: 'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)',
          }}
        />
      </Progress.Root>
    </div>
  );
};
