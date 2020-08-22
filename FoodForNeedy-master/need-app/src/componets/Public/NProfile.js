import React, { Component } from "react";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Redirect,Link} from 'react-router-dom';
import axios from "axios";



export default class NProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      profile: {},
      file: null,
    };
  }
  componentDidMount = async () => {
    // getting user
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(`http://localhost:5000/api/v1/auth/me`, config);

    this.setState({
      user: res.data.data._id,
    });
    console.log(this.state.user);
    
    // user profile data
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/public/${this.state.user}/me`,
        config
      );
      this.setState({
        profile: res.data.data[0],
      });
      console.log(this.state.profile);
    } catch (err) {
      console.log("Can't load the items");
    }
  };
  
  // fileupload selection
  // onChangeHandler = (e) => {
  //   this.setState({
  //     file: e.target.files[0],
  //   });
  // };
  // File Upload
  onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.file, this.state.file.name);

    console.log(data);
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/publics/${this.state.profile._id}/photo`,
        data,
        config
      );
      // this.setState({
      //   file: res.data.data[0],
      // });
      console.log(res);
      alert("Profile Updated");
    } catch (err) {
      console.log("Can't load the items");
    }
  };
 
  render() {
    const {
        user,
        name,
        dob,
        address,
        phone,
        email,
        file,
      
    } = this.state.profile;
    console.log(file);
    return (
      <div>
               <div className=" mt-5 pt-5 profile">
               <article>
                  <div className="">
                     {/* <h1 className="text-center">User Profile</h1>
      //               <p className="lead">Jumbo helper text</p> */}
                    <div className="box-body row">
                      <div className="col-lg-6">
                         <div align="center">
                           <a
                            href="#myModal"
                            data-toggle="modal"
                            data-target="#myModal"
                          >
                            <div className="well form">
                            <img
                          src={`${file}`}
                          className="img-responsive"
                          id="profile-image1"
                        />
                      </div>
                    </a>{" "}
                    <div>User Avatar</div>
                  </div>
                </div>
       
               <div className="col-lg-6 col-md-6 col-sm-6">
                <h4 style={{ color: "piank" }}>User Name </h4>
                <div className="">
                    <label name="name">{name}</label>
                  </div> 
                  <h4 style={{ color: "piank" }}>dob </h4>
                  <div className="">
                    <label name="website">{dob}</label>
                  </div> 
                  
                  {/* <div className="row">
                    <div className="col-md-5">
                      <label name="state">State</label>
                    </div>
                    <div className="col-md-5">
                      <label name="country">Country</label>
                    </div>
                  </div> */}
                </div>
              </div>
              <hr className="my-2" />
              {/* <div className="d-flex justify-content-end showdtl ">
                <a
                  value="More"
                  type="text"
                  name="More"
                  className=" btn"
                  style={{ width: 10 + "%" }}
                >
                  More
                </a>
              </div> */}

              <div className="ex1  ">
                <label htmlFor="item-1" className="toggle btn   row">
                  More
                </label>
                <input type="checkbox" name="one" id="item-1" />
                {/* </div> */}
                <div className=" hide ">
                  <div className="card-body row" id="">
                    <div className="col-md-3">
                      <h4 className="card-title ">Address</h4>
                      <div className="col-md-4">
                        <label name="address">{address}</label>
                      </div>
                      
                      
                      
                      
                    </div>
                    <hr></hr>

                    <div className="col-md-3">
                      <h4>Contact</h4>
                      <div className="">
                        <label name="phone">{phone}</label>
                      </div>
                      <div className="">
                        <label name="email">{email}</label>
                      </div>
                      {/* <div className="col-md-4">
                        <label name="mob">Mobile</label>
                      </div> */}
                    </div>
                    <hr></hr>

                    {/* <div className="col-md-6">
                      <h4>dob</h4>
                      <div className="">
                        <label name="description">{dob}</label>
                      </div> 
                    </div> */}
                    
                    
                    <hr></hr>
                  </div>
                </div>
              </div>
            </div>
            
                      
                      
                              
            
          </article>

          {/* <div id="myModal" className="modal show" role="dialog">
            <div className="modal-dialog modal-sm">
              <div className="modal-content  text-dark">
                <div className="modal-header">
                  <h4 className="modal-title">Change Profile</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <form encType="multipart/form-data" onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label>Upload Image:</label>
                      <input
                        type="file"
                        name="file"
                        className="form-control"
                        onChange={this.onChangeHandler}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>User:</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={name}
                        required
                        readOnly
                      />
                    </div>

                    <div className="modal-footer">
                      <div className="btn-group">
                        <button
                          type="submit"
                          name="submit"
                          className="btn btn-primary"
                        >
                          Upload
                        </button>
                        <button
                          type="button"
                          className="btn btn-default"
                          data-dismiss="modal"
                        >
                          Close
                        </button> */}
                      {/* </div> */}
                    {/* </div> */}
                  {/* </form> */}
                {/* </div>
               </div>
            </div>
          </div>
        </div>
       </div> */}
       </div>
       </div>
    );
  }
}
