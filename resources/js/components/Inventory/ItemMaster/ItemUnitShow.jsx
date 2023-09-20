import React, { useState } from 'react';
import './ItemGroup.css';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

const ItemUnitShow = () => {

  const navigate = useNavigate();

  const [unitName, setunitName] = useState("");



  const _apicallupdate = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({

      "unitId": 0,
      "unitName": unitName,
      "isActive": true

    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch("http://localhost:5115/api/ItemOptions/AddUnit", requestOptions)
      .then(response => response.text())
      .then((res) => {
        console.log(res);
        if (res === 1 || "1") {
          toast.success('Unit Add Successfully');

          setTimeout(() => navigate('/inventory/item_master/item_unit'), 1000);
        }
        
        else {
          toast.error('Unit Add failed')
        }

      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className="form-container_itemgroup">
      <form className='itemgroup_form'>
        <label htmlFor="itemgroup" className='itemgroup_label'>Item Unit:</label>
        <input
          type="text"
          id="itemgroup"
          value={unitName} onChange={(e) => setunitName(e.target.value)}
          placeholder="Enter item Unit"
        />
        <button type="button" className='itemgroup_btn' onClick={() => _apicallupdate()}>Submit</button>
      </form>
      <ToastContainer />

    </div>

  );
};

export default ItemUnitShow;
