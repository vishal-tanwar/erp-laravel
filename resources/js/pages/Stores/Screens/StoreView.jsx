import React, { useEffect, useState } from "react";
import "./style.scss";
import Layout from "../../../partials/Layout";
import { Form, Col, InputGroup, Row, Dropdown, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { route } from "../../../utils/WebRoutes";
import { MdArrowBackIosNew, MdFilterAlt, MdOutlinePrint, MdOutlineSearch } from "react-icons/md";
import NotFound from '../../NotFound';
import axios from "axios";


export default function StoreView() {

    const params = useParams();
    const [isFound, setIsFound] = useState(true);
    const [store, setStore] = useState([]);


    useEffect(() => {
        axios.get(`store/${params.name}`).then(res => {

            if (res.data.success) {
                setStore(res.data.data);
            }
            else {
                setIsFound(false);
            }

        })

    }, []);


    return (

        <>{
            !isFound ? <NotFound /> :

                <Layout hideBanner className="pt-0">
                    <Col xs={12}>
                        <Row>

                            <Col xs={6} className="d-flex gap-2">
                                <Link to={route.get('store.list')} title="Back" className="btn btn-primary btn-sm"><MdArrowBackIosNew /> Back to Stores</Link>
                                <Link to={route.get('store.vouchers.create', { name: params.name })} className="btn btn-primary btn-sm"> Receiving Voucher</Link>
                                <Link to="/Issuancevoucher"><button type="button" className=" btn btn-success btn-sm"> Issuance Voucher</button></Link>
                            </Col>

                            <Col xs={6} className="d-flex justify-content-end">
                                <button type="button"><MdFilterAlt className="fs-4" /></button>

                            </Col>

                        </Row>
                    </Col>
                    <Row className="border-2 my-4">
                        <Col xs={12}>
                            <h2 className="fs-3 m-2 px-4"><b>R.M Summary </b></h2>
                        </Col>
                        <Col xs={12}>
                            <Row className="summary-bar">
                                <Col xs={2} className="text-center">
                                    <h4 className="fs-2">21</h4>
                                    <h4 className="mt-3">Total Item</h4>
                                </Col>
                                <Col xs={3} className="text-center">
                                    <h4 className="fs-2">13</h4>
                                    <h4 className="mt-3">Available Stock</h4>
                                </Col>
                                <Col xs={2} className="text-center">
                                    <h4 className="fs-2">1</h4>
                                    <h4 className="mt-3">Total Supplier</h4>
                                </Col>
                                <Col xs={3} className="text-center">
                                    <h4 className="fs-2">11</h4>
                                    <h4 className="mt-3">Out of Stock</h4>
                                </Col>
                                <Col xs={2} className="text-center">
                                    <h4 className="fs-2">1</h4>
                                    <h4 className="mt-3">Today Receiver</h4>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                    <Row className="mb-4">
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
                                    <Form.Control className="m-0 border border-end-0" type="text" placeholder="Search..."></Form.Control>
                                    <Button className="border-start-0"><MdOutlineSearch className="fs-4 " /></Button>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Row>

                    <Row>
                        <table className="table  table-bordered  table-responsive">
                            <thead>

                                <tr className="text-center">

                                    <th scope="col">#</th>
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Voucher No.</th>
                                    <th scope="col">Invoice No.</th>
                                    <th scope="col">Received Date</th>
                                    <th scope="col">Supplier Name</th>
                                    <th scope="col">GST No.</th>
                                    <th scope="col">E-Mail</th>
                                    <th scope="col">Contact No.</th>
                                    <th scope="col">Actions</th>
                                    <th scope="col"></th>

                                </tr>
                            </thead>
                            <tbody className="text-center">
                                <tr className="text-center">

                                    <td><Form.Check type="checkbox" /></td>
                                    <td>1</td>
                                    <td></td>
                                    <td></td>
                                    <td>12-09-23</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="d-flex justify-content-evenly">
                                        <Link to="/Viewpage"><button type="button" className="btn btn-primary btn-sm rounded shadow w-16">View</button></Link>
                                        <Link to="/Editpage"><button type="button" className="btn btn-success btn-sm rounded shadow ">Edit</button></Link>
                                        <button type="button" className="btn btn-danger btn-sm rounded shadow ">Delete</button>
                                    </td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle id="dropdown-basic" className="btn-light border border-black shadow">
                                                <MdOutlinePrint />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="bg-white">
                                                <Dropdown.Item >Print</Dropdown.Item>
                                                <Dropdown.Item >Pdf</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                                <tr>
                                    <td><Form.Check type="checkbox" /></td>
                                    <td>2</td>
                                    <td></td>
                                    <td></td>
                                    <td>12-09-23</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="d-flex justify-content-evenly">
                                        <button type="button" className="btn btn-primary btn-sm rounded shadow w-16">View</button>
                                        <button type="button" className="btn btn-success btn-sm rounded shadow ">Edit</button>
                                        <button type="button" className="btn btn-danger btn-sm rounded shadow ">Delete</button>
                                    </td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle id="dropdown-basic" className="btn-light border border-black shadow">
                                                <MdOutlinePrint />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="bg-white">
                                                <Dropdown.Item >Print</Dropdown.Item>
                                                <Dropdown.Item >Pdf</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>



                            </tbody>
                        </table>

                    </Row>
                </Layout>
        }
        </>
    )
}




