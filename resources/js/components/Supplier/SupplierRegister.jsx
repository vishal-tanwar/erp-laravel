import React, { useState } from 'react';
import FilterButton from '../DropdownFilter';
import Datepicker from '../Datepicker';

import RSupplierRegiter from './RSupplierRegister';
import { Link } from 'react-router-dom';
import Layout from '../../partials/Layout';


export default function NewSupTable() {

  return (

    <Layout title="Suppliers">

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

            <button type="button" className="btn btn-primary btn-sm bg-primary"><Link to='/supplier/addSupplier'>+ Add Supplier</Link></button>


              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                {/* Datepicker built with flatpickr */}
                <Datepicker />
                
              </div>
              
            </div>

            {/* Supplier Register Form */}
            <div>
             <RSupplierRegiter />
              
            </div>

            </Layout>

    )
}