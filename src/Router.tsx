import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Menu } from './pages/Menu';
import { Categories } from './pages/Menu/Categories';
import { Products } from './pages/Menu/Products';

function NoMatch() {
  return (
    <>
      <h1>Not found</h1>
    </>
  );
}

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="menu" element={<Menu />}>
          <Route index element={<Navigate to="products" replace />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
