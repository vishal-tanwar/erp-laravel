import React, { useEffect, useState } from "react";
import "./style.scss";
import Layout from "../../../../partials/Layout";
import { Form, Col, Row, Button, InputGroup } from "react-bootstrap";
import DatePicker from "react-flatpickr";
import { MdCalendarMonth, MdCheck, MdClose } from "react-icons/md";
import BarcodeReader from "../../../../components/BarcodeReader";


export default function CreateIssuance() {
    const [date, setDate] = React.useState(new Date());

    const [voucherNumber, setVoucherNumber] = useState('');


    useEffect(() => {
        axios.get('generate_voucher_number').then(res => {
            setVoucherNumber(res.data.data);
        })
    }, []);

    return (
        <Layout title="Issuance Voucher" hideBanner showBackButton>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Issuance Number</Form.Label>
                        <Form.Control placeholder="Enter your number" className="rounded-2" defaultValue={voucherNumber} disabled />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Department</Form.Label>
                        <Form.Control type="password" placeholder="Enter your Department" className="rounded-2" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label>Requester Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" className="rounded-2" />
                    </Form.Group>
                </Col>

            </Row>



            <Row>
                <Col>
                    <BarcodeReader onEnterBarCode={({ barcode, setBarcode }) => { setBarcode('') }} />
                </Col>
            </Row>


            <Row>
                <Col xs="4">
                    <Form.Select>
                        <option value={false}> Select to add Item</option>

                    </Form.Select>

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
                            <th scope="col">Approved</th>
                            <th scope="col" style={{ width: '5%' }}></th>



                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <tr className="text-center">

                            <td>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder="" className="rounded-2" />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder=" " className="rounded-2" />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder=" " className="rounded-2" />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder=" " className="rounded-2" />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder=" " className="rounded-2" />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder="" className="rounded-2" />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder=" " className="rounded-2" />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder=" " className="rounded-2" />
                                </Form.Group>
                            </td>
                            <td><button type="button" className="btn btn-success"><MdCheck /></button></td>

                        </tr>
                    </tbody>


                    <tbody className="text-center">
                        <tr className="text-center">

                            <td>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder="" className="rounded-2" />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder=" " className="rounded-2" />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder=" " className="rounded-2" />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder=" " className="rounded-2" />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder=" " className="rounded-2" />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder="" className="rounded-2" />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder=" " className="rounded-2" />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder=" " className="rounded-2" />
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

        </Layout>
    )
}
