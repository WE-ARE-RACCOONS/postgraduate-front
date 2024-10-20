import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
  useContext,
} from 'react';
import { SIGNOUT_REASON_JUNIOR, SIGNOUT_REASON_SENIOR } from './constant';

interface SignOutInfo {
  isJunior: boolean;
  signOutReason:
    | keyof typeof SIGNOUT_REASON_JUNIOR
    | keyof typeof SIGNOUT_REASON_SENIOR;
  etc?: string;
}

interface SignOutInfoContextType {
  signOutInfo: SignOutInfo | null;
  setSignOutInfo: Dispatch<SetStateAction<SignOutInfo | null>> | null;
  getSignOutReasonMessage: () => string;
}

const SignOutInfoContext = createContext<SignOutInfoContextType>({
  signOutInfo: {
    isJunior: false,
    signOutReason: 'ETC',
  },
  getSignOutReasonMessage: () => '',
  setSignOutInfo: null,
});

function SignOutInfoProvider({ children }: { children: ReactNode }) {
  const [signOutInfo, setSignOutInfo] = useState<SignOutInfo | null>(null);

  const getSignOutReasonMessage = () => {
    if (signOutInfo?.isJunior) {
      return SIGNOUT_REASON_JUNIOR[
        signOutInfo.signOutReason as keyof typeof SIGNOUT_REASON_JUNIOR
      ];
    } else if (signOutInfo) {
      return SIGNOUT_REASON_SENIOR[
        signOutInfo.signOutReason as keyof typeof SIGNOUT_REASON_SENIOR
      ];
    }
    return '';
  };

  const value = useMemo(() => {
    return {
      signOutInfo,
      setSignOutInfo,
      getSignOutReasonMessage,
    };
  }, [signOutInfo?.isJunior, signOutInfo?.signOutReason, signOutInfo?.etc]);

  return (
    <SignOutInfoContext.Provider value={value}>
      {children}
    </SignOutInfoContext.Provider>
  );
}

function useSignOutInfo() {
  const context = useContext(SignOutInfoContext);
  if (!context) {
    throw new Error('useSignOutInfo must be used within a SignOutInfoProvider');
  }
  return context;
}

export { SignOutInfoProvider, useSignOutInfo };
