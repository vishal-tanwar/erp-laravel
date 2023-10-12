import React,{useState} from "react";
import Layout from "../../partials/Layout";
import { Form, Col, InputGroup, Row, Dropdown, Button } from "react-bootstrap";
import { MdOutlinePrint, MdOutlineSearch } from "react-icons/md";



export default function Approved() {

    const [vouchers, setVouchers] = useState([]);

    return (
        <Layout>
            <Row className="mb-4">
                <Col xs={5}>
                    
                    {/* <div className="d-flex gap-3">
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
                    </div> */}
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
                    <tbody>
                    <td><Form.Check type="checkbox" /></td>

                    </tbody>
                    
                </table>

            </Row>

        </Layout>
    )
}