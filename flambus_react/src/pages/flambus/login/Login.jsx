import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import LoginContent from 'pages/flambus/login/LoginContent';
import URL from 'constants/url';

function Login(props) {
    // console.group("EgovLogin");
    // console.log("[Start] EgovLogin ------------------------------");
    // console.log("EgovLogin [props] : ", props);

    const LoginContainer = styled.div`
        background-color: skyblue;
        font-size: 30px;
    `

    const onChangeLogin = (user) => {
        props.onChangeLogin(user);
    }



    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                {/* <!--// Location --> */}
                <div className="layout">
                    <LoginContent
                        onChangeLogin={onChangeLogin}
                    ></LoginContent>
                </div>
            </div>
        </div>
    );
}

export default Login;