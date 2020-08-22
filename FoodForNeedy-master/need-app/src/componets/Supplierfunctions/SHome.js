import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import "../CSS/donor.css";
import MailchimpSubscribe from "react-mailchimp-subscribe"

class SHome extends Component {
  state = {
    foods: [],
    food_id:"",
    view:false
  };
  componentDidMount = async () => {
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
    const res = await axios.get(`http://localhost:5000/api/v1/foods`, config);
      this.setState({
      foods: res.data.data,
    });
      console.log(this.state.scholerships);
  };
   
onClick = async (id,e) => {
 e.preventDefault();
 this.setState({
       view:true,
       food_id:id,
 });
}

render() {
 return (
    <Fragment>
    {this.state.view ?
    ( 
        (<Redirect view={this.state.view} 
          to={{pathname:'/supplier/viewfood',
                  state:{food_id:this.state.food_id}
              }} 
          />) 
       )
    : 
    (
      
    <section class="counts section-bg mt-5">
        <div className=" container-fluid mt-5" id="product">
          <h2>Welcome to Supplier Home Page</h2>
          <center>
          <p style={{color:'black'}}> Here one can add the profile and supply the food for needy people</p></center>
      
          <h2> List Of Foods</h2>

            <div className="row">
            {this.state.foods.map((food) => (
              <div className="col-lg-3 col-md-3 col-sm-3   animated fadeInUp wow animated">
               <div className="card product-top">
                <img 
                  src={food.file}
                  className="img1"
                  alt=""
                />
                 <div className="product-bottom text-center">
               
            <h5 style={{color:'black'}} >{food.title}</h5>
            <h6 style={{color:'black'}}>Rate:{food.rate}</h6>
              </div>
                <div className="overlay">
                  <a onClick={(e) =>this.onClick(food._id,e)}>
                    <i className="fa fa-eye"></i>
                  </a>
                </div>
              </div>
            
            </div>
            

            ))}
         
          
          </div>
        </div>
        </section>
      )}
      </Fragment>
    );
  }
}

export default SHome;
