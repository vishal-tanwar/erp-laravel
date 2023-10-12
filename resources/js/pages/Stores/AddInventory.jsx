import React, { useState, useEffect, useReducer } from "react";
import "./style.scss";
import Layout from "../../partials/Layout";
import { Form, Col, Row, InputGroup } from "react-bootstrap";
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import { route } from "../../utils/WebRoutes";
import Swal from "sweetalert2";


export default function AddInventory() {

    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [part, setPart] = useState('')
    const [grade, setGrade] = useState('')

    const initSizes = {
        length: 0,
        width: 0,
        height: 0,
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

    const options = [
        { value: 'Supplier A', label: 'Supplier A' },
        { value: 'Supplier B', label: 'Supplier B' },
        { value: 'Supplier C', label: 'Supplier C' }
    ]


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
            });

            navigate(route.get('item_master.item_list'))
        });
    }

    return (
        <Layout title="Update Inventory" hideBanner>
            <Form onSubmit={e => { handleAdd(e) }} className="px-4">
                <Row className="mb-8">
                    <Col xs={6}>
                        <Form.Group >
                            <Form.Label htmlFor="part-name"><b>Item Name</b></Form.Label>
                            <Form.Control
                                className="rounded-2 border-black"
                                placeholder="Item Name"
                                id="part-name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group >
                            <Form.Label htmlFor="part-number"><b>New Stock</b></Form.Label>
                            <Form.Control
                                className="rounded-2 border-black"
                                placeholder="New Stock"
                                id="part-number"
                                value={part}
                                onChange={e => setPart(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-8">
                    <Col xs={6}>
                    <Form.Group>
                            <Form.Label><b>Item Store</b></Form.Label>
                            <Form.Control
                                className="rounded-2 border-black"
                                placeholder="Item Store"
                                value={grade}
                                onChange={e => setGrade(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label><b>Available Stock</b></Form.Label>
                            <Form.Control
                                className="rounded-2 border-black"
                                placeholder="Available Stock"
                                value={grade}
                                onChange={e => setGrade(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-8">
                        <Col xs={6}>
                         
                        </Col>
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label><b>Stock Update</b></Form.Label>
                            <Form.Control
                                className="rounded-2 border-black"
                                placeholder="Stock Update"
                                value={grade}
                                onChange={e => setGrade(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            
                <Row className="mb-8">
                    <Col xs={12} className="text-right">
                        <button className="btn btn-primary btn-lg mt-5 " >Create</button>
                    </Col>
                </Row>
            </Form>
        </Layout>
    )
}