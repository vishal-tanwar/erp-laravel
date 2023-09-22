import React, { useState } from "react";
import "./style.scss";
import Layout from "../../partials/Layout";
import { Form, Col, Row } from "react-bootstrap";
import Select from 'react-select'


export default function AddItem() {
    const options = [
        { value: 'Supplier A', label: 'Supplier A' },
        { value: 'Supplier B', label: 'Supplier B' },
        { value: 'Supplier C', label: 'Supplier C' }
      ]
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
                    <Form.Select
                        className="border-black rounded-2"
                    >
                        <option>Select Unit</option>
                        <option>Select Unit</option>
                        <option>Select Unit</option>
                    </Form.Select>
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
                    <Form.Select
                        className="border-black rounded-2"
                    >
                        <option>Select Group</option>
                        <option>Select Group</option>
                        <option>Select Group</option>
                    </Form.Select>
                </Col>
                <Col xs={6}>
                    <Form.Select
                        className="border-black rounded-2"
                    >
                        <option>Select SubGroup</option>
                        <option>Select SubGroup</option>
                        <option>Select SubGroup</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="mx-1"> <b>Suppliers</b></Col>
                <Col xs={12}>
                    <Select className="border-black rounded-2" options={options} isMulti/>
                  
                </Col>
            </Row>
            <div className="text-right">
                <button type="button" className="btn btn-primary btn-lg bg-primary mt-5"> Add Sub Groups</button>
            </div>

        </Layout>
    )
}