import { createBrowserRouter } from 'react-router-dom';
import { ERoutes, RoutesComponents } from 'router/routes';

const router = createBrowserRouter([
	{
		path: ERoutes.Login,
		element: RoutesComponents[ERoutes.Login],
		errorElement: RoutesComponents[ERoutes.NotFoundPage]
	},
	{
		path: ERoutes.Gallery,
		element: RoutesComponents[ERoutes.Gallery],
	},
]);

export { router };