import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';

import URL from 'constants/url';
import CODE from 'constants/code';
import { getSessionItem, setSessionItem } from 'utils/storage';

//뒤로가기 헤더 
function BackHeader() {
    return (
        // <!-- header -->
        <div className="back_header_wrap">
            <div style = {{
                width:"60px",
                height:"50px",
                display:"flex",
                alignItems:'center',
                justifyContent :'center',
                }}
                onClick = {()=> window.location.replace("/m/login")}>
                <img src="/assets/images/back_arrow.png" alt="." />
            </div>
        </div>
        // <!--// header -->
    );
}

export default BackHeader;