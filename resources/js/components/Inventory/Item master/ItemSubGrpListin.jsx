import React, { useState, useEffect } from "react";
import '../../Dummy Pages/Dummy1.css';
import logoleft from '../../../images/logoERP.jpeg';
import { Link } from "react-router-dom";

export default function ItemSubGrpListin() {
  const [itemGroups, setItemGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [subItemGroups, setSubItemGroups] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const itemGroupsUrl = "http://localhost:5115/api/ItemOptions/GetGroup";
      const itemGroupsResponse = await fetch(itemGroupsUrl);
      const itemGroupsResult = await itemGroupsResponse.json();
      setItemGroups(itemGroupsResult);

      if (itemGroupsResult.length > 0) {
        const initialSelectedGroupId = itemGroupsResult[0].groupId;
        setSelectedGroupId(initialSelectedGroupId);
        fetchSubItemGroups(initialSelectedGroupId);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchSubItemGroups = async (groupId) => {
    try {
      const subItemGroupsUrl = `http://localhost:5115/api/ItemOptions/GetSubGroup?groupId=${groupId}`;
      const subItemGroupsResponse = await fetch(subItemGroupsUrl);
      const subItemGroupsResult = await subItemGroupsResponse.json();
      setSubItemGroups(subItemGroupsResult);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleItemGroupChange = (e) => {
    const selectedGroupId = parseInt(e.target.value);
    setSelectedGroupId(selectedGroupId);
    fetchSubItemGroups(selectedGroupId);
  };

  const deleteSubItemGroup = async (itemSubGroupId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const deleteUrl = `http://localhost:5115/api/ItemOptions/DeleteItemSubGroup/${itemSubGroupId}?groupId=${selectedGroupId}`;

        const deleteResponse = await fetch(deleteUrl, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json'
          }
        });
        if (deleteResponse.ok) {
          console.log('Item deleted successfully');
          fetchSubItemGroups(selectedGroupId);
        } else {
          console.log('Error deleting item');
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  return (
    <React.Fragment>
      <nav className="navbar d-flex justify-content-between navbar-light bg-white">
        <div className="text-center">
          <p className="item-sub-group-heading">Item Sub Group</p>
          <select className="item-sub-group-select" onChange={handleItemGroupChange} value={selectedGroupId}>
            {itemGroups.map((itemGroup) => (
              <option key={itemGroup.groupId} value={itemGroup.groupId}>
                {itemGroup.groupName}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <h4 className="navheading-center1">K R <span className="navheading-center-span1">AUTO COMPONENT</span> PVT.LTD</h4>
        </div>
        <a className="navbar-brand" href="#">
          <img src={logoleft} width="220" height="70" className="" alt="K R logo pic" />
        </a>
      </nav>

      <div className="rmbottcolrLine1 d-flex justify-content-around">
        <div>
          <p>Item Sub Group</p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover table-responsive">
          <thead>
            <tr className="rm-list-th text-center">
              <th scope="col">Sr. No.</th>
              <th scope="col">Group Name</th>
              <th scope="col">Item Sub Group Name</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody className="text-center rm-list-td">
            {subItemGroups.map((subItemGroup, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{itemGroups.find(group => group.groupId === selectedGroupId)?.groupName}</td>
                <td>{subItemGroup.groupName}</td>
                <td>
                  <Link
                    to={{
                      pathname: '/editItem_subGroup',
                      state: {
                        itemSubGroupId: subItemGroup.itemSubGroupId,
                        groupName: subItemGroup.groupName
                      }
                    }}
                  >
                    <button type="button" className="btn btn-success bg-success">
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  <button type="button" className="btn btn-danger bg-danger" onClick={() => deleteSubItemGroup(subItemGroup.itemSubGroupId)}>
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
