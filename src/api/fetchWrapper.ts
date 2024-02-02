import {API} from "./API";

const headers = {
  'Content-Type': 'application/json',
};

export async function http( path: string, config: RequestInit ): Promise<any> {
  const request = new Request(path, config);
  const response = await fetch(request);

  return await response
    .json()
    .then(async result => {
      return { result, response };
    })
    .catch(err => {
      throw err;
    });
}


export async function httpQuery<T, U>( method: string, path: string, body?: T): Promise<U> {
  const token = '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';
  if (token) {
    const config = {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'Accept': 'application/json',
        'User-Agent': 'resume-view',
      },
      body: body ? JSON.stringify(body) : null,
    };

    const { result } = await http(`${API.baseURL}${path}`, config);

    return result;
  }
  return await http(`${API.baseURL}${path}`, { method, headers });
}
