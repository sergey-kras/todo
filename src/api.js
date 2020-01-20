import axios from 'axios';

const http = axios.create({
  baseURL: '/api/v1/',
  timeout: 1000,
});

export function login({ login, password }) {
  return http.post('/login', { login, password })
    .then((data) => true)
    .catch((err) => false);
}

export function getItems() {
  return http.get('/items')
    .then((response) => response)
    .catch((err) => false);
}

export function updateItems(data) {
  return http.post('/items', { items: JSON.stringify(data) })
    .then((data) => true)
    .catch((err) => false);
}
