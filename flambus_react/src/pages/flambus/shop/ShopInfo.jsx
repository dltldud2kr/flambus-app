import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CollapseTab from 'components/CollapseTab';
import { shopApi } from 'api/apis';
import BackHeader from 'components/BackHeader';
import { utils } from 'utils/utils';

// export const LoginContainer = styled.div`
//     padding-Top:60px;
// `


function ShopInfo(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    //요청한 스토어 idx
    const [storeIdx, setStoreIdx] = useState(searchParams.get("idx"))
    const [storeInfo,setStoreInfo] = useState(
        {
            "storeIdx": 1,
            "storeName": "최성우의 가게입니다.",
            "storeAddress": "경북경산시ㅣㄸ",
            "contactNumber": "0000-222-222",
            "expJournalsCount": 4,
            "ownExpSiteCount": 20,
            "representTag": {
              "additionalProp1": {},
              "additionalProp2": {},
              "additionalProp3": {}
            },
            "representJournal": {
              "reviewIdx": 0,
              "likeCount": 0,
              "creator": {
                "additionalProp1": {},
                "additionalProp2": {},
                "additionalProp3": {}
              },
              "reviewImage": [
                {
                  "additionalProp1": {},
                  "additionalProp2": {},
                  "additionalProp3": {}
                }
              ]
            }
          }
    )

    useEffect(() => {
        shopApi.getShopInfo(storeIdx).then((result)=>{
            setStoreInfo(result.data)
        })
    },[])
    
    return (
        <>
        {utils.isWeb() ? <BackHeader /> : null}
        <div className="contents shop_info_wrap" id="contents"  style = {{ height: utils.isWeb() ?  `calc(100vh -113px)` : `100vh`}}>
 



            <div className="Plogin"  style = {{ height: utils.isWeb() ?  `calc(100vh -113px)` : `100vh`}}>
                <div class="storeTopWrap">
                    <div class="sub_menu">
                        <div class="left">
                            <span style={{ fontSize: 12, fontWeight: 600, color: '#B77719' }}>신선했던</span>
                        </div>
                        <div class="right">
                            <span style={{ fontSize: 12, fontWeight: 600, color: '#B77719' }}>나만의 탐험지</span>
                        </div>
                    </div>
                    <div class="title_area">
                        <div class="title_text">
                            <span style={{ coor: '#111', fontWeight: '800', fontSize: 24 }}>{storeInfo.storeName}</span>
                        </div>
                        <div class="store_info_wrap">
                            <div class="left" style={{ gap: 4 }} onClick={() => alert("준비중")}  >
                                <img src="/assets/images/zzim_icon.png" />
                                <span style={{ fontSize: 14, marginTop: 2 }}>{storeInfo.ownExpSiteCount}</span>
                            </div>
                            <div class="right" onClick={() => alert("준비중")} >
                                <span style={{ fontWeight: 'bold', fontSize: 14 }}>탐험일지</span><span style={{ marginLeft: 8, fontSize: 14 }}>{storeInfo.expJournalsCount}개</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="address_wrap" style={{ marginTop: 22, lineHeight: '22px' }}>
                            <span style={{ minWidth: 60, fontSize: 14, fontWeight: 600 }}>주소</span>
                            <span style={{ fontSize: 14 }}>{storeInfo.storeAddress}</span>
                        </div>
                        <div class="address_wrap" style={{ lineHeight: '22px' }}>
                            <span style={{ minWidth: 60, fontSize: 14, fontWeight: 600 }}>전화번호</span>
                            <span style={{ fontSize: 14 }}>{storeInfo.contactNumber}</span>
                        </div>
                    </div>
                </div>
                <div class="title_area_div" />
                <div class="storeBottomWrap" style = {{ height: utils.isWeb() ?  `calc(100vh - 365px)` : `calc(100vh - 318px)`}}>
                    <div class="container">
                        {/* <span style={{ fontSize: 16,marginBottom:12, fontWeight: '600' }}>다른 탐험가들의 탐험일지에요!</span> */}
                        {/* <div class = "filter_button">
                             <img src="/assets/images/filter.png" />
                            <span style = {{fontSize:14,fontWeight:400}}>필터</span>
                        </div> */}
                        <div class = "collpase_tab_view">
                            <CollapseTab />
                        </div>
                    </div>

                </div>
                
                <div id = 'create_review' className="bottom_button">
                <span>탐험일지 작성하기</span>
                </div>
            </div>

        </div>
        </>
    )

}
export default ShopInfo;