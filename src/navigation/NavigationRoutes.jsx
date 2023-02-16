import { Routes, Route, useLocation, Navigate } from "react-router-dom"; // Router container
import Document from "../components/Document/Document";
import Gainers from "../components/gainers/Gainers";
// import Popup from "../components/popup/Popup";
// import TransacFail from "../components/transacfail/TransacFail";
// import TransacInProgress from "../components/transacinprogress/TransacInProgress";
// import TransacSuccess from "../components/transacsuccess/TransacSuccess";
import KYCVerification from "../pages/admin/kycverification/KYCVerification";
import CheckMail from "../pages/checkyouremail/CheckEmail";
import ComingSoon from "../pages/comingsoon/ComingSoon";
import ForgotPassword from "../pages/forgotpassword/ForgotPassword";
import KYC from "../pages/kyc/KYC";
import Main from "../pages/main/Main";
import Myportfolio from "../pages/myportfolio/Myportfolio";
import MyTransaction from "../pages/mytransaction/MyTransaction";
import OtpVerification from "../pages/otpverification/OtpVerification";
import ResetPassword from "../pages/resetpassword/ResetPassword";
import SignIn from "../pages/sign-in/SignIn";
import SignUp from "../pages/sign-up/SignUp";
import Trading from "../pages/trading/Trading";
import AuthRoutes from "./AuthRoutes";
import { useSelector } from "react-redux";
import PageNotFound from "../pages/pagenotfound/Pagenotfound";
import MyProfile from "../pages/myprofile/MyProfile";
import { useGlobalContext } from "../context/context";
import { useState } from "react";
import { useEffect } from "react";
import Hot from "../components/hot/Hot";
import Losers from "../components/losers/Losers";
import Vol24 from "../components/vol24/Vol24";
const NavigationRoutes = () => {
  const path = useLocation().pathname;
  
  const state = useSelector((state) => state.user);
  var OTPVerified =    localStorage.getItem("otpverified");
  // const OTPSTATUS = 
  //             localStorage.getItem("otpverified");

  // console.log('state.user',OTPSTATUS);
  // const {logout} = useGlobalContext();
  const [loggedOut,setLoggedOut] = useState(null);
  // const [gotoOTP,setGoToOTP] = useState(null);
  // console.log('state...??',state)
  
  useEffect(()=>{
    if(!state.user){
      setLoggedOut(true)
    }
    else{
      setLoggedOut(false)
    }
  },[state]);
  // useEffect(()=>{
  //   if(state.user && OTPVerified && OTPVerified === "false"){
  //     setGoToOTP(true)
  //   }
  //   else {
  //     setGoToOTP(false)
  //   }
  // },[state,OTPVerified]);
  const otpSourece = useLocation().state;
  // console.log("go to sign in...???",state.goto);
  // console.log("go to sign in...???",otpSourece);

  return (

    <Routes>
      {/* <Route path="/signin" element={state.goto ? loggedOut ? <SignIn /> : <Navigate to="/"/> :<Navigate to="/otpverification" state="signin"/>  } />
      <Route path="/signup" element={state.goto ? loggedOut ? <SignUp /> :<Navigate to="/" /> :<Navigate to="/otpverification" state="signup"/>}/>
     */}
      <Route path="/signin" element={ <SignIn /> } />
    
      <Route path="/signup" element={<SignUp />}/>
      
      {/* <Route path="/otpverification" element={OTPVerified && OTPVerified === "false" && state.user?.role !== "ROLE_Admin" && otpSourece  ? <OtpVerification /> : <Navigate to='/' />} /> */}
      <Route path="/otpverification" element={ <OtpVerification />} />
      <Route path="/checkmail" element={<CheckMail />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/document" element={<Document />} />
      <Route path="/" element={<Navigate to="trading" />} />
      <Route path="/notfound" element={<PageNotFound />} />
      <Route
        path="/trading/*"
        element={
          state.user ? (
            state.user.role === "ROLE_User" ? (
              <Main>
                <Routes>
                  <Route
                    path=""
                    element={
                      <Navigate
                        to={
                          state.user
                            ? state.user.role === "ROLE_User"
                              ? "gainers"
                              : state.user.role === "ROLE_Admin"
                              ? "/userkycverification"
                              : "gainers"
                            : "gainers"
                        }
                      />
                    }
                  />
                  {/* <Route path="*" element={<Navigate to='/notfound' />} /> */}
                </Routes>
                <Trading>
                  <Routes>
                    {/* <Route path="" element={<Navigate to='/gainers' />} /> */}
                    <Route path="hot" element={<Hot />} />
                    <Route path="gainers" element={<Gainers />} />
                    <Route path="losers" element={<Losers />} />
                    <Route path="24hvol" element={<Vol24 />} />
                    {/* <Route path="*" element={<Navigate to="/notfound" />} /> */}
                  </Routes>
                </Trading>
              </Main>
            ) : state.user.role === "ROLE_Admin" ? (
              <Navigate to="/userkycverification" />
            ) : (
              <Main>
                <Routes>
                  <Route
                    path=""
                    element={
                      <Navigate
                        to={
                          state.user
                            ? state.user.role === "ROLE_User"
                              ? "gainers"
                              : state.user.role === "ROLE_Admin"
                              ? "/userkycverification"
                              : "gainers"
                            : "gainers"
                        }
                      />
                    }
                  />
                  {/* <Route path="*" element={<Navigate to='/notfound' />} /> */}
                </Routes>
                <Trading>
                  <Routes>
                    {/* <Route path="" element={<Navigate to='/gainers' />} /> */}
                    <Route path="hot" element={<Hot />} />
                    <Route path="gainers" element={<Gainers />} />
                    <Route path="losers" element={<Losers />} />
                    <Route path="24hvol" element={<Vol24 />} />
                    {/* <Route path="*" element={<Navigate to="/notfound" />} /> */}
                  </Routes>
                </Trading>
              </Main>
            )
          ) : (
            <Main>
              <Routes>
                <Route
                  path=""
                  element={
                    <Navigate
                      to={
                        state.user
                          ? state.user.role === "ROLE_User"
                            ? "gainers"
                            : state.user.role === "ROLE_Admin"
                            ? "/userkycverification"
                            : "gainers"
                          : "gainers"
                      }
                    />
                  }
                />
                {/* <Route path="*" element={<Navigate to='/notfound' />} /> */}
              </Routes>
              <Trading>
                <Routes>
                  {/* <Route path="" element={<Navigate to='/gainers' />} /> */}
                  <Route path="hot" element={<Hot />} />
                    <Route path="gainers" element={<Gainers />} />
                    <Route path="losers" element={<Losers />} />
                    <Route path="24hvol" element={<Vol24 />} />
                  {/* <Route path="*" element={<Navigate to="/notfound" />} /> */}
                </Routes>
              </Trading>
            </Main>
          )
        }
      />
      <Route
        path="/*"
        element={
          <AuthRoutes path={path}>
            <Main>
              <Routes>
            <Route path="uploadkycdocuments" element={state.user?.role === "ROLE_User"  ?  <KYC />: <Navigate to='/'/>} />
                <Route path="comingsoon" element={<ComingSoon />} />
                <Route path="myprofile" element={<MyProfile />} />
                <Route path="accountsettings" element={<ComingSoon />} />
                <Route
                  path="userkycverification"
                  element={<KYCVerification />}
                />
                <Route path="myportfolio" element={<Myportfolio />} />
                <Route path="mytransaction" element={<MyTransaction />} />
                <Route path="*" element={<Navigate to="/notfound" />} />
              </Routes>
            </Main>
          </AuthRoutes>
        }
      />
    </Routes>
  );
};
export default NavigationRoutes;
