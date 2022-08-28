import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type PasswordContextData = {
  password: string;
  length: number[];
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
  setLength: Dispatch<SetStateAction<number[]>>;
  handleGeneratePassword: () => void;
  handlePasswordLength: (value: number[]) => void;
  handleHasLowercase: () => void;
  handleHasUppercase: () => void;
  handleHasNumbers: () => void;
  handleHasSymbols: () => void;
  handleShortcutPasswordConfig: (
    value: 'all-characters' | 'only-letters'
  ) => void;
};

const PasswordContext = createContext<PasswordContextData>(
  {} as PasswordContextData
);

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const symbols = '!?@#$%^&*()';

let characters = [
  ...numbers,
  ...lowercaseLetters,
  ...uppercaseLetters,
  ...symbols,
].sort(() => Math.random() - 0.5);

const PasswordProvider = ({ children }: { children: ReactNode }) => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([8]);
  const [hasLowercase, setHasLowercase] = useState(true);
  const [hasUppercase, setHasUppercase] = useState(true);
  const [hasNumbers, setHasNumbers] = useState(true);
  const [hasSymbols, setHasSymbols] = useState(true);

  const handleGeneratePassword = () => {
    let newPassword = '';

    if (
      (!hasLowercase && !hasUppercase && !hasNumbers && !hasSymbols) ||
      (hasLowercase && hasUppercase && hasNumbers && hasSymbols)
    ) {
      characters = [
        ...numbers,
        ...lowercaseLetters,
        ...uppercaseLetters,
        ...symbols,
      ].sort(() => Math.random() - 0.5);

      for (let i = 0; i < length[0]; i++) {
        newPassword +=
          characters[Math.floor(Math.random() * characters.length)];
      }

      setPassword(newPassword);

      return;
    }

    if (!hasLowercase && !hasUppercase && hasNumbers && hasSymbols) {
      characters = [...numbers, ...symbols];
    }

    if (!hasLowercase && !hasUppercase && !hasNumbers && hasSymbols) {
      characters = [...symbols];
    }

    if (!hasLowercase && !hasUppercase && hasNumbers && !hasSymbols) {
      characters = [...numbers];
    }

    if (!hasLowercase && hasUppercase && !hasNumbers && !hasSymbols) {
      characters = [...uppercaseLetters];
    }

    if (hasLowercase && !hasUppercase && !hasNumbers && !hasSymbols) {
      characters = [...lowercaseLetters];
    }

    if (!hasLowercase && hasUppercase && hasNumbers && hasSymbols) {
      characters = [...numbers, ...uppercaseLetters, ...symbols];
    }

    if (!hasLowercase && hasUppercase && !hasNumbers && hasSymbols) {
      characters = [...uppercaseLetters, ...symbols];
    }

    if (!hasLowercase && hasUppercase && hasNumbers && !hasSymbols) {
      characters = [...numbers, ...uppercaseLetters];
    }

    if (hasLowercase && !hasUppercase && hasNumbers && hasSymbols) {
      characters = [...numbers, ...lowercaseLetters, ...symbols];
    }

    if (hasLowercase && !hasUppercase && !hasNumbers && hasSymbols) {
      characters = [...lowercaseLetters, ...symbols];
    }

    if (hasLowercase && !hasUppercase && hasNumbers && !hasSymbols) {
      characters = [...numbers, ...lowercaseLetters];
    }

    if (hasLowercase && hasUppercase && !hasNumbers && hasSymbols) {
      characters = [...lowercaseLetters, ...uppercaseLetters, ...symbols];
    }

    if (hasLowercase && hasUppercase && hasNumbers && !hasSymbols) {
      characters = [...numbers, ...lowercaseLetters, ...uppercaseLetters];
    }

    if (hasLowercase && hasUppercase && !hasNumbers && !hasSymbols) {
      characters = [...lowercaseLetters, ...uppercaseLetters];
    }

    for (let i = 0; i < length[0]; i++) {
      newPassword += characters[Math.floor(Math.random() * characters.length)];
    }

    setPassword(newPassword);
  };

  const handlePasswordLength = (value: number[]) => setLength(value);

  const handleHasLowercase = () => setHasLowercase(!hasLowercase);

  const handleHasUppercase = () => setHasUppercase(!hasUppercase);

  const handleHasNumbers = () => setHasNumbers(!hasNumbers);

  const handleHasSymbols = () => setHasSymbols(!hasSymbols);

  const handleShortcutPasswordConfig = (
    value: 'all-characters' | 'only-letters'
  ) => {
    if (value === 'all-characters') {
      setHasLowercase(true);
      setHasUppercase(true);
      setHasNumbers(true);
      setHasSymbols(true);

      return;
    }

    setHasLowercase(true);
    setHasUppercase(true);
    setHasNumbers(false);
    setHasSymbols(false);
  };

  useEffect(() => {
    handleGeneratePassword();
  }, [length, hasLowercase, hasUppercase, hasNumbers, hasSymbols]);

  const values = useMemo(
    () => ({
      password,
      length,
      hasLowercase,
      hasUppercase,
      hasNumbers,
      hasSymbols,
      setLength,
      handlePasswordLength,
      handleGeneratePassword,
      handleHasLowercase,
      handleHasUppercase,
      handleHasNumbers,
      handleHasSymbols,
      handleShortcutPasswordConfig,
    }),
    [
      password,
      length,
      hasLowercase,
      hasUppercase,
      hasNumbers,
      hasSymbols,
      setLength,
      handlePasswordLength,
      handleGeneratePassword,
      hasLowercase,
      hasUppercase,
      hasNumbers,
      hasSymbols,
      handleShortcutPasswordConfig,
    ]
  );

  return (
    <PasswordContext.Provider value={values}>
      {children}
    </PasswordContext.Provider>
  );
};

function usePassword(): PasswordContextData {
  const context = useContext(PasswordContext);

  if (!context) {
    throw new Error('usePassword must be used within a PasswordProvider');
  }

  return context;
}

export { PasswordProvider, usePassword };
