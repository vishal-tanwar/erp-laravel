import React, { useState, useEffect, useRef } from 'react';
import NavLink from '../components/NavLink';
import {route} from '../utils/WebRoutes';
import { MdDashboard } from 'react-icons/md';
import IconSupplier from '../Icons/IconSupplier';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
 
  

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'
          }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}

          <NavLink to="/" className="block">

            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 100 100">
              <defs>
                <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="20" height="20" fill="blue" />
                  <circle cx="10" cy="10" r="5" fill="white" />

                </pattern>
              </defs>
              <rect x="0" y="0" width="100" height="100" fill="url(#pattern)" />
            </svg>

          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <ul className='navbar w-100'>
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0`}>
              <NavLink to={route.get('dashboard')} className='text-slate-400 hover:text-slate-200' >
                <MdDashboard />
                <span className="text-lg font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  Dashboard
                </span></NavLink>
            </li>

            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0`}>
              <NavLink to={route.get('supplier')} className='text-slate-400 hover:text-slate-200' >
                <IconSupplier />
                <span className="text-lg font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  Supplier
                </span></NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;


