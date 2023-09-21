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
import RM from "../pages/RM/Index";
import createstore from "../pages/createstore";

export function route(path) {

    let baseUrl = import.meta.env.VITE_APP_URL;
    const url = new URL(baseUrl);
    let fullpath = url.pathname + path;

    return fullpath.replace('//', '/');
}


route.get = function( name ){
    let searched = Endpoints.find( route => route.name == name ) ;
    if (typeof searched == "undefined" ){
        throw new Error(`Route ${name} is not defined. check route name or define it first`);
    }
    else{
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
        path: route("/inventory/item_master/create_item"),
        component: CreateItem,
        exact: true,
        name: "item.create"
    },
    {
        path: route("inventory/item_master/item_list"),
        component: ItemList,
        exact: true,
        name: "item.list"
    },
    {
        path: route("inventory/item_master/createItem_list"),
        component: CreateItemList,
        exact: true,
        name: "item.create.list"
    },
    {
        path: route("inventory/item_master/item_unit"),
        component: ItemUnit,
        exact: true,
        name: "item.unit"
    },
    {
        path: route("inventory/item_master/add_itemUnit"),
        component: ItemUnitList,
        exact: true,
        name: "item.unit.add"
    },
    {
        path: route("inventory/item_master/item_group"),
        component: ItemGroup,
        exact: true,
        name: "item.group"
    },
    {
        path: route("inventory/item_master/add_itemGroup"),
        component: ItemGroupList,
        exact: true,
        name: "item.group.add"
    },
    {
        path: route("inventory/item_master/sub_group"),
        component: SubItemGroup,
        exact: true,
        name: "item.subgroup"
    },
    {
        path: route("inventory/item_master/add_itemSubGroup"),
        component: ItemSubGrpList,
        exact: true,
        name: "item.subgroup.add"
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
        path: route("/RM"),
        component: RM,
        exact: true,
        name: "RM"
    },
    {
        path: route("/createstore"),
        component: createstore,
        exact: true,
        name: "createstore"
    },


]
