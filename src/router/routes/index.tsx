import { ReactElement } from 'react';

import Login from 'pages/Login';
import Gallery from 'pages/Gallery';
import ErrorPage from 'pages/404';

enum ERoutes {
	Gallery = '/gallery',
	Login = '/login',
	NotFoundPage = '',
}

const RoutesComponents: Record<ERoutes, ReactElement> = {
	[ERoutes.Login]: <Login />,
	[ERoutes.Gallery]: <Gallery/>,
	[ERoutes.NotFoundPage]: <ErrorPage/>
};

export { ERoutes, RoutesComponents };
