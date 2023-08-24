import React, {useState, useEffect} from "react";
import '../../Dummy Pages/Dummy1.css';
import logoleft from '../../../images/logoERP.jpeg';

export default function ReceivingList() {

    const [data, setData] = useState([])
    const [issueDate, setissueDate] = useState("");
    const [quantity, setquantity] = useState("");
    const [itemUnit, setitemUnit] = useState("");
    const [itemRate, setitemRate] = useState("");

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost:5121/api/RawMaterial", requestOptions)
            .then(response => response.json())
            .then((result) => {
                setData(result);
                console.log(result);
            })
            .catch(error => console.log('error', error));
    }, [])

    return (
        <React.Fragment>
            <nav className="navbar d-flex justify-content-between navbar-light bg-white">

                <div className="text-center mx-4">
                    <h5 className="navheading-center1 mb-2 text-white"> R.M Details </h5>

                </div>

                <div className="text-center">
                    <h4 className="navheading-center1">K R <span className="navheading-center-span1">AUTO COMPONENT</span> PVT.LTD</h4>
                    <h5 className="navheading-center-low1">R.M Store Register Form</h5>
                </div>
                <a className="navbar-brand" href="#">
                    <img src={logoleft} width="220" height="70" className="" alt="K R logo pic" />
                </a>
            </nav>

            <div className="rmbottcolrLine1 d-flex justify-content-around">
            <div> 
                    <p>Received Register</p>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-responsive">
                    <thead>
                        {/* <tr className="rm-list-thM1">
                            <th scope="col" colSpan="12">Received Register </th>
                        </tr> */}
                        <tr className="rm-list-th text-center">
                            <th scope="col">Sr. No.</th>
                            <th scope="col">RECEVIED DATE</th>
                            <th scope="col">SUPPLIER</th>
                            <th scope="col">BILL NO & DATE</th>
                            <th scope="col">COIL NO & HEAT NO</th>
                            <th scope="col">ITEM NAME</th>
                            <th scope="col">ITEM PART</th>
                            <th scope="col">ITEM GRADE</th>
                            <th scope="col">ITEM SIZE</th>
                            <th scope="col">TOTAL GWT.</th>
                            <th scope="col">TOTAL NET WT.</th>
                            <th scope="col">TOTAL PKT.</th>
                            <th scope="col">PKT GWT</th>
                            <th scope="col">PKT NET WET(in kg)</th>
                            <th scope="col">PKT RECEVIED</th>
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
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td><button type="button" className="btn btn-success bg-success">Edit</button></td>
                                        <td><button type="button" className="btn btn-danger bg-danger">Delete</button></td>
                                        </tr>
                                )
                                
                            })
                        }

                    </tbody>
                </table>
            </div>

            {/* </main> */}


        </React.Fragment>

    )
}