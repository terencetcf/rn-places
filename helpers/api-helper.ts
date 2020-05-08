const apiUrl = 'https://tt-shoping.firebaseio.com';
const headers = {
  'Content-Type': 'application/json',
};

const appFetch = async (
  input: RequestInfo,
  init?: RequestInit,
  token?: string,
  throwErrorIfStatusNotOk: boolean = true
): Promise<Response> => {
  try {
    if (token && typeof input === 'string') {
      input = `${input}?auth=${token}`;
    }

    const response = await fetch(input, init);

    if (!response.ok && throwErrorIfStatusNotOk) {
      const errData = await response.json();
      console.log('apiHelper - appFetch - err', errData);
      throw new Error('Error while communicating with server!');
    }

    return response;
  } catch (err) {
    console.log('apiHelper - appFetch - err', err);
    throw err;
  }
};

export default {
  get: async (
    apiPath: string,
    token?: string,
    throwErrorIfStatusNotOk: boolean = true
  ) => {
    const response = await appFetch(
      `${apiUrl}/${apiPath}.json`,
      {
        method: 'GET',
        headers,
      },
      token,
      throwErrorIfStatusNotOk
    );

    return await response.json();
  },
  post: async (
    apiPath: string,
    data: any,
    token?: string,
    throwErrorIfStatusNotOk: boolean = true
  ) => {
    const url =
      apiPath.indexOf('http') === 0 ? apiPath : `${apiUrl}/${apiPath}.json`;
    const response = await appFetch(
      url,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      },
      token,
      throwErrorIfStatusNotOk
    );

    return await response.json();
  },
  patch: async (
    apiPath: string,
    data: any,
    token?: string,
    throwErrorIfStatusNotOk: boolean = true
  ) => {
    return await appFetch(
      `${apiUrl}/${apiPath}.json`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data),
      },
      token,
      throwErrorIfStatusNotOk
    );
  },
  delete: async (
    apiPath: string,
    token?: string,
    throwErrorIfStatusNotOk: boolean = true
  ) => {
    return await appFetch(
      `${apiUrl}/${apiPath}.json`,
      {
        method: 'DELETE',
        headers,
      },
      token,
      throwErrorIfStatusNotOk
    );
  },
};
