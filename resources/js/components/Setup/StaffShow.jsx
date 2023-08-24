import React from "react";
import '../../components/Dummy Pages/Dummy1.css';
import logoleft from '../../images/logoERP.jpeg';
import {AiOutlineEdit} from 'react-icons/ai';
import { Link } from "react-router-dom";

export default function StaffShow() {

  return (
    <React.Fragment>
      <nav className="navbar d-flex justify-content-between navbar-light bg-white">


        <div><h5 className="navheading-center-low1">Member Details</h5></div>
        <div className="text-center">
          <h4 className="navheading-center1">K R <span className="navheading-center-span1">AUTO COMPONENT</span> PVT.LTD</h4>

        </div>
        <a className="navbar-brand" href="#">
          <img src={logoleft} width="220" height="70" className="" alt="K R logo pic" />
        </a>
      </nav>

      <div className="rmbottcolrLine1 d-flex justify-content-around">
        <div>
          <p>Members List</p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover table-responsive">
          <thead>

            <tr className="rm-list-th text-center">
              <th scope="col">Sr. No.</th>
              <th scope="col">Full Name</th>
              <th scope="col">Email </th>
              <th scope="col">Deparment</th>
              <th scope="col">Designation</th>
              <th scope="col">Edit</th>

            </tr>
          </thead>

          <tbody className="text-center rm-list-td">
            <tr>
              <th scope="row">1</th>
              <td>Pratik Chaudhary</td>
              <td>pratik@gmail.com</td>
              <td>AC</td>
              <td>MERN Developer</td>
              <td className="edit-icon-cell"> <Link to='/staff/update'>{<AiOutlineEdit />}</Link> </td>
            </tr>

            <tr>
            <th scope="row">1</th>
              <td>Pratik Chaudhary</td>
              <td>pratik@gmail.com</td>
              <td>AC</td>
              <td>MERN Developer</td>
              <td className="edit-icon-cell"> <Link to='/staff/update'>{<AiOutlineEdit />}</Link> </td>
            </tr>

            <tr>
            <th scope="row">1</th>
              <td>Pratik Chaudhary</td>
              <td>pratik@gmail.com</td>
              <td>AC</td>
              <td>MERN Developer</td>
              <td className="edit-icon-cell"> <Link to='/staff/update'>{<AiOutlineEdit />}</Link> </td>
            </tr>

            <tr>
              <th scope="row">1</th>
              <td>Pratik Chaudhary</td>
              <td>pratik@gmail.com</td>
              <td>AC</td>
              <td>MERN Developer</td>
              <td className="edit-icon-cell"> <Link to='/staff/update'>{<AiOutlineEdit />}</Link> </td>
            </tr>


            <tr>
            <th scope="row">1</th>
              <td>Pratik Chaudhary</td>
              <td>pratik@gmail.com</td>
              <td>AC</td>
              <td>MERN Developer</td>
              <td className="edit-icon-cell"> <Link to='/staff/update'>{<AiOutlineEdit />}</Link> </td>
            </tr>

            <tr>
            <th scope="row">1</th>
              <td>Pratik Chaudhary</td>
              <td>pratik@gmail.com</td>
              <td>AC</td>
              <td>MERN Developer</td>
              <td className="edit-icon-cell"> <Link to='/staff/update'>{<AiOutlineEdit />}</Link> </td>
            </tr>

          </tbody>

        </table>

      </div>

      {/* </main> */}

    </React.Fragment>

  )
}