import SupplierRegister from "../components/Supplier/SupplierRegister";
import Dashboard from "../pages/Dashboard";
import AddSupplier from '../components/Supplier/AddSupplier';
import CreateItem from "../components/Inventory/ItemMaster/CreateItem";
import CreateItemList from "../components/Inventory/ItemMaster/CreateItemList";
import ItemUnit from "../components/Inventory/ItemMaster/ItemUnit";
import ItemList from "../components/Inventory/ItemMaster/ItemList";
import ItemGroup from "../components/Inventory/ItemMaster/ItemGroup";
import ItemGroupList from "../components/Inventory/ItemMaster/ItemGroupList";
import SubItemGroup from "../components/Inventory/ItemMaster/SubItemGroup";
import ItemSubGrpList from "../components/Inventory/ItemMaster/ItemSubGrpList";
import ItemUnitList from "../components/Inventory/ItemMaster/ItemUnitList";
import ReceivingVoucher from "../components/Inventory/R.M/ReceivingVoucher";
import RMInventory from "../components/Inventory/R.M/RMInventory";
import Customer from "../pages/Customer";
import List from "../pages/Stores/List";
import StoreView from "../pages/Stores/Screens/StoreView";


export function route(path) {

    let baseUrl = import.meta.env.VITE_APP_URL;
    const url = new URL(baseUrl);
    let fullpath = url.pathname + path;

    return fullpath.replace('//', '/');
}


route.get = function( name, params = {} ){
    let searched = Endpoints.find( route => route.name == name ) ;
    if (typeof searched == "undefined" ){
        throw new Error(`Route ${name} is not defined. check route name or define it first`);
    }
    else{
        if( Object.keys( params ).length > 0 && params.constructor == Object){
            return searched.path.replace(/\:(\w+)/g, (match,key) => params[key] || match );
        }
        return searched.path;
    }

}

route.make = function( route={} ){
    if( typeof route == "object" && !Array.isArray(route) ){
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
        path: route("/items/create"),
        component: CreateItemList,
        exact: true,
        name: "items.create"
    },
    {
        path: route("items/list"),
        component: CreateItem,
        exact: true,
        name: "items.list"
    },
    {
        path: route("items/units"),
        component: ItemUnit,
        exact: true,
        name: "items.units"
    },
    {
        path: route("items/unit/add"),
        component: ItemUnitList,
        exact: true,
        name: "items.unit.add"
    },
    {
        path: route("items/groups"),
        component: ItemGroup,
        exact: true,
        name: "items.groups"
    },
    {
        path: route("items/group"),
        component: ItemGroupList,
        exact: true,
        name: "item.group.add"
    },
    {
        path: route("inventory/item_master/sub_group"),
        component: SubItemGroup,
        exact: true,
        name: "items.subgroup"
    },
    {
        path: route("inventory/item_master/add_itemSubGroup"),
        component: ItemSubGrpList,
        exact: true,
        name: "items.subgroup.add"
    },
    {
        path: route("/inventory/r_m/receiving_voucher"),
        component: ReceivingVoucher,
        exact: true,
        name: "rm.receiving.voucher"
    },
    {
        path: route("/inventory/r_m/receiving_item"),
        component: RMInventory,
        exact: true,
        name: "rm.receiving.item"
    },
    {
        path: route("/customer"),
        component: Customer,
        exact: true,
        name: "customer"
    },

    {
        path: route("stores/list"),
        component: List,
        exact: true,
        name: "store.list"
    },
    {
        path: route("stores/create"),
        component: List,
        exact: true,
        name: "store.create"
    },
    {
        path: route("stores/edit/:id"),
        component: List,
        exact: true,
        name: "store.edit"
    },
    {
        path: route("/store/:name/vouchers"),
        component: StoreView,
        exact: true,
        name: "store.vouchers"
    },
    {
        path: route("/store/:name/vouchers/create"),
        component: StoreView,
        exact: true,
        name: "store.vouchers.create"
    },

]
