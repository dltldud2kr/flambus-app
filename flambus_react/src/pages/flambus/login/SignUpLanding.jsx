import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom';
import BackHeader from 'components/BackHeader';
import { api } from 'utils/customAxios';
import { utils } from 'utils/utils';
import { getSessionItem, removeSessionItem } from 'utils/storage';


function SingUpLanding(props) {
    console.group("EgovLoginContent");
    console.log("[Start] EgovLoginContent ------------------------------");
    console.log("EgovLoginContent [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();

    const moveAppStart = () => {
        //이메일 인증 로직 체크
        let request = {...getSessionItem("signup"),platform:0}
        console.log("request : ",request)
        api.post('/api/v1/auth/join',request)
        .then(res => {
            if(res.data.success && res.data.data) {
                //중복된 이메일이 존재하지 않음.
                if(utils.isWeb) {
                    navigate("/m/main")
                } else {
                    window.ReactNativeWebView.postMessage("GO_MAIN_SCREEN")
                }
                removeSessionItem("signup");
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
        <div className="contents landingWrap" id="contents" style = {{height:'100vh'}}>    
            {/* <!-- 본문 --> */}
            <div className="Plogin" style = {{paddingTop:12}}>
                <div class ="welcom_imag">
                <img style = {{
                    padding:"0px 20px",
                    width: '100%',
                    height: '80%',
                }}
                src="/assets/images/welcome.png" alt="단순 홈페이지 전자정부 표준프레임워크의 경량환경 내부업무에 대한 최신 정보와 기술을 제공하고 있습니다." />
                </div>
                <div class = "main_title" >
                    <span>플램버스의 새로운 친구</span>
                    <span>진심으로 환영해요</span>
                </div>
                <div class = "sub_ttle">
                    <span>플램버스의 새로운 친구</span>
                    <span>진심으로 환영해요</span>
                </div>
            </div>
            <div class = "bottom_button" onClick = {moveAppStart}>
                <span>탐험시작</span>
            </div>
        </div>
        </>
    );
}

export default SingUpLanding;