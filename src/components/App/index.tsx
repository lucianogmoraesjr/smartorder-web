import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';

import { OrdersProvider } from '@/contexts/OrdersContext';

import { AuthProvider } from '../../contexts/AuthContext';
import { Router } from '../../routes/Router';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { defaultTheme } from '../../styles/themes/default';

export function App() {
  return (
    <AuthProvider>
      <OrdersProvider>
        <ThemeProvider theme={defaultTheme}>
          <BrowserRouter>
            <GlobalStyles />
            <Router />
            <ToastContainer position="bottom-center" />
          </BrowserRouter>
        </ThemeProvider>
      </OrdersProvider>
    </AuthProvider>
  );
}
