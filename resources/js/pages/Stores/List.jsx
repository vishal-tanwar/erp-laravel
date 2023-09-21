import React from "react";

import "./style.scss";
import Layout from "../../partials/Layout";
import { BsCaretDownFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import {Form, Col, InputGroup, Row } from "react-bootstrap";
import { MdOutlineSearch } from "react-icons/md";

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
                        <div className="d-flex gap-5">
                            <button type="button" className="btn  btn-sm border w-16 justify-content-around border-black shadow">25  <BsCaretDownFill /></button>
                            <button type="button" className="btn  btn-sm border w-25 justify-content-around border-black shadow">Export  <BsCaretDownFill /></button>
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
            </div>
        </Layout>
    )
}
