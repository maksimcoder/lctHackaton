import { useTheme, Typography } from '@mui/material';
import styles from  './Home.module.scss';

const Home = () => {
	const theme = useTheme();
	return (
		// <Typography color={theme.palette.secondary.main} variant='h1'>
		// 	home page
		// </Typography>
		<h1 className={styles.heading}>homepage</h1>
	)
};

export { Home };
