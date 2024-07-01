import React,{useEffect} from 'react';
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom';
import URL from 'constants/url';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { utils } from 'utils/utils';
import { api } from 'utils/customAxios';
import { userApi } from 'api/apis';
import { getSessionItem } from 'utils/storage';
import KakaoMap from './KakaoMap';

function Main(props) {
    const navigate = useNavigate();
    useEffect(() => {
        //현재 접속한 사용자 정보 세션에 세팅
        utils.updateUserInfoSession(2)

        //지도 마커 정보 요청
        getMarkerData();
        
    },[])

    //현재 등록된 맛집 데이터 조회.
    const getMarkerData = () => {
        api.get('/api/v1/map/store',{})
        .then(res => {
            if(res.data.success && res.data.data) {
                console.log("marker res",res)
             
            }
            else {
                console.log("error")
                return;
            }
        })
        .catch(error => {
            console.log("error /api/v1/auth/checkEmail : " + error)
        });
    }

    

    const clickGoStoreInfo = () => {
        if(utils.isWeb) {
            navigate("/m/store?id=1")
        } else {
            window.ReactNativeWebView.postMessage("GO_STORE_INFO_SCREEN")
        }
    }


    const open_dotori_modal = () => {
        const modal = document.querySelector('.dotori_scroll');
    
        if (modal.classList.contains("modal_close")) {
            // If modal is closed, open it with a smooth animation
            modal.style.height = '210px';
            modal.classList.remove("modal_close");
            modal.classList.add("modal_open");
            modal.style.padding = '0px 18px';
            setTimeout(()=>{
                toggleElementDisplay(modal, 'flex');
            },300)
        } else {
            // If modal is open, close it with a smooth animation
            modal.style.height = '0';
            // modal.style.padding = '0px 18';
            modal.classList.remove("modal_open");
            modal.classList.add("modal_close");
            toggleElementDisplay(modal, 'none');
        }
    }
    
    function toggleElementDisplay(element, displayValue) {
        const childElements = element.children;
        for (let i = 0; i < childElements.length; i++) {
            childElements[i].style.display = displayValue;
        }
    }
    
    return (
        <div className="main_wrap">
            <div class = "main_header">
                <span style = {{
                    fontSize:"20px",
                    fontWeight:600,
                }}>탐험</span>
                <div class = "main_item">
                    <input style = {{
                        borderRadius : 12
                    }} className = "main_top_input" type = "text" placeholder='경산시 하양읍 탐험중'/>
                    <div class = "dotori_count" onClick = {open_dotori_modal}>
                        <img style = {{}}src="/assets/images/yellow_dotori.png" alt=""/>
                        <div class = "segment"/>
                        <div class = "dotricount"><span>{getSessionItem("userInfo").acornsCount}</span></div>

                    </div>
                </div>
            </div>
            <div class = "dotori_scroll modal_close">
                <div class = "tag">
                    <span>
                    도토리 보급까지 6일
                    </span>
                </div>
                <div class = "message">
                    <span>현재 남아있는 도토리가 없어요</span>
                </div>
                
                <div class = "dotori_list">

                    <img style={{}} src={getSessionItem("userInfo").acornsCount >= 1 ? "/assets/images/yellow_dotori.png" : "/assets/images/gray_dotori.png"} alt="" />
                    <img style={{}} src={getSessionItem("userInfo").acornsCount >= 2 ? "/assets/images/yellow_dotori.png" : "/assets/images/gray_dotori.png"} alt="" />
                    <img style={{}} src={getSessionItem("userInfo").acornsCount >= 3 ? "/assets/images/yellow_dotori.png" : "/assets/images/gray_dotori.png"} alt="" />
                    <img style={{}} src={getSessionItem("userInfo").acornsCount >= 4 ? "/assets/images/yellow_dotori.png" : "/assets/images/gray_dotori.png"} alt="" />
                    <img style={{}} src={getSessionItem("userInfo").acornsCount >= 5 ? "/assets/images/yellow_dotori.png" : "/assets/images/gray_dotori.png"} alt="" />
                </div>

                <div class = "help_message">
                    <span>도토리는 매주 5개씩 보급 받을 수 있습니다.</span>
                    <span>탐험일지를 작성하면 도토리를 보급 받을 수 있어요.</span>
                    <span>탐험일지는 하루에 두번 작성 가능해요.</span>
                </div>

                    
            </div>
            <div class = "main_container">
                   
                   <KakaoMap />

                    {/* <div onClick = {clickGoStoreInfo}><span>가게 상세정보</span></div> */}
            </div>
        </div>
    );
}

export default Main;