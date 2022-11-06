import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Typography, Avatar, Popper, Box, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { useApi } from 'api/useApi';

import { Logo, Button } from 'components';
import AvatarImage from 'assets/images/profile/avatar.png';

import s from './Header.module.scss';

const Header: React.FC = () => {
	const theme = useTheme();
	const { logOut } = useApi();
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	// const [open, setOpen] = useState(false);
	const id = open ? 'profile-popper' : undefined;

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const activeStyle = {
		color: theme.palette.primary.main,
	};

	async function handleLogout() {
		const req = await logOut();
		if (req.code === 200) {
			navigate('/login');
		}
	}

	const popperStyles = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '17px',
		padding: '17px 20px',
		borderRadius: '10px',
		boxShadow: '0px -10px 100px rgba(201, 201, 201, 0.5)',
		backgroundColor: 'white',
	};
	return (
		<header className={s.header}>
			<Logo />
			<nav className={s.navigation}>
				<ul className={s.list}>
					<li className={s.listItem}>
						<NavLink
							style={({ isActive }) => (isActive ? activeStyle : undefined)}
							to='library'>
							<Typography fontSize='14px' fontWeight={500} component='span'>
								Библиотека
							</Typography>
						</NavLink>
					</li>
					<li className={s.listItem}>
						<NavLink
							style={({ isActive }) => (isActive ? activeStyle : undefined)}
							to='editor'>
							<Typography fontSize='14px' fontWeight={500} component='span'>
								Редактор
							</Typography>
						</NavLink>
					</li>
					<li className={s.listItem}>
						<NavLink
							style={({ isActive }) => (isActive ? activeStyle : undefined)}
							to='generator'>
							<Typography fontSize='14px' fontWeight={500} component='span'>
								Генератор
							</Typography>
						</NavLink>
					</li>
					<li className={s.listItem}>
						<NavLink
							style={({ isActive }) => (isActive ? activeStyle : undefined)}
							to='tasks'>
							<Typography fontSize='14px' fontWeight={500} component='span'>
								Задачи
							</Typography>
						</NavLink>
					</li>
				</ul>
			</nav>
			<div onClick={handleClick} role='presentation' className={s.profile}>
				<Avatar alt='user' src={AvatarImage} />
				{open ? (
					<ExpandLessIcon color='primary' />
				) : (
					<ExpandMoreIcon color='primary' />
				)}
			</div>
			<Popper id={id} open={open} anchorEl={anchorEl}>
				<Box sx={popperStyles}>
					<Typography
						fontSize='12px'
						fontWeight={500}
						color='#323448'
						component='span'>
						Анастасия Иванова
					</Typography>
					<Button onClick={handleLogout} variant='outlined'>
						Выйти
					</Button>
				</Box>
			</Popper>
		</header>
	);
};

export { Header };
