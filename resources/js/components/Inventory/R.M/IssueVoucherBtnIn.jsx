import React, { useState, useEffect } from 'react'
import '../../Supplier/SupplierRegister.css';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';


export default function IssueVoucherBtnIn() {
  
   const navigate = useNavigate();

    const [rootCartNo, setRootCartNo] = useState("");
    const [itemName, setItemName] = useState("");
    const [issuePktQuantity, setIssuePktQuantity] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [balanceLotPktQuantity, setBalanceLotPktQuantity] = useState("");

    

    const _apicallupdate = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({

                "itemName": itemName,
                "itemCode": "string",
                "barCode": "string",
                "barTitle": "string",
                "itemGroup": "string",
                "itemSubGroup": "string",
                "itemDescription": "string",
                "itemRate": "string",
                "quantity": 0,
                "itemUnit": "string",
                "rootCartNo": rootCartNo,
                "issuePktQuantity": issuePktQuantity,
                "balanceLotPktQuantity": balanceLotPktQuantity,
                "issueDate": issueDate
              
            
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        fetch("http://localhost:5121/api/IssueItem", requestOptions)
        .then(response => response.text())
        .then((res) => {
          console.log(res);
          if (res === 1 || "1") {
            toast.success('Issue Registred Successfully');
  
  
            setTimeout(() => navigate('/inventory/r_m/issue_voucher'), 2000);
  
  
          }
          else {
            toast.error('Issue Registred failed')
          }
  
        })
        .catch(error => console.log('error', error));
    }


    return (
        <React.Fragment>
            <form className='mainSubform'>
                <div className="bgcaption11">
                    <h4 className='text-center'>R.M. INVENTRY FORM</h4>
                </div>

                <div className='forPadmar'>
                    <div className="mb-2 forPadmarInn">
                        <h2 className='bgcaption12 mt-2'><i className="fa fa-file-pdf-o" aria-hidden="true"></i> R.M. Details</h2>
                    </div>

                    <div className="row g-3  forborder12">

                        <label for="inputRootCn4a3" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-file" aria-hidden="true"></i> Root Card No.: </label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control form-control-sm inputInnClr" placeholder="Root Card No." aria-label="State" id='inputRootCn4a3' value={rootCartNo} onChange={(e) => setRootCartNo(e.target.value)} />
                        </div>
                        <label for="inputIssuePktQ4b3" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-hand-rock-o" aria-hidden="true"></i> Issue Pkt/Qty: </label>
                        <div className="col-sm-4">
                            <input type="number" className="form-control form-control-sm inputInnClr" placeholder="amount" aria-label="State" id='inputIssuePktQ4b3' value={issuePktQuantity} onChange={(e) => setIssuePktQuantity(e.target.value)} />
                        </div>
                     </div>  

                        <div className="row g-3  forborder12">

                            <div className='col-sm-6'>
                                <select className='select-box'>
                                    <option value="field1">Select Item</option>
                                    <option value="field2">Item 1</option>
                                    <option value="field2">Item 2</option>
                                    <option value="field2">Item 3</option>
                                    <option value="field2">Item 4</option>
                                </select>

                            </div>

                            <div className='col-sm-6'>

                                <select className='select-box'>
                                    <option value="field1">Select Multiple Item</option>
                                    <option value="field2">Item 1</option>
                                    <option value="field2">Item 2</option>
                                    <option value="field2">Item 3</option>
                                    <option value="field2">Item 4</option>
                                </select>
                            </div>
                    </div>

                            <div className="row g-3  forborder12">

                            <label for="inputSupplier1It1" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-building-o" aria-hidden="true"></i> Item Name: </label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control form-control-sm inputInnClr" placeholder="Item Name" aria-label="State" id='inputSupplier1It1' value={itemName} onChange={(e) => setItemName(e.target.value)}/>
                            </div>

                            <label for="inputBillN4It3" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-caret-square-o-up" aria-hidden="true"></i> Item Part. </label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control form-control-sm inputInnClr" placeholder="Item Part" aria-label="State" id='inputBillN4It3' />
                            </div>
                            <label for="inputBiIte403" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-crosshairs" aria-hidden="true"></i> Item Grade: </label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control form-control-sm inputInnClr" placeholder="Item Grade" aria-label="State" id='inputBiIte403' />
                            </div>
                            <label for="inputItsD403" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-adjust" aria-hidden="true"></i> Item Size: </label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control form-control-sm inputInnClr" placeholder="Item Size" aria-label="State" id='inputItsD403' />
                            </div>
                        </div>

                        <div className="row g-3  forborder12">
                           
                            <label for="inputIsseDat4d3" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-calendar" aria-hidden="true"></i> Issue Date </label>
                            <div className="col-sm-4">
                                <input type="date" className="form-control form-control-sm inputInnClr" placeholder="Issue Date" aria-label="State" id='inputIsseDat4d3' value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
                            </div>

                            <label for="inputBalaLoP4e3" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-snowflake-o" aria-hidden="true"></i> Balance Lot Pkt. Qty:</label>
                            <div className="col-sm-4">
                                <input type="number" className="form-control form-control-sm inputInnClr" placeholder="Balance Lot Pkt. Qty" aria-label="State" id='inputBalaLoP4e3' value={balanceLotPktQuantity} onChange={(e) => setBalanceLotPktQuantity(e.target.value)} />
                            </div>
                        </div>
                    


                    <div className="row g-3 mt-1 forMarpadd2-des12">
                        <div className="col-sm-1">
                            <button type="button" className="btn btnkeYSub1" onClick={() => _apicallupdate()}> Submit</button>
                        </div>
                        <div className="col-sm-1">
                            <button type="Cancel" className="btn btn-danger">Cancel</button>
                        </div>
                    </div>

                </div>
            </form>
            <ToastContainer />
        </React.Fragment>
    )
}