
import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
// import HomeNav from './HomeNav'
// import logo from '../assets/logo.png'
import "../CSS/donor.css";
class AddProfile extends Component {
  constructor(props) {
    super(props);

    this.state={
      name:"",
      phone:"",
      email:"",
      dob:"",
      address:"",
      isAuth: false,
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
 }
 onSubmit = async (e) => {
  e.preventDefault();

  const register={
    name:this.state.name,
    phone:this.state.phone,
    email:this.state.email,
    dob:this.state.dob,
    address:this.state.address
  };
  const body = JSON.stringify(register);
  const token = sessionStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
  console.log(token);
  try {
    const res = await axios.post(
                                 `http://localhost:5000/api/v1/public`,
                                  body,
                                  config
                                 );
   sessionStorage.setItem("isAuth", true);
   this.setState({
                  isAuth: true,
                });
}catch (error) {
                alert("Sorry Something Wrong!!");
               }
 }
  render() {
    return (
      <Fragment>
      { this.state.isAuth ?
       ( <Redirect isAuth={this.state.isAuth} to="/ngo/Home" />
       ):
       (
      <div>
                    
        <form method="post" onSubmit={this.onSubmit}>
          <div className="container itmtop">
             <div className="container ">
             <div className="" id="login-second">
          <div className="contact-form">
              <div className="wrapper wrapper--w900 "> 
                 <div className="card cardH card-6 ">  
                
            
			<div className="mx-auto"> 
              {/* <img src={logo} style={{width:'180px'}}></img> <hr/> */}
              <div className="card-heading m-4">
                    <h2 className="title text-dark" style={{color:'blue'}}>Add Profile</h2>
                  </div>
               
                  <div className="card-body">
                  <div className="form-row frow">
                  <div className="name">Name</div>
                 <div className="value">
                <input 
                type="text" 
                className="input--style-6"
                name="name"
                placeholder="Your name"
                value={this.state.name}
                onChange={this.onChange} 
                required/>
                </div>
                </div>

                 <div class="form-row frow">
                  <div class="name">Phone:</div>
                 <div class="value">
                  <input 
                  type="text" 
                  className="input--style-6" 
                  placeholder="Contact number"
                  name="phone" 
                  value={this.state.phone}
                  onChange={this.onChange} 
                  required/>
                  </div>
                  </div>
                
                
                  <div class="form-row frow">
                  <div class="name">Email:</div>
                 <div class="value">
                  <input 
                  type="text" 
                  className="input--style-6" 
                  name="email"
                  placeholder="Your valid email"
                  value={this.state.email}
                  onChange={this.onChange} 
                  required/>
                  </div>
                  </div>
                  <div className="">
                            <div className="input-group">
                              <div className="input-group-addon">
                               <i className="fa fa-birthday-cake fa-2x p-1"></i>
                              </div>
                             <input
                                id="Date Of Birth"
                                name="dob"
                                type="date"
                                placeholder=""
                                value={this.state.dob}
                                onChange={this.onChange}
                                className="form-control input-md"
                              />
                            </div>
                          </div>

                          <div className="input-group">
                          <div className="input-group-addon">
                  <div class="form-row frow">
                  <div class="name">Address:</div>
                 <div class="value">                         
               <textarea 
               placeholder="Address"
               className="input--style-6"
               name="address" 
               value={this.state.address}
               onChange={this.onChange}>
               </textarea>
               </div>
                </div>
               </div>
</div>
                <div class="card-footer row">
               <input type="submit" className="btn btn-success float-right login_btn btn-block mb-1 btn btn-success" value="Add" name="submit"></input>
              </div>
                {/* <p className="mx-auto"> Already have an account?<Link to="/login"> Sign In</Link></p> */}
					  </div>
                      </div>
          </div>
          </div> 
           </div> 
          
        </div> 
        </div>
         </div>  
        {/* </div> */}
        </form>
      </div>
    
      )};
      </Fragment>
    )
  }

}
export default AddProfile
