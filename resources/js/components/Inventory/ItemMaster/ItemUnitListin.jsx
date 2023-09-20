import React, { useState, useEffect } from "react";
import '../../Dummy Pages/Dummy1.css';
import logoleft from '../../../images/logoERP.jpeg';
import { Link } from "react-router-dom";

export default function ItemUnitListin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://localhost:5115/api/ItemOptions/GetUnit", requestOptions)
      .then(response => response.json())
      .then(result => {
        setData(result);
        console.log(result);
      })
      .catch(error => console.log('error', error));
  };

  const handleDelete = (unitId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      var requestOptions = {
        method: 'DELETE',
        redirect: 'follow',
        headers: {
          'Accept': '*/*'
        }
      };

      fetch(`http://localhost:5115/api/ItemOptions/DeelteItemUnit/${unitId}`, requestOptions)
        .then(response => {
          if (response.ok) {
            console.log('Item deleted successfully');
            setData(prevData => prevData.filter(item => item.unitId !== unitId));
          } else {
            console.log('Error deleting item');
          }
        })
        .catch(error => console.log('error', error));
    }
  };
  
  return (
    <React.Fragment>
      <nav className="navbar d-flex justify-content-between navbar-light bg-white">
        <div className="text-center mx-2">
          <h5 className="navheading-center1 mb-2 text-white">Unit List</h5>
        </div>
        <div className="text-center">
          <h4 className="navheading-center1">
            K R <span className="navheading-center-span1">AUTO COMPONENT</span> PVT.LTD
          </h4>
        </div>
        <a className="navbar-brand" href="#">
          <img src={logoleft} width="220" height="70" className="" alt="K R logo pic" />
        </a>
      </nav>

      <div className="rmbottcolrLine1 d-flex justify-content-around">
        <div>
          <p>Item Unit</p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover table-responsive">
          <thead>
            <tr className="rm-list-th text-center">
              <th scope="col">Sr. No.</th>
              <th scope="col">Item Unit</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody className="text-center rm-list-td">
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.unitName}</td>
                <td>
                <Link to={`/editUnitItem/${item.unitId}`}>
                    <button type="button" className="btn btn-success bg-success">
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger bg-danger"
                    onClick={() => handleDelete(item.unitId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
