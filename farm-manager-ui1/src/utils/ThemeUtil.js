import { createTheme } from '@mui/material/styles';
import { amber } from '@mui/material/colors';
import { heIL, enUS } from '@mui/material/locale';
import { PRIMARY_DARK, PRIMARY_LIGHT, SECONDARY_LIGHT, SECONDARY_MAIN } from '../App';

const themeConfig = (direction) => ({
    direction,
    typography: {
        fontFamily: [
            'Montserrat', 'Rubik', 'Helvetica', 'Arial', 'sans-serif',
        ].join(','),
    },
    palette: {
        primary: {
            light: PRIMARY_LIGHT,
            main: PRIMARY_DARK,
            dark: PRIMARY_DARK,
            contrastText: '#fff',
        },//color='#267fd9'
        secondary: {
            light: SECONDARY_LIGHT,
            main: SECONDARY_MAIN,
            dark: '#121312',
            contrastText: '#fff',
        },
        warning: {
            main: amber[700]
        }
    },
    components: {
        MuiToolbar: {
            styleOverrides: {
                root: {
                    alignItems: 'start',
                    padding: 0,
                    '@media (min-width: 600px)': {
                        paddingLeft: 0,
                        paddingRight: 0,
                    }
                },
                dense: {
                    paddingLeft: 0,
                    paddingRight: 0,
                }
            },
        },
    },
});

export const buildTheme = (dir, lang)=>{
    return createTheme(themeConfig(dir), dir === 'ltr' ? enUS : heIL)
}
