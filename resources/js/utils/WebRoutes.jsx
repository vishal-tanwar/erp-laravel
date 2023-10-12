import SupplierRegister from "../components/Supplier/SupplierRegister";
import Dashboard from "../pages/Dashboard";
import AddSupplier from '../components/Supplier/AddSupplier';
import Customer from "../pages/Customer";
import StoreView from "../pages/Stores/Screens/StoreView";
import Voucherform from "../pages/Voucherform";
import Units from "../pages/ItemMaster/Units";
import Group from "../pages/ItemMaster/Group";
import SubGroup from "../pages/ItemMaster/SubGroup";
import ItemList from "../pages/ItemMaster/ItemList";
import Viewpage from "../pages/Viewpage";
import Editpage from "../pages/Editpage";
import Issuancevoucher from "../pages/Issuancevoucher";
import AddItem from "../pages/ItemMaster/AddItem";
import Location from "../pages/Stores/Location";
import BOP from "../pages/BOP";
import Stores from "../pages/Stores";
import Inventory from "../pages/Stores/Inventory";
import AddInventory from "../pages/Stores/AddInventory";


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
        name: "dashboard"
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
        path: route("/customer"),
        component: Customer,
        exact: true,
        name: "customer"
    },

    {
        path: route("stores"),
        component: Stores,
        exact: true,
        name: "store.list"
    },

    {
        path: route("/store/:name/vouchers"),
        component: StoreView,
        exact: true,
        name: "store.vouchers"
    },
    {
        path: route("/store/:name/vouchers/:id"),
        component: Viewpage,
        exact: true,
        name: "store.voucher.view"
    },
    {
        path: route("/store/:name/receiving"),
        component: Voucherform,
        exact: true,
        name: "store.vouchers.create"
    },
    {
        path: route("/store/:name/issuance"),
        component: Issuancevoucher,
        exact: true,
        name: "store.issuance"
    },
    {
        path: route("/Editpage"),
        component: Editpage,
        exact: true,
        name: "Editpage"
    },
    {
        path: route("/BOP"),
        component: BOP,
        exact: true,
        name: "BOP"
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
        path: route("stores/inventory_management"),
        component: Inventory,
        exact: true,
        name: "store.inventory_management"
    },
   
    {
        path: route("stores/add_inventory"),
        component: AddInventory,
        exact: true,
        name: "store.add_inventory"
    },

]
