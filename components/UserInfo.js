export default class UserInfo {
  constructor(selectors) {
    this._name = document.querySelector(selectors.name);
    this._job = document.querySelector(selectors.job);
  }
  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._name.textContent;
    userInfo.job = this._job.textContent;
    return userInfo;
  }

  setUserInfo(data) {
    console.log(data);
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }

}
