import { FC } from 'react';
import { Typography } from '@mui/material';

import s from './LibraryCard.module.scss';

interface ILibraryCardProps {
	title: string;
	tags: string[];
	status: string;
	image: string;
}

const LibraryCard: FC<ILibraryCardProps> = ({ title }) => {
	return (
		<div className={s.card}>
			<div className={s.photoLayer}>
				<div className={s.status}>
					<Typography>{title}</Typography>
				</div>
			</div>
		</div>
	);
};

export { LibraryCard };
