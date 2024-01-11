import React from "react";
import Layout from "../../partials/Layout";
import { SkeletonTable } from "../../Skeletons";
import { Button, Col, Form, FormGroup, Modal, Row } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IRole, RoleData, RolesData } from "./interface";
import can from "../../utils/can";
import Swal, {SweetAlertResult} from "sweetalert2";
import Toast from "../../utils/Toast";



function Roles(): React.JSX.Element {
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [name,setName] = React.useState<string>('');
    const [roles, setRoles] = React.useState<IRole[]>([]);
    const [ editId, setEditId ] = React.useState<number>(0);
    const [ editName, setEditName ] = React.useState<string>("");
    const[showModal, setShowModal] = React.useState<boolean>(false);

    React.useEffect(() => {

        axios.get('user/roles').then(({data}:AxiosResponse<RolesData>) => {
            setRoles(data.data.roles);
            setLoading(false)
        });
    }, []);


    const _addRole: CallableFunction = (event: React.FormEvent<HTMLFormElement>):void => {
        event.preventDefault();
        
        axios.post('user/role', {
            name: name
        }).then(({data}: AxiosResponse<RoleData>) => {
            
            setName('');
            setRoles( prev => {
                return [...prev, ...[{ id: data.data.role.id, name: data.data.role.name, users_count: data.data.role.users_count}]];
            });
            Toast({
                text: `${name} role added successfully!`,
                timer: 2000
            }).fire();

        });
    } 

    const _apiHandleEdit = ( id: number ):void => {
        let role = roles.find( r => r.id == id );
        if( role?.name ){
            setEditId( id );
            setEditName( role?.name );
            setShowModal(true);
        }
    }

    const _apiHandleUpdate: CallableFunction = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        axios.put(`user/role/${editId}`, { name: editName }).then(({ data }: AxiosResponse<RoleData>) => {
            let role = data.data.role;

            setShowModal(false);

            setRoles(prev => {
                return prev.map(r => {
                    if (r.id === role.id) {
                        r.name = role.name;
                    }
                    return r;
                });
            });

            Toast({
                text: `${editName} updated to ${role.name} successfully!`,
                timer: 2000
            }).fire();
            // Reset editing 
            setEditId(0);
            setEditName("");

        });
    }

    const _apiHandleDelete = (id:number):void => {
        
        Swal.mixin({
            title: 'Are you sure? This action can\'t be back the data!',
            icon: 'warning',
            showCancelButton: true,
            showCloseButton: true,
            cancelButtonText: "No, Cancel",
            reverseButtons: true,
            customClass: {
                icon: ['text-danger', 'border-danger'],
                confirmButton: ['bg-danger'],
                actions: ['gap-4']
            }
        }).fire().then(({isConfirmed}:SweetAlertResult<boolean>) => {
            if( isConfirmed ){
                axios.delete(`/user/role/${id}`).then( ({data}:AxiosResponse<RoleData>) => {
                    Toast({
                        text: data.message
                    }).fire();
                    setRoles( prev => {
                        return prev.filter( r =>  r.id !== data.data.role.id );
                    })

                }).catch(({response}:AxiosError<RoleData>) => {
                    Toast({
                        text: response?.data.message,
                        icon: 'error',
                        type: 'error',
                        timer: 2000
                    }).fire();
                });
            }
        });
    } 


    return (
        <Layout title="Roles">

            <Row>
                <Col xs="8" className="border">
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Users</th>
                                <th style={{ width: "20%" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {isLoading ? <SkeletonTable columns={4} rows={5}/> : roles.map( (role, i) => {
                                return(
                                    <tr key={i}>
                                        <td><input type="checkbox" /></td>
                                        <td>{role.name}</td>
                                        <td>{role.users_count}</td>
                                        <td>
                                            <div className="d-flex justify-content-evenly">
                                                { can('edit_role') ? <Button variant="info" onClick={ () => _apiHandleEdit(role.id) }><MdEdit /></Button> : ''}
                                                {can('delete_role') && <Button variant="danger" onClick={() => _apiHandleDelete(role.id) }><MdDelete /></Button> }
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                            }

                        </tbody>
                    </table>
                </Col>
                <Col xs="4" className="align-items-center border d-flex">
                    <Form className="d-flex justify-content-center align-item-center p-3 w-100 flex-column" onSubmit={ (e:React.FormEvent<HTMLFormElement>)  => _addRole( e ) }>
                            <h3 className="h3 mb-3 border-bottom pb-2 text-center">Add Role</h3>
                            <FormGroup>
                                <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" value={name}  onChange={(e) => setName(e.currentTarget.value) }/>
                            </FormGroup>

                            <Button type="submit">Save</Button>
                    </Form>
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static">
                <Modal.Header closeButton={true}>
                    <Modal.Title>Update Role</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form className="d-flex justify-content-center align-item-center p-3 w-100 flex-column" onSubmit={(e: React.FormEvent<HTMLFormElement>) => _apiHandleUpdate(e)}>
                        <FormGroup>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" value={editName} onChange={(e) => setEditName(e.currentTarget.value)} />
                        </FormGroup>

                        <Button type="submit">Update</Button>
                    </Form>
                </Modal.Body>
            </Modal>                
        </Layout>
    )
}

export default Roles;