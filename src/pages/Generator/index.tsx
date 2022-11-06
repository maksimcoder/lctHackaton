import { FC, useState } from 'react';
import { TextField, MenuItem, Typography, SxProps } from '@mui/material';
import { FileUploader } from 'react-drag-drop-files';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import s from './Generator.module.scss';

type SelectTypes = 'patology' | 'localisation' | 'part' | 'quantity' | 'size';

interface IOption {
	value: string;
	label?: string;
}
const Generator: FC = () => {
	const options: Record<SelectTypes, IOption[]> = {
		patology: [
			{
				value: 'covid',
				label: 'Covid-19',
			},
			{
				value: 'cancer',
				label: 'Рак',
			},
			{
				value: 'metastat',
				label: 'Метастаическое поражение',
			},
		],
		localisation: [
			{
				value: 'right',
				label: 'Правое легкое',
			},
			{
				value: 'left',
				label: 'Левое легкое',
			},
		],
		part: [
			{
				value: 'up',
				label: 'Верхняя',
			},
			{
				value: 'middle',
				label: 'Средняя',
			},
			{
				value: 'bottom',
				label: 'Нижняя',
			},
		],
		quantity: [
			{
				value: 'singular',
				label: 'Единичное (1-3)',
			},
			{
				value: 'few',
				label: 'Немногочисленное (4-10)',
			},
			{
				value: 'multiple',
				label: 'Многочисленные (> 10)',
			},
		],
		size: [
			{
				value: '_5',
				label: '5 мм',
			},
			{
				value: '5_10',
				label: '5-10 мм',
			},
			{
				value: '10_20',
				label: '10-20 мм',
			},
			{
				value: '20_',
				label: '> 20 мм',
			},
		],
	};

	const defaultState: Record<SelectTypes, IOption> = {
		patology: {
			value: '',
			label: 'Тип патологии',
		},
		localisation: {
			value: '',
			label: 'Локализация',
		},
		part: {
			value: '',
			label: 'Доля',
		},
		quantity: {
			value: '',
			label: 'Количество',
		},
		size: {
			value: '',
			label: 'Размер',
		},
	};

	const [optionValues, setOptionValue] =
		useState<Record<SelectTypes, IOption>>(defaultState);
	const sxStyles: SxProps = {
		'& .MuiSelect-icon': {
			display: 'none',
			border: '1px solid red',
		},
	};
	function handleChange(e: React.ChangeEvent<HTMLInputElement>, option: string) {
		setOptionValue((prevState) => {
			console.log(option);
			return {
				...prevState,
				[option]: { ...prevState[option as SelectTypes], value: e.target.value },
			};
		});
	}

	const selectElements = Object.keys(options).map((option, index) => {
		return (
			<TextField
				key={`input-select-${option}-${index}`}
				id={`select-${index}`}
				select
				sx={sxStyles}
				InputProps={{
					endAdornment: <ExpandMoreIcon color='primary' />,
				}}
				label={optionValues[option as SelectTypes].label}
				value={optionValues[option as SelectTypes].value}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange(e, option)
				}>
				{options[option as SelectTypes].map((optionItem, index) => {
					return (
						<MenuItem
							key={`menu-item-${optionItem}-${index}`}
							value={optionItem.value}>
							{optionItem.label}
						</MenuItem>
					);
				})}
			</TextField>
		);
	});

	function handleDrop(e: any) {
		console.log(e);
		e.preventDefault();
	}

	return (
		<div className={s.generator}>
			<div className={s.selects}>{selectElements}</div>
			<div className={s.dropDown}>
				<FileUploader
					classes={s.dropArea}
					handleChange={handleDrop}
					types={['DICOM, DCM']}>
					<div className={s.contentWrapper}>
						<FileDownloadOutlinedIcon
							style={{ width: '60px', height: '60px', color: '#8591FF' }}
						/>
						<Typography
							maxWidth='214px'
							textAlign='center'
							fontWeight={500}
							fontSize='14px'
							lineHeight='20px'
							style={{ color: '#8591FF' }}>
							Перетащите или кликните чтобы загрузить изображение
						</Typography>
					</div>
				</FileUploader>
			</div>
		</div>
	);
};

export default Generator;
