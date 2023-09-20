import React, { useState, useEffect } from "react";
import '../../Dummy Pages/Dummy1.css';
import logoleft from '../../../images/logoERP.jpeg';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function CreateItemListInn() {

    const [data, setData] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:5115/api/Item", requestOptions)
            .then(response => response.json())
            .then((result) => {
                setData(result);
                console.log(result);
            })
            .catch(error => console.log('error', error));
    }, [])


    const _apicallupdate = (id) =>{
        var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    confirm("Are you want to delete this Item");
    
    var raw = JSON.stringify({
      "issueItemId": 0,
        "itemName": "itemName",
      "itemCode": "itemCode",
      "barCode": "barcode",
      "barTitle": "Barcode Title",
      "itemGroup": "itemGroup",
      "itemSubGroup": "itemSubGroup",
      "itemDescription": "itemDescription",
      "itemRate": "0",
      "itemUnit": "itemUnit",
      "barcodeImage": "barcodeImage" 
      });

    var requestOptions = {
    method: 'DELETE',
    redirect: 'follow',
    headers: {
      'Accept': '*/*'
    }, 
       body: raw,
    };
    
    fetch(`http://localhost:5115/api/Item/DeleteItem?id=${id}`, requestOptions)
    .then(response => response.text())
    .then((res)=>{
    console.log(res); 
    if(res === 1 || "1"){
        toast.success('Deleted Successfully');
     
            setTimeout(() => navigate('/inventory/item_master/create_item'), 2000);
     
     }
     else{
        toast.error('deleted failed')
     }
    
    })
    .catch(error => console.log('error', error));
      }
    

    return (
        <React.Fragment>
            <nav className="navbar d-flex justify-content-between navbar-light bg-white">

                <div className="text-center mx-4">
                    <h5 className="navheading-center1 mb-2 text-white"> Item Detail </h5>
                </div>

                <div className="text-center">
                    <h4 className="navheading-center1">K R <span className="navheading-center-span1">AUTO COMPONENT</span> PVT.LTD</h4>
                </div>
                <a className="navbar-brand" href="#">
                    <img src={logoleft} width="220" height="70" className="" alt="K R logo pic" />
                </a>
            </nav>

            <div className="rmbottcolrLine1 d-flex justify-content-around">
                <div>
                    <p>Item List</p>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-responsive">
                    <thead>

                        <tr className="rm-list-th text-center">
                            <th scope="col">Sr. No.</th>
                            <th scope="col">Item BarCode</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Item Code</th>
                            <th scope="col">Units</th>
                            <th scope="col">Item Group</th>
                            <th scope="col">Sub Group</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-center rm-list-td">

                        {
                            data.map((Item, i) => {
                                return (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{Item.barCode}</td>
                                        <td>{Item.itemName}</td>
                                        <td>{Item.itemCode}</td>
                                        <td>{Item.itemUnit}</td>
                                        <td>{Item.itemGroup}</td>
                                        <td>{Item.itemSubGroup}</td>
                                        <td><button type="button" className="btn btn-success bg-success" onClick={() => {navigate('/inventory/item_master/edit_item',{state:Item})}}>Edit</button></td>
                                        <td><button type="button" className="btn btn-danger bg-danger" onClick={() => _apicallupdate(Item.id)}>Delete</button></td>
                                    </tr>
                                )

                            })
                        }

                    </tbody>
                </table>
            </div>
            <ToastContainer />

        </React.Fragment>

    )
}