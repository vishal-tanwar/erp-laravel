import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Outlet,
  Navigate
} from 'react-router-dom';

import './css/style.css';
// tostify
import 'react-toastify/dist/ReactToastify.css';

import './charts/ChartjsConfig';
import Login from './auth/Login';

import { Endpoints, route } from './utils/WebRoutes';
import NotFound from './pages/NotFound';
import can from './utils/can';


function Boot() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]);


  const ProtectedRoute = ({ element }) => {
    const user = localStorage.getItem('user');
    const isAuthenticated = user !== null;
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }

    return element;
  };


  return (
    <>
      <Routes>
        {/* Auth Routes */}
        <Route exact path='/' element={<Login />} />


        <Route element={<ProtectedRoute element={<Outlet />} />}>
          {Endpoints.map( (route, i) => {
            const {exact,component,path, permission} = route;
            if ( permission){
              return ( 
                can(permission) ? <Route exact={exact} Component={component} path={path} key={i} /> : '' 
              )
            } else{
              return(
                <Route exact={exact} Component={component} path={path} key={i} />
              );
            }
          })}
        </Route>

          <Route path='*' element={<NotFound />} />          
      </Routes>

    </>
  );
}

export default Boot;
