import React, { useState, useEffect, useRef } from 'react';
import { route } from '../utils/WebRoutes';
import { MdDashboard } from 'react-icons/md';
import IconSupplier from '../Icons/IconSupplier';
import { Dropdown, Nav, NavLink, DropdownItem } from '../components/Nav';

function Sidebar({ isSidebarOpen }) {

  return (
    <div>

      {/* Sidebar */}
      {/* <div
        id="sidebar"
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'
          }`}
      > */}
      <div className={`sidebar ${!isSidebarOpen ? 'close' : ''}`}>
        <div className="logo-details">
          <i className='bx bxl-c-plus-plus'></i>
          <span className="logo_name">ERP</span>
        </div>

        <Nav>

          <NavLink title="Dashboard" to={route.get('dashboard')} Icon={<MdDashboard />} />

          <Dropdown title="Store" Icon={<i className='bx bx-collection' ></i>}>
            <DropdownItem title="R.M Master" to='/RM'/>
            <DropdownItem title="B.P.O Master" to='#' />
            <DropdownItem title="Store Location" to='#' />
          </Dropdown>








        </Nav>
      </div >
    </div>
    // </div>
  );
}

export default Sidebar;


