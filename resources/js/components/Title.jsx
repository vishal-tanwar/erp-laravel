import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BackButton = () => {

    const navigate = useNavigate();

    return(
        <Button variant="warning" onClick={() => navigate(-1)}><MdArrowBack /> Back</Button>
    )
}

export function H1({children, icon, className, title, showBackButton}){
    return(
        <Row className={`${className}`}>
            <Col xs={12} className="bg--white py-2 border-bottom-2 border-bottom d-flex justify-content-between ">
                <h1 className="text-3xl font-bold d-flex align-items-center text-slate-600">{icon ? icon : ''} <span className="ms-2">{title??children}</span></h1>

                {showBackButton == true ? <BackButton /> : '' }
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
