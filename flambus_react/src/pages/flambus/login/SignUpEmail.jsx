import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom';
import * as EgovNet from 'api/egovFetch';
import { api } from 'utils/customAxios';
import { utils } from 'utils/utils';
import { setSessionItem } from 'utils/storage';
import BackHeader from 'components/BackHeader';

export const LoginContainer = styled.div`
    padding-Top:60px;
`


function SignUpEmail(props) {
    console.group("EgovLoginContent");
    console.log("[Start] EgovLoginContent ------------------------------");
    console.log("EgovLoginContent [props] : ", props);


    const navigate = useNavigate();
    const location = useLocation();

    //이메일을 검증하고 비밀번호 입력 화면으로 이동합니다.
    const movePasswordPage = () => { 
        const userEmail = document.getElementById("email_input").value;
        
        //이메일 관련 예외처리.
        if(userEmail.length === 0) {
            alert("이메일을 입력해주세요.");
            return;
        }
        // 이메일 주소 검증 및 결과 출력
        if (!utils.checkEmailValid(userEmail)) {
            alert("올바른 이메일 형식이 아닙니다.");
            return;
        } 

        api.get('/api/v1/auth/checkEmail', { 
            email: userEmail,
        })
        .then(res => {
            console.log("Res", res)
            if(res.data.success && res.data.data) {
                //중복된 이메일이 존재하지 않음.
                if(utils.isWeb) {
                    navigate("/m/signup/pw")
                } else {
                    window.ReactNativeWebView.postMessage("GO_SIGNUP_PASSWORD_SCREEN")
                }
               setSessionItem("signup", {email : userEmail})
                
            } 
            else {
                //중복된 이메일이 존재
                alert("중복된 이메일이 존재합니다.")
                return;
            }
        })
        .catch(error => {
            console.log("error /api/v1/auth/checkEmail : " + error)
        });
    }


    return (
        <>
        {utils.isWeb() ? <BackHeader /> : null}
        <div className="contents" id="contents" style = {{ height: utils.isWeb() ?  `calc(100vh - 50px)` : `100vh`}}>
            <div className="Plogin" style={{ paddingTop: 12 }}>
                <div className="f_login_box">
                    <span style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                    }}>이메일</span>
                    <input className="login_input" id = "email_input" type="text" placeholder='이메일을 입력해주세요.' />
                </div>
            </div>
            <div className="bottom_button" onClick={movePasswordPage}>
                <span>다음으로</span>
            </div>
        </div>

        </>
    );
}

export default SignUpEmail;