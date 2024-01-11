import React, { SetStateAction } from "react";
import Layout from "../../partials/Layout";
import { FaUsers } from "react-icons/fa";
import axios, { AxiosError, AxiosResponse } from "axios";
import { SkeletonTable } from "../../Skeletons";
import { Button, Col, Form, FormGroup, Modal, Row } from "react-bootstrap";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import ReactSelect, { SingleValue } from "react-select";
import FloatingLabel, { FloatingLabelMessageProps } from "../../components/FloatingLabel";
import { IRole, IUserRegisterErrors, IUserResponse, Iusers, RoleOptions, RolesData } from "./interface";


function Users(): React.JSX.Element {

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [users, setUsers] = React.useState<Iusers[]>([]);
    const [isLoading, setLoading] = React.useState<boolean>(true);

    const [roleOptions, setRoleOptions] = React.useState<RoleOptions[]>([]);

    // Form data
    const [username, setUsername] = React.useState<string>('');
    const [usernameError, setUsernameError] = React.useState<FloatingLabelMessageProps>({
        text: "",
        type: "error",
        show: false
    });

    const [firstname, setFirstname] = React.useState<string>("");
    const [firstnameError, setFirstnameError] = React.useState<FloatingLabelMessageProps>({
        text: "",
        type: "error",
        show: false
    });
    const [lastname, setLastname] = React.useState<string>("");
    const [lastnameError, setLastnameError] = React.useState<FloatingLabelMessageProps>({
        text: "",
        type: "error",
        show: false
    });

    const [email, setEmail] = React.useState<string>("");
    const [emailError, setEmailError] = React.useState<FloatingLabelMessageProps>({
        text: "",
        type: "error",
        show: false
    });

    const [phone, setPhone] = React.useState<number>();
    const [phoneError, setPhoneError] = React.useState<FloatingLabelMessageProps>({
        text: "",
        type: "error",
        show: false
    });

    const [password, setPassword] = React.useState<string>("");
    const [passwordError, setPasswordError] = React.useState<FloatingLabelMessageProps>({
        text: "",
        type: "error",
        show: false
    });

    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const [confirmPasswordError, setConfirmPasswordError] = React.useState<FloatingLabelMessageProps>({
        text: "",
        type: "error",
        show: false
    });

    const [role_id, setRoleId] = React.useState<number>();
    const [roleError, setRoleError] = React.useState<FloatingLabelMessageProps>({
        text: "",
        type: "error",
        show: false
    });

    React.useEffect(() => {
        axios.get('users').then(({ data }) => {
            setUsers(data.data.users);
            setLoading(false);
        });

        axios.get('user/roles').then(({ data }: AxiosResponse<RolesData>) => {
            setRoleOptions(data.data.roles.map((role: IRole) => ({ label: role.name, value: role.id })));
        });
    }, []);



    const _apiHandleSave: CallableFunction = (): void => {
        const apiUserData: {
            username: string,
            firstname: string,
            lastname: string,
            email: string,
            phone: number|undefined,
            password: string,
            password_confirmation: string,
            role_id?: number
        } = {
            username,
            firstname,
            lastname,
            email,
            password,
            password_confirmation: confirmPassword,
            role_id,
            phone
        }
        axios.post('register', apiUserData).then(({}:AxiosResponse<IUserResponse<string,any[]>>) => {
            setLoading(true);
            axios.get('users').then(({ data }) => {
                setUsers(data.data.users);
                setLoading(false);
                setShowModal(false);

                setUsername("")
                setFirstname("")
                setLastname("")
                setEmail("")
                setPhone(undefined)
                setPassword("")
                setConfirmPassword("")
                setRoleId(undefined)

            });

        }).catch(({ response }: AxiosError<IUserResponse<IUserRegisterErrors, string[]>>) => {
            for ( let key in response?.data.message ){
                switch( key ){
                    case 'firstname':
                        setApiError( setFirstnameError, response?.data.message[key]);
                        break;
                    case 'lastname':
                        setApiError( setLastnameError, response?.data.message[key]);
                        break;
                    case 'email':
                        setApiError( setEmailError, response?.data.message[key]);
                        break;
                    case 'phone':
                        setApiError( setPhoneError, response?.data.message[key]);
                        break;
                    case 'username':
                        setApiError( setUsernameError, response?.data.message[key]);
                        break;
                    case 'password':
                        setApiError( setPasswordError, response?.data.message[key]);
                        break;
                    case 'role_id':
                        setApiError( setRoleError, response?.data.message[key]);
                        break;
                }
            }
        });
    }

    const setApiError = (setError:React.Dispatch<SetStateAction<FloatingLabelMessageProps>>, errors: string[] ):void => {
        setError({
            text: errors.map( v => <p key={v}>{v}</p>),
            type: 'error',
            show: true
        })
    }


    const isValidUsername = (e: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>): void => {
        if ((/^(?!\.|[0-9])[\w +\.]{5,18}$/gm).exec(e.currentTarget.value) == null || e.currentTarget.value.endsWith('.')) {
            setUsernameError(prev => {
                prev.show = true;
                prev.type = 'error';
                prev.text = "Username is Invalid!";
                return prev;
            });
        }
        else {
            axios.get(`user/username_exists/${e.currentTarget.value}`).then(({ data }) => {
                let __default: FloatingLabelMessageProps = {
                    text: '',
                    type: 'error',
                    show: true
                }

                if (data.success == true) {
                    Object.assign<FloatingLabelMessageProps, FloatingLabelMessageProps>(
                        __default,
                        {
                            text: data.message
                        }
                    );
                } else {
                    Object.assign<FloatingLabelMessageProps, FloatingLabelMessageProps>(
                        __default,
                        {
                            text: 'Username is valid',
                            type: 'success'
                        }
                    );
                }
                setUsernameError(__default);
            });
        }

        setUsername(e.currentTarget.value.toLowerCase());
    }




    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | SingleValue<any>, handler: {
        setState: React.Dispatch<SetStateAction<any>>,
        setError: React.Dispatch<SetStateAction<FloatingLabelMessageProps>>,
        error: FloatingLabelMessageProps
    }): void => {

        if (e.target.value == '') {
            handler.setError({
                type: handler.error.type || 'error',
                text: handler.error.text,
                show: true
            });
        }
        else {
            handler.setError({
                text: handler.error.text,
                show: false
            });
        }

        handler.setState(e.target.value);
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement> | SingleValue<any>, handler: {
        setState: React.Dispatch<SetStateAction<any>>,
        setError: React.Dispatch<SetStateAction<FloatingLabelMessageProps>>,
        error: FloatingLabelMessageProps
    }): void => {

        if ( !e?.value) {
            handler.setError({
                type: handler.error.type || 'error',
                text: handler.error.text,
                show: true
            });
        }
        else {
            handler.setError({
                text: handler.error.text,
                show: false
            });
        }

        handler.setState(e?.value);
    }

    const formatPhone = (phone:string|number):string => {
        phone = phone.toString().replace(/\D/g, '');
        const matcher = phone.match(/(\d{4})(\d{3})(\d{3})/);
        if (matcher){
            return `(${matcher[1]}) ${matcher[2]} ${matcher[3]}`;
        } 
        return phone;
    }


    const editUser = ( id:number ):void => {
       let user = users.find( user => user.id == id );

       console.log( user );
    }

    return (
        <Layout >

            <div className="d-flex justify-content-between mb-4 pb-3 border-bottom border-bottom-2">
                <h1 className="text-3xl font-bold d-flex align-items-center text-slate-600 gap-2"><FaUsers /> Users</h1>
                <Button variant="success" onClick={() => setShowModal(true)}><MdAdd /> Add User</Button>
            </div>

            <table className="table table-responsive">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {isLoading ? <SkeletonTable columns={7} /> : users.map((user, i) => {
                        return (
                            <tr key={i}>
                                <td><input type="checkbox" /></td>
                                <td>{user.username}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td><a className="btn btn-link text-sky-500 text-decoration-none" href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td><a className="btn btn-link text-sky-500 text-decoration-none" href={`tel:${user.phone}`}>{ formatPhone(user.phone) }</a></td>
                                <td>{user.roles.map((role) => role.name).join(', ')}</td>
                                <td>
                                    <div className="d-flex justify-content-evenly">
                                        <Button variant="info" onClick={() => editUser(user.id)}><MdEdit /></Button>
                                        <Button variant="danger"><MdDelete /></Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>

            <Modal className="right" show={showModal} onHide={() => setShowModal(false)} backdrop="static">
                <Modal.Header closeButton={true}>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="form-group">
                            <FloatingLabel
                                label="Username"
                                className="rounded"
                                value={username}
                                onChange={e => isValidUsername(e)}
                                message={usernameError}
                            />
                        </div>

                        <Row>
                            <Col>
                                <FloatingLabel
                                    label="First Name"
                                    className="rounded"
                                    value={firstname}
                                    onChange={e => handleInputChange(e, {
                                        setState: setFirstname,
                                        setError: setFirstnameError,
                                        error: {
                                            text: "First Name is required!",
                                        }
                                    })}
                                    message={firstnameError}
                                />
                            </Col>
                            <Col>
                                <FloatingLabel
                                    label="Last Name"
                                    className="rounded"
                                    value={lastname}
                                    onChange={e => handleInputChange(e, {
                                        setState: setLastname,
                                        setError: setLastnameError,
                                        error: {
                                            text: "Last Name is required!",
                                        }
                                    })}
                                    message={lastnameError}
                                />
                            </Col>
                        </Row>
                        <div className="form-group">
                            <FloatingLabel
                                label="Email"
                                type="email"
                                className="rounded"
                                value={email}
                                onChange={e => handleInputChange(e, {
                                    setState: setEmail,
                                    setError: setEmailError,
                                    error: {
                                        text: "Email is required!",
                                    }
                                })}
                                message={emailError}
                            />
                        </div>

                        <div className="form-group">
                            <FloatingLabel
                                label="Phone"
                                type="text"
                                className="rounded"
                                pattern="[0-9+]"
                                maxLength={10}
                                value={phone}
                                onChange={e => handleInputChange(e, {
                                    setState: setPhone,
                                    setError: setPhoneError,
                                    error: {
                                        text: "Phone is required!",
                                    }
                                })}
                                message={phoneError}
                            />
                        </div>
                        <Row>
                            <Col>
                                <FloatingLabel
                                    label="Password"
                                    type="password"
                                    className="rounded"
                                    autoComplete='off'
                                    value={password}
                                    onChange={e => handleInputChange(e, {
                                        setState: setPassword,
                                        setError: setPasswordError,
                                        error: {
                                            text: "Password is required!",
                                        }
                                    })}
                                    message={passwordError}
                                />
                            </Col>

                            <Col>
                                <FloatingLabel
                                    label="Confirm Password"
                                    type="password"
                                    className="rounded"
                                    autoComplete='off'
                                    value={confirmPassword}
                                    onChange={e => handleInputChange(e, {
                                        setState: setConfirmPassword,
                                        setError: setConfirmPasswordError,
                                        error: {
                                            text: "Confirm Password is required!",
                                        }
                                    })}
                                    message={confirmPasswordError}
                                />
                            </Col>
                        </Row>

                        <FormGroup className="float-label-wrapper">
                            <Form.Label>Choose Role</Form.Label>
                            <ReactSelect
                                placeholder="Select Role"
                                className="rounded mb-2"
                                options={roleOptions}
                                isClearable={true}
                                value={roleOptions.find(role => role.value === role_id)}
                                onChange={e => handleSelectChange(e, {
                                    setState: setRoleId,
                                    setError: setRoleError,
                                    error: {
                                        text: "Role is required!",
                                    }
                                })}
                            />
                            {roleError && roleError.show ?  <div className={`message message-${roleError.type ?? 'error'} ${roleError.show ? 'show' : 'hide'}`}>{roleError.text}</div> : ''}
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-success" onClick={() => _apiHandleSave()}>Submit</Button>
                    <Button onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

        </Layout>
    )
}

export default Users;