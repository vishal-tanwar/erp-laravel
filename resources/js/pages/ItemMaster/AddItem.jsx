import React, { useState,useEffect } from "react";
import "./style.scss";
import Layout from "../../partials/Layout";
import { Form, Col, Row } from "react-bootstrap";
import Select from 'react-select'


export default function AddItem() {
    const [name, setName] = useState('')
    const [part, setPart] = useState('')
    const [grade, setGrade] = useState('')
    const [size, setSize] = useState('')
    const [store_id, setStore] = useState('')
    const [unit, setUnit] = useState('')
    const [group, setGroup] = useState('')
    const [sub_group, setSubGroup] = useState('')
    const [suppliers, setSuppliers ] = useState([]);

    const [unitOptions, setUnitOptions] = useState([]);
    const [groupOptions, setGroupOptions] = useState([]);
    const [subGroupOptions, setSubGroupOptions] = useState([]);

    const options = [
        { value: 'Supplier A', label: 'Supplier A' },
        { value: 'Supplier B', label: 'Supplier B' },
        { value: 'Supplier C', label: 'Supplier C' }
    ]


    useEffect(() => {
        axios.get('/units')
            .then(res => {
                const response = res.data;
                const units = response.data.units.map( ( item ) => {
                    return {
                        value: item.id,
                        label: item.name 
                    }
                } )
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
    }, []);


    const handleAdd = ( ) => {
        const postData = {
            name,part,grade,size,store_id,unit,group,sub_group,
            suppliers: suppliers.join(',')
        }

        axios.post('item', postData);
    }

    return (
        <Layout title="Add Item" hideBanner>
            <Form>
                <Row className="mx-1">
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label htmlFor="part-name"><b>Name</b></Form.Label>
                            <Form.Control
                                className="border-black rounded-2"
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
                                className="border-black rounded-2"
                                placeholder="Part No"
                                id="part-number"
                                value={part}
                                onChange={e => setPart(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mx-1">
                    <Col xs={6}><b>Item Store</b></Col>
                    <Col xs={6}><b>Item Grade</b></Col>
                </Row>
                <Row className="p-2  my-1">
                    <Col xs={6}>
                        <Form.Control
                            className="border-black rounded-2"
                            placeholder=" Item Store"
                            value={store_id}
                            onChange={e => setStore(e.target.value)}
                        />
                    </Col>
                    <Col xs={6}>
                        <Form.Control
                            className="border-black rounded-2"
                            placeholder="Item Grade"
                            value={grade}
                            onChange={e => setGrade(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row className="mx-1">
                    <Col xs={6}><b>Item Size</b></Col>
                    <Col xs={6}><b>Item Unit</b></Col>
                </Row>
                <Row className="p-2  my-1">
                    
                    <Col xs={6}>
                        <Form.Control
                            className="border-black rounded-2"
                            placeholder="Item Size"
                            value={size}
                            onChange={e => setSize(e.target.value)}
                        />
                    </Col>
                    <Col xs={6}>
                        <Select options={unitOptions} value={unit} onChange={ e => setUnit(e.value)} />
                    </Col>
                </Row>
                <Row className="mx-1">
                    <Col xs={6}><b>Item Group</b></Col>
                    <Col xs={6}><b>Item SubGroup</b></Col>
                </Row>
                <Row className="p-2  my-1">
                    <Col xs={6}>
                        <Select options={groupOptions} value={group} onChange={e => { 
                            setGroup( e.value );
                            console.log( group )
                            }}/>
                    </Col>
                    <Col xs={6}>
                        <Select options={subGroupOptions} value={sub_group} onChange={e => setSubGroup(e.value)} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="mx-1"> <b>Suppliers</b></Col>
                    <Col xs={12}>
                        <Select className="border-black rounded-2" options={options} isMulti onChange={ e => {
                            setSuppliers(Array.isArray(e) ? e.map(x => x.value) : [] );
                        }}/>

                    </Col>
                </Row>
                <div className="text-right">
                    <button className="btn btn-primary btn-lg bg-primary mt-5" onClick={handleAdd}> Add Sub Groups</button>
                </div>
            </Form>
        </Layout>
    )
}