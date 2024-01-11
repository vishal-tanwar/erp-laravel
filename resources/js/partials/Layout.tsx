import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "react-bootstrap";
import { H1 } from "../components/Title";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface ILayout{
    title?: string, 
    children?: React.JSX.Element | React.JSX.Element[], 
    icon?: string | React.JSX.Element, 
    showBackButton?: boolean
}

const Layout = ({ title, children, icon, showBackButton }: ILayout) => {

    // const [loading, setLoading] = useState(true);

    // // Use useEffect hook to show loader before loading page.
    // useEffect(() => {
    //     // Wait for 2 seconds.
    //     setTimeout(() => {
    //         // Toggle loading state.
    //         setLoading((loading) => !loading);
    //     }, 2000);
    // }, []);

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const initiated = useRef(false);

    useEffect(() => {
        if (!initiated.current) {
            axios.get('validate-session').then(res => {
                if (!res.data.data.valid) {
                    Swal.fire({
                        toast: true,
                        title: "Session expired!",
                        icon: 'error',
                        text: "You have been logged out. Login again!",
                        position: 'top-right',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    }).then(result => {
                        if (result.isDismissed) {
                            localStorage.removeItem("user");
                            localStorage.removeItem("X-Auth-Token");

                            setTimeout(() => {
                                navigate('/')
                            }, 3000)
                        }
                    })
                }
            });

            initiated.current = true;
        }
    }, []);

    return (

        <div className="flex h-screen overflow-hidden">
            <Sidebar isSidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header onClick={() => {
                    setSidebarOpen(prev => {
                        localStorage.setItem('sidebar-expanded', `${!prev}`);
                        return !prev
                    })
                }} />

                {/* Main Content */}
                <main>

                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <div className="bg-white py-4 px-0 rounded-2">
                            <Container fluid>
                                {title ? <H1 className="mb-4" icon={icon} title={title} showBackButton={showBackButton} /> : ''}
                                {children}
                            </Container>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    )
}

export default Layout;
