import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CollapseTab from 'components/CollapseTab';

// export const LoginContainer = styled.div`
//     padding-Top:60px;
// `


function PhotoReview(props) {

    return (
        <div className="contents photo_review_wrap" id="contents">
            <div className ="imagebox" >
                 <img src="/assets/images/sample_food.jfif" />
                 <img src="/assets/images/sample_food.jfif" />
                 <img src="/assets/images/sample_food.jfif" />
            </div>
            <div className = "reivew_text_box">
                <div className = "tag_box">
                    <div className = "tag">
                        <span>사장님이 친절했던</span>
                    </div>
                    <div className = "tag">
                        <span>신선했던</span>
                    </div>
                </div>
                <div className = "review_text">
                    <span style = {{fontSize:14,color:'#1A1A1A',lineHeight:'20px'}}>음식이 너무 신선하고 맛있어서 다음에 또 갈 것 같아요. 파스타는 부드러운게 목을 바로 넘어가서 물이 필요했지만 피자는 맵고 달고 쓰고 개코 핸들이 고장난 8톤 트럭급으로 맛잇는것같아요.</span>
                </div>

            </div>
        </div>
    )

}
export default PhotoReview;