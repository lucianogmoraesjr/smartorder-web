import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Router } from '../../Router';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Sidebar } from '../Sidebar';

import { Container } from './styles';

export function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Container>
        <Sidebar />
        <Router />
      </Container>
      <ToastContainer position="bottom-center" />
    </BrowserRouter>
  );
}
