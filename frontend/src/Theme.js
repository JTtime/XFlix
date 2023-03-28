import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#ff0000',
        },
        background: {
            default: '#181818',
            paper: '#424242',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255,255,255,0.7)',
            hint: 'rgba(255,255,255,0.5)',
        },
        success: {
            main: '#4caf50',
        },
        divider: 'rgba(255,255,255,0.12)',
        error: {
            main: '#f44336',
        },
        warning: {
            main: '#ff9800',
        },
        info: {
            main: '#2196f3',
        },
        appBar: {
            main: '#2F2F2F',
        },
    },
    props: {
        MuiTooltip: {
            arrow: true,
        },
        MuiAppBar: {
            color: 'inherit',
        },
    },
    overrides: {
        MuiAppBar: {
            colorInherit: {
                backgroundColor: '#2F2F2F',
                color: '#fff',
            },
        },
    },
});

export default theme;
