import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import Layout from "../../../../partials/Layout";
import { Form, Col, Row, InputGroup, Modal, Button } from "react-bootstrap";
import DatePicker from "react-flatpickr";
import { MdCalendarMonth } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { useParams } from "react-router-dom";
import Barcode from "react-barcode";

import { PDFExport } from '../../../../modules/react-pdf'

export default function VoucherView() {

    String.prototype.parseInt = function () {
        return parseInt(this.valueOf());
    }

    const [date, setDate] = React.useState(new Date());

    const params = useParams();
    const [isFound, setIsFound] = useState(true);
    const [voucher, setVoucher] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [items, setItems] = useState([]);

    const [show, setShow] = useState(false);
    const [barCodes, setBarCodes] = useState([]);


    const pdfExportComponent = React.useRef(null);


    useEffect(() => {

        axios.get(`store/${params.name}`).then(res => {

            if (res.data.success) {

                axios.get(`voucher?id=${params.id}`).then(res => {
                    setDate(new Date(res.data.data.receiving_date));
                    setVoucher(res.data.data);

                    setSupplier(res.data.data.supplier);
                    setItems(res.data.data.items)
                });

            }
            else {
                setIsFound(false);
            }
        });
    }, []);




    const showBarCodes = (itemId, quantity, voucher) => {

        if (barCodes.length <= 0) {

            quantity = quantity.parseInt();

            voucher = voucher.replace(/\-/g, '');

            const itemBarCodes = Array(quantity).fill().map((v, i) => {
                return (
                    <Barcode key={i} value={`${voucher}-${itemId}00${++i}`}/>
                )
            });

            setBarCodes(itemBarCodes);

        }

        setShow(true);
    }


    return (
        <Layout title="View Voucher" hideBanner showBackButton={true}>
            <Form>
                <Row>
                    <Col xs={6} >
                        <Form.Group className="mb-3">
                            <Form.Label>RM Voucher Number</Form.Label>
                            <Form.Control placeholder="Enter your number" className="rounded-2" defaultValue={voucher.voucher_number} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Invoice Number</Form.Label>
                            <Form.Control placeholder="Enter your number" className="rounded-2" defaultValue={voucher?.invoice_id} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Date</Form.Label>

                            <InputGroup>
                                <DatePicker id="flatpickr-date" className="form-control m-0 border-end-0 rounded-2" defaultValue={date.toLocaleDateString()} />
                                <label htmlFor="flatpickr-date" className="input-group-text border-gray-600 rounded-1 border-start-0 bg-body"><MdCalendarMonth /> </label>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>EMail</Form.Label>
                            <Form.Control placeholder="Enter your Mail" className="rounded-2" defaultValue={supplier?.email} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                    </Col>


                    <Col xs={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Supplier</Form.Label>
                            <Form.Control placeholder="Enter name " className="rounded-2" defaultValue={supplier?.firm_name} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="Enter your address " className="rounded-2" defaultValue={supplier?.address} />
                        </Form.Group>

                        <Row>
                            <Col xs={6}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>City</Form.Label>
                                    <Form.Control placeholder="Enter Your City " className="rounded-2" defaultValue={voucher?.city} />
                                </Form.Group>
                            </Col>

                            <Col xs={6}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>State</Form.Label>
                                    <Form.Control placeholder="Enter your State " className="rounded-2" defaultValue={voucher?.state} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={6}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Phone No.</Form.Label>
                                    <Form.Control placeholder="Enter your Number " className="rounded-2" defaultValue={supplier?.number} />
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
                                <th scope="col">Quanity</th>
                                <th scope="col" width={`15%`}>Location</th>
                                <th scope="col">Total GWT</th>
                                <th scope="col">Total PKT.</th>
                                <th scope="col">PKT Receiver</th>
                                <th scope="col" style={{ width: '12%' }}></th>

                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {
                                items.map((item, index) => {

                                    return (<tr className="text-center" key={index}>

                                        <td>
                                            <Form.Group className="mb-3" >
                                                <Form.Control placeholder=" " className="rounded-2" defaultValue={item.item.name} />
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Group className="mb-3" >
                                                <Form.Control placeholder=" " className="rounded-2" defaultValue={item.item.part} />
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Group className="mb-3" >
                                                <Form.Control placeholder=" " className="rounded-2" defaultValue={item.item.size} />
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Group className="mb-3" >
                                                <Form.Control placeholder=" " className="rounded-2" defaultValue={item.item.grade} />
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Group className="mb-3" >
                                                <Form.Control placeholder=" " className="rounded-2" defaultValue={item.quantity} />
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Group className="mb-3" >
                                                <Form.Control placeholder=" " className="rounded-2" defaultValue={item.location.name} />
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Group className="mb-3" >
                                                <Form.Control placeholder=" " className="rounded-2" defaultValue={item.total_gwt} />
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Group className="mb-3" >
                                                <Form.Control placeholder=" " className="rounded-2" defaultValue={item.total_pkt} />
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Group className="mb-3" >
                                                <Form.Control placeholder=" " className="rounded-2" defaultValue={item.pkt_receiver} />
                                            </Form.Group>
                                        </td>
                                        <td><button type="button" className=" btn btn-primary btn-sm bg-primary" onClick={() => showBarCodes(item.id, item.quantity, voucher.voucher_number)}>View Barcode</button>
                                        </td>

                                    </tr>)
                                })
                            }

                        </tbody>


                    </table>

                </Row>

            </Form>

            <Modal show={show} >

                <Modal.Header>
                    <Modal.Title>Item Barcodes</Modal.Title>
                    <Button variant="danger" onClick={() => setShow(false)}><CgClose /></Button>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column align-items-center">
                    <div className="d-flex mb-3">
                        <Button onClick={() => {
                            if (pdfExportComponent.current) {
                                pdfExportComponent.current.save();
                            }
                        }}>Export in PDF</Button>
                    </div>
                    <PDFExport
                        keepTogether="p"
                        paperSize={[300, 150]}
                        ref={pdfExportComponent}
                    >
                        {barCodes.map((barcode, i) => <div key={i} style={{ marginLeft: 10, marginRight: 10 }} align="center" width="100%">{barcode}</div>)}
                    </PDFExport>

                </Modal.Body>

            </Modal>

        </Layout>
    )
}
