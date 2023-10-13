import React, { useEffect, useState } from "react";

import "./style.scss";
import Layout from "../../partials/Layout";
import { Form, Col, InputGroup, Row, Dropdown, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { route } from "../../utils/WebRoutes";
import axios from "axios";


export default function Inventory() {



    const [stores, setStores] = useState([]);


    const handleCreate = () => {

        axios.post('store', { name }).then(res => {

            setStores(prev => [...prev, res.data.data])

            handleClose();
        });
    }


    useEffect(() => {
        axios.get('stores').then(res => {
            const response = res.data;

            setStores(response.data.stores);
        })
    }, []);

    return (
        <Layout title="Inventory" hideBanner>
            <Link className="btn btn-primary" to={route.get('store.inventory.add')}> Add Inventory</Link>

            <Row className="border-2 my-4">
                <Col xs={12}>
                    <h2 className="fs-3 m-2 px-4"><b>Inventory Summary </b></h2>
                </Col>
                <Col xs={12}>
                    <Row className="summary-bar">
                        <Col xs={3} className="text-center">
                            <h4 className="fs-2">21</h4>
                            <h4 className="mt-3">Total Item</h4>
                        </Col>

                        <Col xs={3} className="text-center red">
                            <h4 className="fs-2">1</h4>
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

                        </div>
                    </Col>
                    <Col xs={7} className="d-flex justify-content-end">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className="btn-light border border-black shadow">
                                Select
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="bg-dark-subtle">
                                <Dropdown.Item >R.M Master</Dropdown.Item>
                                <Dropdown.Item >B.O.P</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col xs={12}>
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr className="text-center">
                                        <th scope="col"> <Form.Check type="checkbox" /></th>
                                        <th scope="col">Sr. No.</th>
                                        <th scope="col">Item Name</th>
                                        <th scope="col">Store Name</th>
                                        <th scope="col">Stock</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">

                                    {
                                        stores.map((store, index) => {
                                            return (
                                                <tr className="text-center" key={index}>
                                                    <td>
                                                        <Form.Check type="checkbox" value={store.id} />
                                                    </td>
                                                    <td>{++index}</td>
                                                    <td>Item Name</td>
                                                    <td>{store.name}</td>
                                                    <td>Stock</td>

                                                </tr>
                                            );
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
