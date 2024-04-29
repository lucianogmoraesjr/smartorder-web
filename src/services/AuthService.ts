import { Axios } from 'axios';

import { api } from './api';

interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
}

class AuthService {
  private api: Axios;

  constructor() {
    this.api = api;
  }

  async signIn({ email, password }: SignInRequest) {
    const { data } = await this.api.post<SignInResponse>('authenticate', {
      email,
      password,
    });

    return data;
  }
}

export default new AuthService();
