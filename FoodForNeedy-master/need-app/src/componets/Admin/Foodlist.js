
import React, { Component } from "react";
import "../CSS/donor.css";
import axios from "axios";

export default class Foodlist extends Component {
  constructor(props) {
    super(props);

    // this.getUser = this.getUser;
    this.state = {
      foods: [],
      
      
    };
    // this.onLogout = this.onLogout.bind(this);
  }
  componentDidMount = async () => {
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(
        ` http://localhost:5000/api/v1/foods`,
        config
      );
      this.setState({
        foods: res.data.data,
      });
    } catch (err) {
      console.log("Can't load the items");
    }
  };
  onDeleteUser = async (user, e) => {
    e.preventDefault();
    // console.log(user);
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`http://localhost:5000/api/v1/foods/${user}`, config);

      alert("Food Deleted");
    } catch (err) {
      console.log("Can't load the items");
    }
  };
  render() {
    
    return (
      <div>
        <section>
          <div id="portfolio">
            <div className="container showtop  login-second ">
              <div className="page-title text-center">
                <h1 className="text-dark">Foods</h1>

                <hr className="pg-titl-bdr-btm" />
              </div>
              <div className="row">
                <div className="col-lg-12 ">{/* categotize */}</div>
              </div>

              <div className="row" id="" style={{ opacity: 1 }}>
                {/*  */}
                <div className="container pt-4">
                  <div className=" tabletrans ">
                    <div className="well">
                      <div className="row mb-5">
                        <div className="col-md-6">
                          {/* <div className="pull-right">
                            <a
                              href="/admin/AddSupplier"
                              className="btn btn-info btn-sm p-2"
                            >
                              Add Supplier
                            </a>
                          </div> */}
                        </div>

                        {/* <div className="pull-left">
                          <a
                            href="/admin/Home"
                            className="btn btn-info btn-sm p-2"
                          >
                            Back to Home
                          </a>
                        </div> */}
                      </div>
                      <table className="table table-hover">
                        <tr>
                          <th>
                            {" "}
                            <label className="text-dark"></label>
                          </th>
                          
                          
                          <th>
                            {" "}
                            <label className="text-dark">Food Title</label>
                          </th>
                          <th>
                            {" "}
                            <label className="text-dark">Description</label>
                          </th>
                          <th>
                            {" "}
                            <label className="text-dark">Rate</label>
                          </th>
                          <th>
                            {" "}
                            <label className="text-dark">Stock</label>
                          </th>
                          <th>
                            {" "}
                            <label className="d-flex justify-content-center text-dark">
                              Actions
                            </label>
                          </th>
                        </tr>
                        {this.state.foods.map((food) => (
                          <tr>
                            <td className="tbld">
                              <img
                              src={`data:image/png;base64,${food.img}`}
                              
                                alt=""
                                width="150px"
                                height="100px"
                              ></img>
                            </td>
                            {/* <td className="tbld text-dark">{food.image}</td> */}
                            <td className="tbld text-dark">{food.title}</td>
                            <td className="tbld text-dark">{food.description}</td>
                            <td className="tbld text-dark">{food.rate}</td>
                            <td className="tbld text-dark">{food.stock}</td>
                            

                            <td className="d-flex justify-content-center tbld">
                              <div className="btn-group ">
                                <a
                                  href=""
                                  className="btn btn-danger btn-md mr-5"
                                  value={food._id}
                                  onClick={(e) =>
                                    this.onDeleteUser(food._id, e)
                                  }
                                >
                                  <i className="fa fa-trash-o"></i>
                                </a>

                                {/* <a href="" className="btn btn-info btn-md">
                                  <i className="fa fa-edit"></i>
                                </a> */}
                              </div>
                            </td>
                          </tr>
                    
                        ))}
                         <div className="pull-left">
                          <a
                            href="/admin/Home"
                            className="btn btn-info btn-sm p-2"
                          >
                            Back to Home
                          </a>
                        </div> 
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
