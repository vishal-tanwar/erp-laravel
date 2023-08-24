import React from 'react';
import '../../Supplier/SupplierRegister.css';
import { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';

export default function RMInventoryShow() {

    const [SupplierId, setSupplierID] = useState("");
    const [BillNo, setBillNo] = useState("");
    const [BillDate, setBillDate] = useState("");
    const [GrossWeight, setGrossWeight] = useState(0);
    const [TotalNetWeight, setTotalNetWeight] = useState(0);
    const [CoilHeatNo, setCoilHeatNo] = useState("");
    const [TotalPkt, setTotalPkt] = useState(0);
    const [PktGwt, setPktGwt] = useState(0);
    const [PktNetWeight, setPktNetWeight] = useState(0);
    const [PktReceived, setPktReceived] = useState(0);
    const [RootCartNo, setRootCartNo] = useState("");
    const [IssuePktQuantity, setIssuePktQuantity] = useState(0);
    const [ReceivedDate, setReceivedDate] = useState("");
    const [IssueDate, setIssueDate] = useState("");
    const [BalanceLotPktQuantity, setBalanceLotPktQuantity] = useState(0);

    const [supplierList, setSupplierList] = useState([]);
    const [itemList, setItemList] = useState([]);

    // Supplier GET

    useEffect(() => {
        fetch("https://localhost:7131/api/RawMaterial/GetSupplierList")
            .then((response) => response.json())
            .then((data) => {
                setSupplierList(data);
            })
            .catch((error) => console.log('error', error));
    }, []);

    // Items GET
    useEffect(() => {
        fetch("https://localhost:7131/api/RawMaterial/GetItemList")
            .then((response) => response.json())
            .then((data) => {
                setItemList(data);
            })
            .catch((error) => console.log('error', error));
    }, []);

    const _apicallupdate = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "rmId": 0,
            "SupplierId": SupplierId,
            "BillNo": BillNo,
            "BillDate": BillDate,
            "GrossWeight": GrossWeight,
            "TotalNetWeight": TotalNetWeight,
            "CoilHeatNo": CoilHeatNo,
            "TotalPkt": TotalPkt,
            "PktGwt": PktGwt,
            "PktNetWeight": PktNetWeight,
            "PktReceived": PktReceived,
            "RootCartNo": RootCartNo,
            "IssuePktQuantity": IssuePktQuantity,
            "ReceivedDate": ReceivedDate,
            "IssueDate": IssueDate,
            "BalanceLotPktQuantity": BalanceLotPktQuantity
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        fetch("https://localhost:7131/api/RawMaterial", requestOptions)
            .then(response => response.text())
            .then((res) => {
                console.log(res);
                if (res === 1 || res === "1") {
                    toast.success('R.M Registred Successfully');
                }
                else {
                    toast.error('Registred failed')
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

                    <div className="row g-3 mt-2 forborder12">

                        <label for="inputSupplier121" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-user-circle" aria-hidden="true"></i> Supplier ID: </label>
                        <div className="col-sm-4">
                            <select
                                className="form-control form-control-sm inputInnClr"
                                style={{ cursor: 'pointer' }}
                                value={SupplierId}
                                onChange={(e) => setSupplierID(e.target.value)}
                            >
                                <option value="">Select Supplier</option>
                                {supplierList.map((supplier) => (
                                    <option key={supplier.value} value={supplier.value}>
                                        {supplier.text}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <label for="inputBillN413" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-file" aria-hidden="true"></i> Bill No. </label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control form-control-sm inputInnClr" placeholder="Bill No." aria-label="State" id='inputBillN413' value={BillNo} onChange={(e) => setBillNo(e.target.value)} />
                        </div>
                        <label for="inputBillD403" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-calendar" aria-hidden="true"></i> Bill Date: </label>
                        <div className="col-sm-4">
                            <input type="date" className="form-control form-control-sm inputInnClr" placeholder="Bill date:" aria-label="State" id='inputBillD403' value={BillDate} onChange={(e) => setBillDate(e.target.value)} />
                        </div>
                    </div>

                    <div className="row g-3 mt-2 forborder12">
                        <label htmlFor="inputItem" className="col-sm-2 col-form-label lable-des-sec">
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i> Select Item:
                        </label>
                        <div className="col-sm-4">
                            <select
                                id="inputItem"
                                className="form-control form-control-sm inputInnClr custom-select"
                                style={{ cursor: 'pointer' }}
                            >
                                <option value="">Select Item</option>
                                {itemList.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.text}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>


                    <div className="row g-3  forborder12">

                        <label for="inputSupplier1It1" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-building-o" aria-hidden="true"></i> Item Name: </label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control form-control-sm inputInnClr" placeholder="Item Name" aria-label="State" id='inputSupplier1It1' />
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


                    <div className="row g-3 forborder12">

                        <label for="inputTotGwt413" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-hourglass-half" aria-hidden="true"></i> Total GWT. </label>
                        <div className="col-sm-4">
                            <input type="number" className="form-control form-control-sm inputInnClr" placeholder="Enter Total GWT." aria-label="State" id='inputTotGwt413' value={GrossWeight} onChange={(e) => setGrossWeight(e.target.value)} />
                        </div>
                        <label for="inputTotNwt403" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-anchor" aria-hidden="true"></i> Total Net WT. </label>
                        <div className="col-sm-4">
                            <input type="number" className="form-control form-control-sm inputInnClr" placeholder="Enter Total Net WT." aria-label="State" id='inputTotNwt403' value={TotalNetWeight} onChange={(e) => setTotalNetWeight(e.target.value)} />
                        </div>
                        <label for="inputCandH413" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-file" aria-hidden="true"></i> Enter Coil No. & Heat No. </label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control form-control-sm inputInnClr" placeholder="Enter Coil No. & Heat No." aria-label="State" id='inputCandH413' value={CoilHeatNo} onChange={(e) => setCoilHeatNo(e.target.value)} />
                        </div>
                    </div>

                    <div className="row g-3 forborder12">

                        <label for="inputTotPktEe1" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-anchor" aria-hidden="true"></i> Total Pkt.</label>
                        <div className="col-sm-4">
                            <input type="number" className="form-control form-control-sm inputInnClr" placeholder="Enter Total Pkt" aria-label="State" id='inputTotPktEe1' value={TotalPkt} onChange={(e) => setTotalPkt(e.target.value)} />
                        </div>
                        <label for="inputPktGwtEe2" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-snowflake-o" aria-hidden="true"></i> PKT GWT.</label>
                        <div className="col-sm-4">
                            <input type="number" className="form-control form-control-sm inputInnClr" placeholder="Enter PKT GWT." aria-label="State" id='inputPktGwtEe2' value={PktGwt} onChange={(e) => setPktGwt(e.target.value)} />
                        </div>

                        <label for="inputPktNwEe3" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-snowflake-o" aria-hidden="true"></i> PKT Net weight(In Kg)</label>
                        <div className="col-sm-4">
                            <input type="number" className="form-control form-control-sm inputInnClr" placeholder="PKT Net weight(In Kg)" aria-label="State" id='inputPktNwEe3' value={PktNetWeight} onChange={(e) => setPktNetWeight(e.target.value)} />
                        </div>
                        <label for="inputPktRecEe4" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-check-square" aria-hidden="true"></i> PKT Recieved</label>
                        <div className="col-sm-4">
                            <input type="number" className="form-control form-control-sm inputInnClr" placeholder="PKT Recieved" aria-label="State" id='inputPktRecEe4' value={PktReceived} onChange={(e) => setPktReceived(e.target.value)} />
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
