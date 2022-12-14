import tokenService from '../token/tokenService';
import endpoints from './endpoints';

export default {
  async getAll() {
    const token = tokenService.getToken();

    const init = {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    };

    const responseFetch = await fetch(endpoints.products, init);
    const response = {
      status: responseFetch.status,
      body: await responseFetch.json(),
    };
    return response;
  },
};
