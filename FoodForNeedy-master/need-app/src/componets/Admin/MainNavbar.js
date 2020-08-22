import React, { Component } from "react";
import logo from "../../assets/logo1.gif";
import axios from "axios";

export default class MainNavbar extends Component {
  constructor(props) {
    super(props);

    // this.getUser = this.getUser;
    this.state = {
      email: "",
      password: "",
      type: "",
      user: "",
      isAuth: null,
    };
    this.onLogout = this.onLogout.bind(this);
  }
  componentDidMount = async () => {
    this.setState({
      isAuth: sessionStorage.getItem("isAuth"),
    });
    // getting user
    if (this.state.isAuth) {
      const token = sessionStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(
        `http://localhost:5000/api/v1/auth/me`,
        config
      );
      this.setState({
        user: res.data.data,
      });
    }
  };
  onLogout = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.get("http://localhost:5000/api/v1/auth/logout", config);
      sessionStorage.removeItem("token", "isAuth");
      alert("Logged Out");
      this.setState({
        isAuth: false,
      });
    } catch (err) {
      console.log("Can't load the items");
    }
    sessionStorage.clear();
  };
  render() {
    // let cart;
    let profile, logout;
    if (this.state.isAuth === "true") {
      profile = (
        <ul className="navbar-nav" style={{ decoration: "none" }}>
          {" "}
          <li className="nav-item dropdown">
            <a
              className="nav-item "
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span
                className="fa fa-user-circle fa-2x"
                style={{ color: "#f2f2f3  " }}
                aria-hidden="true"
              ></span>{" "}
              {this.state.user.name}
            </a>

            <div className="dropdown-menu" aria-labelledby="profileDropdown">
              <div className="dropdown"></div>
              <a
                type="submit"
                className="dropdown-item"
                poiter="cursor"
                onClick={this.onLogout}
                path="/"
              >
                <span
                  className="fa fa-sign-out fa-2x"
                  style={{ color: "#f2f2f3  " }}
                  aria-hidden="true"
                  path="/"
                ></span>
                Log Out
              </a>
            </div>
          </li>
        </ul>
      );
      // logout = (
      //   <a
      //     type="b                                                       utton"
      //     className="btn  navbar-toggle-box-collapse d-none d-md-block "
      //     href="/Login/farmer"
      //     title="Logout"
      //   >
      //     <span
      //       className="fa fa-sign-out fa-2x"
      //       style={{ color: "#f2f2f3  " }}
      //       aria-hidden="true"
      //     ></span>
      //   </a>
      // );
    } else {
      profile = (
        <a
          type="button"
          className="btn  navbar-toggle-box-collapse d-none d-md-block "
          href="/"
          title="Profile"
        >
          <span
            className="fa fa-user fa-2x"
            style={{ color: "#f2f2f3  " }}
            aria-hidden="true"
          ></span>
        </a>
      );
    }
    return (
      <nav className="navbar navbar-default navbar-expand-md fixed-top navbar-trans">
        <div className="container">
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarDefault"
            aria-controls="navbarDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          {/* <a className="logo top1" href="/user/Home"> */}
          <li className="nav-item">
                <a className="nav-link " href="/">
                 NeedyFeedy
                </a>
              </li>
          {/* </a> */}
          <button
            type="button"
            className="btn btn-link nav-search navbar-toggle-box-collapse d-md-none"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-expanded="false"
          >
            <span className="fa fa-search" aria-hidden="true"></span>
          </button>
          <div
            className="navbar-collapse collapse justify-content-center"
            id="navbarDefault"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link " href="/admin/Home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/admin/Showsuppliers">
                  SupplierList
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/admin/Showpublic">
                PublicList
                </a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link " href="/admin/Foodlist">
                  Foodlist
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/admin/Showreview">
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {profile}
          {logout}
          {/* <button
            type="button"
            className="btn btn-b-n navbar-toggle-box-collapse d-none d-md-block"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-expanded="false"
          >
            <span className="fa fa-search" aria-hidden="true"></span>
          </button> */}
          {/* <a
            type="button"
            className="btn navbar-toggle-box-collapse d-none d-md-block "
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-expanded="false"
            href="/cart"
            title="Cart"
          >
          
          </a> */}
        </div>
      </nav>
    );
  }
}
