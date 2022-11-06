import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { initCornerstone } from 'editor/cornerstone';

import { router } from 'router/router';

import { theme } from './theme';

// import { store } from 'app/store';

import '@fontsource/rubik/300.css';
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/500.css';
import '@fontsource/rubik/700.css';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
initCornerstone();

// const req = fetch('https://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.7.dcm');
//         // req.then(data => console.log(data.arrayBuffer())).then(data => console.log(data));
//         req.then(response => response.text())
//         .then(result => console.log(result))
//         .catch(error => console.log('error', error));

root.render(
	<React.StrictMode>
		{/* <Provider store={store}> */}
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<RouterProvider router={router} />
			</CssBaseline>
		</ThemeProvider>
		{/* </Provider> */}
	</React.StrictMode>
);
