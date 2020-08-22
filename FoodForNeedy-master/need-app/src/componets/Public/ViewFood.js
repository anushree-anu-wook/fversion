import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'

class ViewScholership extends Component {
    state = {
        foods: [],
        food_id:this.props.location.state.food_id,
        apply:false
     };
     componentDidMount = async () => {
       const token = sessionStorage.getItem("token");
       const config = {
         headers: {
             Authorization: `Bearer ${token}`,
             "Content-Type": "application/json",
           },
         };
  
       const res = await axios.get(`http://localhost:5000/api/v1/foods/${this.state.food_id}`, config);   
       this.setState({
        foods: res.data.data,
       });        
         
         console.log(this.state.foods);    
     };
   
    render() {
        const {
        file,
        title,
        category,
        rate,
        stock,
        description,
        }= this.state.foods;

        
        return (
          <div className="pt-5" style={{color:'white'}}>
              <div className="card pt-5 mx-auto">
               
              <table class="table table-hover ml-4 mr-4">
                      <tr>
                        <th>
                          <label class="">Image</label>
                        </th>
                        <th>
                         
                          <label class="">Food Title</label>
                        </th>
                        <th>
                          {" "}
                          {/* <label class="">Category</label>  */}
                        </th>
                        <th>
                          {" "}
                          <label class="">Description</label>
                        </th>
                        <th>
                          {" "}
                          <label class="">Rate</label>
                        </th>
                        <th>
                          {" "}
                          <label class="">Stock</label>
                        </th>
                        
                                 
                      </tr>
                      <tbody style={{backgroundColor:'skyblue'}}>
                         <tr >
                              <td className="tbld">
                                <img
                                  src={file}
                                  alt=""
                                  width="150px"
                                  height="100px"
                                />
                              </td>
                              <td  style={{color:'black'}}>{title}</td>
                              <td  style={{color:'black'}}>{}</td>
                              <td  style={{color:'black'}}>{description}</td>
                              <td  style={{color:'black'}}>{rate}</td>
                              <td  style={{color:'black'}}>{stock}</td>
                              
                                                                  
                            </tr>
                     
                        </tbody>

                     </table> 
              </div>
          </div>
         )
    }

}
export default ViewScholership
