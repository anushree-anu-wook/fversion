import React, { Component } from 'react'
import axios from "axios";
//import "./componets/CSS/Home.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeLS from "./HomeLS";
import NavbarLS from "./NavbarLS";
import FooterLS from "./FooterLS";
import Registration from "./Registration";
import Forgotpasswrd from '../Forgotpsswrd';




//import Contacts from "./Contacts";




export class AllS extends Component {
    state = {
        users: [],
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
          console.log("Can't load the foods");
        }
      };
    
      getfoods = async () => {
        const token = sessionStorage.getFood("token");
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
            <div className="">
            <NavbarLS />
            <Switch>
            {/* <Route exact path={"/supplier/SHome"} component={SHome} /> */}
            <Route path={"/signup/:role"} component={Registration}/>
            <Route exact path={"/"} component={HomeLS} />
            <Route exact path={"/Forgotpsswrd"} component={Forgotpasswrd}/>
            
        
            
        

        </Switch>
          {/* <FooterLS /> */}
           </div>
           </Router>
        )
    }
}

export default AllS

