import React, {useEffect, useRef, useState} from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import WelcomeBanner from "./dashboard/WelcomeBanner";
import { Container } from "react-bootstrap";
import { H1 } from "../components/Title";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Layout = ( {title, children, icon} ) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const initiated = useRef( false );

    useEffect( () => {
        if( !initiated.current ){
            axios.get('validate-session').then(res => {
                if( !res.data.data.valid ){
                    Swal.fire({
                        toast: true,
                        title: "Session expired!",
                        icon: 'error',
                        text: "You have been logged out. Login again!",
                        position: 'top-right',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    }).then( result => {
                        if(result.isDismissed){
                            sessionStorage.removeItem("user");
                            sessionStorage.removeItem("X-Auth-Token");

                            setTimeout(() => {
                                navigate('/')
                            }, 3000)
                        }
                    })
                }
            });

            initiated.current = true;
        }
    },[]);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Main Content */}
                <main>

                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <WelcomeBanner />

                        <Container fluid>
                            <H1 className="mb-4" element="h1" icon={icon}>{title}</H1>

                            {children}
                        </Container>
                    </div>

                </main>
            </div>
        </div>
    )
}

export default Layout;