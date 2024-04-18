import { Axios } from 'axios';

import { User, UserRequestBody } from '../@types/User';

import { api } from './api';

class UsersService {
  private api: Axios;

  constructor() {
    this.api = api;
  }

  async listUsers() {
    const { data } = await this.api.get<User[]>('users');
    return data;
  }

  async getUser() {
    const { data } = await this.api.get<User>('users/me');
    return data;
  }

  async getUserById(id: string) {
    const { data } = await this.api.get<User>(`users/${id}`);
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
