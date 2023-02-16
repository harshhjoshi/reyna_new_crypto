import { useState, useContext, createContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [value, setValue] = useState(0);
  const [childValue, setChildValue] = useState(-1)
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [modalMessage, setModalMessage] = useState('');
  const [modalDestination, setModalDestination] = useState('/');
  const [kycStatus, setKYCStatus] = useState();
  const [selectedCoin, setSelectedCoin] = useState({});
  const [userId, setUserId] = useState(-1);
  const [showTooltip, setShowTooltip] = useState(false);
  const [AllOrderData, setAllOrderData] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [placeholder, setPlaceholder] = useState({
    firstname: 'John',
    lastname: 'Doe',
    username: 'Abc123',
    otpfield: 'Email id or Mobile No',
    password: 'Abc@1234',
    confirmpassword: 'Abc@1234',
    email: 'abc@gmail.com',
    mobile: 'Enter 10 digit number',
    address: 'Enter your address',
    countrycode: 'Enter your country code',
    areacode: '123456',
    occupation: 'Enter your occupation',
    spendlimit: 'R530 is the minimum spend limit',
    sellLimit:'The minimum sell limit'
  })
  const [popup, setPopup] = useState('');
  const [successPopup, setSuccessPopup] = useState(false)
  const [inProgressPopup, setInProgressPopup] = useState(false)
  const [failPopup, setFailPopup] = useState(false);
  // const [logout, setLogut] = useState(true);
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const openModal = (item, id, type, data) => {
    // console.log('type...??',type)
    setIsModalOpen(true);
    setKYCStatus(item);
    setUserId(id);
    setSelectedCoin(item);
    type  && setPopup(type);
    // type === 'success' && setSuccessPopup(true);
    // type === 'PROCESSING'  && setInProgressPopup(true);
    // type === 'PENDING_DELIVERY_FROM_TRANSAK'  && setInProgressPopup(true);
    // type === 'fail' && setFailPopup(true);
    data && setAllOrderData(data)
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setKYCStatus(null);
    setSelectedCoin({});
    setPopup(false);
    setSuccessPopup(false);
    setFailPopup(false);
    setInProgressPopup(false);
    setAllOrderData(null)
  };
  const openDropdown = (index) => {
    // e.stopPropagation();
    // console.log(`called open dropdown from ${index}`)
    setValue(index);
    setChildValue(-1);
    setIsDropdown(true);

  }
  const closeDropdown = (e) => {
    // e.stopPropagation();
    // console.log(`called close dropdown ${e}`)
    setChildValue(-1)
    setIsDropdown(false);
  }
  const passwordTypeText = (id) => {
    id === 'password' && setPasswordType('text');
    id === 'confirm' && setConfirmPasswordType('text');
  }
  const passwordTypePassword = (id) => {
    id === 'password' && setPasswordType('password');
    id === 'confirm' && setConfirmPasswordType('password');
  }
  const handleValue = (id) => {
    setValue(id);
  }
  const handleTooltipHover = (id) => {
    setValue(id);
    setShowTooltip(true)
  };

  const handleTooltipLeave = () => {
    setValue(-1)
    setShowTooltip(false);
  };
  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        isModalOpen,
        isDropdown,
        passwordType,
        confirmPasswordType,
        value,
        childValue,
        setChildValue,
        passwordTypeText,
        passwordTypePassword,
        openModal,
        closeModal,
        openSidebar,
        closeSidebar,
        openDropdown,
        closeDropdown,
        handleValue,
        modalMessage,
        modalDestination,
        setModalMessage,
        setModalDestination,
        placeholder,
        setPlaceholder,
        kycStatus,
        userId,
        setUserId,
        showTooltip,
        handleTooltipHover,
        handleTooltipLeave,
        selectedCoin,
        setSelectedCoin,
        popup,
        setPopup,
        successPopup,
        setSuccessPopup,
        failPopup,
        setFailPopup,
        inProgressPopup,
        setInProgressPopup,
        AllOrderData,
        setAllOrderData,
        responseData,
        setResponseData,
        // logout,
        // setLogut,
        setIsModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
