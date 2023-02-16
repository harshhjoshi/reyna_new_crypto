import { useState } from "react";
import { useSelector } from 'react-redux';
const useToken = () => {

  let jwtToken = localStorage.getItem('access_token') && false ? localStorage.getItem('access_token') : null;
   const [token, setToken] = useState(jwtToken);
   console.log('jwtToken',jwtToken)
  return {  
  setToken,
  token
  };
};
export default useToken;
