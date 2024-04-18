import { CanceledError } from 'axios';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Order } from '../@types/Order';
import OrdersService from '../services/OrdersService';
import { webSocketClient } from '../services/webSocketClient';

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
    function handleNewOrder(order: Order) {
      setOrders(prevState => prevState.concat(order));
    }

    webSocketClient.on('orders@new', handleNewOrder);

    return () => {
      webSocketClient.off('orders@new', handleNewOrder);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchOrders() {
      try {
        const { data } = await OrdersService.listOrders(controller.signal);

        setOrders(data);
      } catch (error) {
        if (error instanceof CanceledError) return;

        toast.error('Ocorreu um erro ao listar os pedidos!');
      }
    }

    fetchOrders();

    return () => controller.abort();
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
