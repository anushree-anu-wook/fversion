import React, { Component } from "react";
import axios from "axios";

export default class addFoods extends Component {
  constructor(props) {
    super(props);

    this.state = 
    {
      category: [],
        title: "",
        description:"",
        rate: "",
        stock: "",
        file: null,
        cat: "",
     
    };
    this.onChange = this.onChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }
  componentDidMount=async () => {
    const config={
      headers:{
        "Content-Type":"application/json",
      }
    }

    try {
      const res=await axios.get(`http://localhost:5000/api/v1/category`,config
      );
      this.setState({
        category:res.data.data,
      })
      // console.log(this.state.category)
    } catch (error) {
      console.log("cannot load scheme")
    }
  }
  // Input on change
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  // Dropdown change
  handleDropdownChange(e) {
    this.setState({ cat: e.target.value });
  }
  fileupload
  onChangeHandler = (e) => {
    this.setState({
      file: e.target.files[0],
    });
    console.log(e.target.files[0])
  };
  onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.file);

    // console.log(data);
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/foods/photo`,
        data,
        config
      );
      console.log(res.data.data);

      const schemes = {
        title:this.state.title,
        description:this.state.description,
        category:this.state.cat,
        rate:this.state.rate,
        stock:this.state.stock,
        file: res.data.data,
      };
      const body = JSON.stringify(schemes);
      // console.log(body);
      const config1 = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
       };
    console.log(config1)
      const result = await axios.post(
        `http://localhost:5000/api/v1/foods`,
        body,
        config1
      );
      console.log(result.data.data);
       alert(`Scheme Added ${result.data.data.title}`);
    } catch (err) {
      console.log("Can't load the items");
    }
  };

  render() {
    return (
      <div className="container itmtop">
        {console.log(this.state)}
        <div className="addfoods">
          {/* <div className="jumbotron col-md-6 col-sm-5 " id="login-first"></div> */}
          <div className="" id="login-second">
            <div class="page-wrapper p-t-50 p-b-50">
              <div class="wrapper wrapper--w900 ">
                <div class="card cardH card-6 ">
                  <div class="card-heading m-4">
                    <h2 >Add Food</h2>
                  </div>
                  <div class="card-body">
                    <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    {/* <form onSubmit={this.onSubmit}> */}
                      <div class="form-row frow">
                        <div class="name">Title:</div>
                        <div class="value">
                          <input
                            class="input--style-6"
                            type="text"
                            name="title"
                            placeholder="Food Name"
                            value={this.state.title}
                            onChange={this.onChange}
                            required                      
                      />
                        </div>
                      </div>

                      <div class="form-row frow">
                        <div class="name">Description:</div>
                        <div class="value">
                          <input
                            class="input--style-6"
                            type="text"
                            name="description"
                            placeholder="Supplier name,Food description"
                            value={this.state.description}
                            onChange={this.onChange}
                            required                      
                      />
                        </div>
                      </div>
                      
                      <div class="form-row frow">
                        <div class="name">Upload Images:</div>
                        <div class="value">
                        <div className="col-md-6">
                            <input type="file" name="file"
                            onChange={this. onChangeHandler} class="form-control-file" id="exampleFormControlFile1"/>
                        </div>
                            
                          </div>
                          <div class="label--desc">
                            Upload your Document/Id proff or any other relevant
                            file. Max file size 50 MB
                          </div>
                        </div>
                      
                      <div class="form-row frow">
                        <div class="name">Rate</div>
                        <div class="value">
                          <div class="input-group">
                            <input
                              class="input--style-6"
                              type="text"
                              name="rate"
                              value={this.state.rate}
                              onChange={this.onChange}
                              placeholder="Food Rate"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-row frow">
                        <div class="name">Select category</div>
                        <select
                          // id="dropdown "
                          className="btn bg-success"
                          onChange={this.handleDropdownChange}
                        >
                          <option value="no cat">None</option>
                                    {this.state.category.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                        {cat.catname}
                                        </option>
                                     ))}
                         
                        </select>
                      </div>
                      {/* <div class="form-row frow">
                        <div class="name">Upload Project Synopsis:</div>
                        <div class="value">
                          <div class="input-group js-input-file">
                            <input
                              class="input-file"
                              type="file"
                              name="file_doc"
                              id="file"
                            />
                            <label class="label--file" for="file">
                              Choose file
                            </label>
                            <span class="input-file__info">No file chosen</span>
                          </div>
                          <div class="label--desc">
                            Upload your Document/Id proff or any other relevant
                            file. Max file size 50 MB
                          </div>
                        </div>
                      </div> */}
                    
                  
                      <div class="form-row frow">
                        <div class="name">Stock</div>
                        <div class="value">
                          <div class="input-group">
                            <input
                              class="input--style-6"
                              type="text"
                              name="stock"
                              value={this.state.stock}
                              onChange={this.onChange}
                              placeholder="Food Stocks"
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div class="form-row frow">
                        <div class="name">Select Type</div>
                        <select
                          id="dropdown "
                          className="btn bg-success"
                          onChange={this.handleDropdownChange}
                        >
                          
                         <option value="N/A">N/A</option>
                          <option value="1">school</option>
                          <option value="2">graduation</option>
                          <option value="3">Pg</option>
                          <option value="4">phd</option> 
                        </select>
                      </div> */}
                      {/* <div class="form-row frow">
                        <div class="name">Phone Number</div>
                        <div class="value">
                          <div class="input-group">
                            <input
                              class="input--style-6"
                              type="email"
                              name="email"
                              placeholder=""
                            />
                          </div>
                        </div>
                      </div> */}
                   
                     
                      {/* <div class="form-row frow">
                        <div class="name">Email</div>
                        <div class="value">
                          <div class="input-group">
                            <input
                              class="input--style-6"
                              type="email"
                              name="email"
                              placeholder=""
                            />
                          </div>
                        </div>
                      </div> */}
                       <div class="card-footer">
                    <input type="submit" value="Add" class="btn btn--radius-2 btn-gray" />
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
