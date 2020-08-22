import React, { Component } from "react";
import "../CSS/donor.css";

import axios from "axios";

export default class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      catname: "",
      // contact: "",
      // email: "",
      // duration: "",
      // categories: [],
      // category: "",
      // file: null,
    };
    this.onChange = this.onChange.bind(this);
    // this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }
  componentDidMount = async () => {};
  // Input on change
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // fileupload
  // onChangeHandler = (e) => {
  //   this.setState({
  //     file: e.target.files[0],
  //   });
  // };
  onSubmit = async (e) => {
    e.preventDefault();
    // const data = new FormData();
    // data.append("file", this.state.file, this.state.file.name);

    // console.log(data);
    const token = sessionStorage.getItem("token");
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "multipart/form-data",
    //   },
    // };
    try {
      // const res = await axios.post(
      //   `http://localhost:5000/api/v1/doctor/photo`,
      //   data,
      //   config
      // );
      // console.log(res.data.data);

      const foods = {
        catname: this.state.catname,
      };
      const body = JSON.stringify(foods);
      console.log(body);
      const config1 = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const result = await axios.post(
        `http://localhost:3000/api/v1/category`,
        body,
        config1
      );
      console.log(result);
      alert(`Category Added`);
    } catch (err) {
      // console.log("Can't load the items");
    }
  };

  render() {
    return (
      <div className="container itmtop">
        <div className="">
          {/* <div className="jumbotron col-md-6 col-sm-5 " id="login-first"></div> */}
          <div className="" id="">
            <div className=" p-t-60 p-b-30 ">
              <div className="wrapper wrapper--w900 ">
                <div className="card cardH card-6  bg-dark">
                  <div className="card-heading m-4">
                    <h2 className="title address3 text-dark">Add Category</h2>
                  </div>
                  <div className="card-body">
                    <form
                      onSubmit={this.onSubmit}
                      encType="multipart/form-data"
                    >
                      {/* <div className="form-row frow">
                        <div className="name">Upload Image:</div>
                        <div className="value">
                          <div className="input-group js-input-file">
                            <input
                              className="input-file"
                              type="file"
                              name="file"
                              id="file"
                              onChange={this.onChangeHandler}
                            />
                            <label className="label--file" htmlFor="file">
                              Choose file
                            </label>
                          </div>
                          <div className="label--desc">
                            Upload your Document/Id proff or any other relevant
                            file. Max file size 50 MB
                          </div>
                        </div>
                      </div> */}

                      <div className="form-row frow">
                        <div className="name">Catname</div>
                        <div className="value">
                          <div className="input-group">
                            <input
                              className="input--style-6"
                              type="text"
                              name="catname"
                              placeholder=""
                              value={this.state.catname}
                              onChange={this.onChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="card-footer">
                        <button
                          className="btn btn--radius-2 btn-dark"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
