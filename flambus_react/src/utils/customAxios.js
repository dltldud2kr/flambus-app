import axios from "axios"
import { SERVER_URL } from '../config';
// import cookies from 'js-cookie';
// import * as jwt from 'jsonwebtoken';

const baseURL = `http://203.232.55.40:8080`;
export const customAxios = axios.create({
  baseURL: baseURL, // 기본 서버 주소 입력
  headers: {
    // access_token: cookies.get('access_token'),
  },
});


// export const verifyToken = async (config) => {
//   //쿠키에 있는 엑세스 토큰을 가져옵니다.
//   let accessToken = cookies.get('access_token');

//   if(!accessToken || accessToken == null) {
//     console.error("쿠키에 토큰이 존재하지 않습니다.");
//   }

//   const decode = jwt.decode(accessToken);
//   const nowDate = new Date().getTime() / 1000;
  
//   // // 토큰 만료시간이 지났다면
//   // if (decode.exp < nowDate) {
//   //   const { data } = await axios.post(`${SERVER_URL}/token`, { accessToken }, {
//   //       headers: {
//   //         access_token: getToken(),
//   //       },
//   //     });

//   //   // 리프레쉬 토큰 발급 서버 요청
    
//   //   const { refreshToken } = data.data;
//   //   accessToken = refreshToken;
//   // }
  
//   // config.headers['access_token'] = accessToken;
//   return null;
// }

export const api = {
  get: (url, params) => customAxios.get(url, { params })
    .then(response => response)
    .catch(error => {
      // 개별 에러 처리
      console.error(`GET request failed for ${url}`, error);
      throw error;
    }),

  post: (url, data) => customAxios.post(url, data)
    .then(response => response)
    .catch(error => {
      // 개별 에러 처리
      console.error(`POST request failed for ${url}`, error);
      throw error;
    }),

  put: (url, data) => customAxios.put(url, data)
    .then(response => response)
    .catch(error => {
      // 개별 에러 처리
      console.error(`PUT request failed for ${url}`, error);
      throw error;
    }),

  delete: (url) => customAxios.delete(url)
    .then(response => response)
    .catch(error => {
      // 개별 에러 처리
      console.error(`DELETE request failed for ${url}`, error);
      throw error;
    }),
};

//커스텀 axios가 발생할때마다 request를 interceptor 해서 토큰을 먼저 검증한다.
// customAxios.interceptors.request.use(verifyToken,  
//   function (error) {
//   return Promise.reject(error);
// });

