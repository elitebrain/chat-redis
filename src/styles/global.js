import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary: #5090D3;
    --secondary: #ce93d8;
    --warning: #ffec0e;
    --danger: #cd2727;
    --success: #19f334;
    --white: #fff;
    --gray-100: #F8F9FA;
    --gray-200: #E9ECEF;
    --gray-300: #DEE2E6;
    --gray-400: #CED4DA;
    --gray-500: #ADB5BD;
    --gray-600: #6C757D;
    --gray-700: #495057;
    --gray-800: #343A40;
    --gray-900: #212529;
    --primary-alpha-50: #5090D380;
    --gray-100-alpha-50: #F8F9FA80;
    --gray-200-alpha-50: #E9ECEF80;
    --gray-300-alpha-50: #DEE2E680;
    --gray-400-alpha-50: #CED4DA80;
    --gray-500-alpha-50: #ADB5BD80;
    --gray-600-alpha-50: #6C757D80;
    --gray-700-alpha-50: #49505780;
    --gray-800-alpha-50: #343A4080;
    --gray-900-alpha-50: #21252980;
    --gray-100-alpha-80: #F8F9FACC;
    --gray-200-alpha-80: #E9ECEFCC;
    --gray-300-alpha-80: #DEE2E6CC;
    --gray-400-alpha-80: #CED4DACC;
    --gray-500-alpha-80: #ADB5BDCC;
    --gray-600-alpha-80: #6C757DCC;
    --gray-700-alpha-80: #495057CC;
    --gray-800-alpha-80: #343A40CC;
    --gray-900-alpha-80: #212529CC;
  }
  
  ::-webkit-scrollbar {
    width: 10px;
    height: 8px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--primary-alpha-50);
  }

  input {
    border: none;
    background-color: transparent;
  }
  
  input:focus {
    outline: none;
  }

  li {
    display: block;
  }
  
  .w_100 {
    width: 100% !important;
  }

  .mr_6px {
    margin-right: 6px;
  }
  
  @keyframes spin {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;