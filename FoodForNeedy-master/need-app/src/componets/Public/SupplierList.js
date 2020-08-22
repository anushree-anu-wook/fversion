
import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import "../CSS/donor.css";

class PublicHome extends Component {
  state = {
    suppliers: [],
    supplier_id:"",
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
    const res = await axios.get(`http://localhost:5000/api/v1/suppliers`, config);
      this.setState({
      suppliers: res.data.data,
    });
      console.log(this.state.scholerships);
  };
   
onClick = async (id,e) => {
 e.preventDefault();
 this.setState({
       view:true,
       supplier_id:id,
 });
}

render() {
 return (
    <Fragment>
    {this.state.view ?
    ( 
        (<Redirect view={this.state.view} 
          to={{pathname:'/ngo/view_supplier',
                  state:{supplier_id:this.state.supplier_id}
              }} 
          />) 
       )
    : 
    (
        
    <section class="counts section-bg mt-5">
        <div className=" container-fluid mt-5" id="product">
          <h2> List Of Suppliers</h2>
          <div className="fadeInDown">
             

            <div className="row">
            {this.state.suppliers.map((supplier) => (
              <div className="col-lg-3 col-md-3 col-sm-3   animated fadeInUp wow animated">
               <div className="card product-top">
                <img 
                  src={supplier.file}
                  className="img1"
                  alt=""
                />
                 <div className="product-bottom text-center">
            <h5  style={{color:'black'}}>{supplier.name}</h5>
            <h6 style={{color:'black'}}>{supplier.phone}</h6>
            <h6  style={{color:'black'}}>{supplier.email}</h6>
            
            </div>
            
                <div className="overlay">
                  <a onClick={(e) =>this.onClick(supplier._id,e)}>
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
