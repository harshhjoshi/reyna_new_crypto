import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoutes = ({ children }) => {
    const Users = useSelector((state) => state.user);
//   console.log("Users:", Users?.user?.token);
Users && Users.user && Users.user.token &&  localStorage.setItem('access_token',Users.user.token)
//   console.log("Token:",Users.user.token)
   var OTPVerified =    localStorage.getItem("otpverified");
  console.log('OtpVerifield:',OTPVerified)

//   if(OTPVerified == "false"){
//       return <Navigate to="/otpverification" />

//   }
//   else{
//   console.log('OtpVerifield true:',OTPVerified)
// //   console.log('Users.user.token..>>',Users.user.token);

  if (Users && Users.user && Users.user.token && OTPVerified && OTPVerified === "true") {
    return children;
  } else if(Users && Users.user && Users.user.token){
    return <Navigate to="/otpverification" state={true} />
  } {
      return <Navigate to="/signin" />
  }
//   }
//   else{
//   console.log('OtpVerifield true:',OTPVerified)
//   console.log('Users.user.token..>>',Users.user.token);

//   if (!Users?.user?.token) {
//       return <Navigate to="/signin" />
//   } else {
//       return children;
//   }
//   }

};
export default AuthRoutes;
