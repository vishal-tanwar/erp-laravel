import React, { useState } from "react";
import "./style.scss";
import Layout from "../../partials/Layout";
import { Form, Col, Row} from "react-bootstrap";


export default function AddItem() {
    return (
        <Layout title="Add Item" hideBanner>
            <Row className="mx-1">
                <Col xs={6}><b>Item Name</b></Col>
                <Col xs={6}><b>Item Part No</b></Col>
            </Row>
            <Row className=" p-2  my-1">
                <Col xs={6}>
                    <Form.Control
                        className="border-black rounded-2"
                        placeholder=" Item Name"
                    />
                </Col>
                <Col xs={6}>
                    <Form.Control
                        className="border-black rounded-2"
                        placeholder="Part Name"
                    />
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
                    />
                </Col>
                <Col xs={6}>
                    <Form.Control
                        className="border-black rounded-2"
                        placeholder="Item Grade"
                    />
                </Col>
            </Row>
            <Row className="mx-1">
                <Col xs={6}><b>Item Unit</b></Col>
                <Col xs={6}><b>Item Size</b></Col>
            </Row>
            <Row className="p-2  my-1">
                <Col xs={6}>
                    <Form.Control
                        className="border-black rounded-2"
                        placeholder=" Item Unit"
                    />
                </Col>
                <Col xs={6}>
                    <Form.Control
                        className="border-black rounded-2"
                        placeholder="Item Size"
                    />
                </Col>
            </Row>
            <Row className="mx-1">
                <Col xs={6}><b>Item Group</b></Col>
                <Col xs={6}><b>Item SubGroup</b></Col>
            </Row>
            <Row className="p-2  my-1">
                <Col xs={6}>
                    <Form.Control
                        className="border-black rounded-2"
                        placeholder=" Item Group"
                    />
                </Col>
                <Col xs={6}>
                    <Form.Control
                        className="border-black rounded-2"
                        placeholder="Item SubGroup"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="mx-1"> <b>Select Supplier</b></Col>
                <Col xs={12}>
                <Form.Control
                        className="border-black rounded-2"
                        placeholder="Select Supplier"
                    />
                </Col>
            </Row>
        </Layout>
    )
}