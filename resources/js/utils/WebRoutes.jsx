import SupplierRegister from "../components/Supplier/SupplierRegister";
import Dashboard from "../pages/Dashboard";
import AddSupplier from '../components/Supplier/AddSupplier';
import Units from "../pages/ItemMaster/Units";
import Group from "../pages/ItemMaster/Group";
import SubGroup from "../pages/ItemMaster/SubGroup";
import ItemList from "../pages/ItemMaster/ItemList";
import AddItem from "../pages/ItemMaster/AddItem";
import Location from "../pages/Stores/Location";

// Store file Imports

import Stores from "../pages/Stores";


import Inventory from "../pages/Stores/Inventory";
import AddInventory from "../pages/Stores/AddInventory";


import VoucherView from "../pages/Stores/Screens/VoucherView";
import Vouchers from "../pages/Stores/Screens/Vouchers";
import CreateReceiving from "../pages/Stores/Screens/CreateReceiving";
import CreateIssuance from "../pages/Stores/Screens/CreateIssuance";
import Approved from "../pages/Quality/Approved";
import Rejected from "../pages/Quality/Rejected";
import Pending from "../pages/Quality/Pending";
import EditVoucher from "../pages/Stores/Screens/EditVoucher";
import VoucherExportPDF from "../pages/Stores/VoucherExportPDF";
import Users from "../pages/Users";
import Roles from "../pages/Users/Roles";
import RolesManager from "../pages/Users/RolesManager";



export function route(path) {

    let baseUrl = import.meta.env.VITE_APP_URL;
    const url = new URL(baseUrl);
    let fullpath = url.pathname + path;

    return fullpath.replace('//', '/');
}


route.get = function (name, params = {}) {
    let searched = Endpoints.find(route => route.name == name);
    if (typeof searched == "undefined") {
        throw new Error(`Route ${name} is not defined. check route name or define it first`);
    }
    else {
        if (Object.keys(params).length > 0 && params.constructor == Object) {
            return searched.path.replace(/\:(\w+)/g, (match, key) => params[key] || match);
        }
        return searched.path;
    }

}

route.make = function (route = {}) {
    if (typeof route == "object" && !Array.isArray(route)) {
        Endpoints.push(route);
    }
}


export const Endpoints = [
    {
        path: route("/dashboard"),
        component: Dashboard,
        exact: true,
        name: "dashboard",
    },

    {
        path: route("/supplier/registration"),
        component: SupplierRegister,
        exact: true,
        name: "supplier"
    },
    {
        path: route("supplier/addSupplier"),
        component: AddSupplier,
        exact: true,
        name: 'supplier.add'
    },

    {
        path: route("stores"),
        component: Stores,
        exact: true,
        name: "store.list"
    },

    {
        path: route("/store/:name/vouchers"),
        component: Vouchers,
        exact: true,
        name: "store.vouchers"
    },
    {
        path: route("/store/:name/vouchers/:id"),
        component: VoucherView,
        exact: true,
        name: "store.voucher.view"
    },
    {
        path: route("/store/:name/receiving"),
        component: CreateReceiving,
        exact: true,
        name: "store.receiving.create"
    },
    {
        path: route("/store/:name/issuance"),
        component: CreateIssuance,
        exact: true,
        name: "store.issuance.create"
    },
    {
        path: route("/store/:name/voucher/:id/edit"),
        component: EditVoucher,
        exact: true,
        name: "store.voucher.edit"
    },
    
    {
        path: route("item_master/units"),
        component: Units,
        exact: true,
        name: "item_master.units"
    },
    {
        path: route("item_master/group"),
        component: Group,
        exact: true,
        name: "item_master.group"
    },
    {
        path: route("item_master/sub_group"),
        component: SubGroup,
        exact: true,
        name: "item_master.sub_group"
    },
    {
        path: route("item_master/items"),
        component: ItemList,
        exact: true,
        name: "item_master.item_list"
    },
    {
        path: route("item_master/item/add"),
        component: AddItem,
        exact: true,
        name: "item_master.add_item"
    },

    {
        path: route("stores/location"),
        component: Location,
        exact: true,
        name: "store.location"
    },
   
    {
        path: route("stores/inventory"),
        component: Inventory,
        exact: true,
        name: "store.inventory"
    },
   
    {
        path: route("stores/inventory/add"),
        component: AddInventory,
        exact: true,
        name: "store.inventory.add"
    },

    {
        path: route("quality/approved"),
        component: Approved,
        exact: true,
        name: "quality.approved"
    },
    {
        path: route("quality/rejected"),
        component: Rejected,
        exact: true,
        name: "quality.rejected"
    },

    {
        path: route("quality/pending"),
        component: Pending,
        exact: true,
        name: "quality.pending"
    },
    {
        path: route("store/vouchers/:id"),
        component: VoucherExportPDF,
        exact: true,
        name: "store.voucher.export"
    },

    {
        path: route('users'),
        component: Users,
        exact: true,
        name: "users",
        permission: 'view_user'
    },
    {
        path: route('users/roles'),
        component: Roles,
        exact: true,
        name: "users.roles",
        permission: 'view_role'
    },
    {
        path: route('users/roles-permission-manager'),
        component: RolesManager,
        exact: true,
        name: "users.roles-manager",
        permission: 'view_permission'
    }


    

]
