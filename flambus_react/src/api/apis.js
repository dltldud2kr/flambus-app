import { api } from 'utils/customAxios';

export const userApi = {}
export const shopApi = {}

//내 정보 조회.
userApi.getUserInfo = async (idx) => {
    return new Promise((resolve,reject)=> {
        api.get('/api/v1/member/', {
            idx: idx
        })
        .then(res => {
            if (res.data.success && res.data.data) {
                resolve(res.data);
            }
            else {
                console.log("getUserInfo error")
                return;
            }
        })
        .catch(error => {
            console.log("error /api/v1/member : " + error)
            reject(error)
        });
    })
}

//상점 정보 조회.
shopApi.getShopInfo = async(storeIdx) => {
    return new Promise((resolve,reject)=> {
        api.get('/api/v1/store', {
            storeIdx: storeIdx
        })
        .then(res => {
            if (res.data.success && res.data.data) {
                resolve(res.data);
            }
            else {
                console.log("getShopInfo error")
                return;
            }
        })
        .catch(error => {
            console.log("error /api/v1/store : " + error)
        });
    })
}