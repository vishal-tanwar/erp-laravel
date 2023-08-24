import React from 'react'
import {Link} from 'react-router-dom'
import './staff.css'
const MemberEditShow = () => {
    return (
        <React.Fragment>
            <div>
                <div>
                    <h1 className='editMember'>Edit Member</h1>
                </div>
                <div>
                    <form action="" className='newStaff_member'>
                        <div className='newStaff_member'>
                            <div className='newStaff_member_content'>
                                <div >
                                    <label htmlFor="fullname" className='staff_lables'>Full Name:</label>
                                    <input
                                        type="text"
                                        id="fullname"
                                        placeholder='Full Name'
                                        className='staff_input'
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className='staff_lables'>Email:</label>
                                    <input
                                        type="text"
                                        id="email"
                                        placeholder='Email'
                                        className='staff_input'

                                    />
                                </div>
                                <div>
                                    <label htmlFor="" className='staff_lables'>Department:</label>
                                    <br />
                                    <select name="department" id="" className='staff_input'>
                                        <option value="" className='staff_option'>Select Deparment:</option>
                                        <option value="">ABC</option>
                                        <option value="">XYZ</option>
                                        <option value="">MNO</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="" className='staff_lables'>Designation:</label>
                                    <br />
                                    <select name="designation" id="" className='staff_input'>
                                        <option value="">Select Designation:</option>
                                        <option value="">ABC</option>
                                        <option value="">XYZ</option>
                                        <option value="">MNO</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="role" className='staff_lables'>Role:</label>
                                    <input
                                        type="text"
                                        id="role"
                                        placeholder='Role'
                                        className='staff_input'
                                    />
                                </div>
                                <button className='save_btn'>Save</button>  
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </React.Fragment>
    )
}

export default MemberEditShow