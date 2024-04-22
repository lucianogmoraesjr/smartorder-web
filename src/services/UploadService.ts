import axios, { Axios } from 'axios';

import { api } from './api';

class UploadService {
  private api: Axios;

  constructor() {
    this.api = api;
  }

  async getSignedUrl(fileName: string) {
    const { data } = await this.api.post<{ signedUrl: string }>(
      'upload/get-signed-url',
      {
        key: fileName,
      },
    );

    return data;
  }

  async uploadFile(signedUrl: string, file: File, contentType: string) {
    await axios.put(signedUrl, file, {
      headers: {
        'Content-Type': contentType,
      },
    });
  }
}

export default new UploadService();
