import React, { useEffect, useState }  from "react";
import "./style.scss";
import Layout from "../../partials/Layout";
import { Form, Col, InputGroup, Row, Dropdown, Modal, Button } from "react-bootstrap";
import { MdOutlineSearch } from "react-icons/md";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { SkeletonTable } from "../../Skeletons";



export default function Units(){

    const [isLoading, setLoading ] = useState(true);
    const [isPaginateLoading, setPaginateLoading ] = useState(true);

    const [show, setShow] = useState(false);

    const [unitName, setUnitName ] = useState('');
    const [units, setUnits] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddUnit = () => {
        if( unitName !== '' ){
            axios.post('unit', {
                name: unitName
            }).then( res => {
                setUnits(prevState => [...prevState, res.data.data] );
                handleClose();
            });
        }
    }

    const handleDelete = ( id ) => {
        axios.delete(`unit/${id}`).then( res => {
            setUnits(res.data.data);
            
        });
    }


    useEffect( () => {
        axios.get('/units')
        .then( res => {
            const response = res.data;
            setUnits( response.data.units );
            setLoading(false);
        });
    }, []);

    return(
        <Layout title="Units" hideBanner>
             <button type="button" className="btn btn-primary btn-sm bg-primary" onClick={handleShow} > Add Units</button>

             <Modal show={show} onHide={handleClose}>
                <Modal.Body className="pb-3">
                    <h2 className="fs-4">Unit Name</h2>
                    <InputGroup className="my-2">
                        <Form.Control 
                            placeholder="Unit Name" value={unitName} onInput={ e => setUnitName( e.target.value ) }/>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddUnit}>
                        Add Unit
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="my-3">
                <Row>
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
                                <Form.Control className="m-0" type="text" placeholder="Search..."></Form.Control>
                                <InputGroup.Text><MdOutlineSearch className="fs-4" /></InputGroup.Text>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col xs={12}>
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr className="rm-list-thM1">
                                    </tr>
                                    <tr className="text-center">
                                        <th scope="col"> <Form.Check type="checkbox" /></th>
                                        <th scope="col">Sr. No. </th>
                                        <th scope="col">Unit Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {
                                        isLoading ? <SkeletonTable columns={4}/> :
                                        units.map((unit, i) => {
                                            return(
                                                <tr className="text-center" key={i}>
                                                    <td>
                                                        <Form.Check type="checkbox" value={unit.id} />
                                                    </td>
                                                    <td>{++i}</td>
                                                    <td>{unit.name}</td>

                                                    <td className="d-flex justify-content-evenly">
                                                        <button type="button" data-id={unit.id} className="btn btn-success btn-sm rounded shadow w-25">Edit</button>
                                                        <button type="button" className="btn btn-danger btn-sm rounded shadow w-25" onClick={() => handleDelete(unit.id) }>Delete</button>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}