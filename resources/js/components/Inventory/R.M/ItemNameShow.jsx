import React from 'react'
import '../../Dummy Pages/Dummy3';
export default function ItemNameShow() {
  return (
    <React.Fragment>
      <div className='add-new-leadBackS'>
      <div className='add-new-leadStyle text-center'>Item Name</div>

                <div className="form-group row forRequiredStar mx-2 mt-4">
                    <label for="inputDesc2e" className="col-sm-3 col-form-label add-NewLFo-lable"> Description:</label>
                    <div className="col-sm-7 mt-1 mb-1">
                        <input type="text" className="form-control-item" id="inputDesc2e" placeholder="Enter Description"  />
                    </div>
                </div>
                <div className="form-group row forRequiredStar mx-2">
                    <label for="inputLogDes2e" className="col-sm-3 col-form-label add-NewLFo-lable"> Long Description:</label>
                    <div className="col-sm-7 mt-1 mb-1">
                        <input type="text" className="form-control-item" id="inputLogDes2e" placeholder="Enter Long Description"  />
                    </div>
                </div>
                <div className="form-group row forRequiredStar mx-2">
                    <label for="inputRtInr2e" className="col-sm-3 col-form-label add-NewLFo-lable"> Rate-INR(Base Currency):</label>
                    <div className="col-sm-7 mt-1 mb-1">
                        <input type="text" className="form-control-item" id="inputRtInr2e" placeholder="Enter INR"  />
                    </div>
                </div>
                

<div className="row justify-content-between mx-2">
  <div className="col-5 forRequiredStar">
  <label for="inputTxt12e" className=" add-NewLFo-lable"> Text-1</label>
  {/* <textarea className="form-control" id="inputNote1e" aria-label="First name" rows="3" /> */}
  <input type="text" className="form-control-item" id='inputTxt12e' placeholder="text-1" aria-label="First name" row='3'/>
  </div>

  <div className="col-5 forRequiredStar">
  <label for="inputTxt22e" className=" add-NewLFo-lable"> Text-2</label>
  {/* <textarea className="form-control" id="inputNote1e" aria-label="First name" rows="3" /> */}
  <input type="text" className="form-control-item" id='inputTxt22e' placeholder="text-2" aria-label="First name" row='3'/>
  </div>
</div>

<div className="row justify-content-between mx-2">
  <div className="col-5 forRequiredStar">
  <label for="inputUnit2e" className=" add-NewLFo-lable"> Unit</label>
    <input type="text" className="form-control-item" id='inputUnit2e' placeholder="Unit" aria-label="First name" />
  </div>
  <div className="col-5 forRequiredStar">
  <label for="inputItmGrp2e" className=" add-NewLFo-lable"> Item Group</label>
    <input type="text" className="form-control-item" id='inputItmGrp2e' placeholder="Item Group" aria-label="Last name" />
  </div>
</div>

<div className="row justify-content-between mx-2 mt-4 mb-4">
  <div className="col-3 forRequiredStar">
  <button type='button' className='ad-Ne-LFom-btn1'>Save</button>
  </div>

  <div className="col-3 forRequiredStar">
  <button type='button' className='ad-Ne-LFom-btn3'>Close</button>
  {/* <button type='button' className='ad-Ne-LFom-btn2 mx-3'>Next</button> */}
  </div>

  </div>

  </div>

    </React.Fragment>
  )
}