import { Axios } from 'axios';

import { api } from './api';

class HistoryService {
  private api: Axios;

  constructor() {
    this.api = api;
  }

  async listHistory(signal?: AbortSignal) {
    return this.api.get('/history', { signal });
  }
}

export default new HistoryService();
