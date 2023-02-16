// import ArrowFrameBlue from '../assets/images/ArrowFrameBlue.png'
// import KYCDocument from '../assets/images/KYCDocument.pdf'
import bitcoin from '../assets/images/bitcoin.png';
import { Approved, BNB, BTC, Clock, Dash, ETH, Gain, Home, Hot, InReview, KYC, Lite, Lose, NEO, Pending, Portfolio, Profile, Rejected, Setting, Signout, Submitted, Transaction } from "../svg-components";
import color from "./color";

export const sidebarLinks = [
  {
    id: 0,
    icon: Home,
    title: "Home",
    dropdown: false,
    navigate: "/trading/gainers"
  },
  {
    id: 1,
    icon: KYC,
    title: "KYC",
    dropdown: true,
    navigate: '',
    dropdowndata: [
      {
        id: 1,
        name: '- Upload Documents',
        navigate: '/uploadkycdocuments',
      },
      // {
      //     name:'- Status',
      //     navigate:'kycstatus'
      // }
    ]
  },
  {
    id: 2,
    icon: Transaction,
    title: "Transactions",
    dropdown: true,
    navigate: '',
    dropdowndata: [
      {
        id: 2,
        name: '- Explore crypto market',
        navigate: '/trading/gainers',
      },
      // {
      //     id:2,
      //     name:'- Withdraw Funds',
      //     navigate:'/withdrawfunds'
      // },
      {
        id: 2,
        name: '- Transaction History',
        navigate: '/mytransaction'
      }
    ]
  },
  // {
  //     id:3,
  //     icon: Setting,
  //     title: "Account Settings",
  //     dropdown: false,
  //     navigate: '/accountsettings'
  // },
  {
    id: 4,
    icon: Signout,
    title: "Sign out",
    dropdown: false,
    navigate: ''
  },
]

export const countryData = [
  {
    name: 'india',
  },
  {
    name: 'india',
  },
  {
    name: 'india',
  },
  {
    name: 'india',
  }
]
export const stateData = [
  {
    name: 'gujrat',
  },
  {
    name: 'maharastra',
  },
  {
    name: 'delhi',
  },
  {
    name: 'punjab',
  },
]
export const cityData = [
  {
    name: 'vadodara',
  },
  {
    name: 'ahmedabad',
  },
  {
    name: 'surat',
  },
  {
    name: 'rajkot',
  },
]
// application/msword
export const validImageFileType = ['image/jpeg', 'image/png', 'image/jpg'];

export const validIdentityCardType = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

export const photoDocumentList = [
  {
    name: 'National Identity Card'
  },
  {
    name: 'Valid South African Passport'
  },
]

export const addressDocumentList = [
  {
    name: 'National Identity Card',
  },
  {
    name: 'Driving Licence',
  },
  {
    name: 'Valid South African Passport'
  },
  {
    name: 'Bank Statement'
  },
  {
    name: 'Utility Bill'
  },
  {
    name: "Affidavit"
  },
]

export const kycstatusDropdownData = [
  {
    name: 'All',
    navigate: 'All',
    icon: Pending
  },
  {
    name: 'Submitted',
    navigate: 'Submitted',
    icon: Submitted
  },
  // {
  //   name: 'In Review',
  //   navigate: 'In Review',
  //   icon: InReview
  // },
  {
    name: 'Approved',
    navigate: 'Approved',
    icon: Approved
  },
  {
    name: 'Rejected',
    navigate: 'Rejected',
    icon: Rejected
  },
]
export const trasactionDropdownData = [
  {
    name: 'All',
    navigate: 'All',
    icon: Submitted
  },
  {
    name: 'Completed',
    navigate: 'Completed',
    icon: Approved
  },
  {
    name: 'Processing',
    navigate: 'Processing',
    icon: InReview
  },
  {
    name: 'Initiated',
    navigate: 'Initiated',
    icon: Pending
  }
]

export const adminTableHead = [
  { label: "User Name", value: "user", doc: false },
  { label: "Identity Documents", value: "identityDoc", doc: true },
  { label: "Photo", value: "photoDoc", doc: true },
  { label: "Identity No", value: "identityNo", doc: false },
  { label: "Proof of Address", value: "physicalAddressDoc", doc: true },
  { label: "Status", value: "status", doc: false },
  { label: "Action", value: "actions", doc: false },
];

