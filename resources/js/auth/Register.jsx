import React from "react";
import './styles/register.scss';
import Layout from "../partials/Layout";
import { Card, Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { MdAdd, MdAlternateEmail, MdCall, MdKey } from "react-icons/md";


const Register = () => {

    return (
        <Layout title="Create New User" icon={<MdAdd />}>
            <Container fluid={true}>
                <Row className="justify-content-center m-5">
                    <Col md={9} xs={12} >
                        <Form>
                            <Card className="shadow bg-white border-0">
                                <Card.Body className="px-4 py-4">
                                    <Row className="mb-4">
                                        <Col md='6'>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FaUserAlt />
                                                </InputGroup.Text>
                                                <Form.Control className='mb-0' placeholder='First Name' size="lg" />
                                            </InputGroup>
                                        </Col>

                                        <Col md='6'>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FaUserAlt />
                                                </InputGroup.Text>
                                                <Form.Control className='mb-0' placeholder='Last Name' size="lg" />
                                            </InputGroup>
                                        </Col>
                                    </Row>

                                    <Row className="mb-4">
                                        <Col md='6'>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <MdCall />
                                                </InputGroup.Text>
                                                <Form.Control className='mb-0' placeholder='Phone' size="lg" />
                                            </InputGroup>
                                        </Col>

                                        <Col md='6'>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <MdAlternateEmail />
                                                </InputGroup.Text>
                                                <Form.Control className='mb-0' placeholder='Email' size="lg" />
                                            </InputGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md='6'>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <MdKey />
                                                </InputGroup.Text>
                                                <Form.Control type="password" className='mb-0 bg-body border rounded-end' placeholder='Password' size="lg" />
                                            </InputGroup>
                                        </Col>

                                        <Col md='6'>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <MdKey />
                                                </InputGroup.Text>
                                                <Form.Control type="password" className='mb-0 bg-body border rounded-end' placeholder='Confirm Password' size="lg" />
                                            </InputGroup>
                                        </Col>
                                    </Row>

                                </Card.Body>
                                <Card.Footer className="py-4 bg-white">
                                    <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white h-25 py-1.5 px-5 text-uppercase rounded" type="button">
                                        Create
                                    </button>
                                </Card.Footer>
                            </Card>
                        </Form>
                    </Col>

                </Row>
            </Container>
        </Layout>
    )
}

export default Register;