import { PasswordProvider } from './hooks/password';

import { GeneratedPasswordBox } from './components/GeneratedPasswordBox';
import { PasswordCustomization } from './components/PasswordCustomization';

const App = () => {
  return (
    <PasswordProvider>
      <div className="flex flex-col justify-center items-center mt-2 mb-3">
        <h1>Generate a secure password</h1>

        <div className="w-full max-w-[800px] px-2">
          <GeneratedPasswordBox />

          <PasswordCustomization />
        </div>
      </div>
    </PasswordProvider>
  );
};

export default App;