// export const adminTableBody = [
//   {
//     id: 1,
//     username: "Branko Baric",
//     identityCard:{
//       name:'National IdentityCard.pdf',
//       path:ArrowFrameBlue
//     },
//     photo: {
//       name:'Photo.jpg',
//       path:ArrowFrameBlue
//     },
//     identityNo: "324578954",
//     proofOfAddressFile: {
//       name:'Driving licence.pdf',
//       path:KYCDocument
//     },
//     proofOfAddresText:'673 Bodenstein St, Boksburg, Gauteng, 1464, South Africa',
//     status: "Rejected",
//   },
// ];

export const rejectedDocsList = [
  {
    name: 'Identity Documents',
    value: 'identityCard'
  },
  {
    name: 'Self Photo',
    value: 'photo'
  },
  {
    name: 'Identity Number',
    value: 'identityNo'
  },
  {
    name: 'Proof of Address',
    value: 'proofOfAddressFile'
  }
]
export const TrandingData = [
  {
    icon: BNB,
    bgColor: color.yellow2,
    name: 'BNB/BUSD',
    percentage: '+5,17%',
    value: '228,0'
  },
  {
    icon: BTC,
    bgColor: color.yellow3,
    name: 'BTC/BUSD',
    percentage: '+3,57%',
    value: '19 903,62'
  },
  {
    icon: ETH,
    bgColor: color.purple1,
    name: 'ETH/BUSD',
    percentage: '+6,76%',
    value: '1 103,18'
  },
  {
    icon: NEO,
    bgColor: color.green2,
    name: 'NEO/BUSD',
    percentage: '+6,76%',
    value: '1 103,18'
  },
  {
    icon: Lite,
    bgColor: color.purple2,
    name: 'LITE/BUSD',
    percentage: '+6,76%',
    value: '1 103,18'
  },
  {
    icon: Dash,
    bgColor: color.blue4,
    name: 'DASH/BUSD',
    percentage: '+5,17%',
    value: '1 103,18'
  },
  {
    icon: BNB,
    bgColor: color.yellow2,
    name: 'BNB/BUSD',
    percentage: '+5,17%',
    value: '228,0'
  },
  {
    icon: BTC,
    bgColor: color.yellow3,
    name: 'BTC/BUSD',
    percentage: '+3,57%',
    value: '19 903,62'
  },
  {
    icon: ETH,
    bgColor: color.purple1,
    name: 'ETH/BUSD',
    percentage: '+6,76%',
    value: '1 103,18'
  },
  {
    icon: NEO,
    bgColor: color.green2,
    name: 'NEO/BUSD',
    percentage: '+6,76%',
    value: '1 103,18'
  },
  {
    icon: Lite,
    bgColor: color.purple2,
    name: 'LITE/BUSD',
    percentage: '+6,76%',
    value: '1 103,18'
  },
  {
    icon: Dash,
    bgColor: color.blue4,
    name: 'DASH/BUSD',
    percentage: '+6,76%',
    value: '1 103,18'
  },
]


export const tabData = [
  {
    id: 0,
    icon: Hot,
    name: 'Hot',
    navigate: 'hot',

  },
  {
    id: 1,
    icon: Gain,
    name: 'Gainers',
    // name:'Coins',
    navigate: 'gainers'
  },
  {
    id: 2,
    icon: Lose,
    name: 'Losers',
    navigate: 'losers'
  },
  {
    id: 3,
    icon: Clock,
    name: '24h Vol',
    navigate: '24hvol'
  },
]

export const dataRowHead = [
  {
    title: '  All Currencies',
    dropdown: true,
    dropdownData: [
      {
        name: 'All Currencies'
      },
      {
        name: 'All Currencies'
      },
      {
        name: 'All Currencies'
      },
    ]
  },
  {
    title: 'Current Price',
  },
  {
    title: '24h chg%'
  },
  {
    title: ''
  }
]
export const dataTableHead = [
  { label: "All Currencies", value: "name", dropdown: true, button: false, percentage: false, image: true, symbol: true, price: false },
  { label: "Current Price", value: "current_price", dropdown: false, button: false, percentage: false, image: false, symbol: false, price: true },
  { label: "24h chg%", value: "price_change_percentage_24h", dropdown: false, button: false, percentage: true, image: false, symbol: false, price: false },
  { label: "", value: "", dropdown: false, button: true, percentage: false, image: false, symbol: false, price: false },
];

