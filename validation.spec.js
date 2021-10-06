const { TestWatcher } = require('@jest/core');
const {
  checkNicknameValidation,
  checkPasswordValidation,
  checkMatchPassword,
  checkExistUserNickname,
} = require('./validation');

test('닉네임은 `최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)`로 이루어져 있어야 합니다.', () => {
  expect(checkNicknameValidation('admin19')).toEqual(true);
  expect(checkNicknameValidation('as')).toEqual(false);
  expect(checkNicknameValidation('1aa ')).toEqual(false);
  expect(checkNicknameValidation('1aa!@@!@')).toEqual(false);
  expect(checkNicknameValidation('admin1!')).toEqual(false);
  expect(checkNicknameValidation('!admin1')).toEqual(false);
  expect(checkNicknameValidation('adm in1')).toEqual(false);
  expect(checkNicknameValidation('_adm in1')).toEqual(false);
});

test('비밀번호는 `최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패합니다.', () => {
  expect(checkPasswordValidation('abcd', 'asdasd')).toEqual(true);
  expect(checkPasswordValidation('asd', 'asdasd')).toEqual(false);
  expect(checkPasswordValidation('najongsi', 'najongsi1212')).toEqual(false);
});

test('비밀번호 확인은 비밀번호와 정확하게 일치해야 합니다.', () => {
  expect(checkMatchPassword('password', 'password')).toEqual(true);
  expect(checkMatchPassword('passWord', 'password')).toEqual(false);
  expect(checkMatchPassword(' password', 'password')).toEqual(false);
});

test('데이터베이스에 존재하는 닉네임을 입력한 채 회원가입 버튼을 누른 경우 "중복된 닉네임입니다.', () => {
  expect(checkExistUserNickname('beauty')).toEqual(true);
  expect(checkExistUserNickname('developer')).toEqual(false);
  expect(checkExistUserNickname('admin')).toEqual(false);
});
