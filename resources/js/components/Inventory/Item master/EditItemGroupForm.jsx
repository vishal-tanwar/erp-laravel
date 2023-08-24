import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ItemGroup.css';
import { ToastContainer, toast } from 'react-toastify';

const EditItemGroupForm = ({ groupId }) => {
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroupDetails();
  }, []);

  const fetchGroupDetails = () => {
    fetch(`http://localhost:5115/api/ItemOptions/GetGroup/${groupId}`)
      .then(response => response.json())
      .then(result => {
        setGroupName(result.groupName);
      })
      .catch(error => console.log('error', error));
  };

 const updateGroup = () => {
  if (groupName) {
    const updateData = {
      groupId: groupId,
      groupName: groupName,
      isActive: true
    };

    fetch(`http://localhost:5115/api/ItemOptions/UpdateItemGroup`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    })
      .then(response => {
        if (response.ok) {
          toast.success('Item Sub Group Updated Successfully');
          setTimeout(() => {
            navigate('/inventory/item_master/item_group');
          }, 1000);
        } else {
          toast.error('Failed to update item sub group');
        }
      })
      .catch(error => {
        console.log('error', error);
        toast.error('Failed to update item sub group');
      });
  } else {
    toast.error('Please enter a sub group name');
  }
};

  return (
    <div className="form-container_itemgroup">
      <form className="itemgroup_form">
        <label htmlFor="itemgroup" className="itemgroup_label" style={{color:" red"}}>
          Edit Item Group:
        </label>
        <input
          type="text"
          id="itemgroup"
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
          placeholder="Edit Item Group"
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
