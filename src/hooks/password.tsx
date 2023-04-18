import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

const initialState = {
  password: '',
  length: [8],
  hasLowercase: true,
  hasUppercase: true,
  hasNumbers: true,
  hasSymbols: true,
};

type State = typeof initialState;

type Action =
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_LENGTH'; payload: number[] }
  | { type: 'TOGGLE_HAS_LOWERCASE' }
  | { type: 'TOGGLE_HAS_UPPERCASE' }
  | { type: 'TOGGLE_HAS_NUMBERS' }
  | { type: 'TOGGLE_HAS_SYMBOLS' }
  | { type: 'ALL_CHARACTERS' }
  | { type: 'ONLY_LETTERS' };

type PasswordContextData = {
  password: {
    password: string;
    length: number[];
    hasLowercase: boolean;
    hasUppercase: boolean;
    hasNumbers: boolean;
    hasSymbols: boolean;
  };
  setPassword: Dispatch<Action>;
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

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_LENGTH':
      return { ...state, length: action.payload };
    case 'TOGGLE_HAS_LOWERCASE':
      return { ...state, hasLowercase: !state.hasLowercase };
    case 'TOGGLE_HAS_UPPERCASE':
      return { ...state, hasUppercase: !state.hasUppercase };
    case 'TOGGLE_HAS_NUMBERS':
      return { ...state, hasNumbers: !state.hasNumbers };
    case 'TOGGLE_HAS_SYMBOLS':
      return { ...state, hasSymbols: !state.hasSymbols };
    case 'ALL_CHARACTERS':
      return {
        ...state,
        hasLowercase: true,
        hasUppercase: true,
        hasNumbers: true,
        hasSymbols: true,
      };
    case 'ONLY_LETTERS':
      return {
        ...state,
        hasLowercase: true,
        hasUppercase: true,
        hasNumbers: false,
        hasSymbols: false,
      };
    default:
      return state;
  }
};

const characterSets = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
};

const PasswordProvider = ({ children }: { children: ReactNode }) => {
  const [password, dispatch] = useReducer(reducer, initialState);

  const handleGeneratePassword = useCallback(() => {
    let selectedCharacterSets = '';

    if (
      !password.hasLowercase &&
      !password.hasUppercase &&
      !password.hasNumbers &&
      !password.hasSymbols
    ) {
      selectedCharacterSets = Object.values(characterSets).join('');
    }

    if (password.hasLowercase) selectedCharacterSets += characterSets.lowercase;
    if (password.hasUppercase) selectedCharacterSets += characterSets.uppercase;
    if (password.hasNumbers) selectedCharacterSets += characterSets.numbers;
    if (password.hasSymbols) selectedCharacterSets += characterSets.symbols;

    let newPassword = '';

    for (let i = 0; i < password.length[0]; i++) {
      newPassword += selectedCharacterSets.charAt(
        Math.floor(Math.random() * selectedCharacterSets.length)
      );
    }

    dispatch({ type: 'SET_PASSWORD', payload: newPassword });
  }, [
    password.hasLowercase,
    password.hasNumbers,
    password.hasSymbols,
    password.hasUppercase,
    password.length,
  ]);

  const handlePasswordLength = (value: number[]) =>
    dispatch({ type: 'SET_LENGTH', payload: value });

  const handleHasLowercase = () => dispatch({ type: 'TOGGLE_HAS_LOWERCASE' });

  const handleHasUppercase = () => dispatch({ type: 'TOGGLE_HAS_UPPERCASE' });

  const handleHasNumbers = () => dispatch({ type: 'TOGGLE_HAS_NUMBERS' });

  const handleHasSymbols = () => dispatch({ type: 'TOGGLE_HAS_SYMBOLS' });

  const handleShortcutPasswordConfig = useCallback(
    (value: 'all-characters' | 'only-letters') => {
      if (value === 'all-characters') {
        dispatch({ type: 'ALL_CHARACTERS' });

        return;
      }

      dispatch({ type: 'ONLY_LETTERS' });
    },
    []
  );

  useEffect(() => {
    handleGeneratePassword();
  }, [handleGeneratePassword]);

  const values = useMemo(
    () => ({
      password,
      setPassword: dispatch,
      handlePasswordLength,
      handleGeneratePassword,
      handleHasLowercase,
      handleHasUppercase,
      handleHasNumbers,
      handleHasSymbols,
      handleShortcutPasswordConfig,
    }),
    [handleGeneratePassword, handleShortcutPasswordConfig, password]
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
