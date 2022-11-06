import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import Login from 'pages/Login';
import Library from 'pages/Library';
import ErrorPage from 'pages/404';
import { ProtectedRoute, ProtectedLayout } from 'Auth/ProtectedRoute';

enum ERoutes {
	InitialPage = '/',
	Protected = '/protected',
	Login = '/login',
	NotFoundPage = '',
	// Child routes
	Library = 'library',
}

const RoutesComponents: Record<ERoutes, ReactElement> = {
	[ERoutes.InitialPage]: <Navigate to='/login' />,
	[ERoutes.Protected]: <ProtectedLayout />,
	[ERoutes.Login]: <Login />,
	[ERoutes.Library]: (
		<ProtectedRoute>
			<Library />
		</ProtectedRoute>
	),
	[ERoutes.NotFoundPage]: <ErrorPage />,
};

export { ERoutes, RoutesComponents };
