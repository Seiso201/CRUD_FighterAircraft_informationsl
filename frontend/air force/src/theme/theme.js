import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6', // สีหลัก
    },
    secondary: {
      main: '#19857b', // สีรอง
    },
    background: { 
      default: '#1cbeaeff' 
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        contained: {
        backgroundColor: '#166b63ff',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#104a44ff',
        },
      },
      root: {
        borderRadius: 12,
      },
    },
  
    },
  },
});

export default theme;