import React from "react";
import './Dummy1.css';
import logoleft from '../../images/logoERP.jpeg';
export default function DummyShow1(){
    return(
        <React.Fragment>
            <main className="rmRBgMain">
            <nav className="navbar d-flex justify-content-between navbar-light bg-white">

            <div className="text-center">             
  <h4 className="navheading-center1 text-white">R.M Detail </h4>
  </div>

   <div className="text-center">             
  <h4 className="navheading-center1">K R <span className="navheading-center-span1">AUTO COMPONENT</span> PVT.LTD</h4>
  <h5 className="navheading-center-low1">R.M Store Register Form</h5>
  </div>
  <a className="navbar-brand" href="#">
    <img src={logoleft} width="220" height="70" className="" alt="K R logo pic" />
  </a> 
</nav>

<div className="rmbottcolrLine1 d-flex justify-content-around">
<div>
  <p>Grade :- JSC270CN</p>
</div>
<div>
  <p>Part No :- 63711-69R00</p>
</div>
<div>
  <p>Size :- 1.2X230X1200</p>
</div>
</div>

<form className="row g-3 mx-4 mt-2">

<div className="col-12 forRequiredStar">
    <label for="inputAddress" className="form-label rm-reg-lable"><i className="fa fa-envelope" aria-hidden="true"></i> Email Address</label>
    <input type="email" className="form-control inputInnClr" id="inputAddress" placeholder="Email Address" required/>
  </div>

  
  <div className="col-md-4 forRequiredStar">
    <label for="inputEmail4" className="form-label rm-reg-lable"><i className="fa fa-eye-slash" aria-hidden="true"></i> Password</label>
    <input type="password" className="form-control inputInnClr" id="inputEmail4" placeholder="Password" required/>
  </div>
  <div className="col-md-4 forRequiredStar">
    <label for="inputPassword4" className="form-label rm-reg-lable"><i className="fa fa-phone" aria-hidden="true"></i> Phone No.</label>
    <input type="phone" className="form-control inputInnClr" id="inputPassword4" placeholder="Phone No." required/>
  </div>
  <br/>
  <div className="col-md-4 forRequiredStar">
    <label for="inputPassword4" className="form-label rm-reg-lable"><i className="fa fa-user" aria-hidden="true"></i> First Name</label>
    <input type="text" className="form-control inputInnClr" id="inputPassword4" placeholder="First Name" required/>
  </div>
  <div className="col-md-4 forRequiredStar">
    <label for="inputPassword4" className="form-label rm-reg-lable"><i className="fa fa-user" aria-hidden="true"></i> Last Name</label>
    <input type="text" className="form-control inputInnClr" id="inputPassword4" placeholder="Last Name" required/>
  </div>
  <div className="col-md-4 forRequiredStar">
    <label for="inputPassword4" className="form-label rm-reg-lable"><i className="fa fa-shopping-cart" aria-hidden="true"></i> Shop Name</label>
    <input type="text" className="form-control inputInnClr" id="inputPassword4" placeholder="Shop Name" required/>
  </div>
  <div className="col-md-4 forRequiredStar">
    <label for="inputPassword4" className="form-label rm-reg-lable"><i className="fa fa-globe" aria-hidden="true"></i> Shop URL</label>
    <input type="text" className="form-control inputInnClr" id="inputPassword4" placeholder="Shop URL" required/>
  </div>
  <div className="col-md-12 forRequiredStar">
    <label for="inputPassword4" className="form-label rm-reg-lable"><i className="fa fa-map-marker" aria-hidden="true"></i> Address (Location)</label>
    <input type="text" className="form-control inputInnClr" id="inputPassword4" placeholder="Address" required/>
  </div>
  <div className="col-md-6 forRequiredStar">
    <label for="inputPassword4" className="form-label rm-reg-lable"><i className="fa fa-blind" aria-hidden="true"></i> City</label>
    <input type="text" className="form-control inputInnClr" id="inputPassword4" placeholder="City" required/>
  </div>

  <div className="col-md-6 forRequiredStar">
    <label for="inputPassword4" className="form-label rm-reg-lable"><i className="fa fa-random" aria-hidden="true"></i> Pincode</label>
    <input type="number" className="form-control inputInnClr" id="inputPassword4" placeholder="Pincode" required/>
  </div>

  <div className="d-flex justify-content-around mb-5">
  <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
  <label class="form-check-label rm-reg-lable" for="flexRadioDefault1">
    I am a customer
  </label>
</div>
<div>
  <button type="btn" className="btn butn-center"> register</button>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
  <label class="form-check-label rm-reg-lable" for="flexRadioDefault2">
    I am a vendor
  </label>
</div>
</div>
 
</form>

</main>

        </React.Fragment>
            
    )
}