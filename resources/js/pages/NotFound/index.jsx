import React from "react";
import Layout from "../../partials/Layout";

import './style.scss';
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { route } from "../../utils/WebRoutes";


export default function NotFound() {
    return (
        <Layout hideBanner={true}>
            <div className="notfound">
                <div className="notfound-404">
                    <h3>Oops! Seems you are on wrong place</h3>
                    <h1><span>4</span><span>0</span><span>4</span></h1>
                </div>
                <h2>we are sorry, but the page you requested was not found</h2>

                <Row>
                    <Col sm={12}><Link className="btn text-sm btn-primary" to={route.get("dashbaord")} replace={true}>Go To Dashboard</Link></Col>
                </Row>
            </div>
        </Layout>
    )
}