export const profileDropdownData = [
  {
    id: 0,
    name: 'My Portfolio',
    navigate: '/myportfolio',
    icon: Portfolio
  },
  {
    id: 1,
    name: 'My Profile',
    navigate: '/myprofile',
    icon: Profile
  },
  {
    id: 2,
    name: 'Account Settings',
    navigate: '/accountsettings',
    icon: Setting
  },
]

export const portfolioBuyHead = [
  { label: "Name", value: "cryptoCurrency", image: true, symbol: true, price: false },
  { label: "Quantity ", value: "cryptoAmount", image: false, symbol: false, price: false },
  { label: "Buy Price", value: "fiatAmount", image: false, symbol: false, price: true, convert: true },
  { label: "Paid Amount", value: "amountPaid", image: false, symbol: false, price: true },
  { label: "Date", value: "createdDt", image: false, symbol: false, price: false },
  { label: "Time", value: "createdTime", image: false, symbol: false, price: false, time: true },
  { label: "Wallet Address", value: "walletAddress", image: false, price: false, percentage: false, status: false, copy: true },
]
export const portfolioSellHead = [
  { label: "Name", value: "cryptoCurrency", image: true, symbol: true, price: false },
  { label: "Quantity ", value: "cryptoAmount", image: false, symbol: false, price: false },
  { label: "Sell Price", value: "fiatAmount", image: false, symbol: false, price: true, convert: true },
  { label: "Credit Amount", value: "amountPaid", image: false, symbol: false, price: true },
  { label: "Date", value: "createdDt", image: false, symbol: false, price: false },
  { label: "Time", value: "createdTime", image: false, symbol: false, price: false, time: true },
  { label: "Wallet Address", value: "walletAddress", image: false, price: false, percentage: false, status: false, copy: true },
]

