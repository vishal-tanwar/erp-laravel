import React, { useState, useEffect, useRef } from 'react';
import { route } from '../utils/WebRoutes';
import { MdDashboard, MdHighQuality, MdPerson, MdSettings } from 'react-icons/md';
import IconSupplier from '../Icons/IconSupplier';
import { Dropdown, Nav, NavLink, DropdownItem } from '../components/Nav';
import {BiSolidPurchaseTag, BiSolidStoreAlt} from 'react-icons/bi'
import {FaCartArrowDown} from 'react-icons/fa';
import {GiEntryDoor} from 'react-icons/gi';
import {RiEqualizerFill} from 'react-icons/ri';

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

          <NavLink title="Customer" to={route.get('customer')} Icon={<MdPerson />} />

          <Dropdown title="Stores" Icon={<BiSolidStoreAlt/>} activeName='store'>
              <DropdownItem title="List"  to={route.get('store.list')}></DropdownItem>
              <DropdownItem title="Location"></DropdownItem>
          </Dropdown>

          <Dropdown title="Item Master" Icon={<FaCartArrowDown/>} activeName='item_master'>
              <DropdownItem title="Add Item" to={route.get('item_master.add_item')}></DropdownItem>
              <DropdownItem title="Items List" to={route.get('item_master.item_list')}></DropdownItem>
              <DropdownItem title="Units" to={route.get('item_master.units')} ></DropdownItem>
              <DropdownItem title="Groups"  to={route.get('item_master.group')}></DropdownItem>
              <DropdownItem title="Sub Group" to={route.get('item_master.sub_group')}></DropdownItem>
          </Dropdown>
         
          <NavLink title="Suppliers" to="#" Icon={<IconSupplier />} />

          <Dropdown title="Purchase" Icon={<BiSolidPurchaseTag/>} activeName='purchase'>
              <DropdownItem title="Schedule"></DropdownItem>
          </Dropdown>

          <NavLink title="Gate Entry" to="#" Icon={<GiEntryDoor />} />

          <NavLink title="Quality" to="#" Icon={<MdHighQuality />} />

          <Dropdown title="Setting" Icon={<MdSettings/>}>
              <DropdownItem title="Items List"></DropdownItem>
              <DropdownItem title="Units"></DropdownItem>
              <DropdownItem title="Groups"></DropdownItem>
              <DropdownItem title="Sub Group"></DropdownItem>
              <DropdownItem title="Grades"></DropdownItem>
              <DropdownItem title="Sizes"></DropdownItem>
              <DropdownItem title="Parts"></DropdownItem>
          </Dropdown>



        </Nav>
      </div >
    </div>
    // </div>
  );
}

export default Sidebar;


