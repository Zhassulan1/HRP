import { fetchApi } from './fetchApi';

export async function getData(endpoint: string) {
  const url = `https://back.navcer.cl/api/${endpoint}`;

  try {
    const data = await fetchApi(url, 'GET');
    console.log('Данные получены:', data);
    return data;
  } catch (error) {
    console.error('Ошибка при выполнении GET-запроса:', error);
  }
}