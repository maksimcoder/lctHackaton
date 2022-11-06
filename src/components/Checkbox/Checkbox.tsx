import { Checkbox as MUICheckbox, CheckboxProps} from '@mui/material';

const Checkbox: React.FC<CheckboxProps> = (props) => {
    const checkboxStyles = {
        color: '#4C5EFF',
    };
    return (
        <MUICheckbox sx={checkboxStyles} {...props} />
    );
};

export { Checkbox };