export const portfolioBody = [
  {
    id: 1,
    image: bitcoin,
    name: 'Bitcoin',
    quantity: '50',
    buyprice: '18,565.23',
    paidamount: '100',
    date: '11/07/2022',
    time: '10:12 AM'
  },
  {
    id: 2,
    image: bitcoin,
    name: 'USD Coin',
    quantity: '300',
    buyprice: '1.00',
    paidamount: '45',
    date: '10/07/2022',
    time: '01:23 PM'
  },
  {
    id: 3,
    image: bitcoin,
    name: 'XRP',
    quantity: '50',
    buyprice: '0.3056',
    paidamount: '45',
    date: '10/07/2022',
    time: '01:23 PM'
  },
  {
    id: 4,
    image: bitcoin,
    name: 'Solana',
    quantity: '1000',
    buyprice: '35.44',
    paidamount: '155',
    date: '11/07/2022',
    time: '10:12 AM'
  },
  {
    id: 5,
    image: bitcoin,
    name: 'Dogecoin',
    quantity: '300',
    buyprice: '0.04514',
    paidamount: '45',
    date: '10/07/2022',
    time: '01:23 PM'
  },
  {
    id: 6,
    image: bitcoin,
    name: 'TRON',
    quantity: '150',
    buyprice: '0.06438',
    paidamount: '155',
    date: '11/07/2022',
    time: '10:12 AM'
  },
  {
    id: 1,
    image: bitcoin,
    name: 'Bitcoin',
    quantity: '50',
    buyprice: '18,565.23',
    paidamount: '100',
    date: '11/07/2022',
    time: '10:12 AM'
  },
  {
    id: 2,
    image: bitcoin,
    name: 'USD Coin',
    quantity: '300',
    buyprice: '1.00',
    paidamount: '45',
    date: '10/07/2022',
    time: '01:23 PM'
  },
  {
    id: 3,
    image: bitcoin,
    name: 'XRP',
    quantity: '50',
    buyprice: '0.3056',
    paidamount: '45',
    date: '10/07/2022',
    time: '01:23 PM'
  },
  {
    id: 4,
    image: bitcoin,
    name: 'Solana',
    quantity: '1000',
    buyprice: '35.44',
    paidamount: '155',
    date: '11/07/2022',
    time: '10:12 AM'
  },
  {
    id: 5,
    image: bitcoin,
    name: 'Dogecoin',
    quantity: '300',
    buyprice: '0.04514',
    paidamount: '45',
    date: '10/07/2022',
    time: '01:23 PM'
  },
  {
    id: 6,
    image: bitcoin,
    name: 'TRON',
    quantity: '150',
    buyprice: '0.06438',
    paidamount: '155',
    date: '11/07/2022',
    time: '10:12 AM'
  },
  {
    id: 1,
    image: bitcoin,
    name: 'Bitcoin',
    quantity: '50',
    buyprice: '18,565.23',
    paidamount: '100',
    date: '11/07/2022',
    time: '10:12 AM'
  },
  {
    id: 2,
    image: bitcoin,
    name: 'USD Coin',
    quantity: '300',
    buyprice: '1.00',
    paidamount: '45',
    date: '10/07/2022',
    time: '01:23 PM'
  },
  {
    id: 3,
    image: bitcoin,
    name: 'XRP',
    quantity: '50',
    buyprice: '0.3056',
    paidamount: '45',
    date: '10/07/2022',
    time: '01:23 PM'
  },
  {
    id: 4,
    image: bitcoin,
    name: 'Solana',
    quantity: '1000',
    buyprice: '35.44',
    paidamount: '155',
    date: '11/07/2022',
    time: '10:12 AM'
  },
  {
    id: 5,
    image: bitcoin,
    name: 'Dogecoin',
    quantity: '300',
    buyprice: '0.04514',
    paidamount: '45',
    date: '10/07/2022',
    time: '01:23 PM'
  },
  {
    id: 6,
    image: bitcoin,
    name: 'TRON',
    quantity: '150',
    buyprice: '0.06438',
    paidamount: '155',
    date: '11/07/2022',
    time: '10:12 AM'
  },
]

export const transactionBuyHead = [
  { label: "Transaction ID", value: "txId", image: false, price: false, percentage: false },
  { label: "Name", value: "cryptoCurrency", image: true, price: false, percentage: false, symbol: true },
  { label: "Date", value: "createdDt", image: false, price: false, percentage: false },
  { label: "Time", value: "createdTime", image: false, price: false, percentage: false, time: true },
  { label: "Buy Price", value: "fiatAmount", image: false, price: true, percentage: false, convert: true },
  // { label: "Current Price", value: "currentprice",image:false,price:true,percentage:false },
  { label: "Spent Limit", value: "fiatAmount", image: false, price: true, percentage: false },
  { label: "Change", value: "change", image: false, price: true, percentage: true },
  { label: "Status", value: "status", image: false, price: false, percentage: false, status: true },
  { label: "Wallet Address", value: "walletAddress", image: false, price: false, percentage: false, status: false, copy: true },
]

export const transactionSellHead = [
  { label: "Transaction ID", value: "txId", image: false, price: false, percentage: false },
  { label: "Name", value: "cryptoCurrency", image: true, price: false, percentage: false, symbol: true },
  { label: "Date", value: "createdDt", image: false, price: false, percentage: false },
  { label: "Time", value: "createdTime", image: false, price: false, percentage: false, time: true },
  { label: "Sell Price", value: "fiatAmount", image: false, price: true, percentage: false, convert: true },
  // { label: "Current Price", value: "currentprice",image:false,price:true,percentage:false },
  { label: "Spent Limit", value: "fiatAmount", image: false, price: true, percentage: false },
  { label: "Change", value: "change", image: false, price: true, percentage: true },
  { label: "Status", value: "status", image: false, price: false, percentage: false, status: true },
  { label: "Wallet Address", value: "walletAddress", image: false, price: false, percentage: false, status: false, copy: true },
]

