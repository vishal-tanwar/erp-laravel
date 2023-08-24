import React, {useState, useEffect} from "react";
import '../../Dummy Pages/Dummy1.css';
import logoleft from '../../../images/logoERP.jpeg';

export default function IssueVoucherShow() {

    const [data, setData] = useState([])
    const [rootCartNo, setRootCartNo] = useState("");
    const [itemName, setItemName] = useState("");
    const [issuePktQuantity, setIssuePktQuantity] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [balanceLotPktQuantity, setBalanceLotPktQuantity] = useState("");

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost:5121/api/IssueItem", requestOptions)
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
                    <h5 className="navheading-center1 mb-2 text-white"> Issue Details </h5>

                </div>

                <div className="text-center">
                    <h4 className="navheading-center1">K R <span className="navheading-center-span1">AUTO COMPONENT</span> PVT.LTD</h4>
                    <h5 className="navheading-center-low1">R.M Store Issue Form</h5>
                </div>
                <a className="navbar-brand" href="#">
                    <img src={logoleft} width="220" height="70" className="" alt="K R logo pic" />
                </a>
            </nav>

            <div className="rmbottcolrLine1 d-flex justify-content-around">
            <div> 
                    <p>Issue Register</p>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-responsive">
                    <thead>
                        {/* <tr className="rm-list-thM1">
                            <th scope="col" colSpan="10">Issue Register </th>
                        </tr> */}
                        <tr className="rm-list-th text-center">
                            <th scope="col">Sr. No.</th>
                            <th scope="col">ROOT CARD NUMBER </th>
                            <th scope="col">ISSUE PKT/QTY.</th>
                            <th scope="col">ITEM NAME</th>
                            <th scope="col">ITEM PART</th>
                            <th scope="col">ITEM GRADE</th>
                            <th scope="col">ITEM SIZE</th>
                            <th scope="col">ISSUE DATE</th>
                            <th scope="col">BALANCE LOT PKT.QTY.</th>
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
                                        <td>{Item.rootCartNo}</td>
                                        <td>{Item.issuePktQuantity}</td>
                                        <td>{Item.itemName}</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>{Item.issueDate}</td>
                                        <td>{Item.balanceLotPktQuantity}</td>
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