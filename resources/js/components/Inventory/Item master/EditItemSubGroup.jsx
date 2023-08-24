import React, { useState, useEffect } from 'react';
import './ItemGroup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const EditItemSubGroup = () => {
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");
  const [selectedItemGroup, setSelectedItemGroup] = useState("");
  const [selectedSubGroup, setSelectedSubGroup] = useState(null);
  const [selectedSubGroupId, setSelectedSubGroupId] = useState(null);
  const [itemGroups, setItemGroups] = useState([]);
  const [subGroups, setSubGroups] = useState([]);

  useEffect(() => {
    fetchItemGroups();
  }, []);

  const fetchItemGroups = () => {
    fetch("http://localhost:5115/api/ItemOptions/GetGroup")
      .then(response => response.json())
      .then((result) => {
        const formattedItemGroups = result.map((item) => ({
          groupId: item.groupId,
          value: item.groupName,
          label: item.groupName
        }));
        setItemGroups(formattedItemGroups);
      })
      .catch(error => console.log('error', error));
  };

  const fetchSubGroups = (groupId, itemSubGroupId) => {
    fetch(`http://localhost:5115/api/ItemOptions/GetSubGroup?groupId=${groupId}&itemSubGroupId=${itemSubGroupId}`)
      .then(response => response.json())
      .then((result) => { 
        if (result.length > 0) {
          const formattedSubGroups = result.map((item) => ({
            subGroupId: item.itemSubGroupId,
            value: item.groupName,
            label: item.groupName
          }));
          setSubGroups(formattedSubGroups);
        } else {
          setSubGroups([]); 
        }
      })
      .catch(error => console.log('error', error));
  };
  

  const handleItemGroupChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedItemGroup(selectedValue);
    setSelectedSubGroup(null);
    setSelectedSubGroupId(null);
    setGroupName("");

    const selectedGroup = itemGroups.find((item) => item.value === selectedValue);
    if (selectedGroup) {
      fetchSubGroups(selectedGroup.groupId);
    }
  };

  const handleSubGroupChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedSubGroup(selectedValue);

    const selectedSubGroup = subGroups.find((item) => item.value === selectedValue);
    if (selectedSubGroup) {
      setSelectedSubGroupId(selectedSubGroup.subGroupId);
      setGroupName(selectedSubGroup.value);
    }
  };

  const updateSubGroup = () => {
    if (selectedSubGroupId && groupName) {
      const updatedGroupId = selectedSubGroupId === selectedItemGroup ? selectedItemGroup : selectedSubGroupId;

      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          itemSubGroupId: selectedSubGroupId,
          groupId: updatedGroupId,
          groupName: groupName,
          isActive: true
        })
      };

      fetch(`http://localhost:5115/api/ItemOptions/UpdateItemSubGroup`, requestOptions)
        .then(response => {
          if (response.ok) {
            toast.success('Item Sub Group Updated Successfully');
            fetchSubGroups(selectedItemGroup, selectedSubGroupId); // Fetch sub groups with updated parameters
            setTimeout(() => {
              navigate('/inventory/item_master/sub_group');
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
      toast.error('Please select an item sub group and enter a sub group name');
    }
  };

  return (
    <div className="form-container_subitem">
      <form className='subitemgroup_form'>
        <label htmlFor="itemgroup" className='subitemgroup_label'>Select Item Group:</label>
        <select id="itemgroup" onChange={handleItemGroupChange} value={selectedItemGroup}>
          <option value="" className='subitemgroup_option'>Select item group</option>
          {itemGroups.map((item) => (
            <option key={item.groupId} value={item.value} className='subitemgroup_option'>{item.label}</option>
          ))}
        </select>
        <label htmlFor="subitemgroup" className='subitemgroup_label'>Select Sub Group:</label>
        <select id="subitemgroup" onChange={handleSubGroupChange} value={selectedSubGroup}>
          <option value="" className='subitemgroup_option'>Select sub group</option>
          {subGroups.map((item) => (
            <option key={item.subGroupId} value={item.value} className='subitemgroup_option'>{item.label}</option>
          ))}
        </select>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput" className='subitemgroup_label'>Edit Sub Group:</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Edit Sub Group"
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
          />
        </div>
        <button type="button" className='subitemgroup_btn' onClick={updateSubGroup}>Update</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditItemSubGroup;
