import React, { useState, useEffect } from "react";
import './ItemGroup.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



export default function CreateItemEditIn(){

    const navigate = useNavigate();

    const {state} = useLocation();


    const [data, setData] = useState([])

    const [itemName, setItemName] = useState(state.itemName);
    const [itemCode, setItemCode] = useState(state.itemCode);
    const [itemGroup, setItemGroup] = useState(state.itemGroup);
    const [itemUnit, setItemUnit] = useState(state.itemUnit);
    const [barCode, setBarCode] = useState(state.barCode);


    const _apicallupdate = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var raw = JSON.stringify({

                "issueItemId": 1,
                "itemName": itemName,
                "itemCode": itemCode,
                "barCode": barCode,
                "barTitle": "testTitle",
                "itemGroup": itemGroup,
                "itemSubGroup": "testSubgroup",
                "itemDescription": "Desc",
                "itemRate": "100",
                "quantity": 10,
                "itemUnit": itemUnit,
                "issueDate": "2023-07-06T00:00:00"
            
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

        fetch("http://localhost:5121/api/Item/UpdateItem", requestOptions)
            .then(response => response.text())
            .then((res) => {
                console.log(res);
                if (res === 1 || "1") {
                    toast.success('Item Update Successfully');

                    setTimeout(() => navigate('/inventory/item_master/create_item'), 2000);

                }
                else {
                    toast.error('Item Update failed')
                }

            })
            .catch(error => console.log('error', error));
    }


    return(
        <React.Fragment>
        <div className="add-new-leadBackS">
        <div className="add-new-leadStyle text-center text-danger">Edit Item</div>
        <div className="row justify-content-between mx-2 mt-3">
          <div className="col-sm-5 forRequiredStar">
            <label htmlFor="inputFistN1e" className="add-NewLFo-lable">
              Item Code
            </label>
            <input
              type="text"
              className="form-control-item"
              id="inputFistN1e"
              placeholder="Item Code"
              aria-label="First name"
              value={itemCode} 
              onChange={(e) => setItemCode(e.target.value)}
            />
          </div>
          <div className="col-sm-5 forRequiredStar">
            <label htmlFor="inputIdN1e" className="add-NewLFo-lable">
              Item BarCode
            </label>
            <input
              type="text"
              className="form-control-item"
              id="inputIdN1e"
              placeholder="BarCode"
              aria-label="First name"
              value={barCode} 
              onChange={(e) => setBarCode(e.target.value)}
            />
          </div>
          <div className="col-sm-5 forRequiredStar">
            <label htmlFor="inputLastN1e" className="add-NewLFo-lable">
              Item Name
            </label>
            <input
              type="text"
              className="form-control-item"
              id="inputLastN1e"
              placeholder="Item Name"
              aria-label="Last name"
              value={itemName} 
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="col-sm-5 forRequiredStar">
            <label htmlFor="inputLastN66e" className="add-NewLFo-lable">
              Unit
            </label>
            <input
              type="text"
              className="form-control-item"
              id="inputLastN66e"
              placeholder="Item Name"
              aria-label="Last name"
              value={itemUnit} 
              onChange={(e) => setItemUnit(e.target.value)}
            />
          </div>
          <div className="col-sm-5 forRequiredStar">
            <label htmlFor="inputLastN44e" className="add-NewLFo-lable">
            Item Group
            </label>
            <input
              type="text"
              className="form-control-item"
              id="inputLastN44e"
              placeholder="Item group"
              aria-label="Last name"
              value={itemGroup} 
              onChange={(e) => setItemGroup(e.target.value)}
            />
          </div>

          <div className="row justify-content-between  mt-4 mb-4">
          <div className="col-3 forRequiredStar">
            <button
              type="button"
              className="ad-Ne-LFom-btn1"
              onClick={() => _apicallupdate()}
            >
              Update
            </button>
          </div>
        </div>
          
        </div>
     </div>

     <ToastContainer />

        </React.Fragment>
    )
}