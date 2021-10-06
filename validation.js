module.exports = {
  // 데이터베이스에 존재하는 닉네임을 입력한 채 회원가입 버튼을 누른 경우 "중복된 닉네임입니다." 라는 에러메세지가 발생합니다.
  checkExistUserNickname: (userNickname) => {
    // 임의의 데이타베이스를 만듬
    const datas = [
      { userNickname: 'developer' },
      { userNickname: 'spaghetti' },
      { userNickname: 'coffeeLover' },
      { userNickname: 'admin' },
      { userNickname: 'hungryMan' },
    ];

    for (let data of datas) {
      // 중복일 경우,
      if (data.userNickname === userNickname) {
        console.log('중복된 닉네임입니다.');
        return false;
      }
    }
    return true;
  },

  // 비밀번호는 최소 4자 이상, 닉네임과 같은 값이 포함된 경우 회원가입 실패
  checkPasswordValidation: (userNickname, userPassword) => {
    // 비밀번호 4자 이상 입력 안했을 경우
    if (userPassword.length < 4) {
      return false;
    }

    // 닉네임과 같은 값이 포함된 경우
    if (userPassword.includes(userNickname)) {
      return false;
    }
    return true;
  },

  // 닉네임은 최소 3자 이상, 알파벳 대소문자, 숫자로만 구성 가능하게끔 하는 함수
  checkNicknameValidation: (userNickname) => {
    // 3자 이상 입력 안했을 경우.
    if (userNickname.length < 3) {
      return false;
    }

    // 대소문자 숫자 이외의 것이 포함되어 있을 경우
    const nicknameValidation = /^[a-zA-Z0-9]*$/;
    if (!nicknameValidation.test(userNickname)) {
      return false;
    }
    return true;
  },
  // 비밀번호가 일치하는지 여부 확인하는 함수
  checkMatchPassword: (userPassword, userPasswordConfirm) => {
    if (userPassword !== userPasswordConfirm) {
      return false;
    }
    return true;
  },
};
