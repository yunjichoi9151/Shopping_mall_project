import axios from 'axios';

async function fetchApi(method, endpoint, params = '', data = null) {
  const apiUrl = params ? `${endpoint}/${params}` : endpoint;
  try {
    const response = await axios({
      method,
      url: apiUrl,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // 서버가 에러 응답을 보냈을 때
      console.error(
        `Server Error : ${
          error.response.data.message || 'Unknown Server Error'
        }`
      );
    } else if (error.request) {
      // 서버 응답이 없을 때
      console.error('No response from server');
    } else {
      // 요청 설정 중 에러가 발생했을 때
      console.error(`Request Error : ${error.message}`);
    }
    throw error;
  }
}

export function get(endpoint, params = '') {
  return fetchApi('GET', endpoint, params);
}

export function post(endpoint, data) {
  return fetchApi('POST', endpoint, '', data);
}

export function put(endpoint, params = '', data) {
  return fetchApi('PUT', endpoint, params, data);
}

export function del(endpoint, params = '', data) {
  return fetchApi('DELETE', endpoint, params, data);
}
