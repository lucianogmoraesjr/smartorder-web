import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';

import { Router } from '../../Router';
import { GlobalStyles } from '../../styles/GlobalStyles';
import defaultTheme from '../../styles/themes/default';
import { Sidebar } from '../Sidebar';

import { Container } from './styles';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <GlobalStyles />
        <Container>
          <Sidebar />
          <Router />
        </Container>
        <ToastContainer position="bottom-center" />
      </BrowserRouter>
    </ThemeProvider>
  );
}
