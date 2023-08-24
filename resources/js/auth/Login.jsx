import React, { useEffect, useState } from 'react';
import './styles/login.scss';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

// icons

import { ToastContainer, toast } from 'react-toastify';


// Logo
import Logo from '../images/Logo.png'
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const _apicallupdate = () => {
        if (!username || !password) {
            toast.error('Please fill in all the fields');
          return;
        }
      
        axios.post('/login', {
            username,password
        })
        .then( res => {
            let response = res.data;
            sessionStorage.setItem("X-Auth-Token", response.data.authorization.token);
            sessionStorage.setItem("user", JSON.stringify( response.data.user));

            axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("X-Auth-Token")}`;

            Swal.fire({
                toast: true,
                title: "Success!",
                icon: 'success',
                text: "Logged in successfully!",
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });


            setTimeout(() =>{
                    navigate("/dashboard");
            }, 3000);
        })
        .catch( res => {
            Swal.fire({
                toast: true,
                title: "Login Error!",
                icon: 'error',
                text: res.response.data.message,
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            })
        })
      };
      

    if (sessionStorage.getItem("user")){
        useEffect( () => {
            navigate('/dashboard');
        },[]);
    }

    else{

    return (
        <div className="login-form">
            <div className="company-details">
                <div className='gst'>
                    <h1 className='gst_heading'>GST</h1>
                    <div>
                        <h1 className='gst_heading'>Goods And Service Taxs</h1>
                    </div>
                </div>
                <div className="address">
                    <div className='address_2'>
                        <h1>GST Complains ERP for GST complains India</h1>
                        <h1>FundCase - 136</h1>
                        <h1>Date: 03 - 06 - 2023</h1>
                        <h1>The Future in House</h1>
                        <h1>CODDED<span className='coddedbrain'>BRAIN IT SOLUTION</span> PVT LTD.</h1>
                        <div className='contact_us'>
                            <p className='p'>CONTACT US:</p>
                            <div className='contact'>
                                <div><h1>Address: ABC, Faridabad</h1></div>
                                <div><h1>Mobile:  0123456789</h1></div>
                                <div><h1>Email: coddedbrain@gmail.com</h1></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-form-right">
                {/* Right side with login inputs */}
                <form className='login_form'>
                    <div>
                        <img src={Logo} alt="Logo" className='logo' />
                    </div>
                    <div className='fields'>
                        

                        <label htmlFor="loginID" className='login_lable'>Username/Email:</label>

                        <input
                            type="text"
                            className='input'
                            id="login"
                            placeholder='Username/Email'
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />

                        <label htmlFor="password" className='login_lable'>Password:</label>

                        <input
                            type="password"
                            className='input'
                            id="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {(!username || !password) && (
                            <p className="validation-error">Please enter both login ID and password</p>
                        )}

                        <div>
                            <button type="button" className='sign_in' onClick={() => _apicallupdate()}>Sign in</button>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>

    );
    }
};

export default Login;
