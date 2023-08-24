import React from 'react'
import './Dummy3.css';
export default function DummyShow3() {
  return (
    <React.Fragment>
      <div className='add-new-leadBackS'>
      <div className='add-new-leadStyle text-center'>Add New Lead Form</div>
        <div className="row justify-content-between mx-2 mt-3">
  <div className="col-4 forRequiredStar">
  <label for="inputFistN1e" className=" add-NewLFo-lable"> First Name</label>
    <input type="text" className="form-control" id='inputFistN1e' placeholder="First name" aria-label="First name" />
  </div>
  <div className="col-4 forRequiredStar">
  <label for="inputLastN1e" className=" add-NewLFo-lable"> Last Name</label>
    <input type="text" className="form-control" id='inputLastN1e' placeholder="Last name" aria-label="Last name" />
  </div>
</div>

<div className="row justify-content-between mx-2">
  <div className="col-4 forRequiredStar">
  <label for="inputLeadS1e" className=" add-NewLFo-lable"> Lead Source</label>
    <input type="text" className="form-control" id='inputLeadS1e' placeholder="First name" aria-label="First name" />
  </div>
  <div className="col-4 forRequiredStar">
  <label for="inputCountr1e" className=" add-NewLFo-lable"> Country</label>
    <input type="text" className="form-control" id='inputCountr1e' placeholder="Last name" aria-label="Last name" />
  </div>
</div>


<div className="row justify-content-between mx-2">
  <div className="col-4 forRequiredStar">
  <label for="inputCity1e" className=" add-NewLFo-lable"> City</label>
    <input type="text" className="form-control" id='inputCity1e' placeholder="First name" aria-label="First name" />
  </div>
  <div className="col-4 forRequiredStar">
  <label for="inputEmail1e" className=" add-NewLFo-lable"> E-mail</label>
    <input type="text" className="form-control" id='inputEmail1e' placeholder="Last name" aria-label="Last name" />
  </div>
</div>


<div className="row justify-content-between mx-2">
  <div className="col-4 forRequiredStar">
  <label for="inputWeb1e" className=" add-NewLFo-lable"> Website</label>
    <input type="text" className="form-control" id='inputWeb1e' placeholder="First name" aria-label="First name" />
  </div>
  <div className="col-4 forRequiredStar">
  <label for="inputPhone1e" className=" add-NewLFo-lable"> Phone No.</label>
    <input type="text" className="form-control" id='inputPhone1e' placeholder="Last name" aria-label="Last name" />
  </div>
</div>

<div className="row justify-content-between mx-2">
  <div className="col-12 forRequiredStar">
  <label for="inputAdd1e" className=" add-NewLFo-lable"> Address</label>
    <input type="text" className="form-control" id='inputAdd1e' placeholder="First name" aria-label="First name" />
  </div>
</div>

<div className="row justify-content-between mx-2">
  <div className="col-12 forRequiredStar">
  <label for="inputNote1e" className=" add-NewLFo-lable"> Note</label>
  <textarea className="form-control" id="inputNote1e" aria-label="First name" rows="3" />
  {/* <input type="text" className="form-control" id='inputAdd1e' placeholder="First name" aria-label="First name" row='3'/> */}
  </div>
</div>

<div className="row justify-content-between mx-2 mt-4 mb-4">
  <div className="col-3 forRequiredStar">
  <button type='button' className='ad-Ne-LFom-btn1'>Save and Add New</button>
  </div>

  <div className="col-3 forRequiredStar">
  <button type='button' className='ad-Ne-LFom-btn2'>Save and Close</button>
  </div>

  <div className="col-2 forRequiredStar">
  <button type='button' className='ad-Ne-LFom-btn3'>Close</button>
  </div>

  </div>

  </div>

    </React.Fragment>
  )
}