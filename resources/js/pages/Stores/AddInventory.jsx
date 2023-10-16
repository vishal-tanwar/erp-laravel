import React, { useState, useEffect, useReducer } from "react";
import "./style.scss";
import Layout from "../../partials/Layout";
import { Form, Col, Row, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { route } from "../../utils/WebRoutes";
import Swal from "sweetalert2";
import ReactSelect from "react-select";


export default function AddInventory() {

    const navigate = useNavigate();
    
    const [store_id, setStore] = useState('')
    const [stores, setStores] = useState([]);
    const [storeOptions, setStoreOptions] = useState([]);
    const [itemsOptions, setItemsOptions] = useState([]);



    useEffect(() => {
        
        axios.get('stores').then(res => {

            const response = res.data;
            setStores(response.data.stores);
            const storeOpts = response.data.stores.map((store) => {
                return {
                    value: store.id,
                    label: store.name
                }
            })
            setStoreOptions(storeOpts);
        });
    }, []);


    const handleAdd = event => {
        event.preventDefault();
        

        // axios.post('item', postData).then(res => {
        //     Swal.fire({
        //         toast: true,
        //         title: "Success!",
        //         icon: 'success',
        //         text: res.data.message,
        //         position: 'top-right',
        //         showConfirmButton: false,
        //         timer: 1500,
        //         timerProgressBar: true,
        //     });
            
        // });
    }

    const handleItemsChange = value => {
        const searchedStore = stores.find( store => store.id == value );

        setStore( value );

        const itemsOpts = searchedStore.items.map((item) => {
            return {
                value: item.id,
                label: item.name
            }
        });

        setItemsOptions(itemsOpts);
    }

    return (
        <Layout title="Update Inventory" hideBanner>
            <Form onSubmit={e => { handleAdd(e) }} className="px-4">
                <Row className="mb-8">
                    <Col xs={6}>
                        <Form.Group >
                            <Form.Label htmlFor="part-name"><b>Store</b></Form.Label>
                            <ReactSelect options={storeOptions} onChange={ e =>  handleItemsChange(e.value) }/>
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group >
                            <Form.Label htmlFor="part-number"><b>Item</b></Form.Label>
                            <ReactSelect options={itemsOptions} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-8">
                    <Col xs={6}>
                    <Form.Group>
                            <Form.Label><b>Available Stock</b></Form.Label>
                            <Form.Control
                                className="rounded-2 border-black"
                                placeholder="Available Stock"
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label><b>New Stock</b></Form.Label>
                            <Form.Control
                                className="rounded-2 border-black"
                                placeholder="New Stock"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-8">
                    <Col xs={12} className="text-right">
                        <button className="btn btn-primary btn-lg mt-5" >Save</button>
                    </Col>
                </Row>
            </Form>
        </Layout>
    )
}