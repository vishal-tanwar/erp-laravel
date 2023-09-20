import axios from 'axios';

/**
 * Add Axios Default Headers to access
 */
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common["X-CSRF-TOKEN"] = document.head.querySelector("[name=X-CSRF]").content;

/**
 * Set Authorization Bearer Token default to all request
 */

if( localStorage.getItem("X-Auth-Token") ){
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("X-Auth-Token")}`;
}


/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import './bootstrap';

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// import './components/Example';

import './main'
