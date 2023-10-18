import React, { useEffect, useState } from "react";

import "./style.scss";
import Layout from "../../partials/Layout";
import { Form, Col, Row, Dropdown, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { route } from "../../utils/WebRoutes";
import axios from "axios";
import { SkeletonPaginate, SkeletonSummary, SkeletonTable } from "../../Skeletons";
import { Paginate } from "../../components/Paginate";
import RecordsPerPage from "../../components/RecordsPerPage";
import ReactSelect from "react-select";


export default function Inventory() {


    const [isLoading, setLoading] = useState(true);
    const [summaryLoading, setSummaryLoading] = useState(true);
    const [isPaginateLoading, setPaginateLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [perPage, setPerPage] = useState(10);


    const [inventories, setInventories] = useState([]);
    const [outOfStocks, setOutOfStocks] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [newStock, setNewStock] = useState(0);

    const [storeOptions, setStoreOptions] = useState([]);

    const [updatingStock, setUpdatingStock] = useState([]);


    const updateSummary = () => {
        setSummaryLoading(true);
        axios.get('all-inventories').then(res => {
            setTotalItems(res.data.data.count);
            const outOfStocksCount = res.data.data.all.filter(invt => invt.stocks <= 0).length;
            setOutOfStocks(outOfStocksCount);
            setSummaryLoading(false);
        })
    }


    useEffect(() => {

        updateSummary();

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

        axios.get('stores').then(res => {
            const storeOpts = res.data.data.stores.map(store => ({
                value: store.id,
                label: store.name
            }))
            setStoreOptions(storeOpts);
        });
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
            per_page: record,
        });
        axios.get(`inventories?${queryParams.toString()}`).then(res => {
            const response = res.data;
            setInventories(response.data.inventories);
            setPageCount(response.data.pages);
            setLoading(false);
            setPaginateLoading(false);
        })
    }

    const handleStoreFilter = selected => {
        let queryParams;
        setPaginateLoading(true);
        setLoading(true);
        if (selected) {
            queryParams = new URLSearchParams({
                page: currentPage,
                per_page: perPage,
                "where[store_id]": selected.value
            });


        } else {
            queryParams = new URLSearchParams({
                page: currentPage,
                per_page: perPage,
            });
        }

        axios.get(`inventories?${queryParams.toString()}`).then(res => {
            const response = res.data;
            setInventories(response.data.inventories);
            setPageCount(response.data.pages);
            setLoading(false);
            setPaginateLoading(false);
        })
    }

    const handleUpdateStock = inventory => {
        setLoading(true);
        setPaginateLoading(true);
        axios.put(`inventory/${inventory}`, {
            page: currentPage,
            per_page: perPage,
            stocks: newStock
        }).then(res => {
            const response = res.data;
            setInventories(response.data.inventories);
            setPageCount(response.data.pages);
            setLoading(false);
            setPaginateLoading(false);
        })

        setUpdatingStock(prev => {
            let indexed = prev.indexOf(inventory);
            prev.splice(indexed,1);
            return prev;
        });
        
    }

    return (
        <Layout title="Inventory" hideBanner>
            <Link className="btn btn-primary" to={route.get('store.inventory.add')}> Add Inventory</Link>
            {
                summaryLoading ? <SkeletonSummary columns={2} /> :

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
            }
            <div>
                <Row>
                    <Col xs={5}>
                        <div className="d-flex gap-3">
                            <RecordsPerPage currentRecords={perPage} setRecords={handleRecordsPerPage} />

                        </div>
                    </Col>
                    <Col xs={7} className="d-flex justify-content-end">
                        <ReactSelect className="w-50" options={storeOptions} isClearable onChange={e => handleStoreFilter(e)} />
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
                                        <th scope="col">Voucher</th>
                                        <th scope="col">Item</th>
                                        <th scope="col">Store</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Update Stock</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">

                                    {
                                        isLoading ? <SkeletonTable columns={8} /> :
                                            inventories.length > 0 ? inventories.map((inventory, index) => {
                                                return (
                                                    <tr className="text-center" key={index}>
                                                        <td>
                                                            <Form.Check type="checkbox" value={inventory.id} />
                                                        </td>
                                                        <td>{++index}</td>
                                                        <td>{inventory.voucher.voucher_number}</td>
                                                        <td>{inventory.item.name}</td>
                                                        <td>{inventory.store.name}</td>
                                                        <td>{inventory.location.name}</td>
                                                        <td>{inventory.stocks}</td>
                                                        <td width="12%">
                                                            {   
                                                                updatingStock.includes(inventory.id) ?
                                                                    <InputGroup>

                                                                        <Form.Control
                                                                            className="bg-transparent mb-0"
                                                                            placeholder="New Stock"
                                                                            value={newStock} onChange={e => {
                                                                                console.log(e.target.value)
                                                                                setNewStock(e.target.value)
                                                                            }}
                                                                            onKeyDown={(event) => {


                                                                                let allowedKeys = [
                                                                                    "Backspace",
                                                                                    "Delete",
                                                                                    "ArrowLeft",
                                                                                    "ArrowRight",
                                                                                ]

                                                                                if (!allowedKeys.includes(event.key)) {
                                                                                    if (!/[0-9]/.test(event.key)) event.preventDefault();
                                                                                }


                                                                                if (event.key === "ArrowUp") {
                                                                                    setNewStock(prev => +prev + 1)
                                                                                }

                                                                                if (event.key === "ArrowDown") {
                                                                                    setNewStock(prev => {
                                                                                        if (prev > 0) {
                                                                                            return prev - 1
                                                                                        } else {
                                                                                            return prev;
                                                                                        }
                                                                                    })
                                                                                }
                                                                            }}
                                                                        />
                                                                        <Button onClick={() => handleUpdateStock(inventory.id)}>Ok</Button>
                                                                    </InputGroup>
                                                                    :
                                                                    <Button onClick={() => setUpdatingStock(prev => [...prev, inventory.id ])} >Edit</Button>
                                                            }

                                                        </td>

                                                    </tr>
                                                );
                                            }) :
                                                <tr><td colSpan={8}><strong className="my-2 fs-4">Nothing to Show</strong></td></tr>
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
