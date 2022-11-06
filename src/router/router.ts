import { createBrowserRouter } from 'react-router-dom';
import { ERoutes, RoutesComponents } from 'router/routes';

const router = createBrowserRouter([
	{
		path: ERoutes.InitialPage,
		element: RoutesComponents[ERoutes.InitialPage],
	},
	{
		path: ERoutes.Login,
		element: RoutesComponents[ERoutes.Login],
		errorElement: RoutesComponents[ERoutes.NotFoundPage],
	},
	{
		path: ERoutes.Protected,
		element: RoutesComponents[ERoutes.Protected],
		children: [
			{
				path: ERoutes.Library,
				element: RoutesComponents[ERoutes.Library],
			},
			{
				path: ERoutes.Generator,
				element: RoutesComponents[ERoutes.Generator],
			},
		],
	},
]);

export { router };
