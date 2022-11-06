import { Navigate, Outlet } from 'react-router-dom';

import { useApi } from 'api/useApi';

import { Header } from 'components';

export const ProtectedRoute = ({ children }: { children: any }) => {
	const { checkAuth } = useApi();
	const isLogged = checkAuth();

	if (!isLogged) {
		return <Navigate to='/login' replace />;
	}
	return children;
};

export const ProtectedLayout = ({ children }: { children?: any }) => {
	const { checkAuth } = useApi();
	const isLogged = checkAuth();

	if (!isLogged) {
		return <Navigate to='/login' replace />;
	}

	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};