export const transactionData = [
  {
    transactionId: '1F1tAaz5x1HU',
    name: 'Bitcoin',
    image: bitcoin,
    date: '11/07/2022',
    time: '10:12 AM',
    buyprice: '18,565.23',
    currentprice: '20,565.23',
    spendlimit: '100',
    change: '20',
    status: 'Successful'
  },
  {
    transactionId: 'XrCNLbtMDqcw',
    name: 'Ethereum',
    image: bitcoin,
    date: '10/07/2022',
    time: '01:23 PM',
    buyprice: '',
    currentprice: '1,147.48',
    spendlimit: '',
    status: 'In Progress'
  },
  {
    transactionId: '6o5GNn4xqX45',
    name: 'Tether',
    image: bitcoin,
    date: '11/07/2022',
    time: '10:12 AM',
    buyprice: '',
    currentprice: '0.9994',
    spendlimit: '',
    change: '',
    status: 'In Progress'
  },
  {
    transactionId: '1F1tAaz5x1HU',
    name: 'USD Coin',
    image: bitcoin,
    date: '10/07/2022',
    time: '01:23 PM',
    buyprice: '1.00',
    currentprice: '1.00',
    spendlimit: 'R45',
    change: '0',
    status: 'Successful'
  },
  {
    transactionId: '6o5GNn4xqX45',
    name: 'BNB',
    image: bitcoin,
    date: '10/07/2022',
    time: '01:23 PM',
    buyprice: '',
    currentprice: '233.01',
    spendlimit: '',
    change: '',
    status: 'Unsuccessful'
  },
  {
    transactionId: 'XrCNLbtMDqcw',
    name: 'Binance',
    image: bitcoin,
    date: '11/07/2022',
    time: '11/07/2022',
    buyprice: '',
    currentprice: '1.00',
    spendlimit: '',
    change: '',
    status: 'In Progress'
  },
  {
    transactionId: '1F1tAaz5x1HU',
    name: 'XRP',
    image: bitcoin,
    date: '10/07/2022',
    time: '01:23 PM',
    buyprice: '0.3056',
    currentprice: '0.3256',
    spendlimit: '45',
    change: '0.5',
    status: 'Successful'
  },
  {
    transactionId: '6o5GNn4xqX45',
    name: 'Cardano',
    image: bitcoin,
    date: '10/07/2022',
    time: '01:23 PM',
    buyprice: '',
    currentprice: '0.4552',
    spendlimit: '',
    change: '',
    status: 'Unsuccessful'
  },
  {
    transactionId: '1F1tAaz5x1HU',
    name: 'Solana',
    image: bitcoin,
    date: '11/07/2022',
    time: '10:12 AM',
    buyprice: '35.44',
    currentprice: '25.44',
    spendlimit: '155',
    change: '-10',
    status: 'Successful'
  },
  {
    transactionId: '6o5GNn4xqX45',
    name: 'Dogecoin',
    image: bitcoin,
    date: '10/07/2022',
    time: '01:23 PM',
    buyprice: '0.04514',
    currentprice: '0.06514',
    spendlimit: '45',
    change: '0.2',
    status: 'Successful'
  },
  {
    transactionId: '1F1tAaz5x1HU',
    name: 'Polkadot',
    image: bitcoin,
    date: '10/07/2022',
    time: '10/07/2022',
    buyprice: '',
    currentprice: '6.87',
    spendlimit: '',
    change: '',
    status: 'In Progress'
  },
  {
    transactionId: 'XrCNLbtMDqcw',
    name: 'TRON',
    image: bitcoin,
    date: '11/07/2022',
    time: '10:12 AM',
    buyprice: '0.06438',
    currentprice: '0.06638',
    spendlimit: '155',
    change: '0.2',
    status: 'Successful'
  },
  {
    transactionId: '6o5GNn4xqX45',
    name: 'FTX Token',
    image: bitcoin,
    date: '10/07/2022',
    time: '01:23 PM',
    buyprice: '',
    currentprice: '25.48',
    spendlimit: '',
    change: '',
    status: 'Unsuccessful'
  },
]
export const buySellTabData = [
  {
    id: 0,
    // icon: Hot,
    name: 'BUY',
    navigate: null,

  },
  {
    id: 1,
    // icon: Gain,
    name: 'SELL',
    // name:'Coins',
    navigate: null
  }
]
