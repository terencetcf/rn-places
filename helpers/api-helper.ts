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

    console.log(input);

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
    apiUrl: string,
    token?: string,
    throwErrorIfStatusNotOk: boolean = true
  ) => {
    const response = await appFetch(
      apiUrl,
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
    apiUrl: string,
    data: any,
    token?: string,
    throwErrorIfStatusNotOk: boolean = true
  ) => {
    const response = await appFetch(
      apiUrl,
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
    apiUrl: string,
    data: any,
    token?: string,
    throwErrorIfStatusNotOk: boolean = true
  ) => {
    return await appFetch(
      apiUrl,
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
    apiUrl: string,
    token?: string,
    throwErrorIfStatusNotOk: boolean = true
  ) => {
    return await appFetch(
      apiUrl,
      {
        method: 'DELETE',
        headers,
      },
      token,
      throwErrorIfStatusNotOk
    );
  },
};
