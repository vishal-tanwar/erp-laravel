import React, { useState } from "react";

import "./style.scss";
import Layout from "../../partials/Layout";
import { Form, Col, InputGroup, Row, Dropdown, Modal, Button } from "react-bootstrap";
import { MdOutlineSearch } from "react-icons/md";


export default function List() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Layout hideBanner>
            <button type="button" className="btn btn-primary btn-sm bg-primary" onClick={handleShow}> Create Store</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="fs-2">Store Name</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pb-3">
                    <h2 className="fs-4">Add Store Name</h2>
                    <InputGroup className="my-2">
                        <Form.Control 
                        placeholder="Store Name"/>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row className="border-2 my-4">
                <Col xs={12}>
                    <h2 className="fs-3 m-2 px-4"><b>Store Summary </b></h2>
                </Col>
                <Col xs={12}>
                    <Row className="summary-bar">
                        <Col xs={3} className="text-center">
                            <h4 className="fs-2">21</h4>
                            <h4 className="mt-3">Total Item</h4>
                        </Col>
                        <Col xs={3} className="text-center green">
                            <h4 className="fs-2">13</h4>
                            <h4 className="mt-3">Available Stock</h4>
                        </Col>
                        <Col xs={3} className="text-center">
                            <h4 className="fs-2">1</h4>
                            <h4 className="mt-3">About to Stock out</h4>
                        </Col>
                        <Col xs={3} className="text-center red">
                            <h4 className="fs-2">11</h4>
                            <h4 className="mt-3">Out of Stock</h4>
                        </Col>
                    </Row>
                </Col>

            </Row>
            <div>
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
                                        <th scope="col">#</th>
                                        <th scope="col">Sr. No.</th>
                                        <th scope="col">Store Name</th>
                                        <th scope="col">Total Item</th>
                                        <th scope="col">Available Item</th>
                                        <th scope="col">About to Stock Out</th>
                                        <th scope="col">Out of Stock</th>
                                        <th scope="col">Action</th>
                                        <th scope="col">Go to Store</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr className="text-center">
                                        <td>
                                            <Form.Check type="checkbox" />
                                        </td>
                                        <td>1</td>
                                        <td>A.B.C Pvt Ltd</td>
                                        <td>Total Item</td>
                                        <td>Available Item</td>
                                        <td>About to Stock</td>
                                        <td>Out of Stock</td>
                                        <td className="d-flex justify-content-evenly">
                                            <button type="button" className="btn btn-success btn-sm rounded shadow w-16">Edit</button>
                                            <button type="button" className="btn btn-danger btn-sm rounded shadow ">Delete</button>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-primary btn-sm rounded shadow ">Go to Store</button>
                                        </td>

                                    </tr>


                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}