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
import ExportMarketing from './components/Sales/exportMarketing';

// Import pages
import Dashboard from './pages/Dashboard';
import DemosticMarketing from './components/Sales/DemosticMarketing';
import SalesAndDespatch from './components/Sales/Sales&Despatch';
import CustomerSupport from './components/Sales/CustomerSupport';
import PayrollSystem from './components/HR and Payroll/PayrollSystem';
import HRDevelopement from './components/HR and Payroll/HRDevelopement';
import Finance from './components/Finance and Accounts/Finance';
import Transactions from './components/Finance and Accounts/Transactions';
import PurchaseOrder from './components/Purchase/PurchaseOrder';
import PurchaseInvoice from './components/Purchase/PurchaseInvoice';
import Reporting from './components/Purchase/Reporting and Analytics';
import CreateItem from './components/Inventory/Item master/CreateItem';
import ItemList from './components/Inventory/Item master/ItemList';
import ItemGroup from './components/Inventory/Item master/ItemGroup';
import GroupList from './components/Inventory/Item master/SubItemGroup';
import ReceivingVoucher from './components/Inventory/R.M/ReceivingVoucher';
import IssueVoucher from './components/Inventory/R.M/IssueVoucher';
import List from './components/Inventory/R.M/List';
import ReceivingVoucherB from './components/Inventory/B.O.P/ReceivingVoucherB';
import IssueVoucherB from './components/Inventory/B.O.P/IssueVoucherB';
import ListB from './components/Inventory/B.O.P/ListB';
import WarehouseList from './components/Inventory/Warehouse/WarehouseList';
import CreateWarehouse from './components/Inventory/Warehouse/CreateWarehouse';
import InventoryHistory from './components/Inventory/History/InventoryHistory';
import SupplierRegister from './components/Supplier/SupplierRegister';
import Dummy1 from './components/Dummy Pages/Dummy1';
import Dummy3 from './components/Dummy Pages/Dummy3';
import ItemName from './components/Inventory/R.M/ItemName';
import RMInventory from './components/Inventory/R.M/RMInventory';
import IssueVoucherBtn from './components/Inventory/R.M/IssueVoucherBtn';
import Staff from './components/Setup/Staff';
import NewStaffMember from './components/Setup/NewStaffMember';
import Permissions from './components/Setup/Permission';
import MemberEdit from './components/Setup/MemberEdit';
import AddSupplier from './components/Supplier/AddSupplier';
import CreateItemList from './components/Inventory/Item master/CreateItemList';
import ItemUnit from './components/Inventory/Item master/ItemUnit';
import ItemGroupList from './components/Inventory/Item master/ItemGroupList';
import ItemSubGrpList from './components/Inventory/Item master/ItemSubGrpList';
import ItemUnitList from './components/Inventory/Item master/ItemUnitList';
import EditItemGroupFormShow from './components/Inventory/Item master/EditItemGroupFormShow';
import EditUnitFormShow from './components/Inventory/Item master/EditUnitFormShow';
import EditItemSubGroupShow from './components/Inventory/Item master/EditItemSubGroupItemShow';
import EditSupplier from './components/Supplier/EditSupplier';
import CreateItemEdit from './components/Inventory/Item master/CreateItemEdit';


import Login from './auth/Login';
import Register from './auth/Register';


