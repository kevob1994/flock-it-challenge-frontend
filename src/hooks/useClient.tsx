import axios, { AxiosRequestConfig } from 'axios';
import { QueryCache } from 'react-query';
import * as AxiosLogger from 'axios-logger';

const queryCache = new QueryCache();

interface useClientI {
  client: ClientI;
}

interface FetchConfigI {
  method: string;
  body: any;
  headers: any;
}

type EndpointRequest = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ClientI {
  <T>(
    endpoint: string,
    type?: EndpointRequest,
    options?: {
      isAuthRequired?: boolean;
      data?: any;
      isMultipartForm?: boolean;
    }
  ): Promise<T>;
}

export const useClient = (): useClientI => {
  const client: ClientI = async (
    endpoint,
    type = 'GET',
    { data, isAuthRequired } = {}
  ) => {
    const config: AxiosRequestConfig = {
      method: type,
      url: endpoint,
      data,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    if (isAuthRequired) {
      const tokenStorage = localStorage.getItem('token');

      if (tokenStorage) {
        const token = await JSON.parse(tokenStorage);
        config.headers!.Authorization = `Bearer ${token}`;
      }
    }
		//@ts-ignore
		axios.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
		axios.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);

    const response = await axios(config);

    switch (response.status) {
      case 401:
        queryCache.clear();
        return Promise.reject({ message: 'Please re-authenticate.' });

      case 404:
        return Promise.reject({ message: 'Not found.' });

      case 200:
      case 201:
        return response.data;

      default:
        return Promise.reject({ message: 'Server unavailable.' });
    }
  };

  return { client };
};
