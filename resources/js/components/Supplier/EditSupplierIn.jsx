import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function EditSupplierIn() { 

    const navigate = useNavigate();

    const {state} = useLocation();

    //console.log(location.state);

    const [data, setData] = useState([])


    const [SupplierName, setSupplierName] = useState(state.supplierName);
    const [Address1, setAddress1] = useState(state.address1);
    const [Email, setEmail] = useState(state.email);
    const [GSTRegistrationNo, setGSTRegistrationNo] = useState(state.gstRegistrationNo);
    const [NatureOfBusiness, setNatureOfBusiness] = useState(state.natureOfBusiness);
    const [NatureOfCompany, setNatureOfCompany] = useState(state.natureOfCompany);
    const [Mobile, setMobile] = useState(state.mobile);
    const [PANNo, setPANNo] = useState(state.panNo);
    const [RegistrationDate, setRegistrationDate] = useState(state.registrationDate);
    const [STDCode, setSTDCode] = useState(state.panNo);
    const [YearOfEstablishment, setYearOfEstablishment] = useState('');
    const [Fax, setFax] = useState('');
    const [Phone, setPhone] = useState('');
    const [InvestmentValue, setInvestmentValue] = useState('');
    const [SizeOfCompany, setSizeOfCompany] = useState('');
    const [RegistrationNo, setRegistrationNo] = useState('');
    const [GSTRegistrationDate, setGSTRegistrationDate] = useState('');
    const [PANRegistrationDate, setPANRegistrationDate] = useState('');
    const [ExpectedDateOfCertificateRecieve, setExpectedDateOfCertificateRecieve] = useState('');
    const [TotalNoOfEmployee, setTotalNoOfEmployee] = useState('');
    const [Website, setWebsite] = useState('');
    const [RelativeWorkingWithUs, setRelativeWorkingWithUs] = useState('');
    const [Address2, setAddress2] = useState('');

    const _apicallupdate = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var raw = JSON.stringify({
            "SupplierId": 0,
            "SupplierName": SupplierName,
            "Address1": Address1,
            "Address2": "",
            "Email": Email,
            "Fax": Fax,
            "STDCode": STDCode,
            "Phone": Phone,
            "Mobile": Mobile,
            "Website": Website,
            "NatureOfBusiness": NatureOfBusiness,
            "NatureOfCompany": NatureOfCompany,
            "YearOfEstablishment": YearOfEstablishment,
            "InvestmentValue": InvestmentValue,
            "SizeOfCompany": SizeOfCompany,
            "RegistrationNo": RegistrationNo,
            "RegistrationDate": RegistrationDate,
            "GSTRegistrationNo": GSTRegistrationNo,
            "GSTRegistrationDate": GSTRegistrationDate,
            "PANNo": PANNo,
            "PANRegistrationDate": PANRegistrationDate,
            "IsCertified": true,
            "ExpectedDateOfCertificateRecieve": ExpectedDateOfCertificateRecieve,
            "TotalNoOfEmployee": TotalNoOfEmployee,
            "RelativeWorkingWithUs": RelativeWorkingWithUs,
            "IsActive": false
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

        fetch("http://localhost:5123/api/Supplier/UpdateSupplier", requestOptions)
            .then(response => response.text())
            .then((res) => {
                console.log(res);
                if (res === 1 || "1") {
                    toast.success('Update Successfully');

                    setTimeout(() => navigate('/supplier/registration'), 2000);

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
                    <h4 className='text-center text-danger'>Edit SUPPLIER REGISTRATION FORM</h4>
                </div>

                <div className='forPadmar'>
                    <div className="mb-2 forPadmarInn">
                        <h1 className='bgcaption12 mt-2'><i className="fa fa-file-pdf-o" aria-hidden="true"></i>Edit Company Details</h1>
                    </div>


                    <div className="form-group row forborder12">
                        <label for="inputfirmName" className="col-sm-2 col-form-label lable-des-sec" required> Name of the Firm:</label>
                        <div className="col-sm-9 mt-1 mb-1">
                            <input type="text" className="form-control form-control-sm inputInnClr" id="inputfirmName" value={SupplierName} onChange={(e) => setSupplierName(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row forborder12">
                        <label for="inputAddress72" className="col-sm-2 col-form-label lable-des-sec"> Address:-</label>
                        <div className="col-sm-9 mt-1 mb-1">
                            <input type="text" className="form-control form-control-sm inputInnClr" id="inputAddress72" value={Address1} onChange={(e) => setAddress1(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row g-3 mt-2 mx-2 forMarpadd2-des12">

                        <label for="inputAddress4f3" className="col-sm-2 col-form-label new-des2er"><i className="fa fa-address-card" aria-hidden="true"></i> GST Registration No.</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control form-control-sm inputInnClr" aria-label="State" id='inputAddress4f3' value={GSTRegistrationNo} onChange={(e) => setGSTRegistrationNo(e.target.value)}/>
                        </div>
                        <label for="inputAddress4g3" className="col-sm-2 col-form-label new-des2er"><i className="fa fa-calendar" aria-hidden="true"></i> Email:</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control form-control-sm inputInnClr" aria-label="State" id='inputAddress4g3' value={Email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <label for="inputAddress4h3" className="col-sm-2 col-form-label new-des2er"><i className="fa fa-address-card" aria-hidden="true"></i> PAN Card No.</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control form-control-sm inputInnClr" aria-label="State" id='inputAddress4h3' value={PANNo} onChange={(e) => setPANNo(e.target.value)} />
                        </div>
                        <label for="inputAddress4Mbl3" className="col-sm-2 col-form-label new-des2er"><i className="fa fa-calendar" aria-hidden="true"></i> Mobile</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control form-control-sm inputInnClr" aria-label="State" id='inputAddress4Mbl3' value={Mobile} onChange={(e) => setMobile(e.target.value)} />
                        </div>
                        <label for="inputAddress4Mb3" className="col-sm-2 col-form-label new-des2er"><i className="fa fa-calendar" aria-hidden="true"></i> Registration date</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control form-control-sm inputInnClr" aria-label="State" id='inputAddress4Mb3' value={RegistrationDate} onChange={(e) => setRegistrationDate(e.target.value)}/>
                        </div>
                        <label for="inputAddress4N3" className="col-sm-2 col-form-label new-des2er"><i className="fa fa-calendar" aria-hidden="true"></i> Nature of Bussieness</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control form-control-sm inputInnClr" aria-label="State" id='inputAddress4N3' value={NatureOfBusiness} onChange={(e) => setNatureOfBusiness(e.target.value)}/>
                        </div>
                        <label for="inputAddress4N5" className="col-sm-2 col-form-label new-des2er"><i className="fa fa-calendar" aria-hidden="true"></i> Nature of Company</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control form-control-sm inputInnClr" aria-label="State" id='inputAddress4N5' value={NatureOfCompany} onChange={(e) => setNatureOfCompany(e.target.value)}/>
                        </div>
                    </div>

                    <div className="col-sm-1 mx-2">
                        <button type="button" className="btn btnkeYSub1" onClick={() => _apicallupdate()}> Update</button>
                    </div>
                </div>
            </form>

            <ToastContainer />

        </React.Fragment>

    )
}

