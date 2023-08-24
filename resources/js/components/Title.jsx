import React from "react";
import { Row, Col } from "react-bootstrap";


export function H1({children, icon, className}){
    // console.log(className);
    return(
        <Row className={className}>
            <Col xs={12} className="bg--white shadow-lg rounded-3 py-2 border-primary-subtle">
                <h1 className="text-3xl font-bold d-flex align-items-center text-slate-600">{icon? icon:''} {children}</h1>
            </Col>
        </Row>
    )
}

export function H2(props){
    return(
        <Row>
            <Col xs={12}>
                <h2 className="text-2xl font-bold ">{props.children}</h2>
            </Col>
        </Row>
    )
}
export function H3(props){
    return(
        <Row>
            <Col xs={12}>
                <h3 className={`text-1xl font-bold ${props.className}`}>{props.children}</h3>
            </Col>
        </Row>
    )
}
export function H4(props){
    return(
        <Row>
            <Col xs={12}>
                <h4 className="font-bold ">{props.children}</h4>
            </Col>
        </Row>
    )
}
