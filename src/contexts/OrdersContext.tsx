import { ReactNode, createContext, useEffect, useState } from 'react';
import socketIO from 'socket.io-client';

import { Order } from '../@types/Order';
import { api } from '../services/api';

interface IOrdersContextData {
  orders: Order[];
  handleCancelOrder: (orderId: string) => void;
  handleUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersContext = createContext({} as IOrdersContextData);

export function OrdersProvider({ children }: OrdersProviderProps) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const io = socketIO('http://localhost:3333', {
      transports: ['websocket'],
    });

    io.on('orders@new', order =>
      setOrders(prevState => prevState.concat(order)),
    );
  }, []);

  useEffect(() => {
    api.get('orders').then(({ data }) => setOrders(data));
  }, []);

  function handleUpdateOrderStatus(orderId: string, status: Order['status']) {
    setOrders(prevState =>
      prevState.map(order =>
        order.id === orderId ? { ...order, status } : order,
      ),
    );
  }

  function handleCancelOrder(orderId: string) {
    setOrders(prevState => prevState.filter(order => order.id !== orderId));
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        handleCancelOrder,
        handleUpdateOrderStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
