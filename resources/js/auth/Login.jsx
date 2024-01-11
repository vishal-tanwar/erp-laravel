import React, { useEffect, useState } from 'react';
import './styles/login.scss';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
// icons
import { ToastContainer, toast } from 'react-toastify';

import LoginImage from '../images/Login-Image.jpg'
import axios from 'axios';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Login = () => {

    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordHidden, setPasswordHidden] = useState(true);

    const _apicallupdate = (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.error('Please fill in all the fields');
            return;
        }

        axios.post('/login', {
            username, password
        })
            .then(res => {
                let response = res.data;
                localStorage.setItem("X-Auth-Token", response.data.authorization.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("user-roles", response.data.roles);
                localStorage.setItem("user-permissions", JSON.stringify(response.data.permissions));

                axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("X-Auth-Token")}`;

                Swal.fire({
                    toast: true,
                    title: "Success!",
                    icon: 'success',
                    text: "Logged in successfully!",
                    position: 'top-right',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                }).then(() => {
                    navigate("/dashboard");
                });

            })
            .catch(res => {
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

    if (localStorage.getItem("user")) {
        useEffect(() => {
            navigate('/dashboard');
        }, []);
    }

    else {

        return (
            <div className="login-form" style={{ backgroundColor: "#4a4cf61c"}}>
                <div className="company-details" style={{
                    background: 'transparent',
                    backgroundImage: `url(${LoginImage})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center"
                }}>

                </div>
                <div className="login-form-right">
                    {/* Right side with login inputs */}
                    <form className='login_form ms-0' onSubmit={e => _apicallupdate(e)}>
                        <div>
                            <h1 className='h1 font-medium text-gray-600 mb-3' style={{ fontFamily: "sans-serif" }}>ERP Login</h1>
                        </div>
                        <div>

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

                            <div className='password-field'>
                                <input
                                    type={isPasswordHidden ? "password" : "text"}
                                    className='input'
                                    id="password"
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {isPasswordHidden ? <FaRegEye onClick={() => setPasswordHidden(false)} /> : <FaRegEyeSlash onClick={() => setPasswordHidden(true)} />}
                            </div>

                            {(!username || !password) && (
                                <p className="validation-error">Please enter both login ID and password</p>
                            )}

                            <div>
                                <button type="submit" className='sign_in'>Sign in</button>
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
