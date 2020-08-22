import React, { Component,Fragment } from 'react'
import axios from 'axios'
import {Link,Redirect} from 'react-router-dom'

export default class reviewlist extends Component {
    state = {
        reviews: [],
        review_id:"",
        review_name:"",
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
        const res = await axios.get(` http://localhost:5000/api/v1/reviews`, config);
          this.setState({
          reviews: res.data.data,
        });
          console.log(this.state.reviews);
               
      };
      deleteEvent = async (id,user, e) => {
        alert("You Want To Delete this review?");
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
          try {
            const res = await axios.delete(`http://localhost:5000/api/v1/reviews/${id}`,config); 
            // const reslt=await axios.delete(`http://localhost:5000/api/v1/auth/${id}`,config)
            window.location.reload();
           } catch (error) {
            alert("something wrong");
           }
               
    }
  
      getreviewId = async (id,name, e) => {
        e.prreviewDefault();
        this.setState({
            review_id: id,
            review_name:name,
            view:true,
        });
        console.log(id)
    }

 render() {
        return (
        //     <Fragment>
        //  {this.state.view ?
        //  ( 
        //      (<Redirect view={this.state.view} 
        //        to={{pathname:'',
        //                state:{project_id:this.state.project_id,
        //                       project_name:this.state.project_name}
        //            }} 
        //        />) 
        //     )
        //  : 
        //  (
            <div id="portfolio" className="container-fluid">
                {/* <div className="card"> */}
               
                <table class="table table-bordered">
              
                    <thead>
                    <tr>
                         <th style={{ color: "black" }}>Name</th>
                         <th style={{ color: "black" }}>Email</th>
                         <th style={{ color: "black" }}>Subject</th>
                         <th style={{ color: "black" }}>Message</th>
                          <th>Action</th>
                    </tr>
                    </thead>
              
                    <tbody>
                    {this.state.reviews.map((review)=>(
                    <tr>
                        {/* <td className="card"><img  id="show" src={review.file}/></td> */}
                        <td style={{ color: "black" }}>{review.name}</td>
                        {/* <td>{review.category}</td> */}
                        <td style={{ color: "black" }}>{review.email}</td>
                        {/* <td>{review.college}</td> */}
                        <td style={{ color: "black" }}>{review.subject}</td>
                        <td style={{ color: "black" }}>{review.message}</td>
                        {/* <td>{review.review_date}</td>
                        <td>{review.fees}</td> */}
                        <td>
                        {/* <button className="btn btn-success  mb-2 mr-2 btn-sm"><i class="fa fa-pencil-square" aria-hidden="true"></i></button> */}
                            <button className="btn btn-danger mb-2 mr-2  btn-sm" 
                            onClick={(e) =>this.deleteEvent(review._id,review.user,e)}><i class="fa fa-window-close" aria-hidden="true"></i></button>
                        </td>

                    </tr>
                    ))}
                    </tbody>
                </table>  
               
                
            </div>
        //  )}
        //  </Fragment>
        )
    }
}
