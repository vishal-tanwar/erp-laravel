import React, { useEffect, useState } from "react";

import "./style.scss";
import Layout from "../../partials/Layout";
import { Form, Col, Row, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { route } from "../../utils/WebRoutes";
import axios from "axios";
import { SkeletonPaginate, SkeletonTable } from "../../Skeletons";
import { Paginate } from "../../components/Paginate";
import RecordsPerPage from "../../components/RecordsPerPage";


export default function Inventory() {

    
    const [isLoading, setLoading ] = useState(true);
    const [isPaginateLoading, setPaginateLoading ] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [perPage, setPerPage] = useState(10);


    const [inventories, setInventories] = useState([]);
    const [outOfStocks, setOutOfStocks ] = useState(0); 
    const [totalItems, setTotalItems ] = useState(0); 




    useEffect(() => {
        const queryParams = new URLSearchParams({
            page: currentPage,
            per_page: perPage,
        });
        axios.get(`inventories?${queryParams.toString()}`).then(res => {
            const response = res.data;
            setInventories(response.data.inventories);
            setPageCount(response.data.pages);
            setLoading(false);
            setPaginateLoading(false);            
        })


        axios.get('all-inventories').then( res => {
            setTotalItems( res.data.data.count );
            const outOfStocksCount = res.data.data.all.filter(invt => invt <= 0).length;
            setOutOfStocks(outOfStocksCount);
        })
    }, []);


    const handlePaginateChange = (page) => {
        setCurrentPage(page);
        const queryParams = new URLSearchParams({
            page: page,
            per_page: perPage,
        });
        axios.get(`inventories?${queryParams.toString()}`).then(res => {
            const response = res.data;
            setInventories(response.data.inventories);
            setPageCount(response.data.pages);
            setLoading(false);
        })

    }

    const handleRecordsPerPage = (record) => {
        setPaginateLoading(true);
        setPerPage(record);
        const queryParams = new URLSearchParams({
            page: currentPage,
            per_page: perPage,
        });
        axios.get(`inventories?${queryParams.toString()}`).then(res => {
            const response = res.data;
            setInventories(response.data.inventories);
            setPageCount(response.data.pages);
            setLoading(false);
            setPaginateLoading(false);
        })
    }

    return (
        <Layout title="Inventory" hideBanner>
            <Link className="btn btn-primary" to={route.get('store.inventory.add')}> Add Inventory</Link>

            <Row className="border-2 my-4">
                <Col xs={12}>
                    <h2 className="fs-3 m-2 px-4"><b>Inventory Summary </b></h2>
                </Col>
                <Col xs={12}>
                    <Row className="summary-bar">
                        <Col className="text-center">
                            <h4 className="fs-2">{totalItems}</h4>
                            <h4 className="mt-3">Total Item</h4>
                        </Col>

                        <Col className="text-center red">
                            <h4 className="fs-2">{outOfStocks}</h4>
                            <h4 className="mt-3">Out of Stock</h4>
                        </Col>
                    </Row>
                </Col>

            </Row>
            <div>
                <Row>
                    <Col xs={5}>
                        <div className="d-flex gap-3">
                            <RecordsPerPage currentRecords={perPage} setRecords={handleRecordsPerPage} />

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
                                        <th scope="col">Item</th>
                                        <th scope="col">Store</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Stock</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">

                                    {
                                        isLoading ? <SkeletonTable columns={5}/> :
                                            inventories.map((inventory, index) => {
                                            return (
                                                <tr className="text-center" key={index}>
                                                    <td>
                                                        <Form.Check type="checkbox" value={inventory.id} />
                                                    </td>
                                                    <td>{++index}</td>
                                                    <td>{inventory.item.name}</td>
                                                    <td>{inventory.store.name}</td>
                                                    <td>{inventory.location.name}</td>
                                                    <td>{inventory.stocks}</td>

                                                </tr>
                                            );
                                        })
                                    }

                                </tbody>

                            </table>
                            {isPaginateLoading ? <SkeletonPaginate /> : pageCount > 1 ? <Paginate onPageChange={handlePaginateChange} pageCount={pageCount} currentPage={currentPage} /> : ''}
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}
