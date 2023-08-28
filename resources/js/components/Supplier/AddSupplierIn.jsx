import React, { useEffect } from 'react';
import "./SupplierRegister.css";
import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AddSupplierIn() {

    const navigate = useNavigate();

    const [SupplierName, setSupplierName] = useState("");
    const [Address1, setAddress1] = useState("");
    const [Email, setEmail] = useState("");
    const [Fax, setFax] = useState("");
    const [STDCode, setSTDCode] = useState("");
    const [Phone, setPhone] = useState("");
    const [Mobile, setMobile] = useState("");
    const [Website, setWebsite] = useState("");
    const [NatureOfBusiness, setNatureOfBusiness] = useState("");
    const [NatureOfCompany, setNatureOfCompany] = useState("");
    const [YearOfEstablishment, setYearOfEstablishment] = useState("");
    const [InvestmentValue, setInvestmentValue] = useState(0);
    const [SizeOfCompany, setSizeOfCompany] = useState(0);
    const [RegistrationNo, setRegistrationNo] = useState("");
    const [RegistrationDate, setRegistrationDate] = useState("");
    const [GSTRegistrationNo, setGSTRegistrationNo] = useState("");
    const [GSTRegistrationDate, setGSTRegistrationDate] = useState("");
    const [PANNo, setPANNo] = useState("");
    const [PANRegistrationDate, setPANRegistrationDate] = useState("");
    const [ExpectedDateOfCertificateRecieve, setExpectedDateOfCertificateRecieve] = useState("");
    const [TotalNoOfEmployee, setTotalNoOfEmployee] = useState(0);
    const [RelativeWorkingWithUs, setRelativeWorkingWithUs] = useState("");
    const [listcontact, setlistcontact] = useState([]);
    const [addTable, setAddTable] = useState([]);


    const handleAddClick = () => {
        setlistcontact((prevListContact) => {
            return [...prevListContact, ""];
        });
    };


    const handleContactInputChange = (e, index, field) => {
        const { value } = e.target;
        setlistcontact((prevListContact) => {
            const newListContact = [...prevListContact];
            newListContact[index][field] = value;
            return newListContact;
        });
    };

    const handleRemoveContact = (index) => {
        setlistcontact((prevListContact) => {
            const newListContact = [...prevListContact];
            newListContact.splice(index, 1);
            return newListContact;
        });
    };


    const handleAddTable = () => {
        setAddTable((prevAddTable) => [
            ...prevAddTable,
            { name: "", designation: "", email: "", phone: "" },
        ]);
    };

    const handleRemoveTable = (index) => {
        setAddTable((prevAddTable) => {
            const newAddTable = [...prevAddTable];
            newAddTable.splice(index, 1);
            return newAddTable;
        });
    };

    const handleTableInputChange = (e, index, field) => {
        const { value } = e.target;
        setAddTable((prevAddTable) => {
            const newAddTable = [...prevAddTable];
            newAddTable[index][field] = value;
            return newAddTable;
        });
    };


    useEffect(() => {

    }, [listcontact, addTable]);



    const _apicallupdate = (e) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = {
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
            "IsActive": false,
            "contacts": addTable
        };

        axios.post('/supplier', raw ).then( res => {
            console.log(res);
        }).catch( res => {
             
             let errors = Object.entries( res.response.data.data.errors ).map(el => el[1][0]);
                
             let lis = '';
             errors.forEach( errorText => {
                lis += `<li class="text-danger mb-1">${errorText}</li>`;
             } );

             Swal.fire({
                title: "Error",
                titleText: "Fill the follwing errors",
                icon: "error",
                toast:true,
                position: 'top-right',
                showConfirmButton: false,
                customClass:{
                    popup: "colored-toast",
                    timerProgressBar: "bg-danger",
                    icon: "text-danger"
                    
                },
                timer: 5000,
                timerProgressBar: true,
                html: `<ul>${lis}</ul>`
             })

        })

        // fetch("http://localhost:5123/api/supplier", requestOptions)
        //     .then(response => response.text())
        //     .then((res) => {
        //         console.log(res);
        //         if (res === 1 || "1") {
        //             toast.success('Supplier Registred Successfully');

        //             setTimeout(() => navigate('/supplier/registration'), 2000);

        //         }
        //         else {
        //             toast.error('Supplier Registred failed')
        //         }

        //     })
        //     .catch(error => console.log('error', error));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }


    return (

        <React.Fragment>
            <form className='mainSubform needs-validation' onSubmit={handleSubmit}>
                <div className="bgcaption11">
                    <h4 className='text-center'>NEW SUPPLIER REGISTRATION FORM</h4>
                </div>

                <div className='forPadmar'>
                    <div className="mb-2 forPadmarInn">
                        <h1 className='bgcaption12 mt-2'><i className="fa fa-file-pdf-o" aria-hidden="true"></i> Company Details</h1>
                    </div>

                    <div className="form-group row forborder12 was-validated">
                        <label htmlFor="SupplierName" className="col-sm-2 col-form-label lable-des-sec"> Name of the Firm:</label>
                        <div className="col-sm-9 mt-1 mb-1">
                            <input type="text" className="form-control form-control-sm inputInnClr" id="SupplierName" placeholder="Enter name of the firm" required value={SupplierName} onChange={(e) => setSupplierName(e.target.value)} />
                            <div className="invalid-feedback">
                                Please Enter the supplier
                            </div>
                        </div>
                    </div>
                    <div className="form-group row forborder12 was-validated">
                        <label htmlFor="inputAddress72" className="col-sm-2 col-form-label lable-des-sec"> Address:-</label>
                        <div className="col-sm-9 mt-1 mb-1">
                            <input type="text" className="form-control form-control-sm inputInnClr" id="inputAddress72" placeholder="Enter address" required value={Address1} onChange={(e) => setAddress1(e.target.value)} />
                            <div className="invalid-feedback">
                                Please Enter the address
                            </div>
                        </div>
                    </div>

                    <div className="row g-3 forborder12">

                        <label htmlFor="inputAddress413" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-envelope" aria-hidden="true"></i> E-mail. </label>
                        <div className="col-sm-3">
                            <input type="email" className="form-control form-control-sm inputInnClr" placeholder="Email" aria-label="State" id='inputAddress413' value={Email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <label htmlFor="inputAddress403" className="col-sm-2 col-form-label lable-des-sec" style={{ marginLeft: "8%" }}><i className="fa fa-globe" aria-hidden="true"></i> Website: </label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control form-control-sm inputInnClr" placeholder="Website" aria-label="State" id='inputAddress403' value={Website} onChange={(e) => setWebsite(e.target.value)} />
                        </div>
                    </div>

                    <div className="row g-3 mt-3 part-tel-des">

                        <label htmlFor="inputTele413" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-phone" aria-hidden="true"></i> Tele No. (0).</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control form-control-sm inputInnClr" placeholder="Country code" aria-label="State" id='inputTele413' />
                        </div>
                        <div className="col-sm-3">
                            <input type="text" className="form-control form-control-sm inputInnClr" placeholder="STD code" aria-label="State" id='inputTele413' value={STDCode} onChange={(e) => setSTDCode(e.target.value)} />
                        </div>
                        <div className="col-sm-3">
                            <input type="text" className="form-control form-control-sm inputInnClr" placeholder="Nos." aria-label="State" id='inputTele413' value={Phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <label htmlFor="inputFaxN413" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-fax" aria-hidden="true"></i> Fax No. (0).</label>
                        <div className="col-sm-3">
                            <input type="number" className="form-control form-control-sm inputInnClr" placeholder="Country code" aria-label="State" id='inputFaxN413' />
                        </div>
                        <div className="col-sm-3">
                            <input type="number" className="form-control form-control-sm inputInnClr" placeholder="STD code" aria-label="State" id='inputFaxN413' />
                        </div>
                        <div className="col-sm-3">
                            <input type="number" className="form-control form-control-sm inputInnClr" placeholder="Nos." aria-label="State" id='inputFaxN413' value={Fax} onChange={(e) => setFax(e.target.value)} />
                        </div>

                        {listcontact.map((it, index) => (
                            <React.Fragment key={index}>
                                <label
                                    htmlFor={`inputMobN413${index}`}
                                    className="col-sm-2 col-form-label lable-des-sec"
                                >
                                    <i className="fa fa-mobile" aria-hidden="true"></i> Mobile No. ({index}
                                    ).
                                </label>
                                <div className="col-sm-3">
                                    <input
                                        type="number"
                                        className="form-control form-control-sm inputInnClr"
                                        placeholder="Country code"
                                        aria-label="State"
                                        name={`suppContryCode${index}`}
                                        id={`inputMobN413${index}`}
                                        value={it}
                                        onChange={(e) => handleContactInputChange(e, index, 'mobile')}
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <input  
                                        type="number"
                                        className="form-control form-control-sm inputInnClr"
                                        placeholder="STD code"
                                        aria-label="State"
                                        name={`suppMobile${index}`}
                                        id={`inputMobN413${index}`}
                                        value={it}
                                        onChange={(e) => handleContactInputChange(e, index, 'mobile')}
                                    />
                                </div>
                                {index > 0 && (
                                    <div className="col-sm-1">
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => handleRemoveContact(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}


                        <label htmlFor="inputMobN413" className="col-sm-2 col-form-label lable-des-sec"><i className="fa fa-mobile" aria-hidden="true"></i> Mobile No. (0).</label>
                        <div className="col-sm-3">
                            <input type="number" className="form-control form-control-sm inputInnClr" placeholder="Country code" aria-label="State" name='suppContryCode' id='inputMobN413' />
                        </div>
                        <div className="col-sm-6">
                            <input type="number" className="form-control form-control-sm inputInnClr" placeholder="STD code" aria-label="State" name='suppMobile' id='inputMobN413' value={Mobile} onChange={(e) => setMobile(e.target.value)} />
                        </div>

                        <div className="col-sm-1 d-none">
                            <button type="button" className="btn btn-primary  bg-primary" onClick={handleAddClick}>+</button>
                        </div>

                    </div>

                    <div className="bgcaption1w1 mt-4 mb-3">
                        <h5 className=''> Name and Designation of Principal Officer/Persons to be Connected</h5>
                    </div>

                    <div className="row g-3 mt-3 part-tel-des">
                        <div className="table-responsive col-sm-11">
                            <table className="table table-bordered border-dark">
                                <thead>
                                    <tr className="thtable-des">
                                        <th scope="col">Sr. No.</th>
                                        <th scope="col">Name of the Person</th>
                                        <th scope="col">Designation</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone No.</th>
                                        <th scope="col">Actions</th> {/* Add this column for the Remove button */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {addTable.map((item, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm inputInnClr"
                                                    placeholder="Name of person"
                                                    aria-label="State"
                                                    value={item.name}
                                                    onChange={(e) => handleTableInputChange(e, index, "name")}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm inputInnClr"
                                                    placeholder="Designation"
                                                    aria-label="State"
                                                    value={item.designation}
                                                    onChange={(e) =>
                                                        handleTableInputChange(e, index, "designation")
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm inputInnClr"
                                                    placeholder="E-mail"
                                                    aria-label="State"
                                                    value={item.email}
                                                    onChange={(e) => handleTableInputChange(e, index, "email")}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm inputInnClr"
                                                    placeholder="Phone no."
                                                    aria-label="State"
                                                    value={item.phone}
                                                    onChange={(e) => handleTableInputChange(e, index, "phone")}
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleRemoveTable(index)}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-1">
                            <button
                                type="button"
                                className="btn btn-primary bg-primary"
                                onClick={handleAddTable}
                            >
                                +
                            </button>
                        </div>
                    </div>



                    <div className="container-des12">
                        <div className="row g-3">
                            <div className="col-sm">
                                <div className="bgcaption1w1  col-sm-12">
                                    <h5 className=''><i className="fa fa-address-card" aria-hidden="true"></i> Nature of Business(Please tick any one)</h5>
                                </div>
                                <div className="mx-2">
                                    <div className="form-check form-check-inline col-sm-4">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Manufacturing" onChange={(e) => setNatureOfBusiness("Manufacturing")} />
                                        <label className="form-check-label lable-des2e" htmlFor="inlineRadio1">Manufacturing</label>
                                    </div>
                                    <div className="form-check form-check-inline col-sm-4">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Sole Selling Agent" onChange={(e) => setNatureOfBusiness("Sole Selling Agent")} />
                                        <label className="form-check-label lable-des2e" htmlFor="inlineRadio2">Sole Selling Agent</label>
                                    </div>
                                    <div className="form-check form-check-inline col-sm-2">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="Dealer" onChange={(e) => setNatureOfBusiness("Dealer")} />
                                        <label className="form-check-label lable-des2e" htmlFor="inlineRadio3">Dealer</label>
                                    </div> <br />
                                    <div className="form-check form-check-inline col-sm-4">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="Trader" onChange={(e) => setNatureOfBusiness("Trader")} />
                                        <label className="form-check-label lable-des2e" htmlFor="inlineRadio4">Trader</label>
                                    </div>
                                    <div className="form-check form-check-inline col-sm-4">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value="Agent" onChange={(e) => setNatureOfBusiness("Agent")} />
                                        <label className="form-check-label lable-des2e" htmlFor="inlineRadio5">Agent</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio6" value="Assembler" onChange={(e) => setNatureOfBusiness("Assembler")} />
                                        <label className="form-check-label lable-des2e" htmlFor="inlineRadio6">Assembler</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio7" value="Service Provide" onChange={(e) => setNatureOfBusiness("Service Provide")} />
                                        <label className="form-check-label lable-des2e" htmlFor="inlineRadio7">Service Provider</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm">
                                <div className="bgcaption1w1 col-sm-12">
                                    <h5 className=''><i className="fa fa-address-card" aria-hidden="true"></i> Nature of Company(Please tick any one)</h5>
                                </div>
                                <div className="mx-2">
                                    <div className="form-check form-check-inline col-sm-3">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio11" value="Proprietary" onChange={(e) => setNatureOfCompany("Proprietary")} />
                                        <label className="form-check-label lable-des2e" htmlFor="inlineRadio11">Proprietary</label>
                                    </div>
                                    <div className="form-check form-check-inline col-sm-3">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio22" value="Partnership" onChange={(e) => setNatureOfCompany("Partnership")} />
                                        <label className="form-check-label lable-des2e" htmlFor="inlineRadio22">Partnership</label>
                                    </div>

                                    <div className="form-check form-check-inline col-sm-4">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio55" value="LLP" onChange={(e) => setNatureOfCompany("LLP")} />
                                        <label className="form-check-label lable-des2e" htmlFor="inlineRadio55">LLP</label>
                                    </div>
                                    <br />
                                    <div className="form-check form-check-inline col-sm-3">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio33" value="Private" onChange={(e) => setNatureOfCompany("Private")} />
                                        <label className="form-check-label lable-des2e" htmlFor="inlineRadio33">Private</label>
                                    </div>
                                    <div className="form-check form-check-inline col-sm-4">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio44" value="Public Ltd" onChange={(e) => setNatureOfCompany("Public Ltd")} />
                                        <label className="form-check-label lable-des2e" htmlFor="inlineRadio44">Public Ltd</label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-3 mt-2 forMarpadd2-des12">

                        <label htmlFor="inputAddress4a3" className="col-sm-2 col-form-label new-des2er"><i className="fa fa-home" aria-hidden="true"></i> Year of Establishment: </label>
                        <div className="col-sm-3">
                            <input type="year" className="form-control form-control-sm inputInnClr" placeholder="Year" aria-label="State" id='inputAddress4a3' value={YearOfEstablishment} onChange={(e) => setYearOfEstablishment(e.target.value)} />
                        </div>
                        <label htmlFor="inputAddress4b3" className="col-sm-4 col-form-label new-des2er"><i className="fa fa-hand-rock-o" aria-hidden="true"></i> Value of Investment in Plant & Machinery </label>
                        <div className="col-sm-2">
                            <input type="number" className="form-control form-control-sm inputInnClr" placeholder="Amount" aria-label="State" id='inputAddress4b3' value={InvestmentValue} onChange={(e) => setInvestmentValue(e.target.value)} />
                        </div>
                        <label htmlFor="inputAddress4c3" className="col-sm-2 col-form-label new-des2er"><i className="fa fa-handshake-o" aria-hidden="true"></i> Size of the Company </label>
                        <div className="col-sm-3">
                            <input type="number" className="form-control form-control-sm inputInnClr" placeholder="Size of the company" aria-label="State" id='inputAddress4c3' value={SizeOfCompany} onChange={(e) => setSizeOfCompany(e.target.value)} />
                        </div>
                        <label htmlFor="inputAddress4d3" className="col-sm-3 col-form-label new-des2er"><i className="fa fa-address-card" aria-hidden="true"></i> Enterprise Registration No.</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control form-control-sm inputInnClr" placeholder="Enterprise Registration no." aria-label="State" id='inputAddress4d3' value={RegistrationNo} onChange={(e) => setRegistrationNo(e.target.value)} />
                        </div>

                        <label htmlFor="inputAddress4e3" className="col-sm-2 col-form-label new-des2er"><i className="fa fa-calendar" aria-hidden="true"></i> Registration Date:</label>
                        <div className="col-sm-3">
                            <input type="date" className="form-control form-control-sm inputInnClr" placeholder="Registration no." aria-label="State" id='inputAddress4e3' value={RegistrationDate} onChange={(e) => setRegistrationDate(e.target.value)} />
                        </div>
                        <hr />
                        <label htmlFor="inputAddress4f3" className="col-sm-2 col-form-label new-des2er"><i className="fa fa-address-card" aria-hidden="true"></i> GST Registration No.</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control form-control-sm inputInnClr" placeholder="GST Registration no." aria-label="State" id='inputAddress4f3' value={GSTRegistrationNo} onChange={(e) => setGSTRegistrationNo(e.target.value)} />
                        </div>
                        <label htmlFor="inputAddress4g3" className="col-sm-3 col-form-label new-des2er"><i className="fa fa-calendar" aria-hidden="true"></i> GST Registration Date:</label>
                        <div className="col-sm-3">
                            <input type="date" className="form-control form-control-sm inputInnClr" placeholder="registration no." aria-label="State" id='inputAddress4g3' value={GSTRegistrationDate} onChange={(e) => setGSTRegistrationDate(e.target.value)} />
                        </div>
                        <label htmlFor="inputAddress4h3" className="col-sm-2 col-form-label new-des2er"><i className="fa fa-address-card" aria-hidden="true"></i> PAN Card No.</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control form-control-sm inputInnClr" placeholder="PAN registration no." aria-label="State" id='inputAddress4h3' value={PANNo} onChange={(e) => setPANNo(e.target.value)} />
                        </div>
                        <label htmlFor="inputAddress4i3" className="col-sm-3 col-form-label new-des2er"><i className="fa fa-calendar" aria-hidden="true"></i> PAN Registration Date:</label>
                        <div className="col-sm-3">
                            <input type="date" className="form-control form-control-sm inputInnClr" placeholder="registration no." aria-label="State" id='inputAddress4i3' value={PANRegistrationDate} onChange={(e) => setPANRegistrationDate(e.target.value)} />
                        </div>
                    </div>


                    <div className="bgcaption1w1 mt-4 mb-3">
                        <h5 className=''><i className="fa fa-address-card" aria-hidden="true"></i> ISO/TS/ISI/Other Certification</h5>
                    </div>

                    <label htmlFor="" className="col-sm-4 col-form-label forMarpadd2-des12 new-des2er"><i className="fa fa-quora" aria-hidden="true"></i> Are you registered with ISO/TS/ISI/Other?</label>
                    <div className="form-check form-check-inline col-sm-2">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions21" id="inline13221" value="true" onChange={(e) => setIsCertified(true)} />
                        <label className="form-check-label new-des2er" htmlFor="inline13221">Yes</label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions21" id="inliddfo2" value="false" onChange={(e) => setIsCertified(false)} />
                        <label className="form-check-label new-des2er" htmlFor="inliddfo2">No</label>
                    </div>

                    <label htmlFor="" className="col-sm-4 col-form-label forMarpadd2-des12 new-des2er"><i className="fa fa-quora" aria-hidden="true"></i> If Yes, please enclose the copy of the certificate <br /><i className="fa fa-quora" aria-hidden="true"></i> If No, whether you are in process to acquire?</label>
                    <div className="form-check form-check-inline col-sm-2">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions31" id="inlineRadio1ff1" value="option1" />
                        <label className="form-check-label new-des2er" htmlFor="inlineRadio1">Yes</label>
                    </div>
                    <div className="form-check form-check-inline col-sm-3">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions31" id="inlineRadio2ff2" value="option2" />
                        <label className="form-check-label new-des2er" htmlFor="inlineRadio2">No</label>
                    </div>

                    <div className="row g-3 mt-2 forMarpadd2-des12">
                        <label htmlFor="inputAddress4iw3" className="col-sm-4 col-form-label new-des2er"><i className="fa fa-calendar" aria-hidden="true"></i> If Yes, expected date of receipt of such certificate:</label>
                        <div className="col-sm-3">
                            <input type="date" className="form-control form-control-sm inputInnClr" placeholder="registration no." aria-label="State" id='inputAddress4iw3' value={ExpectedDateOfCertificateRecieve} onChange={(e) => setExpectedDateOfCertificateRecieve(e.target.value)} />
                        </div>
                    </div>
                    <hr />
                    <div className="row g-3 forborder12">

                        <label htmlFor="inputTotNEmp413" className="col-sm-3 col-form-label lable-des-sec"><i className="fa fa-users" aria-hidden="true"></i> Total No. of Employee: </label>
                        <div className="col-sm-3">
                            <input type="number" className="form-control form-control-sm inputInnClr" placeholder="Total No. of Employee" aria-label="State" id='inputTotNEmp413' value={TotalNoOfEmployee} onChange={(e) => setTotalNoOfEmployee(e.target.value)} />
                        </div>
                        <label htmlFor="inputRelWrkUs403" className="col-sm-3 col-form-label lable-des-sec"><i className="fa fa-users" aria-hidden="true"></i> Relative Working with Us: </label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control form-control-sm inputInnClr" placeholder="Relative Working with Us:" aria-label="State" id='inputRelWrkUs403' value={RelativeWorkingWithUs} onChange={(e) => setRelativeWorkingWithUs(e.target.value)} />
                        </div>
                    </div>
                    <hr />
                    {/* <div className="col-12 forMarpadd2-des12">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck" value={IsActive} onChange={(e) => setIsActive(e.target.value)}/>
      <label className="form-check-label new-des2er" htmlFor="gridCheck">
        Check me out
      </label>
    </div>
  </div> */}
                    <div className="row g-3 mt-3 mb-3 forMarpadd2-des12">
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