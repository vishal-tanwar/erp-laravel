import React from "react";
import "./style.scss";
import Layout from "../../../partials/Layout";
import { Container, Form, Col, InputGroup, Row } from "react-bootstrap";
import { BsCaretDownFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { route } from "../../../utils/WebRoutes";
import NotFound from "../../NotFound";
import { MdOutlineSearch } from "react-icons/md";


export default function StoreView() {

    const params = useParams();


    return (

        <>
            {
                params.name != 'rm'
                    ? <NotFound />
                    : <Layout hideBanner className="pt-0">
                        <Container fluid>
                            <button type="button" className=" btn-sm bg-primary text-white">Create Receiving Voucher</button>
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
                            <div>
                                <Row>
                                    <Col xs={5}>
                                        <div className="d-flex gap-2">
                                            <button type="button" className="btn  btn-sm border w-16 justify-content-around border-black shadow">25  <BsCaretDownFill /></button>
                                            <button type="button" className="btn  btn-sm border w-25 justify-content-around border-black shadow">Export  <BsCaretDownFill /></button>
                                        </div>
                                    </Col>
                                    <Col xs={7}>
                                        <Form className="w-64 ms-auto">
                                            <InputGroup>
                                                <Form.Control className="m-0 bg-dark-subtle" type="text" placeholder="Search..."></Form.Control>
                                                <InputGroup.Text className="bg-dark-subtle"><MdOutlineSearch className="fs-4 " /></InputGroup.Text>
                                            </InputGroup>
                                        </Form>
                                    </Col>
                                </Row>
                            </div>

                            <Row>
                                <Col xs={12}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sr. No</th>
                                                <th>Receiver Data</th>
                                                <th>Supplier</th>
                                                <th>Invoice</th>
                                                <th>Voucher No.</th>
                                                <th>Total Item</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>12-09-23</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>12-09-23</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>12-09-23</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>

                        </Container>
                    </Layout>
            }
        </>
    )
}




