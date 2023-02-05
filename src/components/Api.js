export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfileData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        "name": data.name,
        "about": data.about
      })
    })
      .then(res => this._checkResponse(res));
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ "avatar": data.avatar })
    })
      .then(res => this._checkResponse(res));
  }

  addNewPlace(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "name": data.name,
        "link": data.link
      })
    })
      .then(res => this._checkResponse(res));
  }

  deletePlace(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res));
  }

}
