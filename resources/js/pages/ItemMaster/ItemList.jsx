import React, { useEffect, useState } from "react";
import "./style.scss";
import Layout from "../../partials/Layout";
import { Form, Col, Row, Dropdown} from "react-bootstrap";
import { MdFilterListAlt,  } from "react-icons/md";
import { Link } from "react-router-dom";
import { route } from "../../utils/WebRoutes";
import DropdownFilter from "../../components/DropdownFilter";

export default function ItemList() {

    const [items, setItems] = useState([]);

    const formatSizes = ( size ) => {
        if (JSON.parse(size) instanceof Object ){
            return Object.values( JSON.parse( size ) ).join('x');
        }
        else{
            return size;
        }
    }

    

    useEffect( () => {
        axios.get('items').then( res => {
            setItems( res.data.data.items );
        })
    }, []);

    return (
        <Layout title="Item List" hideBanner>
            <Row>
                <Col xs={6}>
                    <Link className="btn btn-primary btn-sm bg-primary" to={route.get('item_master.add_item')}> Add Item</Link>
                </Col>
                <Col xs={6} className="d-flex justify-content-end">
                    <DropdownFilter align="right"/>
                    
                </Col>
            </Row>

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
                                    <tr className="rm-list-thM1">
                                    </tr>
                                    <tr className="text-center">
                                        <th scope="col"> <Form.Check type="checkbox" /></th>
                                        <th scope="col">Sr. No. </th>
                                        <th scope="col">Item Name</th>
                                        <th scope="col">Store Name</th>
                                        <th scope="col">Item Part</th>
                                        <th scope="col">Item Grade</th>
                                        <th scope="col">Item Size</th>
                                        <th scope="col">Available Stock</th>
                                        <th scope="col">Total Item</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {
                                        items.map( (item, index) => {
                                            return (
                                                <tr className="text-center" key={++index}>
                                                    <td>
                                                        <Form.Check type="checkbox" />
                                                    </td>
                                                    <td>{index}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.store.name}</td>
                                                    <td>{item.part}</td>
                                                    <td>{item.grade}</td>
                                                    <td>{formatSizes( item.size )  }</td>
                                                    <td>Ava. Stock</td>
                                                    <td>Total Item</td>
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

