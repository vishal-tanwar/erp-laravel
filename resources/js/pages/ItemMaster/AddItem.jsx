import React, { useState, useEffect, useReducer } from "react";
import "./style.scss";
import Layout from "../../partials/Layout";
import { Form, Col, Row, InputGroup } from "react-bootstrap";
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import { route } from "../../utils/WebRoutes";
import Swal from "sweetalert2";


export default function AddItem() {

    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [part, setPart] = useState('')
    const [grade, setGrade] = useState('')

    const initSizes = {
        length: "",
        width: "",
        height: "",
    }; 

    // const [size, setSize] = useState(initSizes );

    const [size, setSize] = useReducer(( prev, newState) => ({...prev, ...newState}), initSizes);
    
    const [store_id, setStore] = useState('')
    const [unit, setUnit] = useState('')
    const [group, setGroup] = useState('')
    const [sub_group, setSubGroup] = useState('')
    const [suppliers, setSuppliers] = useState([]);

    const [unitOptions, setUnitOptions] = useState([]);
    const [groupOptions, setGroupOptions] = useState([]);
    const [subGroupOptions, setSubGroupOptions] = useState([]);
    const [storeOptions, setStoreOptions] = useState([]);
    const [supplierOptions, setSupplierOptions] = useState([]);



    useEffect(() => {
        axios.get('/units')
            .then(res => {
                const response = res.data;
                const units = response.data.units.map((item) => {
                    return {
                        value: item.id,
                        label: item.name
                    }
                })
                setUnitOptions(units);
            });
        axios.get('/groups')
            .then(res => {
                const response = res.data;
                const groups = response.data.groups.map((item) => {
                    return {
                        value: item.id,
                        label: item.name
                    }
                })
                setGroupOptions(groups);
            });

        axios.get('/sub-groups')
            .then(res => {
                const response = res.data;

                const subGroups = response.data.groups.map((item) => {
                    return {
                        value: item.id,
                        label: item.name
                    }
                })
                setSubGroupOptions(subGroups);
            });


        axios.get('stores').then(res => {

            const response = res.data;

            const stores = response.data.stores.map((store) => {
                return {
                    value: store.id,
                    label: store.name
                }
            })
            setStoreOptions(stores);
        });

        axios.get('suppliers').then(res => {
            setSuppliers(res.data.data.supplier);
            const options = res.data.data.supplier.map((supplier) => {
                return {
                    value: supplier.id,
                    label: supplier.firm_name
                }
            })
            setSupplierOptions(options);
        });

        
    }, []);


    const handleAdd = event => {
        event.preventDefault();
        const postData = {
            name, part, grade, store_id, unit, group, sub_group,
            size: JSON.stringify( size ),
            suppliers: `${suppliers.join(',')}`
        }

        axios.post('item', postData).then(res => {
            Swal.fire({
                toast: true,
                title: "Success!",
                icon: 'success',
                text: res.data.message,
                position: 'top-right',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            }).then( () => {
                navigate(route.get('item_master.item_list'));
            });

        });
    }

    return (
        <Layout title="Add Item" hideBanner>
            <Form onSubmit={e => { handleAdd(e) }} className="px-4">
                <Row>
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label htmlFor="part-name"><b>Name</b></Form.Label>
                            <Form.Control
                                className="rounded-2"
                                placeholder="Name"
                                id="part-name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group >
                            <Form.Label htmlFor="part-number"><b>Part No</b></Form.Label>
                            <Form.Control
                                className="rounded-2"
                                placeholder="Part No"
                                id="part-number"
                                value={part}
                                onChange={e => setPart(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label><b>Item Store</b></Form.Label>
                            <Select
                                className="rounded-2"
                                options={storeOptions}
                                onChange={e => setStore(e.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label><b>Item Grade</b></Form.Label>
                            <Form.Control
                                className="rounded-2"
                                placeholder="Item Grade"
                                value={grade}
                                onChange={e => setGrade(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label><b>Size (LxWxT)</b></Form.Label>

                            <InputGroup>
                                <Form.Control
                                    className="rounded-start-2"
                                    placeholder="Length"
                                    value={size.length}
                                    onChange={e => setSize({length: e.target.value})}
                                />
                                <Form.Control
                                    placeholder="Width"
                                    value={size.width}
                                    onChange={e => setSize({ width: e.target.value })}
                                />
                                <Form.Control
                                    className="rounded-end-2"
                                    placeholder="Thick"
                                    value={size.height}
                                    onChange={e => setSize({ height: e.target.value })}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label><b>Unit</b></Form.Label>
                            <Select options={unitOptions} onChange={e => setUnit(e.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label><b>Group</b></Form.Label>
                            <Select options={groupOptions} onChange={e => {
                                setGroup(e.value);
                            }} />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label><b>Sub Group</b></Form.Label>
                            <Select options={subGroupOptions} onChange={e => setSubGroup(e.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col xs={12}>
                        <Form.Group>
                            <Form.Label><b>Suplliers</b></Form.Label>
                            <Select className="rounded-2" options={supplierOptions} isMulti onChange={e => {
                                setSuppliers(Array.isArray(e) ? e.map(x => x.value) : []);
                            }} />
                        </Form.Group>

                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="text-right">
                        <button className="btn btn-primary btn-lg mt-5" > Save</button>
                    </Col>
                </Row>
            </Form>
        </Layout>
    )
}