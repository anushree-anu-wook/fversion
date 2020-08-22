import React, { Component } from "react";
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import logo from "../../assets/logo1.gif";

export default class Navbar extends Component {
  state = {
    loggedIn: true,
    categories:[],
    email: "",
      password: "",
      type: "",
      user: "",
      isAuth: null,
  };
  
  componentDidMount = async () => {
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
     
    const res = await axios.get(`http://localhost:5000/api/v1/category`, config);   
    this.setState({
        categories: res.data.data,
        
    });  
    console.log(this.state.categories)      
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
      <nav className="navbar navbar-default navbar-expand-md fixed-top navbar-trans navf">
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
          <a className="logo top1" href="/ngo/Home">
            <img src={logo} alt="" className=""></img>
            {/* Farm
            <span className="color-b">Easy</span> */}
          </a>
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
                <a className="nav-link " href="/ngo/Home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/ngo/AddProfile">
                  AddProfile
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link " href="/ngo/SupplierList">
                  Suppliers
                </a>
              </li>
             
            
  
<li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                   Category
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {this.state.categories.map((cat) => ( 
                  <Link className="dropdown-item" to={{pathname:"/ngo/categorywise",state:{cat_id:cat._id}}}>
                    {cat.catname}
                  </Link>
                   ))} 
                </div>
              </li>
              </ul>
          </div>
          <ul className="navbar-nav mr-5">
            {" "}
            <li className="nav-item dropdown">
              <a
                className="nav-link "
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"
                  width="50"
                  height="50"
                  className="rounded-circle content-center"
                />
                {this.state.user.name}
              </a>
              <div className="dropdown-menu" >
               <a
                  className=" "
                  href="/supplier/Home"
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"
                    width="50"
                    height="50"
                    className="rounded-circle content-center"
                  />
                  {this.state.user.name}
                </a> 

               <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              > 
              <a className="dropdown-item" href="/ngo/NProfile">
                  Profile
                  </a>
                  {/* <a className="dropdown-item" href="/supplier/editProf">
                  Profile
                  </a> */}
              <a
                  type="submit"
                  className="dropdown-item" href="/"
                  poiter="cursor"
                  onClick={this.onLogout}
                >
                  <span
                    className="fa fa-sign-out fa-2x"
                    style={{ color: "#f2f2f3  " }}
                    aria-hidden="true"
                    href="/"
                  ></span>
                  Log Out
                </a>
              </div>
              </div>
              </li>
              </ul>
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
