import { Typography } from '@mui/material';
import { LogoIcon } from 'assets/icons';
import s from './Logo.module.scss';

const Logo: React.FC = () => {
    return (
        <div className={s.logo}>
            <div className={s.icon}>
                <LogoIcon/>
            </div>
            <Typography 
                fontSize={23}
                fontWeight={500}
                lineHeight='32px' 
                variant='body1' 
                component='span'
            >Dr.viewer</Typography>
        </div>
    );
};

export { Logo };