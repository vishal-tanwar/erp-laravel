import React, { useState } from 'react';
import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import WelcomeBanner from '../../../partials/dashboard/WelcomeBanner';
import FilterButton from '../../DropdownFilter';
import Datepicker from '../../Datepicker';

import Banner from '../../../partials/Banner';
import { Link } from 'react-router-dom';

import ItemSubGrpListin from './ItemSubGrpListin';

export default function SubItemGroup() {

        
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

            <button type="button" className="btn btn-primary btn-sm bg-primary"><Link to='/inventory/item_master/add_itemSubGroup'> + Add Sub Group</Link></button>


              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                {/* Datepicker built with flatpickr */}
                <Datepicker />
              </div>
            </div>

            {/* CreateItem Register Form */}
            <div>
             <ItemSubGrpListin />
              
            </div>

          </div>
        </main>

        <Banner />

      </div>
    </div>
        

    )
}