export async function sendRequest(url: string, method: string, data: any) {
  const header: any = {
    method: method,
    headers: {},
  };

  if (method === 'POST' || method === 'PUT') {
    header.headers['Content-Type'] = 'application/json';
    header.body = JSON.stringify(data);
  }

  return await fetch(url, header).then((request) => request.json());
}
