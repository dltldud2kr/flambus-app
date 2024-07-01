import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom';
import BackHeader from 'components/BackHeader';
import { utils } from 'utils/utils';
import { getSessionItem, setSessionItem } from 'utils/storage';

function SignUpPassword(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [inputPw,setInputPw] = useState('')
    const [inputCheckPw,setInputCheckPw] = useState('')



    const moveNickNamePage = () => {
        if(inputPw === inputCheckPw) {
            if(utils.isWeb) {
                navigate("/m/signup/nickName")
            } else {
                window.ReactNativeWebView.postMessage("GO_SIGNUP_NICKNAME_SCREEN")
            }

            //이메일정보와 비밀번호 정보 병합.
            setSessionItem("signup",{...getSessionItem("signup"),password : inputPw})

        } else {
            alert("비밀번호를 확인해주세요.")
        }
    }

    return (
        <>
        {utils.isWeb() ? <BackHeader /> : null}
        <div className="contents" id="contents" style = {{ height: utils.isWeb() ?  `calc(100vh - 50px)` : `100vh`}}>
 
            
            {/* <!-- 본문 --> */}
            <div className="Plogin" style = {{paddingTop:12}}>
             
                <div className = "f_login_box">
                    <span style = {{
                        fontSize: "24px",
                        fontWeight :"bold",
                    }}>비밀번호</span>
                    <input value = {inputPw} onChange ={e => setInputPw(e.target.value)} className = "login_input" id = "password_input" type = "password" placeholder='비밀번호를 입력해주세요.'/>
                </div>
        
                <div className = "f_login_box" style = {{marginTop:24}}>
                    <span style = {{
                        fontSize: "24px",
                        fontWeight :"bold",
                    }}>비밀번호 확인</span>
                    <input  value = {inputCheckPw} onChange ={e => setInputCheckPw(e.target.value)} className = "login_input"  id = "password_check_input"  type = "password" placeholder='다시한번 입력하세요.'/>
                </div>
        

            </div>
            <div class = "bottom_button" onClick = {moveNickNamePage}>
                <span>다음으로</span>
            </div>
        </div>
        </>
    );
}

export default SignUpPassword;