import React, { Component, history, Fragment } from "react";
import "../CSS/App.css";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

export default class addpublic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      dob: "",
      address: "",
      phone: "",
      email: "",
      auth: false,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount = async () => {
    console.log(this.props.location.state.token);
  };

  // Input on change
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  // fileupload
  onChangeHandler = (e) => {
    this.setState({
      file: e.target.files[0],
    });
  };
  // update details
  onSubmitDeatils = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.file, this.state.file.name);
    const token = this.props.location.state.token;
    // console.log(data);
    // const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/public/photo`,
        data,
        config
      );

      const details = {
        name: this.state.name,
        address: this.state.address,
        phone: this.state.phone,
        dob: this.state.dob,
        email: this.state.email,
        photo: res.data.data,
      };
      console.log(token);
      const body = JSON.stringify(details);
      const config1 = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const res1 = await axios.post(
        `http://localhost:5000/api/v1/public/`,
        body,
        config1
      );
      console.log(res1);
      alert("Profile Added");
      this.setState({
        auth: true,
      });
      // <Redirect to="/user/Home" />;
    } catch (err) {
      console.log("Can't load the items");
    }
  };

  render() {
    console.log(this.state);
    // const profile = this.state.profile;
    return (
      <Fragment>
        {this.state.auth == "true" ? (
          <Redirect to="/" />
        ) : (
          <div className="container ">
            <div className="container mt-5  ">
              <div className=" mt-5 pt-5">
                {/* <div className="jumbotron col-md-6 col-sm-5 " id="login-first"></div> */}
                <div className="jumbotron" id="login-second">
                  <div className="">
                    <div className="wrapper wrapper--w900">
                      <div className="card cardH card-6 bg-dark">
                        <div className="card-heading">
                          <h2 className="title text-primary m-3">Profile</h2>
                        </div>
                        <div className="card-body  text-dark">
                          <form
                            className="form-horizontal"
                            onSubmit={this.onSubmitDeatils}
                          >
                            {/* <fieldset> */}
                            <div className="form-group">
                              <label
                                className="control-label"
                                htmlFor="Date Of Birth"
                              >
                                <h5>Name</h5>
                              </label>
                              <div className="">
                                <div className="input-group">
                                  <div className="input-group-addon">
                                    <i className="fa fa-user fa-2x p-1"></i>
                                  </div>
                                  <input
                                    id="Name"
                                    name="name"
                                    type="text"
                                    placeholder=""
                                    className="form-control input-md"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="form-group">
                              <label
                                className="control-label"
                                htmlFor="Date Of Birth"
                              >
                                <h5>Date Of Birth</h5>
                              </label>
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
                            </div>

                            <div className=" form-group">
                              <label
                                className="control-label col-xs-12"
                                htmlFor="Permanent Address"
                              >
                                <h5>Permanent Address</h5>
                              </label>

                              <div className="row mt-2">
                                <div className="col-md-12  col-xs-12">
                                  <input
                                    id="Permanent Address"
                                    name="address"
                                    type="text"
                                    placeholder=""
                                    value={this.state.address}
                                    onChange={this.onChange}
                                    className="form-control input-md "
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="form-group">
                              <label
                                className=" control-label"
                                htmlFor="Phone number "
                              >
                                <h5>Contact Detail</h5>{" "}
                              </label>
                              <div className="">
                                <div className="input-group m-1 mb-3">
                                  <div className="input-group-addon">
                                    <i className="fa fa-phone fa-2x p-1"></i>
                                  </div>
                                  <input
                                    id="Phone number "
                                    name="phone"
                                    type="text"
                                    placeholder=""
                                    value={this.state.phone}
                                    onChange={this.onChange}
                                    className="form-control input-md"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="">
                                <div className="input-group">
                                  <div className="input-group-addon">
                                    <i className="fa fa-envelope-o fa-2x p-1"></i>
                                  </div>
                                  <input
                                    id="Email Address"
                                    name="email"
                                    type="text"
                                    placeholder=""
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    className="form-control input-md"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="">
                                <div className="input-group">
                                  <div className="input-group-addon">
                                    Photo Upload :
                                  </div>
                                  <input
                                    name="file"
                                    type="file"
                                    placeholder=""
                                    id="file"
                                    onChange={this.onChangeHandler}
                                    className="form-control-file input-md"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* <div className="form-group row justify-content-center"> */}
                            {/* <div className="col-md-6 "> */}
                            {/* <a className="btn btn-success" type="submit">
                    <span className="glyphicon glyphicon-thumbs-up"></span>{" "}
                    Submit
                  </a> */}
                            <div className="form-group">
                              <button
                                type="submit"
                                value="Submit"
                                name="submit"
                                className="btn btn-dark float-right mb-1"
                                // style={{
                                //   backgroundColor: social,
                                // }}
                              >
                                Submit
                              </button>
                            </div>
                            {/* </div> */}
                            {/* </div> */}
                            {/* </fieldset> */}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}
