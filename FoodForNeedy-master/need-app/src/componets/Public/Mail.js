import React, { Component } from 'react';
import "../CSS/donor.css";
import * as emailjs from 'emailjs-com';
class Mail extends Component{
    constructor(props) {
        super(props);
    this.state= {
        name:'',
        email:'',
        phone:'',
        message:''
    }
}


handleChangeName=(event)=>{
    this.setState({
        name:event.target.value,
    });
    
}
handleChangeEmail=(event)=>{
    this.setState({
        email:event.target.value,
    });
}
handleChangePhone=(event)=>{
    this.setState({
        phone:event.target.value,
    });
}
handleChangeMessage=(event)=>{
    this.setState({
        message:event.target.value,
    });
}
sendMail=()=>{
    

    var template_params = {
        "name": this.state.name,
        "email": this.state.email,
        "phone": this.state.phone,
        "message":this.state.message,
     }
     
     var service_id = "default_service";
     var template_id = "needy_feedy";
     emailjs.send(service_id,template_id,template_params,'user_HnReaDASsdDyokCDFkoJP')
     .then(function(response) {
       alert('SUCCESS!');
    }, function(err) {
       console.log('FAILED...', err);
    });
};
handleSubmit(e){
    e.preventDefault();
    e.target.reset();
}
render(){
    return(
      
        <section id="section2">
        <div className="container itmtop">
          <div className="">
            {/* <div className="jumbotron col-md-6 col-sm-5 " id="login-first"></div> */}
            <div className="" id="login-second">
              <div className="page-wrapper p-t-50 p-b-50">
                <div className="wrapper wrapper--w900 ">
                  <div className="card cardH card-6  bg-dark">
                    <div className="card-heading m-4">
                      <h2 className="title ">Send Email</h2>
                    </div>
         <div className="card-body">
        <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-row frow">
        <div className="value">
         <div className="input-group"> */}
         

           Name:<input  className="input--style-6" type="text" name="name"  onChange={this.handleChangeName}   />
            Email:<input  className="input--style-6"  type="text" name="email"  ref="email" onChange={this.handleChangeEmail}/>
            Phone:<input  className="input--style-6" type="number" name="phone" ref="phone"   onChange={this.handleChangePhone}/>
            Message:<input  className="input--style-6" type="textarea" name="message" ref="message"  onChange={this.handleChangeMessage}/> 
    
     
                     
                 
                
                  
            <div className="card-footer">
            <button  className="btn btn-radius-2 btn-primary" type="submit" onClick={this.sendMail}>Send Email</button>
       
        </div>
        </div>
        
        
        </div>
        
        
        </div>
        </form> 
        </div>
        </div>
        
                </div> 
              </div> 
             </div> 
           </div> 
         </div> 
       </section>
     
        
    );
}
}
export default Mail;