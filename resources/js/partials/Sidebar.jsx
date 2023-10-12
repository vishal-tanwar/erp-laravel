import React, { useState, useEffect, useRef } from 'react';
import { route } from '../utils/WebRoutes';
import { MdDashboard, MdOutlineHighQuality } from 'react-icons/md';
import IconSupplier from '../Icons/IconSupplier';
import { Dropdown, Nav, NavLink, DropdownItem } from '../components/Nav';
import { BiSolidStoreAlt } from 'react-icons/bi'
import { FaCartArrowDown } from 'react-icons/fa';

function Sidebar({ isSidebarOpen, setSidebarOpen }) {

  useEffect(() => {
    const sidebarExpanded = localStorage.getItem('sidebar-expanded');
    if (sidebarExpanded !== null) {
      setSidebarOpen(() => sidebarExpanded === "true" ? true : false);
    }

  }, [])

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

          <NavLink title="Dashboard" to={route.get('dashboard')} Icon={<MdDashboard/>} />

          <NavLink title="Suppliers" to={route.get("supplier")} Icon={<IconSupplier/>} />

          {/* <NavLink title="Customer" to={route.get('customer')} Icon={<MdPerson />} /> */}

          <Dropdown title="Stores" Icon={<BiSolidStoreAlt/>} activeName='store'>

              <DropdownItem title="List"  to={route.get('store.list')}></DropdownItem>
              <DropdownItem title="Location" to={route.get('store.location')}></DropdownItem>
              <DropdownItem title="Inventory" to={route.get('store.inventory_management')}></DropdownItem>

            <DropdownItem title="List" to={route.get('store.list')}></DropdownItem>
            <DropdownItem title="Location" to={route.get('store.location')}></DropdownItem>
            <DropdownItem title="Inventory Management" to={route.get('store.location')}></DropdownItem>

          </Dropdown>

          <Dropdown title="Item Master" Icon={<FaCartArrowDown/>} activeName='item_master'>
            <DropdownItem title="Add Item" to={route.get('item_master.add_item')}></DropdownItem>
            <DropdownItem title="Items List" to={route.get('item_master.item_list')}></DropdownItem>
            <DropdownItem title="Units" to={route.get('item_master.units')} ></DropdownItem>
            <DropdownItem title="Groups" to={route.get('item_master.group')}></DropdownItem>
            <DropdownItem title="Sub Group" to={route.get('item_master.sub_group')}></DropdownItem>
          </Dropdown>

          <Dropdown title="Quality" Icon={< MdOutlineHighQuality/>} activeName='quality'>
            <DropdownItem title="Approved" to={route.get('quality.approved')}></DropdownItem>
            <DropdownItem title="Rejected"></DropdownItem>
            <DropdownItem title="Pending"></DropdownItem>
          </Dropdown>


          {/* <Dropdown title="Purchase" Icon={<BiSolidPurchaseTag/>} activeName='purchase'>
              <DropdownItem title="Schedule"></DropdownItem>
          </Dropdown> */}

          {/* <NavLink title="Gate Entry" to="#" Icon={<GiEntryDoor />} /> */}

          {/* <NavLink title="Quality" to="#" Icon={<MdHighQuality />} /> */}

          <Dropdown title="Quality" Icon={<MdHighQuality/>}>
              <DropdownItem title="Approved"></DropdownItem>
              <DropdownItem title="Rejected"></DropdownItem>
              <DropdownItem title="Pending"></DropdownItem>
          </Dropdown>



        </Nav>
      </div >
    </div>
    // </div>
  );
}

export default Sidebar;


