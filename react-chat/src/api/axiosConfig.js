import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json';

const accessToken = localStorage.getItem('accessToken');

if (accessToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
} else {
  console.error('accessToken not');
}

export default axios;
