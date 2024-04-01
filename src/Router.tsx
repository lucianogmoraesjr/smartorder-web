import { Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { Products } from './pages/Products';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
}
