import React, { Component, useState, Fragment } from "react";
import "./CSS/App.css";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    // this.getUser = this.getUser;
    this.state = {
      email: "",
      password: "",
      type: "",
      isAuth: false,
      
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      type: this.props.match.params.type,
    });
  }

  // Input on change
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // Login
  onSubmit = async (e) => {
    e.preventDefault();

    const login = {
      email: this.state.email,
      password: this.state.password,
    };

    const body = JSON.stringify(login);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // console.log(body);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/auth/login`,
        body,
        config
      );
      console.log(res.data.token);
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("isAuth", true);
      // console.log(sessionStorage);
      this.setState({
        isAuth: true,
      });
    } catch (error) {
      alert("Error Login!!");
    }
  };

  render() {
    const type = this.state.type;
    // console.log(type);
    let social = {};
    let signup, login;
    // if (type === "user") {
    social = "#ffc312";
    signup = <a href={`/signup/${type}`}>Sign Up</a>;

    console.log(type);

    // console.log(isAuthenticated());
    return (
      <Fragment>
        {this.state.isAuth ? (
          type == "supplier" ? (
            <Redirect isAuth={this.state.isAuth} to="/supplier/Home" />
          ) : type == "ngo" ? (
            <Redirect isAuth={this.state.isAuth} to="/ngo/Home" />
          ) : type == "admin" ? (
            <Redirect isAuth={this.state.isAuth} to="/admin/Home" />
          ) : (
            <Redirect isAuth={this.state.isAuth} to="/" />
          )
        ) : (
         <div className="container logintop ">
      
              {/* <div className="jumbotron col-md-6 col-sm-5 " id="login-first"></div> */}
              <div className="jumbotron " id="login-second">
              <div className="fadeInDown">

                <div className="container">
                  <div className="d-flex justify-content-center">
                    <div className="area">
                      <ul className="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="card animated bounce" id="login-card">
                  
                      <div className="card-header">
                        <h3 className="mt-5"> {type} Sign In </h3>
                       </div>
                      <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                          <div className="input-group form-group">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                style={{ background: social }}
                              >
                                <i className="fa fa-user"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              name="email"
                              placeholder="Email"
                              value={this.state.email}
                              onChange={this.onChange}
                            />
                          </div>
                          <div className="input-group form-group">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                style={{ background: social }}
                              >
                                <i className="fa fa-key"></i>
                              </span>
                            </div>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              className="form-control"
                              placeholder="password"
                              value={this.state.password}
                              onChange={this.onChange}
                            />
                          </div>
                          
                       
                          <div className="form-group">
                            <button
                              type="submit"
                              value="Login"
                              name="submit"
                              className="btn float-right login_btn btn-block "
                              
                              style={{
                                backgroundColor: social,
                              }}
                            >
                              Login
                            </button>
                          </div>
                        
                        </form>
                        
                      </div>
                     <div className="center ml-5" id="social-buttons" >
                <a href="http://www.facebook.com" target="blank" class="social-margin"> 
               <div class="social-icon facebook">
               <i class="fa fa-facebook" aria-hidden="true"></i> 
          </div>
          </a>

          <a href="http://linkedin.com/" class="social-margin" target="blank">
          <div class="social-icon linkedin">
            <i class="fa fa-linkedin" aria-hidden="true"></i>
          </div> 
        </a>

        <a href="http://twitter.com/" target="blank" class="social-margin">
          <div class="social-icon twitter">
            <i class="fa fa-twitter" aria-hidden="true"></i>
          </div> 
        </a>
         </div>
                      
                      <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                          Don't have an account?
                          {signup}
                        </div>
                        <div className="d-flex justify-content-center">
                          <a href="/Forgotpsswrd">Forgot your password?</a>

                        
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
  

export default Login;
