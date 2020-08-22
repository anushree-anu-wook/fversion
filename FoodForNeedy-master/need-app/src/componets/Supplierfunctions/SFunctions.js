
import React, { Component } from "react";
import axios from "axios";

import "../CSS/Home.css";

//import "../CSS/animate.css";
// "../CSS/App.css";
import Alert from "./Alert";
import SFooter from "./SFooter";
import SHome from "./SHome";
import SNavbar from "./SNavbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ShowFoods from "./ShowFoods";
import AddFoods from "./addFoods";
import Profile from "./Profile";
import editProf from "./editProf";
import addProfile from "./AddProfile"
import AddProfile from "./AddProfile";
import ViewFood from './ViewFood';


export default class SFunctions extends React.Component {
  state = {
    //users: [],
    foods: [],
    category: [],
  };

  getCategory = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/category/",
        config
      );
      this.setState({
        category: res.data.data,
      });
    } catch (err) {
      console.log("Can't load the item");
    }
  };

  getfoods = async () => {
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(
        ` http://localhost:3000/api/v1/foods`,
        config
      );
      this.setState({
        foods: res.data.data,
      });
    } catch (err) {
      // console.log("Can't load the foods");
    }
  };

  render() {
    return (
      <Router>
        {/* <div className=""> */}
          <SNavbar />
          {/* <div className="jumbotron" style={{ marginBottom: 0 + "px" }}></div> */}

          <Switch>
              <Route
              exact
              path={"/supplier/addFoods"}
              render={(props) => (
                <AddFoods
                  {...props}
                  getfoods={this.getfoods}
                  getCategory={this.getCategory}
                  foods={this.state.foods}
                  category={this.state.category}
                />)}
              /> 

            <Route
              path={"/supplier/ShowFoods"}
              getfoods={this.getfoods}
              foods={this.state.foods}
              component={ShowFoods}
            />             
            
            
           <Route  path={"/supplier/Home"} component={SHome} />
          <Route path={"/supplier/Profile"} component={Profile} />
           <Route path={"/supplier/editProf"} component={editProf}/> 
        {/* <Route path={"/supplier/AddFoods"} component={AddFoods}/>  */}
           {/* <Route path={"/supplier/ShowFoods"} component={ShowFoods}/> */}
           <Route path={'/supplier/addprofile'} component={AddProfile} />
           <Route path={'/supplier/viewfood'} component={ViewFood} />
          
       
          </Switch>
          {/* <SFooter /> */}
        {/* </div> */}
      </Router>
    );
   }
}
