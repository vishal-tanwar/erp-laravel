import React, { useEffect, useState } from "react";

import "./style.scss";
import Layout from "../../partials/Layout";
import { Form, Col, InputGroup, Row, Dropdown, Modal, Button } from "react-bootstrap";
import { MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { route } from "../../utils/WebRoutes";
import DropdownFilter from "../../components/DropdownFilter";
import axios from "axios";
import ReactSelect from "react-select";


export default function Location() {

    const [show, setShow] = useState(false);
    const [storeOptions, setStoreOptions] = useState([]);

    const [store, setStore] = useState('');
    const [locationName, setLocationName] = useState('');

    const [locations, setLocations] = useState([]);

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(locations.map(li => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleClick = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        console.log( id, checked, isCheck );
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };

    useEffect(() => {
        axios.get('stores').then(res => {
            const options = res.data.data.stores.map((store) => {
                return {
                    value: store.id,
                    label: store.name
                }
            })
            setStoreOptions( options );
        });

        axios.get('locations').then( res => {
            setLocations( res.data.data.locations );
        })
    }, []);

    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSaveLocation = () => {
        if (locationName && store){
            axios.post('location', {
                name: locationName, 
                store_id: store
            }).then( res => {
                setLocations(prev => [...prev, res.data.data]);
                handleClose();
                setStore('');
                setLocationName('');
            });
        }
    }
    return (
        <Layout title="Store Location" hideBanner showBackButton={true}>
            <Row>
                <Col xs={6}>
                    <button type="button" className="btn btn-primary btn-sm bg-primary" onClick={handleShow}>Add Location</button>
                </Col>
                <Col xs={6} className="d-flex justify-content-end">
                    <DropdownFilter align="right" />

                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="fs-2">Store Location</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pb-3">
                    <InputGroup className="my-2 w-100">
                        <ReactSelect
                            className="rounded-2 w-100"
                            options={storeOptions}
                            onChange={e => setStore(e.value)}
                            isClearable={true}  
                            name="store_id"
                            
                        />
                    </InputGroup>

                    <InputGroup className="my-2">
                        <Form.Control
                            placeholder="Store Location" value={locationName} onChange={e => setLocationName(e.target.value)}/>
                    </InputGroup>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveLocation}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="mt-4">
                <Row>
                    <Col xs={5}>
                        <div className="d-flex gap-3">
                            <Dropdown>
                                <Dropdown.Toggle className="btn-light border border-black shadow" id="dropdown-basic">
                                    25
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="bg-dark-subtle">
                                    <Dropdown.Item >10</Dropdown.Item>
                                    <Dropdown.Item >25</Dropdown.Item>
                                    <Dropdown.Item >50</Dropdown.Item>
                                    <Dropdown.Item className="text">All</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" className="btn-light border border-black shadow">
                                    Export
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="bg-dark-subtle">
                                    <Dropdown.Item >Excel</Dropdown.Item>
                                    <Dropdown.Item >Print</Dropdown.Item>
                                    <Dropdown.Item >PDF</Dropdown.Item>
                                    <Dropdown.Item >CSV</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" className="btn-light border border-black shadow">
                                    Bulk Action
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="bg-dark-subtle">
                                    <Dropdown.Item >Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Col>
                    <Col xs={7}>
                        <Form className="w-64 ms-auto">
                            <InputGroup>
                                <Form.Control className="m-0" type="text" placeholder="Search..."></Form.Control>
                                <InputGroup.Text><MdOutlineSearch className="fs-4" /></InputGroup.Text>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col xs={12}>
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr className="rm-list-thM1">
                                    </tr>
                                    <tr className="text-center">
                                        <th scope="col"> <Form.Check type="checkbox" onChange={handleSelectAll} checked={isCheckAll} /></th>
                                        <th scope="col">Sr. No.</th>
                                        <th scope="col">Store Name</th>
                                        <th scope="col">Store Location</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {
                                        locations.map( (location, index) => {
                                            return(
                                                <tr className="text-center" key={index}>
                                                    
                                                    <td>
                                                        <Form.Check type="checkbox" 
                                                            id={location.id}
                                                            name={`location-${location.id}`}
                                                            onChange={handleClick}
                                                            checked={isCheck.includes(location.id)? 'checked': false } />
                                                    </td>
                                                    <td>{++index}</td>
                                                    <td>{location.store.name}</td>
                                                    <td>{location.name}</td>
                                                    <td className="d-flex justify-content-evenly">
                                                        <button type="button" className="btn btn-success btn-sm rounded shadow w-16">Edit</button>
                                                        <button type="button" className="btn btn-danger btn-sm rounded shadow ">Delete</button>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                    


                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}