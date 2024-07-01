import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom';
import BackHeader from 'components/BackHeader';
import { utils } from 'utils/utils';
import { getSessionItem, setSessionItem } from 'utils/storage';

function SignUpNickName(props) {
    const [nickName,setNickName] = useState('')

    const navigate = useNavigate();
    const location = useLocation();


    const moveNickNamePage = () => {
        if (nickName.length <= 0) {
            alert("닉네임을 입력해주세요.")
            return;
        }
        if (nickName.length <= 4) {
            alert("닉네임이 짧아요.")
            return;
        }

        if(utils.isWeb) {
            navigate("/m/signup/complete")
        } else {
            window.ReactNativeWebView.postMessage("GO_SIGNUP_COMPLETE_SCREEN")
        }
        //기존 정보와 닉네임 정보 병합.
        setSessionItem("signup",{...getSessionItem("signup"), nickName:nickName})

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
                    }}>닉네임</span>
                    <input value = {nickName} onChange = {(e)=>setNickName(e.target.value)}className = "login_input" type = "text" placeholder='사용할 닉네임을 입력해주세요.'/>
                </div>


            </div>
            <div class = "bottom_button" onClick = {moveNickNamePage}>
                <span>다음으로</span>
            </div>
        </div>
        </>
    );
}

export default SignUpNickName;