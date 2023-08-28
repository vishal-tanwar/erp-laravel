import React, {useEffect, useState } from "react";
import '../Dummy Pages/Dummy1.css';
import logoleft from '../../images/logoERP.jpeg';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


export default function RSupplierRegister() {

    const [data, setData] = useState([])
    const navigate = useNavigate();


// useEffect(() => {
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//       };
      
//       fetch("http://localhost:5123/api/Supplier", requestOptions)
//         .then(response => response.json())
//         .then((result) => {
//             setData(result);
//             console.log(result);
//         })
//         .catch(error => console.log('error', error));
// }, [])


const _apicallupdate = (supplierId) =>{
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
confirm("Are you want to delete this supplier");

var raw = JSON.stringify({
    "supplierId": 0,
    "supplierName": "string",
    "address1": "string",
    "address2": "string",
    "email": "string",
    "fax": "string",
    "stdCode": "string",
    "phone": "string",
    "mobile": "string",
    "website": "string",
    "natureOfBusiness": "string",
    "natureOfCompany": "string",
    "yearOfEstablishment": "string",
    "investmentValue": 0,
    "sizeOfCompany": 0,
    "registrationNo": "string",
    "registrationDate": "string",
    "gstRegistrationNo": "string",
    "gstRegistrationDate": "string",
    "panNo": "string",
    "panRegistrationDate": "string",
    "isCertified": true,
    "certificateCopy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "expectedDateOfCertificateRecieve": "string",
    "totalNoOfEmployee": 0,
    "relativeWorkingWithUs": "string",
    "isActive": true
  });
var requestOptions = {
method: 'DELETE',
redirect: 'follow',
headers: {
  'Accept': '*/*'
},
body: raw,
};

fetch(`http://localhost:5123/api/Supplier/DelteSupplier?id=${supplierId}`, requestOptions)
.then(response => response.text())
.then((res)=>{
console.log(res); 
if(res === 1 || "1"){
    toast.success('Deleted Successfully');
 
        setTimeout(() => navigate('/supplier/registration'), 2000);
 
    
 }
 else{
    toast.error('deleted failed')
 }

})
.catch(error => console.log('error', error));
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
                                    <tr>
                                        <td>{i+1}</td>
                                        <td>{Item.supplierName}</td>
                                        <td>{Item.address1}</td>
                                        <td>{Item.email}</td>
                                        <td>{Item.mobile}</td>
                                        <td>{Item.gstRegistrationNo}</td>
                                        <td>{Item.panNo}</td>
                                        <td>{Item.natureOfBusiness}</td>
                                        <td>{Item.natureOfCompany}</td>
                                        <td>{Item.registrationDate}</td>
                                        <td><button type="button" className="btn btn-success bg-success" onClick={() => {navigate('/supplier/editSupplier',{state:Item})}}>Edit</button></td>
                                        <td><button type="button" className="btn btn-danger bg-danger" onClick={() => _apicallupdate(Item.supplierId)}>Delete</button></td>
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