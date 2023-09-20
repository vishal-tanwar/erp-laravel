import React, {useEffect, useState } from "react";
import '../Dummy Pages/Dummy1.css';
import logoleft from '../../images/logoERP.jpeg';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";


export default function RSupplierRegister() {

    const [data, setData] = useState([])
    const navigate = useNavigate();


useEffect(() => {

    axios.get("/supplier").then(res => {
        setData(res.data.data.supplier);
    })
}, [])


const _apicallDelete = (supplierId, index) =>{
    axios.delete(`/supplier/${supplierId}`).then( res => {
        console.log(res);
        setData(data.filter((v, i) => i !== index));
    })
  }
  

    return (
        <React.Fragment>
            <nav className="navbar d-flex navbar-light bg-white">

                <div className="text-center mx-4">
                    <h5 className="navheading-center1 mb-2 text-white"> Supplier Details </h5>

                </div>

                <div className="text-center">
                    <h4 className="navheading-center1">K R <span className="navheading-center-span1">AUTO COMPONENT</span> PVT.LTD</h4>
                </div>
                <a className="navbar-brand" href="#">
                    <img src={logoleft} width="220" height="70" className="" alt="K R logo pic" />
                </a>
            </nav>

            <div className="rmbottcolrLine1 text-center">
                <div className="Supplier_register_iner"> 
                    <p>Supplier Details</p>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-responsive">
                    <thead>
                        <tr className="rm-list-thM1">
                        </tr>
                        <tr className="rm-list-th text-center">
                            <th scope="col">Sr. No.</th>
                            <th scope="col">NAME OF THE FIRM</th>
                            <th scope="col">ADDRESS</th>
                            <th scope="col">E-MAIL</th>
                            <th scope="col">MOBILE NO.</th>
                            <th scope="col">GST NO.</th>
                            <th scope="col">PAN NO.</th>
                            <th scope="col">NATURE OF BUSINESS</th>
                            <th scope="col">NATURE OF COMPANY</th>
                            <th scope="col">REGISTRATION DATE</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-center rm-list-td">
                        
                        {
                            data.map((Item,i) => {
                                return(
                                    <tr key={`key-${i}`}>
                                        <td>{i+1}</td>
                                        <td>{Item.firm_name}</td>
                                        <td>{Item.address}</td>
                                        <td>{Item.email}</td>
                                        <td>{Item.number}</td>
                                        <td>{Item.gst_number}</td>
                                        <td>{Item.pan}</td>
                                        <td>{Item.business_nature}</td>
                                        <td>{Item.company_nature}</td>
                                        <td>{Item.registration_date}</td>
                                        <td><button type="button" className="btn btn-success bg-success" onClick={() => {navigate('/supplier/editSupplier',{state:Item})}}>Edit</button></td>
                                        <td><button type="button" className="btn btn-danger bg-danger" onClick={() => _apicallDelete(Item.id, i)}>Delete</button></td>
                                        </tr>
                                )
                                
                            })
                        }

                    </tbody>
                </table>
            </div>

            {/* </main> */}
            <ToastContainer />
 

        </React.Fragment>

    )
}