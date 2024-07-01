import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CollapseTab from 'components/CollapseTab';



function WriteReview(props) {
    return (
        <div className="contents" id="contents">
            <span>수기일지</span>
        </div>
    )

}
export default WriteReview;