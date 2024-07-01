import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom';
import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
import { api } from 'utils/customAxios';
import { utils } from 'utils/utils';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { getLocalItem, getSessionItem, removeLocalItem, removeSessionItem, setLocalItem } from 'utils/storage';
export const LoginContainer = styled.div`
    padding-Top:60px;
`


function KakaoMap(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const testXy = [
        {lat:37.54699,lng:127.095985,color:'yellow'},
        {lat:37.55439,lng:127.093484,color:'yellow'},
        {lat:37.55229,lng:127.092923,color:'black'},
        {lat:37.54699,lng:127.095281,color:'yellow'},
        {lat:37.55429,lng:127.093322,color:'yellow'},
        {lat:37.55329,lng:127.092514,color:'black'},
        {lat:37.52619,lng:127.105386,color:'black'},
        {lat:37.53569,lng:127.215985,color:'yellow'},
        {lat:37.53299,lng:127.924684,color:'black'},
        {lat:37.51429,lng:127.052913,color:'yellow'},
        {lat:37.53290,lng:127.045282,color:'yellow'},
        {lat:37.54699,lng:127.095283,color:'yellow'},
        {lat:37.57449,lng:127.102324,color:'yellow'},
        {lat:37.56329,lng:127.092517,color:'black'},
        {lat:37.57219,lng:127.115382,color:'black'},
        {lat:37.57221,lng:127.215981,color:'yellow'},
        {lat:37.57224,lng:127.924686,color:'black'},
        {lat:37.57234,lng:127.052919,color:'yellow'},
        {lat:37.57310,lng:127.045280,color:'yellow'},
    ]


    const clickGoStoreInfo = () => {
        if(utils.isWeb) {
            navigate("/m/store?id=1")
        } else {
            window.ReactNativeWebView.postMessage("GO_STORE_INFO_SCREEN")
        }
    }



    return (
        <Map // 지도를 표시할 Container
            center={{
                // 지도의 중심좌표
                lat: 37.54699,
                lng: 127.09598,
            }}
            style={{
                // 지도의 크기
                width: "100%",
                height: "100%",
            }}
            level={4} // 지도의 확대 레벨
        >
            {testXy.map((v,i) => {
                return(
                    <MapMarker // 마커를 생성합니다
                    clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
                    onClick={clickGoStoreInfo}
                    position={{
                        // 마커가 표시될 위치입니다
                        lat: v.lat,
                        lng: v.lng,
                    }}
                    image={{
                        src: `/assets/images/${v.color}_marker.png`, // 마커이미지의 주소입니다
                        size: {
                            width: 54,
                            height: 59,
                        }, // 마커이미지의 크기입니다
                        options: {
                            offset: {
                                x: 27,
                                y: 50,
                            }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                        },
                    }}
                />
                )
            })}
        </Map>
    );
}

export default KakaoMap;