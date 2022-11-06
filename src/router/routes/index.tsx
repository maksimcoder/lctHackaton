import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import Login from 'pages/Login';
import Library from 'pages/Library';
import Generator from 'pages/Generator';
import ErrorPage from 'pages/404';
import { ProtectedLayout } from 'Auth/ProtectedRoute';

enum ERoutes {
	InitialPage = '/',
	Protected = '/protected',
	Login = '/login',
	NotFoundPage = '',
	// Child routes
	Library = 'library',
	Generator = 'generator',
}

const RoutesComponents: Record<ERoutes, ReactElement> = {
	[ERoutes.InitialPage]: <Navigate to='/login' />,
	[ERoutes.Protected]: <ProtectedLayout />,
	[ERoutes.Login]: <Login />,
	[ERoutes.Library]: <Library />,
	[ERoutes.Generator]: <Generator />,
	[ERoutes.NotFoundPage]: <ErrorPage />,
};

export { ERoutes, RoutesComponents };
