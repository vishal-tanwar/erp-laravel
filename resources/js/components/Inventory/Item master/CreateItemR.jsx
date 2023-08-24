import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './ItemGroup.css';
import Barcode from 'react-barcode';
import { saveBarcodeImageToDB } from './BarcodeImg';

const CreateItemR = () => {
  const navigate = useNavigate();
  const [itemGroups, setItemGroups] = useState([]);
  const [subGroups, setSubGroups] = useState([]);
  const [unitData, setUnitData] = useState([]);

  const [itemName, setItemName] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [itemSize, setItemSize] = useState('');
  const [itemPart, setItemPart] = useState('');
  const [itemGrade, setItemGrade] = useState('');
  const [itemGroup, setItemGroup] = useState('');
  const [itemSubGroup, setItemSubGroup] = useState('');
  const [itemUnit, setItemUnit] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const [barcode, setBarcode] = useState('');
  const [barcodeImage, setBarcodeImage] = useState('');

  const _apicallupdate = () => {
    const requestData = {
      itemName: itemName,
      itemCode: itemCode,
      itemCodeImage: barcodeImage,
      barCode: barcode,
      barTitle: "Barcode Title",
      itemGroup: itemGroup,
      itemSubGroup: itemSubGroup,
      itemDescription: itemDescription,
      itemRate: "0",
      itemUnit: itemUnit
    };
  
    saveBarcodeImageToDB(requestData)
      .then(data => {
        if (data === 1 || data === "1") {
          toast.success('Item Added Successfully');
          setTimeout(() => navigate('/inventory/item_master/create_item'), 1000);
        } else {
          throw new Error('Failed to add item');
        }
      })
      .catch(error => {
        console.log('Error:', error);
        toast.error('Failed to add item');
      });
  };
  
  

  const fetchItemGroups = () => {
    fetch("http://localhost:5115/api/ItemOptions/GetGroup")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch item groups');
        }
      })
      .then(result => {
        const formattedData = result.map(item => ({
          groupId: item.groupId,
          value: item.groupName,
          label: item.groupName
        }));
        setItemGroups(formattedData);
        console.log(formattedData);
      })
      .catch(error => console.log('Error:', error));
  };

  const fetchSubGroups = (groupId) => {
    fetch(`http://localhost:5115/api/ItemOptions/GetSubGroup?groupId=${groupId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch sub groups');
        }
      })
      .then(result => {
        const formattedData = result.map(item => ({
          subGroupId: item.itemSubGroupId,
          value: item.groupName,
          label: item.groupName
        }));
        setSubGroups(formattedData);
        console.log(formattedData);
      })
      .catch(error => console.log('Error:', error));
  };

  useEffect(() => {
    fetchItemGroups();
  }, []);

  const handleGroupChange = (e) => {
    const selectedGroupId = e.target.value;
    const selectedGroup = itemGroups.find(group => group.groupId === parseInt(selectedGroupId));
    if (selectedGroup) {
      setItemGroup(selectedGroupId);
      fetchSubGroups(selectedGroupId);
    } else {
      setItemGroup('');
    }
    setItemSubGroup('');
  };

  const fetchUnitData = () => {
    fetch("http://localhost:5115/api/ItemOptions/GetUnit")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch unit data');
        }
      })
      .then(result => {
        setUnitData(result);
        console.log(result);
      })
      .catch(error => console.log('Error:', error));
  };

  useEffect(() => {
    fetchUnitData();
  }, []);

    const generateBarcode = () => {
      const barcodeLength = 8;
      const generatedBarcode = Math.random().toString().substr(2, barcodeLength);
      setBarcode(generatedBarcode);
    };
    
    

  return (
    <React.Fragment>
      <div className="add-new-leadBackS">
        <div className="add-new-leadStyle text-center">Add Item</div>
        <div className="row justify-content-between mx-2 mt-3">
          <div className="col-5 forRequiredStar">
            <label htmlFor="inputFistN1e" className="add-NewLFo-lable">
              Item Code
            </label>
            <input
              type="text"
              className="form-control-item"
              id="inputFistN1e"
              placeholder="Item Code"
              aria-label="First name"
              value={itemCode}
              onChange={e => setItemCode(e.target.value)}
            />
          </div>
          <div className="col-5 forRequiredStar">
            <label htmlFor="inputLastN1e" className="add-NewLFo-lable">
              Item Name
            </label>
            <input
              type="text"
              className="form-control-item"
              id="inputLastN1e"
              placeholder="Item Name"
              aria-label="Last name"
              value={itemName}
              onChange={e => setItemName(e.target.value)}
            />
          </div>
        </div>

        <div className="row justify-content-between mx-2 mt-3">
          <div className="col-5 forRequiredStar">
            <label htmlFor="inputFistN1e" className="add-NewLFo-lable">
              Item Size
            </label>
            <input
              type="text"
              className="form-control-item"
              id="inputFistN1e"
              placeholder="Item Size"
              aria-label="First name"
              value={itemSize}
              onChange={e => setItemSize(e.target.value)}
            />
          </div>
          <div className="col-5 forRequiredStar">
            <label htmlFor="inputLastN1e" className="add-NewLFo-lable">
              Item Part
            </label>
            <input
              type="text"
              className="form-control-item"
              id="inputLastN1e"
              placeholder="Item Part"
              aria-label="Last name"
              value={itemPart}
              onChange={e => setItemPart(e.target.value)}
            />
          </div>
        </div>

        <div className="row justify-content-between mx-2 mt-3">
          <div className="col-5 forRequiredStar">
            <label htmlFor="inputLastN1e" className="add-NewLFo-lable">
              Item Grade
            </label>
            <input
              type="text"
              className="form-control-item"
              id="inputLastN1e"
              placeholder="Item Grade"
              aria-label="Last name"
              value={itemGrade}
              onChange={e => setItemGrade(e.target.value)}
            />
          </div>
          <div className="col-5 forRequiredStar">
            <label htmlFor="inputLeadS1e" className="add-NewLFo-lable">
              Item BarCode
            </label>
            <div className="barcode-container">
              {barcode && <Barcode value={barcode} />}
            </div>
            {/* <input
              type="text"
              className="form-control-item"
              id="inputLeadS1e"
              placeholder="Item BarCode"
              aria-label="First name"
            /> */}
            <button
              className="generate-barcode-button"
              onClick={generateBarcode}
            >
              Generate Barcode
            </button>
          </div>
        </div>

        <div className="row justify-content-between mx-4 mt-3">
          <select
            className="select-box"
            value={itemGroup}
            onChange={handleGroupChange}
          >
            <option value="">Item Group</option>
            {itemGroups.map(itemGroup => (
              <option key={itemGroup.groupId} value={itemGroup.groupId}>
                {itemGroup.label}
              </option>
            ))}
          </select>

          <select className="select-box" value={itemSubGroup} onChange={e => setItemSubGroup(e.target.value)}>
            <option value="">Sub Group</option>
            {subGroups.map(subGroup => (
              <option key={subGroup.subGroupId} value={subGroup.subGroupId}>{subGroup.label}</option>
            ))}
          </select>
          <select
            className="select-box"
            value={itemUnit}
            onChange={e => setItemUnit(e.target.value)}
          >
            <option value="">Unit</option>
            {unitData.map(unit => (
              <option key={unit.unitId} value={unit.unitId}>{unit.unitName}</option>
            ))}
          </select>
        </div>

        <div className="row justify-content-between mx-2">
          <div className="col-12 forRequiredStar">
            <label htmlFor="inputDesc1e" className="add-NewLFo-lable">
              Description
            </label>
            <input
              type="text"
              className="form-control-item"
              id="inputDesc1e"
              placeholder="Description"
              aria-label="First name"
              value={itemDescription}
              onChange={e => setItemDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="row justify-content-between mx-2 mt-4 mb-4">
          <div className="col-3 forRequiredStar">
            <button
              type="button"
              className="ad-Ne-LFom-btn1"
              onClick={_apicallupdate}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default CreateItemR;
