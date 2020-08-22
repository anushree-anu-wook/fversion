import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
//import toast from 'react-toastify'
import {Redirect,Link} from 'react-router-dom'
import StripeCheckout from "react-stripe-checkout"
import "../CSS/donor.css";

//toast.configure();


 function  makePayment(token,addresses) {
  console.log({token,addresses})
//   axios.post('http://localhost:3000/ngo/Home/payment',
 // );
// const {status} = response.data
// if(status === 'success'){
// toast('Success! Check Emails for details',{type:'success'})
// }else {
//   toast('Something went wrong',{type:'error'})
// }
 }

class PublicHome extends Component {
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
          to={{pathname:'/ngo/viewfood',
                  state:{food_id:this.state.food_id}
              }} 
          />) 
       )
    : 
    (
        
    <section class="counts section-bg mt-5">
        <div className=" container-fluid mt-5" id="product">
          <h2>Welcome to NGO Home Page</h2>
          <h2> List Of Foods</h2>
          <div className="fadeInDown">

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
               
            <h5 style={{color:'black'}}>{food.title}</h5>
            <h6 style={{color:'black'}}>Rate:{food.rate}</h6>
            <h6 style={{color:'black'}} >Stock:{food.stock}</h6>
            <StripeCheckout 
            stripeKey ="pk_test_IuuwuGK8MpLJ9qpEYN3py2JC00sf1ZXmO6"
            billingAddress
            shippingAddress
            token ={makePayment}
            name="Buy Foods"
            amount={food.rate * 100}
            >
           
              
              <button className="btn btn-info">Buy Now {food.stock}
               </button>
              
             {/* <button type="button"
                    className="btn btn-secondary"
                    title="Order"
                    data-toggle="modal"
                    data-target="#quickModel">
                    Order
                    </button> */}
                    </StripeCheckout>
             </div>
             <br/>
             
             <center>
             <Link to ="/ngo/Mail">
              <button className="btn btn-info">email
              </button>
              </Link>
              </center>
              
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
        </div>
        </section>
      )}
      </Fragment>
    );
  }
}

export default PublicHome;
