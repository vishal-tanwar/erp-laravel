import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import Layout from "../../partials/Layout";
import { Form, Col, Row, Button, InputGroup } from "react-bootstrap";
import DatePicker from "react-flatpickr";
import {  MdCalendarMonth, MdClose } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { promiseState } from "../../utils";
import axios from "axios";
import ReactSelect from "react-select";



export default function Voucherform() {

    const navigate = useNavigate();

    const [date, setDate] = useState(new Date());
    const params = useParams();

    const [store, setStore] = useState([]);
    // const [isFound, setIsFound] = useState(true);

    const [items, setItems ] = useState([]);
    const [itemOptions, setItemOptions ] = useState([]);
    const [supplierOptions, setSupplierOptions ] = useState([]);
    const [suppliers, setSuppliers ] = useState('');

    const [locationOptions, setLocationOptions] = useState([]);


    const itemRef = useRef();

    // Form Filled

    const [supplierID, setSupplierID] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [email, setEmail] = useState('');

    const [voucherNumber, setVoucherNumber] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [itemsTable, setItemsTable] = useState([]);


    useEffect(() => {
        axios.get('suppliers').then( res => {
            setSuppliers(res.data.data.supplier);
            const options = res.data.data.supplier.map((supplier) => {
                return {
                    value: supplier.id,
                    label: supplier.firm_name                }
            })
            setSupplierOptions(options);
        });

        axios.get(`store/${params.name}`).then(res => {

            if (res.data.success) {
                promiseState(res.data.data, setStore ).then(( store ) => {
                    axios.get(`items?store_id=${store.id}`).then(res => {
                        setItems(() => {
                            return res.data.data.items.map( item => {
                                item.location_id = 0
                                item.quantity = 1; 
                                item.total_gwt = '';
                                item.total_pkt = '';
                                item.pkt_receiver = '';
                                return item;
                            })
                        });
                        const options = res.data.data.items.map( item => ({
                            value: item.id,
                            label: item.name
                        }) )
                        setItemOptions(options);
                    });

                    axios.get(`locations?store_id=${store.id}`).then(res => {
                        const options = res.data.data.locations.map(l => ({
                            value: l.id,
                            label: `${l.name}`
                        }));
                        setLocationOptions(options);
                    });
                });
            }
            else {
                // setIsFound(false);
            }
        });
    }, []);

    useEffect( () => {
        axios.get('generate_voucher_number').then( res => {
            setVoucherNumber( res.data.data );
        })
    }, []);

    const handleAddItem = () => {
        const currentVal = itemRef.current.getValue();
        if (currentVal.length > 0 ) {
            const item = items.find(item => item.id == currentVal[0].value );
            setItemsTable( prev => [...prev, item]);

        }

    }

    const handleRemoveItem = key => {
        setItemsTable( prev => {
            const updateTable = [...prev];
            updateTable.splice(key, 1);
            return updateTable;
        });
    }


    const handleSupllier = value => {
        const searchedSupplier = suppliers.find( supplier => supplier.id = value );
        setAddress( searchedSupplier.address )
        setPhone( searchedSupplier.number )
        setSupplierID( searchedSupplier.id );
    }


    const formatSizes = (size) => {
        if (typeof size !== "undefined" && JSON.parse(size) instanceof Object) {
            return Object.values(JSON.parse(size)).join('x');
        }
        else {
            return size;
        }
    }


    const handleSave = () => {
        const postData = {
            voucher_number: voucherNumber,
            invoice_id: invoiceNumber,
            type: "receiving",
            store_id: store.id,
            supplier_id: supplierID,
            receiving_date: date.toJSON(),
            address: address,
            city,
            state,
            phone_number: phone,
            email,
            items: itemsTable
        }

        axios.post('voucher', postData ).then( res => {
            console.log(res.data);
        })
    }

    const handleItemsInput = (index, name, value) => {
    
        setItemsTable(prev => {
            let searched =  prev.splice(index,1);
            searched[index][name] = value;
            return [...prev, ...searched];
        })
        
    }
    
    const handleBack = () => {
        navigate(-1);
    }

    return (
        <Layout title="R.M Receiving Voucher" hideBanner showBackButton>
            <Form>
                <Row>
                    <Col xs={6} >
                        <Form.Group className="mb-3">
                            <Form.Label>RM Voucher Number</Form.Label>
                            <Form.Control placeholder="Voucher Number" className="rounded-2" value={voucherNumber} disabled/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Invoice Number</Form.Label>
                            <Form.Control placeholder="Invoice Number" className="rounded-2" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>

                            <InputGroup>
                                <DatePicker id="flatpickr-date" className="form-control m-0 border-end-0 rounded-2 rounded-end-0" style={{ borderColor: 'var(--bs-border-color)'}} value={date} onChange={([date]) => { setDate(date) }} />
                                <label htmlFor="flatpickr-date" className="input-group-text  rounded-start-0 rounded-1 border-start-0 bg-body cursor-pointer"><MdCalendarMonth /> </label>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control placeholder="Enter your Mail" className="rounded-2" value={email} onChange={e => setEmail(e.target.value)}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                    </Col>


                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Supplier Name</Form.Label>
                            <ReactSelect
                                className="rounded-2"
                                options={supplierOptions}
                                onChange={e => handleSupllier(e.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="Enter your address " className="rounded-2" value={address} onChange={e => setAddress(e.target.value) }/>
                        </Form.Group>

                        <Row>
                            <Col xs={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control placeholder="Enter Your City " className="rounded-2" value={city} onChange={ e => setCity(e.target.value)} />
                                </Form.Group>
                            </Col>

                            <Col xs={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control placeholder="Enter your State " className="rounded-2" value={state} onChange={e => setState(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone No.</Form.Label>
                                    <Form.Control placeholder="Enter your Number " className="rounded-2" value={phone} onChange={e => setPhone(e.target.value)}/>
                                </Form.Group>
                            </Col>
                        </Row>

                    </Col>
                </Row>
                <Row>
                    <Col xs="4">
                        <ReactSelect className="rounded-2"
                            options={itemOptions} ref={itemRef} />

                    </Col>
                    <Col xs={3}>
                        <Button variant="success" onClick={() => handleAddItem()}>+</Button>
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
                                <th scope="col">Quanity</th>
                                <th scope="col" width={`15%`}>Location</th>
                                <th scope="col">Total GWT</th>
                                <th scope="col">Total PKT.</th>
                                <th scope="col">PKT Receiver</th>
                                <th scope="col" style={{width: '5%'}}></th>



                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {
                                itemsTable.map( (item, index) => {
                                    return(
                                        <tr className="text-center" key={index} id={`item-${index}`}>

                                            <td>
                                                <Form.Group className="mb-3">
                                                    <Form.Control  value={item.name} className="rounded-2" disabled/>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group className="mb-3">
                                                    <Form.Control  value={item.part} className="rounded-2" disabled/>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group className="mb-3">
                                                    <Form.Control  value={formatSizes(item.size)} className="rounded-2" disabled/>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group className="mb-3">
                                                    <Form.Control  value={item.grade} className="rounded-2" disabled/>
                                                </Form.Group>
                                            </td>
                                            
                                            <td>
                                                <Form.Group className="mb-3">
                                                    <Form.Control type="number" min={1} step={1} className="rounded-2" value={item?.quantity} onChange={e => handleItemsInput(index,'quantity', e.target.value) }/>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group className="mb-3">
                                                    <ReactSelect options={locationOptions} defaultValue={item.location_id} onChange={e => handleItemsInput(index, 'location_id', e.value)} />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group className="mb-3">
                                                    <Form.Control placeholder=" " className="rounded-2" value={item?.total_gwt}  onChange={e => handleItemsInput(index, 'total_gwt', e.target.value)} />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group className="mb-3">
                                                    <Form.Control placeholder="" className="rounded-2" value={item?.total_pkt}  onChange={e => handleItemsInput(index, 'total_pkt', e.target.value)} />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group className="mb-3">
                                                    <Form.Control placeholder=" " className="rounded-2" value={item?.pkt_receiver}  onChange={e => handleItemsInput(index, 'pkt_receiver', e.target.value)} />
                                                </Form.Group>
                                            </td>
                                            <td><Button type="button" variant="danger" onClick={ e => handleRemoveItem(index) }><MdClose /></Button></td>

                                        </tr>
                                    )
                                })
                            }
                            
                        </tbody>
                    </table>

                    <Row>
                        <Col xs={12} className="justify-content-end d-flex gap-3">
                        <button type="button" className=" btn btn-secondary btn-md bg-primary" onClick={ () => handleBack() }>Cancel</button>
                            <button type="button" className=" btn btn-primary btn-md bg-primary " onClick={() => handleSave()}>Save</button>

                        </Col>
                    </Row>

                </Row>



            </Form>

        </Layout>
    )
}
