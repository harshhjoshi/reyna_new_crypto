import { useRef } from "react"

const useReference = () => {
    // const uploadfile = useRef();
    const firstname = useRef();
    const lastname = useRef();
    const username = useRef();
    const otpfield = useRef();
    const password = useRef();
    const confirmpassword = useRef();
    const email = useRef();
    const mobile = useRef();
    const address1 = useRef();
    const countrycode = useRef();
    const country = useRef();
    const state = useRef();
    const city = useRef();
    const areacode = useRef();
    const occupation = useRef();
    const spendlimit = useRef();
    const sellLimit = useRef();
    // const checkbox = useRef()
    const ref = {
        // uploadfile,
        firstname,
        lastname,
        username,
        otpfield,
        password,
        confirmpassword,
        email,
        mobile,
        address1,
        countrycode,
        country,
        state,
        city,
        areacode,
        occupation,
        spendlimit,
        sellLimit
        // checkbox
    }
    return ref
}
export default useReference;