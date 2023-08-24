import React, { useState, useEffect } from 'react';
import './ItemGroup.css';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

const SubItemGroupShow = () => {
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");
  const [selectedItemGroup, setSelectedItemGroup] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState(null); // Initialize as null
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://localhost:5115/api/ItemOptions/GetGroup", requestOptions)
      .then(response => response.json())
      .then((result) => {
        const formattedData = result.map((item) => ({
          groupId: item.groupId,
          value: item.groupName,
          label: item.groupName
        }));
        setData(formattedData);
        console.log(formattedData);
      })
      .catch(error => console.log('error', error));
  };

  const _apicallupdate = () => {
    if (selectedGroupId === null || selectedGroupId === "") {
      toast.error('Please select an item group');
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      itemSubGroupId: 0,
      groupId: selectedGroupId,
      groupName: groupName,
      isActive: true,
      selectedItemGroup: selectedItemGroup
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch("http://localhost:5115/api/ItemOptions/AddSubGroup", requestOptions)
      .then(response => response.text())
      .then((res) => {
        console.log(res);
        if (res === "1") {
          toast.success('Sub Group Added Successfully');
          setTimeout(() => navigate('/inventory/item_master/sub_group'), 1000);
        } else {
          toast.error('Registration Failed');
        }
      })
      .catch(error => console.log('error', error));
  };

  const handleItemGroupChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedItemGroup(selectedValue);

    // Find the corresponding group ID for the selected group
    const selectedGroup = data.find((item) => item.value === selectedValue);
    if (selectedGroup) {
      setSelectedGroupId(selectedGroup.groupId);
    }
  };

  return (
    <div className="form-container_subitem">
      <form className='subitemgroup_form'>
        <label htmlFor="subitemgroup" className='subitemgroup_label'> Item Group:</label>
        <select id="subitemgroup" onChange={handleItemGroupChange} value={selectedItemGroup}>
          <option value="" className='subitemgroup_option'>Select item group</option>
          {data.map((item) => (
            <option key={item.id} value={item.value} className='subitemgroup_option'>{item.label}</option>
          ))}
        </select>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput" className='subitemgroup_label'> Sub Group:</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Sub Group"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <button type="button" className='subitemgroup_btn' onClick={() => _apicallupdate()}>Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SubItemGroupShow;
