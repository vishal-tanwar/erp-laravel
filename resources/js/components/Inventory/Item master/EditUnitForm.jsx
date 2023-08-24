import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ItemGroup.css';
import { ToastContainer, toast } from 'react-toastify';

const EditItemGroupForm = ({ unitId }) => {
  const [unitName, setUnitName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroupDetails();
  }, []);

  const fetchGroupDetails = () => {
    fetch(`http://localhost:5115/api/ItemOptions/GetUnit/${unitId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch group details');
        }
      })
      .then(result => {
        setUnitName(result.unitName); // Set the fetched unitName in the state
      })
      .catch(error => console.log('error', error));
  };
  
  const updateGroup = () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        unitId: unitId,
        unitName: unitName,
        isActive: true
      })
    };

    fetch('http://localhost:5115/api/ItemOptions/UpdateItemUnit', requestOptions)
      .then(response => {
        if (response.ok) {
          toast.success('Unit Item Updated Successfully');
          setTimeout(() => {
            navigate('/inventory/item_master/item_unit');
          }, 1000);
        } else {
          toast.error('Failed to update Unit item');
        }
      })
      .catch(error => {
        console.log('error', error);
        toast.error('Failed to update unit item');
      });
  };

  return (
    <div className="form-container_itemgroup">
      <form className="itemgroup_form">
        <label htmlFor="itemgroup" className="itemgroup_label" style={{color:" red"}}>
          Edit Unit Item:
        </label>
        <input
          type="text"
          id="itemgroup"
          value={unitName}
          onChange={e => setUnitName(e.target.value)}
          placeholder="Edit Unit Item"
        />
        <button type="button" className="itemgroup_btn" onClick={updateGroup}>
          Update
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditItemGroupForm;
