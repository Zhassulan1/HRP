export async function fetchApi(url: string, method = 'GET', body = null, headers = {}) {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });
  
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error(`Ошибка при выполнении ${method}-запроса:`, error);
      throw error; // Чтобы можно было обрабатывать ошибку в месте вызова функции
    }
  }