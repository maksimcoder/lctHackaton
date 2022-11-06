import { CSSProperties } from 'react';
import { TextField, TextFieldProps } from '@mui/material';


const Input: React.FC<TextFieldProps> = ({InputProps, ...props}) => {
	const InputStyles: CSSProperties = {
		maxHeight: 50,
		borderRadius: 15,
		backgroundColor: 'white'
	};
	const textFieldStyles: CSSProperties = {
		width: '100%'
	};

	const InputPropsObject = {
		style: InputStyles,
		...InputProps
	};

    return (
        <TextField
			InputProps={InputPropsObject}
			InputLabelProps={{shrink: true}}
			sx={textFieldStyles}
			// type="password"
			{...props}
		/>
    );
};

export { Input };