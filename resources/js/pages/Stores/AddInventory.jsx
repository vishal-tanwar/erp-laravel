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

    const [stores, setStores] = useState([]);
    const [storeOptions, setStoreOptions] = useState([]);
    const [itemsOptions, setItemsOptions] = useState([]);
    const [locationsOptions, setLocationsOptions] = useState([]);

    const [store_id, setStoreId] = useState('');
    const [item_id, setItemId] = useState('');
    const [location_id, setLocationId] = useState('');
    const [availableStock, setAvailableStock ] = useState(0);
    const [newStock, setNewStock ] = useState(0);



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


    const handleSave = event => {
        event.preventDefault();

            const postData = {
                stocks: newStock, 
                availableStock,
                where: {
                    store_id,
                    item_id,
                    location_id,
                }
            }
            

        axios.post('inventory', postData).then(res => {

            setAvailableStock(res.data.data.stocks);
            setNewStock(0);

            Swal.fire({
                toast: true,
                title: "Success!",
                icon: 'success',
                text: res.data.message,
                position: 'top-right',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });

        });
    }

    const handleStoreChange = value => {

        if (value) {
            const searchedStore = stores.find(store => store.id == value);

            setStoreId(value);

            const itemsOpts = searchedStore.items.map((item) => {
                return {
                    value: item.id,
                    label: item.name
                }
            });

            const locationsOpts = searchedStore.locations.map((location) => {
                return {
                    value: location.id,
                    label: location.name
                }
            });

            setItemsOptions(itemsOpts);
            setLocationsOptions(locationsOpts);
        } else {
            setItemsOptions([]);
            setLocationsOptions([]);
            setStoreId('');
        }
    }


    const handleItemChange = value => {
        setItemId(value);
    }

    const handleLocationChange = value => {

        setLocationId(value);

        const queryParams = new URLSearchParams([
            ["where[store_id]", store_id],
            ["where[item_id]", item_id],
            ["where[location_id]", value],
        ]);

        axios.get(`inventory?${queryParams.toString()}`).then(res => {
            if( res.data.success ){
                setAvailableStock( res.data.data.stocks );
            }
            else{
                setAvailableStock(0);
            }
        })
    }

    return (
        <Layout title="Update Inventory" hideBanner showBackButton>
            <Form onSubmit={e => { handleSave(e) }} className="px-4">
                <Row className="mb-8">
                    <Col xs={6}>
                        <Form.Group >
                            <Form.Label htmlFor="part-name"><b>Store</b></Form.Label>
                            <ReactSelect placeholder="Select Store..." options={storeOptions} onChange={e => handleStoreChange(e?.value)} isClearable />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group >
                            <Form.Label htmlFor="part-number"><b>Item</b></Form.Label>
                            <ReactSelect placeholder="Select Item..." options={itemsOptions} value={itemsOptions.filter(({ value }) => (value === item_id))} onChange={e => handleItemChange(e.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-8">
                    <Col xs={6}>
                        <Form.Group >
                            <Form.Label htmlFor="part-number"><b>Location</b></Form.Label>
                            <ReactSelect placeholder="Select Location..." options={locationsOptions} value={locationsOptions.filter(({ value }) => (value === location_id))} onChange={e => handleLocationChange(e.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <InputGroup>
                            <Form.Group className="col">
                                <Form.Label><b>Available Stock</b></Form.Label>
                                <Form.Control
                                    className="bg-transparent rounded-end-0"
                                    placeholder="Available Stock"
                                    value={availableStock} disabled
                                />
                            </Form.Group>
                            <Form.Group className="col">
                                <Form.Label><b>New Stock</b></Form.Label>
                                <Form.Control
                                    className="bg-transparent rounded-start-0"
                                    placeholder="New Stock"
                                    value={newStock} onChange={e => { 
                                        console.log(e.target.value)
                                        setNewStock(e.target.value)
                                    } }
                                    onKeyDown={(event) => {


                                        let allowedKeys = [
                                            "Backspace",
                                            "Delete",
                                            "ArrowLeft",
                                            "ArrowRight",
                                        ]

                                        if( !allowedKeys.includes(event.key) ){
                                            if (!/[0-9]/.test(event.key)  ) event.preventDefault();
                                        }
                                        
                                        
                                        if( event.key === "ArrowUp" ){
                                            setNewStock( prev => +prev + 1 )
                                        }
                                        
                                        if( event.key === "ArrowDown" ){
                                            setNewStock( prev => { 
                                                if( prev > 0 ){
                                                    return prev - 1
                                                } else{
                                                  return prev;  
                                                }
                                            } )
                                        }
                                    }}
                                />
                            </Form.Group>
                        </InputGroup>
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