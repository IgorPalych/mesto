export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._name.textContent;
    userInfo.about = this._about.textContent;
    return userInfo;
  }

  renderUserInfo({ name, about }) {

    if (name && about) {
      this._name.textContent = name;
      this._about.textContent = about;
    } else {
      console.log('Сервер не передал значения');
    }
  }

  renderAvatar({ avatar }) {
    if (avatar) {
      this._avatar.src = avatar;
    } else {
      console.log('Сервер не передал значения');
    }
  }

}
