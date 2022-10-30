import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { router } from 'router/router';

import { theme } from './theme/theme';

// import { store } from 'app/store';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<React.StrictMode>
		{/* <Provider store={store}> */}
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
		</ThemeProvider>
		{/* </Provider> */}
	</React.StrictMode>
);
