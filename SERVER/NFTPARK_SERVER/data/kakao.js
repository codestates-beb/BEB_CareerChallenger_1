class KakaoInfo {
  constructor(id, nickname, profile_image, address) {
    this.id = id;
    this.nickname = nickname;
    this.profile_image = profile_image;
    this.address = address;
  }
  get json() {
    const data = {
      id: this.id,
      nickname: this.nickname,
      profile_image: this.profile_image,
      address: this.address,
    };
    return data;
  }
}

const KakaoMessage = (accessToken) => {
  let headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Bearer " + accessToken,
  };
  let dataString = `template_object={
    "object_type": "text",
    "text": "로그인 메시지입니다!",
    "link": {
        "web_url": "https://www.naver.com",
        "mobile_web_url": "https://www.naver.com"
    },
    "button_title": "바로 확인"
    }`;

  const Message = {
    url: "https://kapi.kakao.com/v2/api/talk/memo/default/send",
    method: "POST",
    headers: headers,
    data: dataString,
  };
  return Message;
};
module.exports = {
  KakaoInfo,
  KakaoMessage,
};
