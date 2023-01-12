class KakaoInfo {
  constructor(id, nickname, profile_image) {
    this.id = id;
    this.nickname = nickname;
    this.profile_image = profile_image;
  }
  get json() {
    const data = {
      id: this.id,
      nickname: this.nickname,
      profile_image: this.profile_image,
    };
    return data;
  }
}

module.exports = {
  KakaoInfo,
};
