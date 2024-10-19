import { fetchApi } from './fetchApi';

export async function postData(endpoint: string, payload: any) {
  const url = `https://back.navcer.cl/api/${endpoint}`;

  try {
    const data = await fetchApi(url, 'POST', payload);
    console.log('Данные отправлены:', data);
    return data;
  } catch (error) {
    console.error('Ошибка при выполнении POST-запроса:', error);
  }
}