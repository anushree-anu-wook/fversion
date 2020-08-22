import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import "../CSS/donor.css";
// import HomeNav from './HomeNav'
// import logo from '../assets/logo.png'
class AddProfile extends Component {
  constructor(props) {
    super(props);

    this.state={
      name:"",
      description:"",
      website:"",
      phone:"",
      email:"",
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
    description:this.state.description,
    website:this.state.website,
    phone:this.state.phone,
    email:this.state.email,
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
                                 `http://localhost:5000/api/v1/suppliers`,
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
       ( <Redirect isAuth={this.state.isAuth} to="/supplier/Home" />
       ):
       (
      <div>
                    
        <form method="post" onSubmit={this.onSubmit}>
          <div className="container itmtop">
          {/* <div className="page-wrapper p-t-50 p-b-50"> */}
              <div className="wrapper wrapper--w900 ">
                <div className="card cardH card-6 ">
	            	<div className="mx-auto"> 
              {/* <img src={logo} style={{width:'180px'}}></img> <hr/> */}
              <div className="card-heading m-4">
                    <h2 className="title text-dark">Add Profile</h2>
                  </div>
               
                  <div className="card-body">
                  <div className="form-row frow">
                  <div className="name">Name</div>
                 <div className="value">
                <input 
                type="text" 
                className="input--style-6"
                name="name"
                value={this.state.name}
                onChange={this.onChange} 
                required/>
                </div>
                </div>

                      
                  <div className="form-row frow">
                  <div className="name">Description:</div>
                 <div className="value">
                 <input 
                 type="text" 
                 className="input--style-6" 
                 placeholder="description" 
                 name="description" 
                 value={this.state.description}
                 onChange={this.onChange}
                 required />
                 </div>
                 </div>

                   <div className="form-row frow">
                  <div className="name">Website:</div>
                 <div className="value">
                 <input 
                 type="text" 
                 className="input--style-6" 
                 placeholder="website"
                 name="website" 
                value={this.state.website}
                onChange={this.onChange} 
                 required />
                </div>
                </div>
                

                
                  <div className="form-row frow">
                  <div className="name">Email:</div>
                 <div className="value">
                  <input 
                  type="text" 
                  className="input--style-6" 
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange} 
                  required/>
                  </div>
                  </div>
                  

                   <div className="form-row frow">
                  <div className="name">Phone:</div>
                 <div className="value">
                  <input 
                  type="text" 
                  className="input--style-6" 
                  placeholder="contact number"
                  name="phone" 
                  value={this.state.phone}
                  onChange={this.onChange} 
                  required/>
                  </div>
                  </div>
                
                  <div className="form-row frow">
                  <div className="name">Address:</div>
                 <div className="value">                         
               <textarea 
               placeholder="Address"
               className="input--style-6"
               name="address" 
               value={this.state.address}
               onChange={this.onChange}>
               </textarea>
               </div>
                </div>


                <div className="card-footer row">
                 <input type="submit" className="btn btn-blue  col-md-3" value="Register" name="submit"></input>
                  <input type="reset" className="btn btn-dark col-md-3 ml-5" value="Reset"></input>
                </div>
                {/* <p className="mx-auto"> Already have an account?<Link to="/login"> Sign In</Link></p> */}
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
