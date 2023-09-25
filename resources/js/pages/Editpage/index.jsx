import React from "react";
import "./style.scss";
import Layout from "../../partials/Layout";
import {Form, Col, Row, Dropdown, Button, InputGroup} from "react-bootstrap";
import {Input} from "postcss";
import DatePicker from "react-flatpickr";
import {MdAddBox, MdCalendarMonth, MdCheck, MdClose, MdOutlineClose} from "react-icons/md";


export default function Editpage() {
    const [date, setDate] = React.useState(new Date());

    return (
        <Layout title="Edit Voucher" hideBanner>
                <Form>
                    <Row>
                        <Col xs={6} >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>RM Voucher Number</Form.Label>
                                <Form.Control type="email" placeholder="Enter your number" className="rounded-2" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Invoice Number</Form.Label>
                                <Form.Control type="password" placeholder="Enter your number" className="rounded-2" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Date</Form.Label>

                                <InputGroup>
                                    <DatePicker id="flatpickr-date" className="form-control m-0 border-end-0 rounded-2" value={date} onChange={([date]) => { setDate(date) }} />
                                    <label htmlFor="flatpickr-date" className="input-group-text border-gray-600 rounded-1 border-start-0 bg-body"><MdCalendarMonth /> </label>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>EMail</Form.Label>
                                <Form.Control type="email" placeholder="Enter your Mail" className="rounded-2" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                        </Col>


                        <Col xs={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Supplier Name</Form.Label>
                                <Form.Control type="email" placeholder="Enter name " className="rounded-2" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="email" placeholder="Enter your address " className="rounded-2" />
                            </Form.Group>

                            <Row>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Your City " className="rounded-2" />
                                    </Form.Group>
                                </Col>

                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control type="email" placeholder="Enter your State " className="rounded-2" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Phone No.</Form.Label>
                                        <Form.Control type="email" placeholder="Enter your Number " className="rounded-2" />
                                    </Form.Group>
                                </Col>
                            </Row>

                        </Col>
                    </Row>


                    <Row className="my-4">
                        <table className="table  table-bordered  table-responsive">
                            <thead>

                                <tr className="text-center">

                                    <th scope="col">Item Name</th>
                                    <th scope="col">Item Part</th>
                                    <th scope="col">Item Size</th>
                                    <th scope="col">Item Grade</th>
                                    <th scope="col">Total GWT</th>
                                    <th scope="col">Total PKT.</th>
                                    <th scope="col">PKT Receiver</th>
                                    <th scope="col" style={{ width: '5%' }}></th>



                                </tr>
                            </thead>
                            <tbody className="text-center">
                                <tr className="text-center">

                                    <td>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder="" className="rounded-2" />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder=" " className="rounded-2" />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder=" " className="rounded-2" />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder=" " className="rounded-2" />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder=" " className="rounded-2" />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder="" className="rounded-2" />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder=" " className="rounded-2" />
                                        </Form.Group>
                                    </td>
                                    <td><button type="button" className="btn btn-success"><MdCheck /></button></td>

                                </tr>
                            </tbody>


                            <tbody className="text-center">
                                <tr className="text-center">

                                    <td>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder="" className="rounded-2" />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder=" " className="rounded-2" />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder=" " className="rounded-2" />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder=" " className="rounded-2" />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder=" " className="rounded-2" />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder="" className="rounded-2" />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder=" " className="rounded-2" />
                                        </Form.Group>
                                    </td>
                                    <td><button type="button" className="btn btn-danger"><MdClose /></button></td>

                                </tr>
                            </tbody>
                        </table>

                        <Row>
                            <Col xs={12} className="justify-content-end d-flex gap-3">
                                <button type="button" className=" btn btn-secondary btn-md bg-primary ">Cancel</button>
                                <button type="button" className=" btn btn-primary btn-md bg-primary ">Save</button>

                            </Col>
                        </Row>

                    </Row>



                </Form>

            </Layout>
            )
}
