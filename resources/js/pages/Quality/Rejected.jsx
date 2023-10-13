import React, { useState } from "react";
import Layout from "../../partials/Layout";
import { Form, Col, InputGroup, Row, Button } from "react-bootstrap";
import { MdOutlineSearch } from "react-icons/md";



export default function Rejected() {

    const [vouchers, setVouchers] = useState([]);

    return (
        <Layout title="Quality Rejected">
            <Row className="mb-4">

                <Col xs={12}>
                    <Form className="w-64 ms-auto">
                        <InputGroup>
                            <Form.Control className="m-0 border border-end-0" type="text" placeholder="Search..."></Form.Control>
                            <Button className="border-start-0"><MdOutlineSearch className="fs-4"/></Button>
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

                        </tr>
                    </thead>
                    <tbody className="text-center">

                        <tr>
                            <td><Form.Check /></td>
                            <td>1</td>
                            <td>Lorem</td>
                            <td>Lorem</td>
                            <td>Lorem</td>
                            <td>Lorem</td>
                            <td>Lorem</td>
                            <td>Lorem</td>
                            <td>Lorem</td>
                            <td><Button>View</Button></td>
                        </tr>




                    </tbody>




                </table>

            </Row>

        </Layout>
    )
}