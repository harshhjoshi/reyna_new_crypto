import axios from 'axios';
import { baseUrl } from './BaseUrl';

const API = axios.create({
    baseURL: baseUrl,
});

export const SIGN_UP = `${baseUrl}afrixcoin/auth/signup`;
export const upload_ProfilePic = `${baseUrl}afrixcoin/users/uploadProfilePic`;
export const SIGN_IN = `${baseUrl}afrixcoin/auth/login`;
export const FORGOT_PASSWORD = `${baseUrl}afrixcoin/users/forgotPassword/`;
export const VALIDATE_OTP = `${baseUrl}afrixcoin/otp/validate/`;
export const RESEND_OTP = `${baseUrl}afrixcoin/otp/resend`;
export const RESET_PASSWORD = `${baseUrl}afrixcoin/users/resetPassword`;
export const KYC_UPLOAD = `${baseUrl}afrixcoin/kycrequest/`;
export const GET_ALL_KYC = `${baseUrl}afrixcoin/kycrequest/`;
export const APPROVED_KYC = `${baseUrl}afrixcoin/kycrequest/approve`;
export const REJECT_KYC = `${baseUrl}afrixcoin/kycrequest/reject`;
export const SHOW_DOCUMENT = `${baseUrl}afrixcoin/files/kyc/download/`;
export const GET_KEY_DETAILS = `${baseUrl}afrixcoin/kycrequest/user/`;
export const MARKET_LIST = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&`;
export const TransakTransaction = `${baseUrl}afrixcoin/transaction/`;
export const GETWALLETS = `${baseUrl}afrixcoin/users/getWallets`;
export const GETALLTRANSACTION = `${baseUrl}afrixcoin/transaction/?status=`;
export const CHECKSIGNUPVERIFY = `${baseUrl}afrixcoin/users/checkSignupVerify`;

//afrixcoin/users/getWallets

API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const originalRequest = error.config;
        let guid = localStorage.getItem('access_token');
        console.log('Refresh API:', `${guid}`)
        delete API.defaults.headers.common['Authorization'];
        if (error.response.status === 401) {
            console.log('Refresh API 401:', `Bearer ${guid}`)

            originalRequest._retry = true;
            const headers = {
                "Authorization": `Bearer ${guid}`,
                isRefreshToken: true
            };
            return axios
                .get(baseUrl + 'afrixcoin/auth/refreshtoken', {
                    headers
                })
                .then((res) => {
                    console.log('Refresh res:', res)

                    if (res.status === 200) {
                        localStorage.setItem("access_token", res.data);
                        originalRequest.headers.Authorization = `Bearer ` + res.data;
                        return axios(originalRequest);
                    }
                }).catch((err) => console.log("Ref Err:", err.toString()));
        } else {
            console.log('in error')
        }

        // return Promise.reject( error );
    }
);

export default API;
