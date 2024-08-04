import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

//   import {
//     useGetUserId,
//     UserDetailRequest,
//   } from "@/api/users/useGetUserId";
import { getSupabaseAuthSingleton } from '@/libs/supabase/supabaseSingleton';
import { User } from '@supabase/supabase-js';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<{
  authUser: User | null;
  loading: boolean;
  userId: string | null;
}>({
  authUser: null,
  loading: true,
  userId: null,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const unsubscribe = getSupabaseAuthSingleton().onAuthStateChanged(
      async (user) => {
        if (!user) {
          setAuthUser(null);
          setLoading(false);
          setUserId(null);
          return;
        }

        setLoading(true);
        setAuthUser(user);
        setLoading(false);
      }
    );

    return () => {
      if (unsubscribe) {
        unsubscribe.data?.subscription.unsubscribe();
      }
    };
  }, []);
  // const { data } = useGetUserId(
  //   authUser ? ({ id: authUser?.id } as UserDetailRequest) : undefined,
  //   {
  //     enabled: !!authUser,
  //     onSuccess: (data) => {
  //       setUserId(data.account_id);
  //     },
  //   },
  // );

  return (
    <AuthContext.Provider
      value={{
        authUser,
        loading,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
