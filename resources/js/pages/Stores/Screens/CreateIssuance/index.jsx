import React, { useEffect, useState, useRef } from "react";
import "./style.scss";
import Layout from "../../../../partials/Layout";
import { Form, Col, Row, Button } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { useParams } from "react-router-dom";
import ReactSelect from "react-select";
import axios from "axios";
import BounceLoader from "../../../../components/BounceLoader";


export default function CreateIssuance() {

    const params = useParams();
    const [voucherNumber, setVoucherNumber] = useState('');
    const [store, setStore] = useState({});
    const [items, setItems] = useState([]);
    const [itemOptions, setItemOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);

    const [isBarcodeEnabled, setBarcodeEnabled] = useState(true);
    const [itemsTable, setItemsTable] = useState([]);

    const [itemFetching, setItemFetching] = useState(false);

    const [location_id, setLocationId] = useState(0);

    const itemRef = useRef();
    const locationRef = useRef();
    const barcodeRef = useRef();

    const [barcode, setBarcode] = useState('');

    const [requesterName, setRequesterName ] = useState('');


    useEffect(() => {

        axios.get('generate_voucher_number').then(res => {
            setVoucherNumber(res.data.data);
        });

        axios.get(`store/${params.name}`).then(res => {

            if (res.data.success) {
                let store = res.data.data;
                setStore(store);
                axios.get(`items?store_id=${store.id}`).then(res => {
                    setItems(() => {
                        return res.data.data.items.map(item => {
                            item.location_id = 0
                            item.quantity = 1;
                            item.total_gwt = '';
                            item.total_pkt = '';
                            item.pkt_receiver = '';
                            return item;
                        })
                    });
                    const options = res.data.data.items.map(item => ({
                        value: item.id,
                        label: item.name
                    }))
                    setItemOptions(options);
                });

                axios.get(`locations?store_id=${store.id}`).then(res => {
                    const options = res.data.data.locations.map(l => ({
                        value: l.id,
                        label: `${l.name}`
                    }));
                    setLocationOptions(options);
                });
            }
            else {
                // setIsFound(false);
            }
        });
    }, []);




    const breakBarcode = (barcode = '') => {
        const barcodeObj = {
            voucher_number: '',
            item_id: 0
        }
        if (barcode && typeof barcode == "string") {

            const [voucher_number, item_id] = barcode.split('-');

            barcodeObj.voucher_number = voucher_number.replace(/(\w{2})(\w{3})(\d{4})(\d)/, "$1-$2-$3-$4");
            barcodeObj.item_id = Math.abs(item_id.slice(0, item_id.indexOf("I")));

        }

        return barcodeObj;

    }



    const handleBarcodeScanning = (e) => {
        const currentTarget = e.target;
        if (e.code == "Enter") {
            if (barcode) {
                // Doing Work 
                const { voucher_number, item_id } = breakBarcode(barcode);

                const queryParams = new URLSearchParams({
                    item_id: item_id,
                    voucher_number: voucher_number,
                    store_id: store.id
                });

                setItemFetching(true);
                axios.get(`voucher/scan?${queryParams.toString()}`).then(res => {

                    const resItem = res.data.data.item;

                    const item = items.find(item => item.id == resItem.item.id);
                    item.location = resItem.location;

                    setItemsTable(prev => {
                        let searched = prev.find(item => item.id == resItem.item.id);
                        if (searched) {
                            searched.quantity = + searched.quantity + 1;
                            searched.location = resItem.location;
                            return [...prev];
                        }
                        item.quantity = 1;
                        return [...prev, item]
                    });

                    setLocationId(resItem.location.id);

                    setItemFetching(false);
                    setBarcode('');
                    currentTarget.value = '';
                    console.log(barcodeRef);
                    barcodeRef.current.focus();
                })

            }
            return;
        }

        if (e.key != "Shift") {
            setBarcode(prev => prev + e.key);
            return;
        }

    }


    const handleAddItem = () => {
        const [currentItem] = itemRef.current.getValue();
        const [currentLocation] = locationRef.current.getValue();

        const queryParams = new URLSearchParams({
            item_id: currentItem.value,
            location_id: currentLocation.value,
            store_id: store.id
        });

        axios.get(`voucher/scan?${queryParams.toString()}`).then(res => {
            console.log(res);
        })


    }

    const handleItemsInput = (id, name, value) => {

        setItemsTable(prev => {
            let searched = prev.find(item => item.id == id);
            searched[name] = value;
            return [...prev];
        })

    }



    const handleRemoveItem = key => {
        setItemsTable(prev => {
            const updateTable = [...prev];

            updateTable.splice(key, 1);
            return updateTable;
        });
    }

    const formatSizes = (size) => {
        if (typeof size !== "undefined" && JSON.parse(size) instanceof Object) {
            return Object.values(JSON.parse(size)).join('x');
        }
        else {
            return size;
        }
    }

    const handleAllowNumber = (event) => {


        let allowedKeys = [
            "Backspace",
            "Delete",
            "ArrowLeft",
            "ArrowRight",
        ]

        if (!allowedKeys.includes(event.key)) {
            if (!/[0-9]/.test(event.key)) event.preventDefault();
        }


        if (event.key === "ArrowUp") {
            event.target.value = + event.target.value + 1
        }

        if (event.key === "ArrowDown") {
            if (event.target.value > 0) {
                event.target.value = event.target.value - 1
            } 
        }
    }

    return (
        <Layout title="Issuance Voucher" hideBanner showBackButton>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Issuance Number</Form.Label>
                        <Form.Control placeholder="Enter your number" className="rounded-2" defaultValue={voucherNumber} disabled />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Department</Form.Label>
                        <Form.Control placeholder="Enter your Department" className="rounded-2" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label>Requester Name</Form.Label>
                        <Form.Control placeholder="Enter name" className="rounded-2" value={requesterName} onChange={setRequesterName}/>
                    </Form.Group>
                </Col>

            </Row>
            <Row className="mt-3">
                {/* <Col xs={3} className="d-flex align-items-center">
                    <Form.Label htmlFor="enable-barcode-scanning" className="align-items-center cursor-pointer d-flex gap-1 mb-0">
                        <Form.Control id="enable-barcode-scanning" type="checkbox" className="mb-0" value={isBarcodeEnabled} onChange={() => setBarcodeEnabled(prev => !prev)} />
                        <span>Enable Barcode Scanning</span>
                    </Form.Label>
                </Col> */}
                <Col xs={12}>
                    {
                        isBarcodeEnabled ?
                            <Row>
                                <Col xs="6">
                                    <label>Scan Barcode</label>
                                    <div style={{
                                        position: "relative"
                                    }}>
                                        <input className='form-control mb-0' type="text" onKeyDown={handleBarcodeScanning} ref={barcodeRef} />
                                        {
                                            itemFetching ?
                                                <span style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    right: 8,
                                                }}><BounceLoader /></span>
                                                : ''
                                        }
                                    </div>
                                </Col>
                            </Row>
                            : <Row>
                                <Col>
                                    <ReactSelect className="rounded-2" options={itemOptions} ref={itemRef} isClearable />
                                </Col>
                                <Col>
                                    <ReactSelect className="rounded-2" options={locationOptions} ref={locationRef} isClearable />
                                </Col>
                                <Col>
                                    <Button variant="success" onClick={() => handleAddItem()}>+</Button>
                                </Col>
                            </Row>
                    }
                </Col>
            </Row>





            <Row className="my-4">
                <table className="table  table-bordered  table-responsive">
                    <thead>

                        <tr className="text-center">

                            <th scope="col">Item Name</th>
                            <th scope="col">Item Part</th>
                            <th scope="col">Item Size</th>
                            <th scope="col">Item Grade</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Location</th>
                            <th scope="col" style={{ width: '5%' }}></th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            itemsTable.map((item, index) => {
                                return (
                                    <tr className="text-center" key={index}>

                                        <td>
                                            <Form.Group className="mb-3" >
                                                <Form.Control type="text" placeholder="" className="rounded-2" defaultValue={item?.name} disabled/>
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Group className="mb-3" >
                                                <Form.Control type="text" className="rounded-2" defaultValue={item?.part} disabled/>
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Group className="mb-3" >
                                                <Form.Control type="text" className="rounded-2" defaultValue={formatSizes(item.size)} disabled/>
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Group className="mb-3" >
                                                <Form.Control type="text" className="rounded-2" disabled defaultValue={item?.grade} />
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Group className="mb-3" >
                                                <Form.Control type="text" onKeyDown={handleAllowNumber} className="rounded-2" value={item?.quantity} onChange={e => handleItemsInput(item.id, 'quantity', e.target.value)} />
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Group className="mb-3" >
                                                <Form.Control type="text" placeholder=" " className="rounded-2" defaultValue={item?.location?.name} disabled />
                                            </Form.Group>
                                        </td>

                                        <td><button type="button" className="btn btn-danger" onClick={e => handleRemoveItem(index)}><MdClose /></button></td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <Row>
                    <Col xs={12} className="justify-content-end d-flex gap-3">
                        <button type="button" className=" btn btn-secondary btn-md bg-primary ">Cancel</button>
                        <button type="button" className=" btn btn-primary btn-md bg-primary ">Save</button>

                    </Col>
                </Row>

            </Row>

        </Layout>
    )
}
