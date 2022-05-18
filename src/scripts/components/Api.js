export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res, errorText) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(errorText);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this._handleResponse(res, 'Данные пользователя не получены');
    });
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this._handleResponse(res, 'Список карточек не получен');
    });
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._handleResponse(res, 'Данные пользователя не изменены');
    });
  }
}
