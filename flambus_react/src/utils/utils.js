import { userApi } from "api/apis";
import { removeSessionItem, setSessionItem } from "./storage";

export const utils = {}

//현재 사용자가 웹 화면에서 보고있는지, 디바이스 화면에서 보고있는지 확인
utils.isWeb = () => {
    if(!window.ReactNativeWebView) {
        return true;
    } else {
        return false;
    }
}

/**
 * 이메일 주소를 검증하는 함수입니다.
 * @auther 최성우
 * @param {string} email - 검증할 이메일 주소
 * @returns {boolean} - 이메일 주소가 유효한 경우 true, 그렇지 않으면 false
 */

utils.checkEmailValid = (email) => {
    // 이메일 정규식
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // 정규식 테스트
  return emailRegex.test(email);
}

//세션에 현재 사용자 정보를 업데이트함.
utils.updateUserInfoSession = (idx) => {
    userApi.getUserInfo(idx).then((user)=>{
        // console.log("useruser : ",user)
        removeSessionItem("userInfo")
        setSessionItem("userInfo",user.data);
    })
}