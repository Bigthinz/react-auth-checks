import axios from 'axios';

const api = axios.create({
  baseURL: 'https://airbnb-clone-apis.onrender.com',
  timeout: 1000,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      try {
        const response = await api.post('/refresh_token', {
          refresh_token: refreshToken,
        });
        api.defaults.headers.common.Authorization =
          'Bearer ' + response.data.access_token;
        return api(originalRequest);
      } catch (e) {
        console.log('Error refreshing token: ', e.message);
      }
    }
    return Promise.reject(error);
  }
);
