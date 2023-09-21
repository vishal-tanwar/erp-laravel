import React from "react";

import "./style.scss";
import Layout from "../../partials/Layout";
import { Form, Col, InputGroup, Row, Dropdown, DropdownButton } from "react-bootstrap";
import { MdOutlineSearch } from "react-icons/md";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

export default function List() {
    return (
        <Layout hideBanner>
            <button type="button" className="btn btn-primary btn-sm bg-primary"> Create Store</button>
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
                <Row className="border-2 my-4">

                </Row>
            </div>
        </Layout>
    )
}