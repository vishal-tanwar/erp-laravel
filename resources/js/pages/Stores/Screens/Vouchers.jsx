import React, { useEffect, useState } from "react";
import "./style.scss";
import Layout from "../../../partials/Layout";
import { Form, Col, InputGroup, Row, Dropdown, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { route } from "../../../utils/WebRoutes";
import { MdArrowBackIosNew, MdFilterAlt, MdOutlinePrint, MdOutlineSearch } from "react-icons/md";
import NotFound from '../../NotFound';
import axios from "axios";
import { SkeletonTable } from "../../../Skeletons";


export default function Vouchers() {

    
    const [isLoading, setLoading ] = useState(true);
    const [isSummaryLoading, setSummaryLoading] = useState(true); 
    const [isPaginateLoading, setPaginateLoading ] = useState(true);

    const params = useParams();
    const [isFound, setIsFound] = useState(true);
    const [store, setStore] = useState([]);
    const [vouchers, setVouchers] = useState([]);

    const [totalReceiver, setTotalReceiver] = useState(0)
    const [todayReceiver, setTodayReceiver] = useState(0)
    const [totalIssuance, setTotalIssuance] = useState(0)
    const [todayIssuance, setTodayIssuance] = useState(0)


    useEffect(() => {

        axios.get(`store/${params.name}`).then(res => {

            if (res.data.success) {
                setStore(res.data.data);

                axios.get('vouchers?store=' + res.data.data.id ).then(res => {
                    setVouchers(res.data.data.vouchers);

                    let vouchers = res.data.data.vouchers;

                    vouchers.length

                    const today = (new Date()).toDateString();

                    let receivers = vouchers.filter(voucher => voucher?.type === "receiving" );
                    let issuances = vouchers.filter(voucher => voucher?.type === "issuance" );
                    let todayReceiverCount = receivers.filter(voucher => (new Date(voucher?.created_at)).toDateString() === today).length;
                    let todayIssuanceCount = issuances.filter(voucher => (new Date(voucher?.created_at)).toDateString() === today ).length;

                    setTotalReceiver(receivers.length );
                    setTotalIssuance(issuances.length );
                    setTodayReceiver(todayReceiverCount);
                    setTodayIssuance(todayIssuanceCount);


                    setLoading(false);
                })

            }
            else {
                setIsFound(false);
            }
        });
    }, []);




    return (

        <>{
            !isFound ? <NotFound /> :

                <Layout hideBanner className="pt-0" showBackButton={true}>
                    <Col xs={12}>
                        <Row>

                            <Col xs={6} className="d-flex gap-2">
                                <Link to={route.get('store.list')} title="Back" className="btn btn-primary btn-sm"><MdArrowBackIosNew /> Back to Stores</Link>
                                <Link to={route.get('store.receiving.create', { name: params.name })} className="btn btn-primary btn-sm"> Receiving Voucher</Link>
                                <Link to={route.get('store.issuance.create', { name: params.name })}><button type="button" className=" btn btn-success btn-sm"> Issuance Voucher</button></Link>
                            </Col>

                            <Col xs={6} className="d-flex justify-content-end">
                                <button type="button"><MdFilterAlt className="fs-4" /></button>

                            </Col>

                        </Row>
                    </Col>
                    <Row className="border-2 my-4">
                        <Col xs={12}>
                            <h2 className="fs-3 m-2 px-4"><b>{store.name} Summary </b></h2>
                        </Col>
                        <Col xs={12}>
                            <Row className="summary-bar">
                                <Col className="text-center">
                                    <h4 className="fs-2">{totalReceiver}</h4>
                                    <h4 className="mt-3">Total Receiver</h4>
                                </Col>
                                <Col className="text-center">
                                    <h4 className="fs-2">{totalIssuance}</h4>
                                    <h4 className="mt-3">Total Issuance</h4>
                                </Col>

                                <Col className="text-center">
                                    <h4 className="fs-2">{todayReceiver}</h4>
                                    <h4 className="mt-3">Today Receiver</h4>
                                </Col>
                                <Col className="text-center">
                                    <h4 className="fs-2">{todayIssuance}</h4>
                                    <h4 className="mt-3">Today Issuance</h4>
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

                                {
                                    isLoading ? <SkeletonTable columns={11}/> : 
                                    vouchers.length > 0 ? vouchers.map((voucher, index) => {

                                        return (
                                            <tr className="text-center" key={index}>

                                                <td><Form.Check type="checkbox" /></td>
                                                <td>{++index}</td>
                                                <td>{voucher.voucher_number}</td>
                                                <td>{voucher.invoice_id}</td>
                                                <td>{ (new Date(voucher.receiving_date)).toLocaleDateString() }</td>
                                                <td>{voucher.supplier.firm_name}</td>
                                                <td>{voucher.supplier.gst_number}</td>
                                                <td>{voucher.supplier.email}</td>
                                                <td>{voucher.supplier.number}</td>
                                                <td className="d-flex justify-content-evenly">
                                                    <Link to={route.get('store.voucher.view', {name: voucher.store.slug, id: voucher.id})}><button type="button" className="btn btn-primary btn-sm rounded shadow w-16">View</button></Link>
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
                                        )

                                    }) : <tr><td colSpan={11}><b className="m-2 p-2">Nothing to show</b></td></tr>
                                }





                            </tbody>
                        </table>

                    </Row>
                </Layout>
        }
        </>
    )
}




