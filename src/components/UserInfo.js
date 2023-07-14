export class UserInfo {
    constructor({ nameSelector, activitySelector }) {
        this._name = document.querySelector(nameSelector);
        this._activity = document.querySelector(activitySelector);
        this._avatar = document.querySelector('.profile__avatar');
    }
    getUserInfo() {
        return {
            name: this._name.textContent,
            activity: this._activity.textContent,
            id: this._userId
        }
    }
    setUserInfo(userData) {
        this._name.textContent = userData.name;
        this._activity.textContent = userData.activity;
        this._userId = userData.userId;
        
    }
    setUserAvatar(userData) {
        this._avatar.src = userData.avatar;
    }
}