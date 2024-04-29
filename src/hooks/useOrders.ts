import { useContext } from 'react';

import { OrdersContext } from '../contexts/OrdersContext';

export function useOrders() {
  const ordersContext = useContext(OrdersContext);
  return ordersContext;
}
