import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Menu } from '../pages/Menu';
import { Categories } from '../pages/Menu/Categories';
import { Products } from '../pages/Menu/Products';
import { Users } from '../pages/Users';

import { AuthGuard } from './AuthGuard';

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
      <Route element={<AuthGuard isPrivate />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="menu" element={<Menu />}>
            <Route index element={<Navigate to="products" replace />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="/users" element={<Users />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Route>

      <Route element={<AuthGuard />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
