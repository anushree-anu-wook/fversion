import React, { Component } from "react";
import "../CSS/donor.css";
import axios from "axios";

export default class Showsuppliers extends Component {
  constructor(props) {
    super(props);

    // this.getUser = this.getUser;
    this.state = {
      users: [],
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
        ` http://localhost:5000/api/v1/public`,
        config
      );
      this.setState({
        users: res.data.data,
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
      await axios.delete(`http://localhost:5000/api/v1/users/${user}`, config);

      alert("NGO Deleted");
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
                <h1 className="text-dark">NGO</h1>

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
                            <label className="text-dark">Name</label>
                          </th>
                        
                          
                          <th>
                            {" "}
                            <label className="text-dark">Phone</label>
                          </th>
                          <th>
                            {" "}
                            <label className="text-dark">Email</label>
                          </th>
                          <th>
                            {" "}
                            <label className="text-dark">DOB</label>
                          </th>
                          <th>
                            {" "}
                            <label className="text-dark">Address</label>
                          </th>
                          <th>
                            {" "}
                            <label className="d-flex justify-content-center text-dark">
                              Actions
                            </label>
                          </th>
                        </tr>
                        {this.state.users.map((user) => (
                          <tr>
                            <td className="tbld">
                              <img
                                src={`data:image/png;base64,${user.img}`}
                                alt=""
                                width="150px"
                                height="100px"
                              ></img>
                            </td>
                            <td className="tbld text-dark">{user.name}</td>
                            <td className="tbld text-dark">{user.phone}</td>
                            <td className="tbld text-dark">{user.email}</td>
                            <td className="tbld text-dark">{user.dob}</td>
                            <td className="tbld text-dark">{user.address}</td>
                            

                            <td className="d-flex justify-content-center tbld">
                              <div className="btn-group ">
                                <a
                                  href=""
                                  className="btn btn-danger btn-md mr-5"
                                  value={user._id}
                                  onClick={(e) =>
                                    this.onDeleteUser(user._id, e)
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
                        

                        {/* <tr>
                          <td className="tbld">
                            <img
                              src="data:image/png;base64,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"
                              alt=""
                              width="150px"
                              height="100px"
                            ></img>
                          </td>
                          <td className="tbld text-dark">2</td>
                          <td className="tbld text-dark">3</td>
                          <td className="tbld text-dark">g</td>

                          <td className="d-flex justify-content-center tbld">
                            <div className="btn-group ">
                              <a href="" className="btn btn-danger btn-md mr-5">
                                <i className="fa fa-trash-o"></i>
                              </a>

                              <a href="" className="btn btn-info btn-md">
                                <i className="fa fa-edit"></i>
                              </a>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td className="tbld">
                            <img
                              src="data:image/png;base64,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"
                              alt=""
                              width="150px"
                              height="100px"
                            ></img>
                          </td>
                          <td className="tbld text-dark">2</td>
                          <td className="tbld text-dark">3</td>
                          <td className="tbld text-dark">g</td>

                          <td className="d-flex justify-content-center tbld">
                            <div className="btn-group ">
                              <a href="" className="btn btn-danger btn-md mr-5">
                                <i className="fa fa-trash-o"></i>
                              </a>

                              <a href="" className="btn btn-info btn-md">
                                <i className="fa fa-edit"></i>
                              </a>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td className="tbld">
                            <img
                              src="data:image/png;base64,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"
                              alt=""
                              width="150px"
                              height="100px"
                            ></img>
                          </td>
                          <td className="tbld text-dark">2</td>
                          <td className="tbld text-dark">3</td>
                          <td className="tbld text-dark">g</td>

                          <td className="d-flex justify-content-center tbld">
                            <div className="btn-group ">
                              <a href="" className="btn btn-danger btn-md mr-5">
                                <i className="fa fa-trash-o"></i>
                              </a>

                              <a href="" className="btn btn-info btn-md">
                                <i className="fa fa-edit"></i>
                              </a>
                            </div>
                          </td>
                        </tr> */}
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
