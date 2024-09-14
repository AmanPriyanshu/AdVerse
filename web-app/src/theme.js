import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    neonPink: '#ff6ec7',
    neonBlue: '#1b03a3',
    neonGreen: '#39ff14',
    neonOrange: {
      50: '#ffedd4',
      100: '#ffdbb0',
      200: '#ffb780',
      300: '#ff904d',
      400: '#ff691a',
      500: '#ff5200',
      600: '#cc4200',
      700: '#993200',
      800: '#662100',
      900: '#331100',
    },
    background: '#0f0f0f',
    text: '#e0e0e0',
  },
  fonts: {
    heading: `'Orbitron', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          _checked: {
            bg: 'neonOrange.300',
            boxShadow: '0 0 10px #ff5200, 0 0 20px #ff5200',
            borderColor: 'neonOrange.300',
          },
          _hover: {
            boxShadow: '0 0 15px #ff5200, 0 0 30px #ff5200',
          },
          _focus: {
            boxShadow: '0 0 10px #ff5200, 0 0 20px #ff5200',
          },
        },
      },
    },
  },
  styles: {
    global: {
      'html, body, #root': {
        height: '100%',
        margin: '0',
        padding: '0',
      },
      body: {
        bg: 'background',
        color: 'text',
        backgroundImage: ``,  // Directly reference the image from the public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      },
    },
  },
  shadows: {
    neonGreen: '0 0 5px #39ff14, 0 0 10px #39ff14',
    neonPink: '0 0 5px #ff6ec7, 0 0 10px #ff6ec7, 0 0 15px #ff6ec7',
  },
});

export default theme;
