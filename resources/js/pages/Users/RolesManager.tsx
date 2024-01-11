import React from "react";
import Layout from "../../partials/Layout";
import { Button, Col, Form, Row } from "react-bootstrap";
import ReactSelect, { SingleValue } from "react-select";

import { default as __permissions__ } from "./permissions";
import axios, { AxiosResponse } from "axios";
import { IRole, PermissionsData, RoleOptions, RolesData } from "./interface";
import { SkeletonTable } from "../../Skeletons";
import {RiLoaderLine} from 'react-icons/ri'
import Toast from "../../utils/Toast";
import { useSearchParams } from "react-router-dom";


function RolesManager(): React.JSX.Element {

    const [isLoading, setLoading ] = React.useState<boolean>(false);
    const [saveLoading, setSaveLoading ] = React.useState<boolean>(false);
    const [roleOptions, setRoleOptions] = React.useState<RoleOptions[]>([]);
    const [role_id, setRoleID] = React.useState<number>();


    const [permissions, setPermissions] = React.useState<string[]>([]);
    const [disabledPermissions, setDisabledPermissions ] = React.useState<string[]>([]);

    const [searchParams] = useSearchParams();

    React.useEffect(() => {

        axios.get('user/roles').then(({ data }: AxiosResponse<RolesData>) => {
            setRoleOptions(data.data.roles.map((role: IRole) => ({ label: role.name, value: role.id })));

            setRoleID(() => {
                let searched:IRole|undefined = data.data.roles.find( r => r.name == searchParams.get('role') );

                if( searched ){
                    return searched.id;
                }
                return undefined;
            });
        });

        

    }, []);


    const handleRoleChange = (e:SingleValue<RoleOptions>):void => {
        if (e?.value){
            setLoading(true);
            axios.get(`user/role/permissions/${e?.value}`).then( ({data}:AxiosResponse<PermissionsData>) => {
                let p = data.data.map( v => v.name );
                setPermissions(p);

                let __dp__ = __permissions__.map( dp => {

                    const __udp__ = dp.replace(/\s+/, '_').toLowerCase();

                    if( !p.includes( `view_${__udp__}`) ){
                        return [`add_${__udp__}`, `edit_${__udp__}`, `delete_${__udp__}`];
                    }
                }).filter( p => !!p );

                let __c__:string[] = Array.prototype.concat(...__dp__);


                setDisabledPermissions( prev => {
                    return [...prev, ...__c__];
                });

                setLoading(false);
            });
        }
        setRoleID(e?.value)
    }

    const handlePermissionsChange = ( e:React.ChangeEvent<HTMLInputElement>  ): void => {
        
        let permission = e.target.value.replace('view_', '');

        if (e.target.checked) {
            setPermissions( prev => {
               return [ ...prev, e.target.value]
            });

            setDisabledPermissions(prev => {
                return prev.filter( val => {
                    return ![`add_${permission}`, `edit_${permission}`, `delete_${permission}`].includes(val);
                });
            });

        } else{

            setDisabledPermissions( prev => {
                return [...prev, ...[`add_${permission}`, `edit_${permission}`, `delete_${permission}` ]];
            });

            setPermissions( prev => {
                return prev.filter(val => val !== e.target.value);
            });
        }
    }

    const _apiSave = ():void => {
        setSaveLoading( true );
        axios.post('user/role/permissions', {
            role_id, 
            permissions
        }).then( ({data}:AxiosResponse<PermissionsData>) => {
            let role = roleOptions.find( r => r.value == role_id );
            if ( role && localStorage.getItem('user-roles') == role.label ){
                localStorage.setItem('user-permissions', JSON.stringify(data.data));
            }
            Toast({
                text: 'Permissions applied successfully!'
            }).fire();
            setSaveLoading(false);
        });
    }

    return (
        <Layout title="Role Permissions Manager">
            <Row className="mb-4">
                <Col xs="12" lg="6" className="border-bottom pb-3">
                    <Form.Group className="d-flex align-items-center gap-2">
                        <Form.Label className="col-4"><strong>Choose Role:</strong></Form.Label>
                        <ReactSelect
                            className="w-100"
                            options={roleOptions}
                            isClearable={true}
                            value={roleOptions.find(role => role.value === role_id)}
                            onChange={e => handleRoleChange( e )}
                        />
                    </Form.Group>
                </Col>
            </Row>
            { role_id ?
            <table className="table table-responsive w-50 permissions-table">
                <thead>
                    <tr>
                        <th>Permission</th>
                        <th style={{ textAlign: 'right', width: '15%' }}>View</th>
                        <th style={{ textAlign: 'right', width: '15%' }}>Add</th>
                        <th style={{ textAlign: 'right', width: '15%' }}>Edit</th>
                        <th style={{ textAlign: 'right', width: '15%' }}>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        isLoading ? <SkeletonTable rows={10} columns={5}/> : __permissions__.map<React.JSX.Element>(permission => {
                            let __up__ = permission.replace(/\s+/, '_').toLowerCase();
                            return (
                                <tr key={permission}>
                                    <td><span className="fst-italic fw-bolder text-warning">{permission}</span></td>
                                    <td style={{ textAlign: 'right' }}><input type="checkbox" onChange={e => handlePermissionsChange(e) } value={`view_${__up__}`} checked={permissions.includes(`view_${__up__}`)} /></td>
                                    <td style={{ textAlign: 'right' }}><input type="checkbox" onChange={e => handlePermissionsChange(e)} value={`add_${__up__}`} checked={permissions.includes(`add_${__up__}`)} disabled={disabledPermissions.includes(`add_${__up__}`)} /></td>
                                    <td style={{ textAlign: 'right' }}><input type="checkbox" onChange={e => handlePermissionsChange(e)} value={`edit_${__up__}`} checked={permissions.includes(`edit_${__up__}`)} disabled={disabledPermissions.includes(`edit_${__up__}`)} /></td>
                                    <td style={{ textAlign: 'right' }}><input type="checkbox" onChange={e => handlePermissionsChange(e)} value={`delete_${__up__}`} checked={permissions.includes(`delete_${__up__}`)} disabled={disabledPermissions.includes(`delete_${__up__}`)} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5} style={{ textAlign: 'end' }}>
                                <Button variant="primary" className="px-4" onClick={() => _apiSave()}> Save {saveLoading?<RiLoaderLine className="spin"/>: ''}</Button>
                        </td>
                    </tr>
                </tfoot>
            </table> : <p className="w-50 text-warning fs-5 py-2"><sup>*</sup> Choose a Role to view or change the permissions</p>}
        </Layout>
    )
}

export default RolesManager;