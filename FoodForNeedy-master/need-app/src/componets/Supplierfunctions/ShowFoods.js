import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import "../CSS/donor.css";


export default class ShowFoods extends Component {
  state = {
    me:"",
    foods: [],
    food_id:"",
    supplier_id:"",
     view:false,
     delete:false
 };



 componentDidMount = async () => {
   const token = sessionStorage.getItem("token");
   const config = {
     headers: { 
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
       },
     };
     const reslt = await axios.get(`http://localhost:5000/api/v1/auth/me`, config); 
      this.setState({
           me: reslt.data.data._id,
         });
         console.log(this.state.me);
   const res = await axios.get(`http://localhost:5000/api/v1/suppliers/${this.state.me}/foods`, config);   
   this.setState({
       foods: res.data.data,
   });        
    //  console.log(this.state.projects);
     console.log(this.state.foods);
          
 };




deleteScholership = async (id,e) => {
  alert("You Want To Delete this Food?");
  const token = sessionStorage.getItem("token");
  const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    await axios.delete(`http://localhost:5000/api/v1/foods/${id}`,config); 
      this.setState({
            delete:true,
          });
        // console.log(this.state.)
}


render() {
return (
     // ----------------------------------------------------------------------------------------
    <div>
      <section>
        <div id="portfolio">
          <div class="" style={{backgroundColor:"skyblue"}}>
            <div class="page-title text-center">
              <h1 class="text-dark pt-3">Foods</h1>
            </div>
           

            <div class="row">
              {/*  */}
              <div class="ml-5  mr-5 pt-4">
                <div class="">
                  <div class="">
                    <div class="row mb-4">
                      <div class="col-md-6">
                        <div class="pull-right">
                          <a
                            href="/supplier/addFoods"
                            class="btn btn-info btn-sm p-2"
                          >
                            Add Food
                          </a>
                        </div>
                      </div>

                      <div class="">
                        <a href="/supplier/Home" class="btn btn-info btn-sm p-2">
                          Back to Home
                        </a>
                      </div>
                    </div>
                    <table class="table table-hover">
                      <tr>
                        <th>
                          <label class="text-dark">Image</label>
                        </th>
                        <th>
                          {" "}
                          <label class="text-dark">Food Title</label>
                        </th>
                        <th>
                          {" "}
                          {/* <label class="text-dark">Category</label> */}
                        </th>
                        <th>
                          {" "}
                          <label class="text-dark">Description</label>
                        </th>
                        <th>
                          {""}
                          <label class="text-dark"  >Rate</label>
                        </th>
                        <th>
                          {" "}
                          <label class="text-dark">Stock</label>
                        </th>

                         <th>
                          {" "}
                          <label className="d-flex justify-content-center text-dark">
                            Actions
                          </label>
                        </th>
                      </tr>
                      <tbody style={{color:'white'}}>
                          {this.state.foods.map((food) => (
                            <tr key={food._id}>
                              <td className="tbld">
                                <img
                                  src={`${food.file}`}
                                  alt=""
                                  width="150px"
                                  height="100px"
                                ></img>
                              </td>
                              <td className="tbld">{food.title}</td>
                              <td className="tbld">{}</td>
                              <td className="tbld">{food.description}</td>
                              <td className="tbld">{food.rate}</td>
                              <td className="tbld">{food.stock}</td>
                              
                                                           

                              <td>
                                  <a
                                    href=""
                                    className="btn btn-danger btn-md mr-5"
                                    value={food._id}
                                    onClick={(e) =>
                                      this.deleteScholership(food._id, e)
                                    }
                                  >
                                    <i className="fa fa-trash-o"></i>
                                  </a>
                               </td>
                              
                            </tr>
                          ))}
                        </tbody>

                     
                        
                    </table> 
                   </div>
                 </div>
              </div> 
             </div> 
          </div> 
         </div> 
       </section>
     </div> 
     
    );
  }
}
