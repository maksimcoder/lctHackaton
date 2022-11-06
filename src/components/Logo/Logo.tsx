import { Typography } from '@mui/material';
import clsx from 'clsx';
import { LogoIcon } from 'assets/icons';
import s from './Logo.module.scss';

interface ILogoProps {
	shadow?: boolean;
}

const Logo: React.FC<ILogoProps> = ({ shadow }) => {
	return (
		<div className={clsx(s.logo, `${shadow ? 'shadowed' : ''}`)}>
			<div className={s.icon}>
				<LogoIcon />
			</div>
			<Typography
				fontSize={23}
				fontWeight={500}
				lineHeight='32px'
				variant='body1'
				component='span'>
				Dr.viewer
			</Typography>
		</div>
	);
};

export { Logo };
