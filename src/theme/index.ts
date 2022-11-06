import { createTheme, ThemeOptions } from '@mui/material';

enum Colors {
	Main = '#4C5EFF',
	Secondary = '#3C3F7B',
	Background = '#F2F3FC',
	Paper = 'white',
	TextPrimary = '#3C3F7B',
	TextSecondary = '#515152',
	Divider = 'rgba(117,117,117,0.51)',
}

const themeOptions: ThemeOptions = {
	palette: {
		primary: {
			main: Colors.Main,
		},
		secondary: {
			main: Colors.Secondary,
		},
		background: {
			default: Colors.Background,
			paper: Colors.Paper,
		},
		text: {
			primary: Colors.TextPrimary,
			secondary: Colors.TextSecondary,
		},
		divider: Colors.Divider,
	},
	typography: {
		fontFamily: 'Rubik',
	},
};

export const theme = createTheme(themeOptions);
