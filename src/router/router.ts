import { createBrowserRouter } from 'react-router-dom';
import { ERoutes, RoutesComponents } from 'router/routes';

const router = createBrowserRouter([
	{
		path: ERoutes.Home,
		element: RoutesComponents[ERoutes.Home],
	},
]);

export { router };