import React, { Fragment } from "react";
import Login from "./componets/Login";
import "./componets/CSS/Home.css";
import FooterLS from "./componets/supplierss/FooterLS";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import AdminNavbar from "./componets/Admin/AdminNavbar";
//import Admin from "./componets/Admin/adminroute";
import AllS from "./componets/supplierss/AllS";
import NavbarLS from "./componets/supplierss/NavbarLS";
import SFunctions from "./componets/Supplierfunctions/SFunctions"
import NFunctions from "./componets/Public/NFunctions";
import AdminFunction from "./componets/Admin/AdminFunction";


class App extends React.Component {
  //  state = {

  //    user: {}
  //  };
  // LoginUser = async text => {
  //    const res = await axios.post(
  //   ` http://localhost:3000/api/auth/`
  //   );
  //    console.log(res.data.items);
  //    this.setState({
  //      users: res.data.items
  //    });
  //  };
  // state = {
  //   alert: null,
  // };
  // setAlert = (msg, type) => {
  //   this.setState({ alert: { msg, type } });
  //   setTimeout(() => this.setState({ alert: null }), 3000);
  // };
  render() {
    return (
      <Router>
        <div className="">
          {/* <Alert alert={this.state.alert} />
          <Navbar /> */}
          {/* <div className="jumbotron" style={{ marginBottom: 0 + "px" }}></div> */}
          <Switch>
            <Route exact path={"/Login/:type"} component={Login} />
          </Switch>
           
          <Switch>
            <Route path={"/supplier/"} component={SFunctions} />
            <Route path={"/ngo/"} component={NFunctions}/>
            <Route path={"/admin/"} component={AdminFunction} />
            
            
            {/* <Route path={"/main/"} component={MFunctions} /> */}
           <AllS></AllS> 
          </Switch>
           <FooterLS />  
        </div>
      </Router>
    );
  }
}

export default App;

