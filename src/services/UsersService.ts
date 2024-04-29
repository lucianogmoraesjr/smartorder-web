import { Axios } from 'axios';

import { User, UserRequestBody } from '../@types/User';

import { api } from './api';

class UsersService {
  private api: Axios;

  constructor() {
    this.api = api;
  }

  async listUsers(signal?: AbortSignal) {
    const { data } = await this.api.get<User[]>('users', {
      signal,
    });
    return data;
  }

  async getUser(signal?: AbortSignal) {
    const { data } = await this.api.get<User>('users/me', { signal });
    return data;
  }

  async getUserById(id: string, signal?: AbortSignal) {
    const { data } = await this.api.get<User>(`users/${id}`, {
      signal,
    });
    return data;
  }

  async createUser(data: UserRequestBody) {
    const { data: user } = await this.api.post<User>('users', data);
    return user;
  }

  async updateUser(id: string, data: UserRequestBody) {
    const { data: user } = await this.api.put<User>(`users/${id}`, data);
    return user;
  }

  deleteUser(id: string) {
    return this.api.delete(`users/${id}`);
  }
}

export default new UsersService();
