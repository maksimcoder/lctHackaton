import { useTheme, Typography, TextField } from '@mui/material';
import styles from './Library.module.scss';
import { useApi } from 'api/useApi';
import { useEffect } from 'react';

const Library = () => {
	const theme = useTheme();

	return (
		// <Typography color={theme.palette.secondary.main} variant='h1'>
		// 	home page
		// </Typography>
		<TextField>dqwdqw</TextField>
		// <h1 className={styles.heading}>homepage</h1>
	);
};

export default Library;