import React, { Component, Fragment } from "react";
import logo from "../../assets/logo1.gif";
import "../CSS/donor.css";
import axios from "axios";

class MainHome extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [] };
  }

  componentDidMount = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/category/",
        config
      );
      this.setState({
        categories: res.data.data,
      });
      console.log(res.data.data);
    } catch (err) {
      console.log("Can't load the items");
    }
  };
  onDeleteCategory = async (category, e) => {
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
      await axios.delete(
        `http://localhost:5000/api/v1/category/${category}`,
        config
      );

      alert("Category Deleted");
    } catch (err) {
      console.log("Can't load the items");
    }
  };
  render() {
    return (
      <Fragment>

        <section className="counts section-bg mt-5">
          <div className="container mt-5">
            <div className="row">
              <div
                className="col-lg-12 text-center animated fadeInUp wow animated"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div>
                  <div className="row">
                    <div className=" col-lg-12 mb-50">
                      <h2 style={{color:'black'}}> List of Category</h2>
                      <div className="row mt-5" id="category">
                        <div className="col-md-12">
                          <div className="card">
                            <div className="card-body">
                              <h4 className="card-title" style={{ color: "black" }}>Category</h4>{" "}
                              <div className="pull-right mb-2">
                                <div className="text-center">
                                  <a
                                    type="button"
                                    className="btn btn-primary"
                                    href="/admin/Categorys"
                                  >
                                    <i className="fa fa-plus fa-1x">
                                      Add Category
                                    </i>
                                  </a>
                                </div>
                              </div>
                              <div className="table-responsive ">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th style={{ color: "black" }}> No. </th>
                                      <th style={{ color: "black" }}> Name </th>

                                      <th style={{ color: "black" }}> Action </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.categories.map(
                                      (category, index) => (
                                        <tr key={category._id}>
                                          <td style={{ color: "black" }}>{index + 1} </td>
                                          <td style={{ color: "black" }}>{category.catname} </td>

                                          <td className="actions" data-th="">
                                            <button
                                              className="btn btn-danger btn-sm"
                                              onClick={(e) =>
                                                this.onDeleteCategory(
                                                  category._id,
                                                  e
                                                )
                                              }
                                            >
                                              <i className="fa fa-trash-o"></i>
                                            </button>
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default MainHome;
