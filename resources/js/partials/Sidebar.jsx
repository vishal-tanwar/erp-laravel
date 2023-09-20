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
            <DropdownItem title="R.M" to='#' />
            <DropdownItem title="B.P.O" to='#' />
          </Dropdown>


          <li className="active">
            <div className="iocn-link">
              <a href="#">
                <i className='bx bx-collection' ></i>
                <span className="link_name">Category</span>
              </a>
              <i className='bx bxs-chevron-down arrow' ></i>
            </div>
            <ul className="sub-menu">
              <li><a className="link_name" href="#">Category</a></li>
              <li><a href="#">HTML & CSS</a></li>
              <li><a href="#">JavaScript</a></li>
              <li><a href="#">PHP & MySQL</a></li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <a href="#">
                <i className='bx bx-book-alt' ></i>
                <span className="link_name">Posts</span>
              </a>
              <i className='bx bxs-chevron-down arrow' ></i>
            </div>
            <ul className="sub-menu">
              <li><a className="link_name" href="#">Posts</a></li>
              <li><a href="#">Web Design</a></li>
              <li><a href="#">Login Form</a></li>
              <li><a href="#">Card Design</a></li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className='bx bx-pie-chart-alt-2' ></i>
              <span className="link_name">Analytics</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">Analytics</a></li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className='bx bx-line-chart' ></i>
              <span className="link_name">Chart</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">Chart</a></li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <a href="#">
                <i className='bx bx-plug' ></i>
                <span className="link_name">Plugins</span>
              </a>
              <i className='bx bxs-chevron-down arrow' ></i>
            </div>
            <ul className="sub-menu">
              <li><a className="link_name" href="#">Plugins</a></li>
              <li><a href="#">UI Face</a></li>
              <li><a href="#">Pigments</a></li>
              <li><a href="#">Box Icons</a></li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className='bx bx-compass' ></i>
              <span className="link_name">Explore</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">Explore</a></li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className='bx bx-history'></i>
              <span className="link_name">History</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">History</a></li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className='bx bx-cog' ></i>
              <span className="link_name">Setting</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">Setting</a></li>
            </ul>
          </li>

        </Nav>
      </div >
    </div>
    // </div>
  );
}

export default Sidebar;


