import { CSSProperties, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, FormControlLabel, useTheme } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useApi } from 'api/useApi';

import { ArrowRight } from 'assets/icons';
import { Logo, Input, Checkbox, Button } from 'components';

import s from './Login.module.scss';

const Login: React.FC = () => {
	const { palette } = useTheme();
	const { logIn } = useApi();
	const [passVisible, setPassVisible] = useState(false);
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handlePassVisibleClick = () => setPassVisible(!passVisible);

	const iconStyles: CSSProperties = {
		cursor: 'pointer',
	};

	const endAdornment = passVisible ? (
		<VisibilityOffIcon
			color='primary'
			sx={iconStyles}
			onClick={handlePassVisibleClick}
		/>
	) : (
		<VisibilityIcon
			color='primary'
			sx={iconStyles}
			onClick={handlePassVisibleClick}
		/>
	);

	function handleLoginChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (error) {
			setError(false);
		}
		setLogin(e.target.value);
	}

	function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (error) {
			setError(false);
		}
		setPassword(e.target.value);
	}

	function refreshInputs() {
		setLogin('');
		setPassword('');
	}

	async function handleFormSubmit() {
		try {
			setLoading(true);
			await logIn(login, password);
			setLoading(false);
			navigate('/protected/library');
		} catch (error) {
			setError(true);
			setLoading(false);
		} finally {
			refreshInputs();
		}
	}

	return (
		<div className={s.loginPage}>
			<div className={s.photoPart}>
				<div className={s.logoLayer}>
					<div className={s.logo}>
						<Logo shadow />
					</div>
				</div>
			</div>
			<div className={s.logicPart}>
				<div className={s.logicWrapper}>
					<header className={s.header}>
						<Typography
							variant='h1'
							fontSize={36}
							fontWeight={700}
							lineHeight='36px'
							color={palette.text.primary}>
							??????????????????????
						</Typography>
					</header>
					<Input
						error={error}
						onChange={handleLoginChange}
						value={login}
						label='??????????'
						placeholder='?????? ??????????'
					/>
					<Input
						onChange={handlePasswordChange}
						value={password}
						label='????????????'
						error={error}
						placeholder='?????????????? ????????????'
						type={passVisible ? 'text' : 'password'}
						InputProps={{ endAdornment }}
						helperText={error ? '???????????????????????? ?????????? ?????? ????????????' : ' '}
					/>
					<FormControlLabel
						sx={{ marginLeft: 0 }}
						control={<Checkbox defaultChecked />}
						label='?????????????????? ????????'
					/>
					<Button
						loading={loading}
						onClick={handleFormSubmit}
						endIcon={<ArrowRight />}>
						????????????????????
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Login;
