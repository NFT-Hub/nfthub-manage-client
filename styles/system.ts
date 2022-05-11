import { createTheme } from '@mui/system';

const theme = createTheme({
    palette: {
        background: {
            paper: '#fff',
            active: 'rgb(0, 100, 255)',
        },
        text: {
            primary: '#191f28',
            secondary: '#46505A',
        },
        action: {
            active: '#001E3C',
        },
        success: {
            dark: '#009688',
        },
    },
});
