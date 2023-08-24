import React from 'react'
import { Link } from 'react-router-dom'
import './staff.css'
const PermissionShow = () => {
    return (
        <React.Fragment>
            <div>
                <div>
                    <button className='profile_btn'> <Link to='/staff/new_member'>Profile</Link> </button>
                    <button className='permission_btn'> <Link to='/staff/permission'>Permissions</Link></button>
                </div>
                <div class="permission_center">
                    <table class="permission_container">
                        <tr>
                            <th class="permission-header">Permission</th>
                            <th class="modules-header">Sub-Modules</th>
                        </tr>
                        <tr>
                            <td class="permission-content">
                                Item Master
                            </td>
                            <td class="modules-content">
                                <label class="checkbox-label">
                                    <input type="checkbox" name="item1" /> Create Item
                                </label>
                                <br />
                                <label class="checkbox-label">
                                    <input type="checkbox" name="item2" /> Item List
                                </label>
                                <br />
                                <label class="checkbox-label">
                                    <input type="checkbox" name="item3" /> Group Item
                                </label>
                                <br />
                                <label class="checkbox-label">
                                    <input type="checkbox" name="item4" /> Group List
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td class="permission-content">
                                RM
                            </td>
                            <td class="modules-content">
                                <label class="checkbox-label">
                                    <input type="checkbox" name="item5" /> Receiving Voucher
                                </label>
                                <br />
                                <label class="checkbox-label">
                                    <input type="checkbox" name="item6" /> Issue Voucher
                                </label>
                                <br />
                            </td>
                        </tr>
                        <tr>
                            <td class="permission-content">
                                B.O.P
                            </td>
                            <td class="modules-content">
                                <label class="checkbox-label">
                                    <input type="checkbox" name="item7" class="input_center" /> Receiving Voucher
                                </label>
                                <br />
                                <label class="checkbox-label">
                                    <input type="checkbox" name="item8" class="input_center" /> Issue Voucher
                                </label>
                                <br />
                            </td>
                        </tr>
                        <tr>
                            <td class="permission-content">
                                Warehouse
                            </td>
                            <td class="modules-content">
                                <label class="checkbox-label">
                                    <input type="checkbox" name="item9" /> Create Warehouse
                                </label>
                                <br />
                                <label class="checkbox-label">
                                    <input type="checkbox" name="item10" /> Warehouse List
                                </label>
                                <br />
                            </td>
                        </tr>
                        <tr>
                            <td class="permission-content">
                                History
                            </td>
                            <td class="modules-content">
                                <label class="checkbox-label">
                                    <input type="checkbox" name="item11" /> History List
                                </label >
                                <br />
                            </td>
                        </tr>
                    </table>
                    
                </div>

                <button className='permissionBtn-save'> <Link to=''>Save</Link></button>
                <br />
                <br />
            </div>

        </React.Fragment>
    )
}

export default PermissionShow