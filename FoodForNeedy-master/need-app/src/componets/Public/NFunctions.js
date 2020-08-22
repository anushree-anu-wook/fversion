import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PublicHome from "./PublicHome";
import Alert from "./Alert";
// import fRegistration from "./Registration";
import PublicNavbar from "./PublicNavbar";
import Category from "./Category";
import supplierList from "./SupplierList";
import ViewSupplier from "./ViewSupplier"
import ViewFood from './ViewFood';
import CategoryWise from './Categorywise';
import AddProfile from "./AddProfile";
// import Profile from "./profile";
import NProfile from "./NProfile";
import  Mail from "./Mail";


function App() {
  return (
    <Router>
      <div className="">
        <PublicNavbar />
        {/* <div className="jumbotron" style={{ marginBottom: 0 + "px" }}></div> */}

        <Switch>
          <Route exact path={"/ngo/Home"} component={PublicHome} />
          <Route exact path={"/ngo/supplierList"} component={supplierList}/>
          <Route exact path={"/ngo/Category"} component={Category} />
          <Route path={'/ngo/viewfood'} component={ViewFood} />
          <Route path={'/ngo/categorywise'} component={CategoryWise}/>
          <Route path={'/ngo/view_supplier'} component={ViewSupplier}/>
          <Route path={'/ngo/addprofile'} component={AddProfile} />
          {/* <Route path={'/ngo/Profile'} component={profile} /> */}
          <Route path={"/ngo/NProfile"} component={NProfile} />
          <Route path={"/ngo/Mail"} component={Mail} />
        

        </Switch>
      </div>
    </Router>
  );
}

export default App;
