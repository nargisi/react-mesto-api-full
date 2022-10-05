import { API_CONFIG } from './constants';

class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  updateProfile({ name, job }) {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, about: job }),
    }).then(this._checkResponse);
  }

  addNewCard({ place, href }) {
    return fetch(`${this._baseURL}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name: place, link: href }),
    }).then(this._checkResponse);
  }

  deleteOwnCard(id) {
    return fetch(`${this._baseURL}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editUserAvatar(avatar) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ avatar: avatar }),
    }).then(this._checkResponse);
  }

  changeCardLike(id, isLiked) {
    return fetch(`${this._baseURL}/cards/likes/${id}`, {
      method: isLiked ? 'PUT' : 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const api = new Api(API_CONFIG);

export default api;
