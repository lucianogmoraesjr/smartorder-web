export interface User {
  id: string;
  name: string;
  email: string;
  role: 'WAITER' | 'ADMIN';
}

export interface UserRequestBody {
  name: string;
  email: string;
  password: string;
  role: 'WAITER' | 'ADMIN';
}
