import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MainHome from "./MainHome";
// import fRegistration from "./Registration";
import MainNavbar from "./MainNavbar";
import Showsuppliers from "./Showsuppliers";
import Showpublic from "./Showpublic";
import addpublic from "./addpublic";
import AddSupplier from "./AddSupplier";
import Categorys from "./Categorys";
import Foodlist from "./Foodlist";
import ViewFood from './ViewFood';
import Showreview from "./Showreview";
// import Showsubscribe from "./Showsubscribe";

function App() {
  return (
    <Router>
      <div className="">
        <MainNavbar />
        {/* <div className="jumbotron" style={{ marginBottom: 0 + "px" }}></div> */}

        <Switch>
          <Route exact path={"/admin/Home"} component={MainHome} />
          <Route path={"/admin/Showpublic"} component={Showpublic} />
          <Route path={"/admin/Showsuppliers"} component={Showsuppliers} />
          <Route path={"/admin/addpublic"} component={addpublic} />
          <Route path={"/admin/addSupplier"} component={AddSupplier} />
          <Route path={"/admin/Categorys"} component={Categorys} />
          <Route path={"/admin/Foodlist"} component={Foodlist}/>
          <Route path={'/admin/viewfood'} component={ViewFood} />
          <Route path={'/admin/Showreview'} component={Showreview} />
          {/* <Route path={'/admin/Showsubscribe'} component={Showsubscribe} /> */}


        </Switch>
      </div>
    </Router>
  );
}

export default App;
