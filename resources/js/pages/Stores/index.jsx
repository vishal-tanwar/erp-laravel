import React, { useEffect, useState } from "react";

import "./style.scss";
import Layout from "../../partials/Layout";
import { Form, Col, InputGroup, Row, Dropdown, Modal, Button } from "react-bootstrap";
import { MdClose, MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { route } from "../../utils/WebRoutes";
import axios from "axios";
import { SkeletonPaginate, SkeletonTable } from "../../Skeletons";
import { Paginate } from "../../components/Paginate";
import RecordsPerPage from "../../components/RecordsPerPage";
import Swal from "sweetalert2";


export default function Stores() {

    const styles = {
        searchSpan: {
            position: "absolute",
            top: "50%",
            right: "50px",
            zIndex: 9,
            transform: "translateY(-50%)",
            cursor: "pointer",
        }
    }

    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [nameError, setNameError ] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const handleClose = () =>  { 
        setEditId(0); 
        setName('');
        setShow(false); 
    };
    const handleShow = () => setShow(true);


    const [stores, setStores] = useState([]);

    const [isLoading, setLoading ] = useState(true);
    const [isPaginateLoading, setPaginateLoading ] = useState(true);

    const [searchValue, setSearchValue ] = useState('');

    const [editId, setEditId] = useState(0);


    const handleSave = () => {

        if (!name){
            setNameError(true)
        } else{

            if (editId && editId > 0){
                axios.put(`store/${editId}`, { name }).then(res => {

                    setStores(prev => { 
                        let searched = prev.find(store => store.id == editId);
                        searched["name"] = res.data.data.name;
                        searched["slug"] = res.data.data.slug;
                        return [...prev] 
                    })

                    handleClose();
                });
            }
            else{
                axios.post('store', { name }).then(res => {

                    setStores(prev => [...prev, res.data.data])

                    handleClose();
                });
            }
        }

    }


    useEffect(() => {
        const queryParams = new URLSearchParams({
            page: currentPage,
            per_page: perPage,
        });
        axios.get(`stores?${queryParams.toString()}`).then(res => {
            const response = res.data;
            setStores(response.data.stores);
            setPageCount(response.data.pages);
            setLoading( false );
            setPaginateLoading( false );
        })
    }, []);


    const handlePaginateChange = (page) => {
        setCurrentPage(page);
        const queryParams = new URLSearchParams({
            page: page,
            per_page: perPage,
        });
        axios.get(`stores?${queryParams.toString()}`).then(res => {
            const response = res.data;
            setStores(response.data.stores);
            setPageCount(response.data.pages);
            setLoading(false);
        })
        
    }

    const handleRecordsPerPage = (record) => { 
        console.log('');
        setPaginateLoading(true);
        setPerPage(record); 
        const queryParams = new URLSearchParams({
            page: currentPage,
            per_page: record,
        });
        axios.get(`stores?${queryParams.toString()}`).then(res => {
            const response = res.data;
            setStores(response.data.stores);
            setPageCount(response.data.pages);
            setLoading(false);
            setPaginateLoading(false);
        })
    }

    const handleDelete = (id) => {

        Swal.fire({
            title: "Do you want to Delate?",
            icon: 'question',
            showCloseButton: false,
            showCancelButton: true,
            confirmButtonText: "Sure",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
        }).then(res => {
            if (res.isConfirmed) {
                const queryParams = new URLSearchParams({
                    page: currentPage,
                    per_page: perPage,
                });
                axios.delete(`store/${id}?${queryParams.toString()}`).then(res => {
                    setStores(res.data.data);
                });
            }
        })
    }

    const handleSearch = () => {
        axios.get(`stores/search/${searchValue}`).then(res => {
            const response = res.data;
            setStores(response.data.stores);
            setPageCount(response.data.pages);
            setLoading(false);
            setPaginateLoading(false);
        })
    }

    const handleClearSearch = () => {
        setLoading(true);
        setPaginateLoading(true);
        setSearchValue('');
        const queryParams = new URLSearchParams({
            page: currentPage,
            per_page: perPage,
        });
        axios.get(`stores?${queryParams.toString()}`).then(res => {
            const response = res.data;
            setStores(response.data.stores);
            setPageCount(response.data.pages);
            setLoading(false);
            setPaginateLoading(false);
        })
    }


    const handleEdit = ( id ) => {

        setEditId( id );
        let searchedStore = stores.find( store => store.id == id );
        setName( searchedStore.name );
        handleShow();

    }

    return (
        <Layout title="Store List" hideBanner>
            <button type="button" className="btn btn-primary btn-sm bg-primary" onClick={handleShow}> Create Store</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="fs-2">{editId > 0 ? "Edit Store Name" : "Add Store Name"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pb-3">
                    <InputGroup className="my-2">
                        <Form.Control placeholder="Store Name" value={name} onChange={e => { setNameError(false); setName(e.target.value) }} />
                        <Form.Control.Feedback type="invalid" className={nameError&&'d-block'}>Store name is required!</Form.Control.Feedback>

                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        {editId > 0 ? "Update Changes" : "Save Changes"}
                    </Button>
                </Modal.Footer>
            </Modal>
           


            <Row className="border-2 my-4">
                <Col xs={12}>
                    <h2 className="fs-3 m-2 px-4"><b>Store Summary </b></h2>
                </Col>
                {/* <Col xs={12}>
                    <Row className="summary-bar">
                        <Col xs={3} className="text-center">
                            <h4 className="fs-2">21</h4>
                            <h4 className="mt-3">Total Item</h4>
                        </Col>
                        <Col xs={3} className="text-center green">
                            <h4 className="fs-2">13</h4>
                            <h4 className="mt-3">Available Stock</h4>
                        </Col>
                        <Col xs={3} className="text-center">
                            <h4 className="fs-2">1</h4>
                            <h4 className="mt-3">About to Stock out</h4>
                        </Col>
                        <Col xs={3} className="text-center red">
                            <h4 className="fs-2">11</h4>
                            <h4 className="mt-3">Out of Stock</h4>
                        </Col>
                    </Row>
                </Col> */}

            </Row>
            <div>
                <Row>
                    <Col xs={5}>
                        <div className="d-flex gap-3">
                            <RecordsPerPage currentRecords={perPage} setRecords={handleRecordsPerPage}/>
                            
                            {/* <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                    Bulk Action
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="bg-dark-subtle">
                                    <Dropdown.Item >Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
                        </div>
                    </Col>
                    <Col xs={7}>
                        <Form className="w-64 ms-auto" onSubmit={e => { e.preventDefault(); handleSearch()}}>
                            <InputGroup>
                                <Form.Control className="m-0" type="search" placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)  }></Form.Control>
                                {searchValue.length > 0 ? <span style={styles.searchSpan} onClick={ handleClearSearch}><MdClose /></span> : ''}
                                <Button type="button" onClick={handleSearch}><MdOutlineSearch className="fs-4" /></Button>
                            </InputGroup>
                        </Form>
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
                                        <th scope="col">Store Name</th>
                                        <th scope="col">Total Item</th>
                                        <th scope="col">Action</th>
                                        <th scope="col">Go to Store</th>
                                    </tr>
                                </thead>
                                
                                <tbody className="text-center">

                                    
                                    

                                    {
                                        isLoading ? <SkeletonTable columns={6} /> :
                                        stores.length > 0 ? stores.map((store, index) => {
                                            return (
                                                <tr className="text-center" key={index}>
                                                    <td>
                                                        <Form.Check type="checkbox" value={store.id} />
                                                    </td>
                                                    <td>{++index}</td>
                                                    <td>{store.name}</td>
                                                    <td>{store.items.length}</td>
                                                    <td className="d-flex justify-content-evenly">
                                                        <button type="button" className="btn btn-success btn-sm rounded shadow w-16" onClick={() => handleEdit(store.id) }>Edit</button>
                                                        <button type="button" className="btn btn-danger btn-sm rounded shadow" onClick={() => handleDelete(store.id)}>Delete</button>
                                                    </td>
                                                    <td>
                                                        <Link type="button" to={route.get('store.vouchers', { name: store.slug })} className="btn btn-primary btn-sm rounded shadow ">Go to Store</Link>
                                                    </td>

                                                </tr>
                                            );
                                        }) : <tr><td colSpan={6}><strong className="my-2 p-2">Nothing to Show</strong></td></tr>
                                    }

                                </tbody>
                            </table>
                            {isPaginateLoading ? <SkeletonPaginate /> : pageCount > 1 ? <Paginate onPageChange={handlePaginateChange} pageCount={pageCount} currentPage={currentPage} /> : '' }
                            
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}
