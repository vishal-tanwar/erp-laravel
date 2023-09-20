import React, { useState } from 'react';
import './ItemGroup.css';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

const ItemGroupShow = () => {

  const navigate = useNavigate();

  const [groupName, setgroupName] = useState("");

  const _apicallupdate = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({

      "groupId": 0,
      "groupName": groupName,
      "isActive": true

    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch("http://localhost:5115/api/ItemOptions/AddGroup", requestOptions)
      .then(response => response.text())
      .then((res) => {
        console.log(res);
        if (res === 1 || "1") {
          toast.success('Item Add Successfully');

          setTimeout(() => navigate('/inventory/item_master/item_group'), 1000);

        }
        else {
          toast.error('Item Add failed')
        }

      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className="form-container_itemgroup">
      <form className='itemgroup_form'>
        <label htmlFor="itemgroup" className='itemgroup_label'>Item Group:</label>
        <input
          type="text"
          id="itemgroup"
          value={groupName} onChange={(e) => setgroupName(e.target.value)}
          placeholder="Enter item group"
        />
        <button type="button" className='itemgroup_btn' onClick={() => _apicallupdate()}>Submit</button>
      </form>

      <ToastContainer />

    </div>
  );
};

export default ItemGroupShow;
