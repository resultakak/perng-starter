// import cookie from "react-cookies";
// const axios = require("axios");

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const getCsrfToken = async () => {
  try {
    // var csrf = cookie.load("_csrf");
    // if (!csrf) {
    //   const { data } = axios.get("http://localhost:4000/csrf");
    //   csrf = data.csrfToken;
    // }
    var csrf = cookies.get('_csrf')
    console.log("csrf", csrf);

    return csrf;
  } catch (e) {
    return false;
  }
};

export default getCsrfToken;
