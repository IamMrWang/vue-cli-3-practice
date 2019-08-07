"use strict";

import Vue from 'vue';
import axios from "axios";
// import router from "../router"

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: process.env.baseURL || process.env.apiUrl || "",
  timeout: 40000, // Timeout
  withCredentials: true, // Check cross-site Access-Control 跨域
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
};

const _axios = axios.create(config);

// 请求拦截器
_axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器
_axios.interceptors.response.use(
  response => {
    // Do something with response data
    if (response) {
      switch (response.data.errcode) {
        case 0:
          return response
        case 20006:
          console.log('登录过期')
          // sessionStorage.removeItem('$user')
          // router.push('/login')
          return response
        case 20005:
          console.log('无访问权限')
          return response
        default:
          return response
      }
    }
  },
  error => {
    // Do something with response error
    if (error.response) {
      switch (error.response.status) {
        case 403:
          // sessionStorage.removeItem('$status')
          // this.$router.push('/login')
          console.log('403')
          break
        case 401:
          console.log('401')
          break
        default:
          return error
      }
    }
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  console.log(options)
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
