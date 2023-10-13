import React, { useEffect, useState } from "react";

import "./style.scss";
import Layout from "../../partials/Layout";
import { Form, Col, InputGroup, Row, Dropdown, Modal, Button } from "react-bootstrap";
import { MdClose, MdOutlineSearch } from "react-icons/md";
import axios from "axios";
import ReactSelect from "react-select";

import { SkeletonPaginate, SkeletonTable } from "../../Skeletons";
import Swal from "sweetalert2";
import RecordsPerPage from "../../components/RecordsPerPage";
import { Paginate } from "../../components/Paginate";


export default function Location() {

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
    const [storeOptions, setStoreOptions] = useState([]);

    const [store, setStore] = useState('');
    const [locationName, setLocationName] = useState('');

    const [locations, setLocations] = useState([]);

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [isLoading, setLoading] = useState(true);
    const [isPaginateLoading, setPaginateLoading ] = useState(true);

    const [editId, setEditId] = useState(0);

    const [locationError, setLocationError] = useState(false);

    const [searchValue, setSearchValue ] = useState('');


    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(locations.map(li => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleClick = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        console.log(id, checked, isCheck);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };

    useEffect(() => {
        axios.get('stores').then(res => {
            const options = res.data.data.stores.map((store) => {
                return {
                    value: store.id,
                    label: store.name
                }
            })
            setStoreOptions(options);
        });

        axios.get('locations').then(res => {
            setLocations(res.data.data.locations);
            setLoading(false);
            setPaginateLoading(false)
        })
    }, []);



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = () => {

        if (!locationName) {
            setLocationError(true);
        }
        else {
            if (editId && editId > 0) {
                axios.put(`location/${editId}`, {
                    name: locationName,
                    store_id: store
                }).then(res => {

                    setLocations(prev => {
                        let searched = prev.find(location => location.id == editId);
                        searched["name"] = res.data.data.name;
                        searched["store"] = res.data.data.store;
                        return [...prev]
                    })

                    handleClose();
                });
            } else {
                axios.post('location', {
                    name: locationName,
                    store_id: store
                }).then(res => {
                    setLocations(prev => [...prev, res.data.data]);
                    handleClose();
                    setStore('');
                    setLocationName('');
                });
            }
        }

    }

    const handleRecordsPerPage = (record) => { 
        setPaginateLoading(true);
        setPerPage(record); 
        const queryParams = new URLSearchParams({
            page: 1,
            per_page: record,
        });
        axios.get(`locations?${queryParams.toString()}`).then(res => {
            const response = res.data;
            setLocations(response.data.locations);
            setPageCount(response.data.pages);
            setLoading(false);
            setPaginateLoading(false);
        })
    }

   
    const handlePaginateChange = (page) => {
        
        setCurrentPage(() => {
            return page;
        });

        const queryParams = new URLSearchParams({
            page: page,
            per_page: perPage,
        });
        axios.get(`locations?${queryParams.toString()}`).then(res => {
            const response = res.data;
            setLocations(response.data.locations);
            setPageCount(response.data.pages);
            setLoading(false);
        })
        
    }

    const handleSearch = () => {
        axios.get(`/locations/search/${searchValue}`).then(res => {
            const response = res.data;
            setLocations(response.data.locations);
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
        axios.get(`locations?${queryParams.toString()}`).then(res => {
            const response = res.data;
            setLocations(response.data.locations);
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
                    // page: currentPage,
                    // per_page: perPage,
                });
                axios.delete(`location/${id}?${queryParams.toString()}`).then(res => {
                    setLocations(res.data.data);
                });
            }
        })
    }

    const handleEdit = (id) => {

        setEditId(id);
        let searchedStore = locations.find(l => l.id == id);
        setStore(searchedStore.store.id);
        setLocationName(searchedStore.name);
        handleShow();

    }

    return (
        <Layout title="Store Location" hideBanner showBackButton={true}>
            <Row>
                <Col xs={6}>
                    <button type="button" className="btn btn-primary btn-sm bg-primary" onClick={handleShow}> Create Store Location</button>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="fs-2">Store Location</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pb-3">
                    <InputGroup className="my-2 w-100">
                        <ReactSelect
                            className="rounded-2 w-100"
                            options={storeOptions}
                            onChange={({ value }) => { setStore(value) }}
                            isClearable={false}
                            name="store_id"
                            value={storeOptions.filter(({ value }) => (value === store))}

                        />
                    </InputGroup>
                    <InputGroup className="my-2">

                        <Form.Control placeholder="Store Location" value={locationName} onChange={e => setLocationName(e.target.value)} />
                        <Form.Control.Feedback type="invalid" className={locationError && 'd-block'}>Location name is required!</Form.Control.Feedback>
                    </InputGroup>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="mt-4">
                <Row>
                    <Col xs={5}>
                        <div className="d-flex gap-3">
                        <RecordsPerPage currentRecords={perPage} setRecords={handleRecordsPerPage}/>
                            
                            {/* <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" className="btn-light border border-black shadow">
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
                                        <th scope="col"> <Form.Check type="checkbox" onChange={handleSelectAll} checked={isCheckAll} /></th>
                                        <th scope="col">Sr. No.</th>
                                        <th scope="col">Store Name</th>
                                        <th scope="col">Store Location</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {
                                        isLoading ? <SkeletonTable columns={5} /> :
                                            locations.map((location, index) => {
                                                return (
                                                    <tr className="text-center" key={index}>

                                                        <td>
                                                            <Form.Check type="checkbox"
                                                                id={location.id}
                                                                name={`location-${location.id}`}
                                                                onChange={handleClick}
                                                                checked={isCheck.includes(location.id) ? 'checked' : false} />
                                                        </td>
                                                        <td>{++index}</td>
                                                        <td>{location.store?.name}</td>
                                                        <td>{location.name}</td>
                                                        <td className="d-flex justify-content-evenly">
                                                            <button type="button" className="btn btn-success btn-sm rounded shadow w-16" onClick={() => handleEdit(location.id)}>Edit</button>
                                                            <button type="button" className="btn btn-danger btn-sm rounded shadow" onClick={() => handleDelete(location.id)}>Delete</button>
                                                        </td>

                                                    </tr>
                                                )
                                            })
                                    }

                                </tbody>
                            </table>
                            {isPaginateLoading ? <SkeletonPaginate /> : pageCount > 1 ? <Paginate onPageChange={handlePaginateChange} pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage}/> : '' }
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}