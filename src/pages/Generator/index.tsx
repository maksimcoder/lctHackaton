import { FC, useState, useRef } from 'react';
import { TextField, MenuItem, Typography, SxProps } from '@mui/material';
import { FileUploader } from 'react-drag-drop-files';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import Viewer from 'editor/editor2';
import { Button } from 'components';

import { useApi } from 'api/useApi';
import { API_BASE } from 'api/const';
import { Endpoints } from 'api/types';

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
	const { refresh, postGeneratorParams, loadGeneration } = useApi();
	const [optionValues, setOptionValue] =
		useState<Record<SelectTypes, IOption>>(defaultState);
	const [dicomReady, setDicomReady] = useState(false);
	const dicomStack = useRef<string[]>(['']);
	const dicomId = useRef<string>('');
	const dicomCapture = useRef<number>(1);
	const [error, setError] = useState(false);

	const sxStyles: SxProps = {
		'& .MuiSelect-icon': {
			display: 'none',
			border: '1px solid red',
		},
	};

	function handleChange(e: React.ChangeEvent<HTMLInputElement>, option: string) {
		setOptionValue((prevState) => {
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

	function formStack(res: any) {
		const array: string[] = [];
		for (let i = 1; i <= res.loaded; i++) {
			array.push(
				`dicomweb:${API_BASE}${Endpoints.Generation}${res.id}/captures/${i}`
			);
		}
		dicomStack.current = array;

		dicomId.current = res.id;
		// Этот параметр должен определяться динамически в зависимости от активного слоя редактора.
		// По причине неработающего метода в библиотеке, пришлось хардкодить
		dicomCapture.current = res.loaded;
		setDicomReady(true);
	}

	async function handleButtonClick() {
		const requestObject = {
			type: optionValues.patology.value,
			lung: optionValues.localisation.value,
			lobe: optionValues.part.value,
			count: optionValues.quantity.value,
			size_mm: optionValues.size.value,
			id: dicomId.current,
			capture: dicomCapture.current,
		};
		await postGeneratorParams(requestObject);
	}

	async function handleDrop(file: File) {
		if (file) {
			try {
				const res = await loadGeneration(file);
				formStack(res);
			} catch (error: any) {
				if (error.status === 401) {
					const res = await refresh();
					if (res.code === 200) {
						const res = await loadGeneration(file);
						formStack(res);
					} else {
						alert('Ошибка сервера');
					}
				}
			}
		}
	}

	function handleDropError() {
		setError(true);
		setTimeout(() => {
			setError(false);
		}, 1500);
	}

	const uploaderElement = (
		<FileUploader
			classes={s.dropArea}
			handleChange={handleDrop}
			onTypeError={handleDropError}
			types={['DICOM', 'DCM', 'ZIP']}>
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
				<Typography
					maxWidth='214px'
					textAlign='center'
					fontWeight={500}
					fontSize='12px'
					lineHeight='16px'
					className={`${s.errorText} ${error && s.activeError}`}
					style={{ color: '#F64241' }}>
					Неподдерживаемый формат файла, загрузите DICOM
				</Typography>
			</div>
		</FileUploader>
	);

	return (
		<div className={s.generator}>
			<div className={s.selects}>
				{selectElements}
				<Button onClick={handleButtonClick}>Сгенерировать</Button>
			</div>
			<div className={`${s.dropDown} ${error && s.error}`}>
				{dicomReady ? (
					<Viewer noTools stack={dicomStack.current} />
				) : (
					uploaderElement
				)}
			</div>
		</div>
	);
};

export default Generator;
