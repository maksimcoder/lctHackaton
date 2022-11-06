import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useApi } from 'api/useApi';

const AuthContext = createContext<string>('');

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { checkAuth } = useApi();
	const isLogged = checkAuth();
	const value = useMemo(() => isLogged, [isLogged]);

	//   return <AuthContext.Provider value={value as string}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
