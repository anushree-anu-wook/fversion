import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'


class ViewScholership extends Component {
    state = {
        suppliers: [],
        supplier_id:this.props.location.state.supplier_id,
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
  
       const res = await axios.get(`http://localhost:5000/api/v1/suppliers/${this.state.supplier_id}`, config);   
       this.setState({
        suppliers: res.data.data,
       });        
         
         console.log(this.state.suppliers);    
     };
   
    render() {
        const {
        file,
        name,
        phone,
        email,
        website,
        description,
        address,
        }= this.state.suppliers;

        
        return (
          <div className="pt-5" style={{color:'black'}}>
              <div className="card pt-5 mx-auto">
               
              <table class="table table-hover ml-4 mr-4">
                      <tr>
                        {/* <th>
                          <label class="">Image</label>
                        </th> */}
                        <th>
                         
                          <label class="">Name</label>
                        </th>
                        <th>
                          {" "}
                          <label class="">Description</label>
                        </th>
                        <th>
                          {" "}
                          <label class="">Phone</label>
                        </th>
                        <th>
                          {" "}
                          <label class="">Email</label>
                        </th>
                        <th>
                          {" "}
                          <label class="">Website</label>
                        </th>
                        <th>
                          {" "}
                          <label class="">Address</label>
                        </th>
                                 
                      </tr>
                      <tbody style={{backgroundColor:'skyblue '}}>
                         <tr >
                              {/* <td className="tbld">
                                <img
                                  src={file}
                                  alt=""
                                  width="150px"
                                  height="100px"
                                /> */}
                              {/* </td> */}
                              <td  style={{color:'black'}}>{name}</td>
                              <td  style={{color:'black'}}>{description}</td>
                              <td  style={{color:'black'}}>{phone}</td>
                              <td  style={{color:'black'}}>{email}</td>
                              <td  style={{color:'black'}}><a href={website}>{website}</a></td>
                              <td  style={{color:'black'}}>{address}</td>
                              
                                                                  
                            </tr>
                     
                        </tbody>

                     </table> 
              </div>
          </div>
         )
    }

}
export default ViewScholership
