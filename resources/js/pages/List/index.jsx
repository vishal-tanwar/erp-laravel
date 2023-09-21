import React from "react";

import "./style.scss";
import Layout from "../../partials/Layout";
import { MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

export default function List(){
    return (
        <Layout hideBanner>
                 <button type="button" className="btn btn-primary btn-sm bg-primary"><Link to='/supplier/addSupplier'> Create Store</Link></button>
                 <div className="border-2 my-4">
                    <h2 className="fs-3 m-2"><b>Store Summary </b></h2>
                    {/* <div className="mx-4">
                        <h4 className="fs-2 my-2">21</h4>
                        <h4 className="my-3">Total Item</h4>
                    </div> */}

                    <Row>
                        <Col></Col>
                    </Row>
                 </div>
        </Layout>
    )
}