function Boot() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]);


  const ProtectedRoute = ({ element }) => {
    const user = sessionStorage.getItem('user');
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

          <Route exact path='/register' element={<Register />} />
          {/* Dashboard */}
          <Route exact path="/dashboard" element={<Dashboard />} />

          {/* Sales Route */}
          <Route exact path='/sales/export_marketing' element={<ExportMarketing />} />
          <Route exact path='/sales/demostic_marketing' element={<DemosticMarketing />} />
          <Route exact path='/sales/sales_despatch' element={<SalesAndDespatch />} />
          <Route exact path='/sales/customer_support' element={<CustomerSupport />} />

          {/* HR Developement */}
          <Route exact path='hr_payroll/payroll_system' element={<PayrollSystem />} />
          <Route exact path='hr_payroll/hr_development' element={<HRDevelopement />} />

          {/* Finance And Accounts */}
          <Route exact path='/finance_accounts/finance' element={<Finance />} />
          <Route exact path='/finance_accounts/transactions' element={<Transactions />} />

          {/* Purchase */}
          <Route exact path='/purchase/purchase_order' element={<PurchaseOrder />} />
          <Route exact path='/pruchase/purchase_invoice' element={<PurchaseInvoice />} />
          <Route exact path='/purchase/reporting_analytics' element={<Reporting />} />

          {/* Inventory */}
          {/* Item Master Route */}
          <Route exact path='/inventory/item_master/create_item' element={<CreateItem />} />
          <Route exact path='/inventory/item_master/item_list' element={<ItemList />} />
          <Route exact path='/inventory/item_master/item_group' element={<ItemGroup />} />
          <Route exact path='/inventory/item_master/sub_group' element={<GroupList />} />
          <Route exact path='/inventory/item_master/createItem_list' element={<CreateItemList />} />
          <Route exact path='/inventory/item_master/item_unit' element={<ItemUnit />} />
          <Route exact path='/inventory/item_master/add_itemGroup' element={<ItemGroupList />} />
          <Route exact path='/inventory/item_master/add_itemSubGroup' element={<ItemSubGrpList />} />
          <Route exact path='/inventory/item_master/add_itemUnit' element={<ItemUnitList />} />
          <Route exact path='/inventory/item_master/edit_item' element={<CreateItemEdit />} />

          {/* R.M --> Row Material */}
          <Route exact path='/inventory/r_m/receiving_voucher' element={<ReceivingVoucher />} />
          <Route exact path='/inventory/r_m/issue_voucher' element={<IssueVoucher />} />
          <Route exact path='/inventory/r_m/list' element={<List />} />
          <Route exact path='/inventory/r_m/item_name' element={<ItemName />} />
          <Route exact path='/inventory/r_m/receiving_item' element={<RMInventory />} />
          <Route exact path='/inventory/r_m/issue_item' element={<IssueVoucherBtn />} />


          {/* B.O.P --> Bought Out Product */}
          <Route exact path='/inventory/bop/receiving_voucher' element={<ReceivingVoucherB />} />
          <Route exact path='/inventory/bop/issue_voucher' element={<IssueVoucherB />} />
          <Route exact path='/inventory/bop/list' element={<ListB />} />

          {/* WareHouse */}
          <Route exact path='/inventory/warehouse/create_warehouse' element={<CreateWarehouse />} />
          <Route exact path='/inventory/warehouse/warehouse_list' element={<WarehouseList />} />

          {/* History */}
          <Route exact path='/inventory/history' element={<InventoryHistory />} />

          {/* Supplier --> registration */}
          <Route exact path='/supplier/registration' element={<SupplierRegister />} />
          <Route exact path='/supplier/addSupplier' element={<AddSupplier />} />
          <Route exact path='/supplier/editSupplier' element={<EditSupplier />} />


          {/* Dummy --> Pages */}
          <Route exact path='/Dummy Pages/Dummy1' element={<Dummy1 />} />
          <Route exact path='/Dummy Pages/Dummy3' element={<Dummy3 />} />


          {/* Setup */}
          <Route exact path="/staff" element={<Staff />} />
          <Route exact path='/staff/new_member' element={<NewStaffMember />} />
          <Route exact path='/staff/permission' element={<Permissions />} />

          {/* MemberEdit */}
          <Route exact path='staff/update' element={<MemberEdit />} />

          {/* EditItemGroup */}

          {/* <Route exact path='/editItemGroup' element={<EditItemGroupFormShow />} /> */}

          <Route exact path='/editGroupItems/:groupId' element={<EditItemGroupFormShow />} />

          <Route exact path='editUnitItem/:unitId' element={<EditUnitFormShow />} />

          {/* EDit Item Sub Group */}

          <Route exact path='/editItem_subGroup' element={<EditItemSubGroupShow />} />
        </Route>

          <Route path='*' element={<p>Page Not Found</p>} />          
      </Routes>

    </>
  );
}

export default Boot;
