import { Axios } from 'axios';

import { User } from '../@types/User';

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
}

export default new UsersService();
