import { Button as MUIButton, ButtonProps, useTheme, SxProps} from '@mui/material';
import { SpinnerCircular } from 'spinners-react';

interface IButtonProps extends ButtonProps {
    loading?: boolean;
}

const Button: React.FC<IButtonProps> = ({loading, children, ...props}) => {
    const { palette } = useTheme();
    const buttonStyles: SxProps = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBlock: '20px',
        backgroundColor: palette.primary.main,
        color: 'white',
        boxShadow: '0px 40px 40px 0px rgba(164, 173, 255, 0.3)',
        borderRadius: '20px',
        '&:hover': {
            backgroundColor: palette.primary.dark
        }
    };
    return (
        loading ? (
            <MUIButton sx={buttonStyles}>
                <SpinnerCircular secondaryColor="white" color={palette.primary.main}/>
            </MUIButton>
        ) : <MUIButton sx={buttonStyles} {...props}>{children}</MUIButton>
    );
};

export { Button };