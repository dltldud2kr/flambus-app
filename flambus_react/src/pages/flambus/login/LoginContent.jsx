import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom';
import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
import { api } from 'utils/customAxios';
import { utils } from 'utils/utils';
import { getLocalItem, getSessionItem, removeLocalItem, removeSessionItem, setLocalItem } from 'utils/storage';
import BackHeader from 'components/BackHeader';
export const LoginContainer = styled.div`
    padding-Top:60px;
`


function LoginContent(props) {
    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovLoginContent [location] : ", location);
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');



    //회원가입 버튼 클릭 이벤트
    const clickSignUp = () => {




        if(utils.isWeb) {
            navigate("/m/signup/email")
        } else {
            window.ReactNativeWebView.postMessage("GO_TO_EMAIL_SCREEN")
        }
    }

    const clickLogin = () => {
        if(userEmail.length === 0) {
            alert("이메일을 입력해주세요.")
            return;
        }
        
        if(password.length === 0) {
            alert("비밀번호를 입력해주세요.")
            return;
        }

        api.post('/api/v1/auth/login',{
            "email": userEmail,
            "password": password
        })
        .then(res => {
            if(res.data.success && res.data.data) {
                //기존에 로컬스토리지에 토큰이 남아있다면 토큰 제거.
                if(getLocalItem("accesstoken") || getLocalItem("accesstoken") != null) {
                    removeLocalItem("accesstoken");
                }

                //새로 발급된 토큰 저장
                setLocalItem("accesstoken" , res.data.accessToken);


                if(utils.isWeb) {
                    navigate("/m/main")
                } else {
                    window.ReactNativeWebView.postMessage("GO_MAIN_SCREEN")
                }
            } 
            else {
                if(res.data.resultCode == "NOT_FOUND_EMAIL") {
                    alert("사용자 정보를 확인해주세요.")
                }  else {
                    alert("로그인에 실패했습니다.")
                }
                return;
            }
        })
        .catch(error => {
            console.log("error /api/v1/auth/login : " + error)
        });

    }


    return (
        <div className="contents" id="contents" style = {{paddingTop:"20px"}}>
            {/* <!-- 본문 --> */}
            <div className="Plogin">
                <div className = "login_desc" style = {{
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "24px",
                    }}>
                    <span style = {{
                    textAlign:"left",
                    lineHeight:"35px",
                    marginBottom:"20px",
                    fontSize:"24px",
                    fontWeight:"bold",
                    }}><br/>플램버스와 함께<br/>나만의 맛집 지도를<br/>만들어봐요</span>
                    <span style = {{
                        textAlign:"left",
                        fontSize:"16px"}}>로그인
                        </span>
                </div>

                <div className = "f_login_box">
                    <input value = {userEmail} onChange = {(e)=> setUserEmail(e.target.value)} className = "login_input" type = "text" placeholder='아이디를 입력하세요.'/>
                    <input value = {password} onChange = {(e)=> setPassword(e.target.value)} className = "login_input" type = "password" placeholder='비밀번호를 입력하세요.'/>
                </div>



                <div className ="footer_login_box" style = {{marginTop:"32px",marginBottom:"12px", fontSize:"14px",color:"#111"}}>
                        <div className = "auto_login">
                            <span>자동 로그인</span>
                        </div>
                        <div className = "find_pw">
                            <span>비밀번호 찾기</span>
                        </div>
                </div>
                <div class = "login_button" onClick = {clickLogin}>
                    <span>로그인 하기</span>
                </div>

                <div class = "login_div">
                    <div class = "line"/>
                        <span>간편 로그인 하기</span>
                    <div class = "line"/>
                </div>

                <div class ="login_social_button">
                    
                 <img  onClick = {()=>alert("준비중")} src="/assets/images/google_icon.png" /> 
                 <img  onClick = {()=>alert("준비중")} src="/assets/images/kakao_icon.png" /> 
                 <img  onClick = {()=>alert("준비중")} src="/assets/images/naver_icon.png" /> 
                </div>
                <div class = "no_user_div" onClick = {clickSignUp}>
                    <span style = {{
                        color:'#999999',
                        fontSize:'14px',
                        fontWeight:400,
                    }}>계정이 없으시다면?</span>
                    <span style = {{
                        fontSize:'16px',
                        fontWeight:600,
                        textDecoration:'underline',
                        color:'#FFBA33',
                    }}>회원가입</span>

                </div>
            </div>
            {/* <!--// 본문 --> */}
        </div>
    );
}

export default LoginContent;