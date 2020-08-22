import React, { Component, Fragment } from "react";
import "../CSS/Home.css";
import axios from 'axios'
import {Link,Redirect} from 'react-router-dom'
import Subscribe from './Subscribe';

class HomeLS extends Component {
  constructor(props) {
    super(props);
    this.state = {
    name: "",
    email: "",
    subject:"",
    message: "",
    review:[],
    };
  this.onChange = this.onChange.bind(this);
   }
  
// Input on change
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  
onSubmit = async (e) => {
  e.preventDefault();
  const reviews = {
  name: this.state.name,
   email: this.state.email,
   subject: this.state. subject,
   message:this.state.message,
   };
const body = JSON.stringify(reviews);
  console.log(body);
  const config1 = {
  headers: {
 "Content-Type": "application/json",
   },
      };
 const result = await axios.post(`http://localhost:5000/api/v1/reviews`,body,config1 );
      this.setState({review:result.data})
      console.log(this.state.review);
      alert(`Reviews Added`);
      window.location.reload();
  };
 

    
render() {
 return (
  
   <Fragment>
    
     <div className="banner">
     
          <div>
         <section id="section1" className="" style={{ marginRight: 2000 + "px" }}>
            <div className="container ">
            <div className="wrapper">
            <div className="bubble">
				    <div className="inner">
            <h4 className="needy"> Welcome to Needy Feedy</h4>
            <p className="need">Feed Your Mind with Other's Hunger </p>
          </div>
       </div>
       </div>
      </div>
      </section>
      </div>
      </div>


<div className="container-fluid mt-3 ml-1"> 
  <div className="footer_section " id="contact">
        <div className="container">
          <section className="main-section contact" id="contact">
          <div className="contact_section">
            <div className="row">
              <div className="col-lg-6 wow fadeInUp delay-06s animated">
                <div className="contact-info-box address clearfix">
                  <h2>Contact Us</h2>
                   <p>
                     We'd love to hear from you ,please drop us a line if you've any query
                    </p>
                </div>
               
                <div className="social-buttons">
                {/* <!-- facebook  Button --> */}
               <a href="https://www.facebook.com/" target="blank" class="social-margin"> 
               <div class="social-icon facebook">
               <i class="fa fa-facebook" aria-hidden="true"></i> 
          </div>
        </a>
        
        {/* <!-- pinterest Button --> */}
        <a href="https://pinterest.com/" target="blank"  class="social-margin">
        <div class="social-icon pinterest">
        <i class="fa fa-pinterest-p" aria-hidden="true"></i>
          </div>
        </a>
       
        {/* <!-- LinkedIn Button --> */}
        <a href="http://linkedin.com/" class="social-margin" target="blank">
          <div class="social-icon linkedin">
            <i class="fa fa-linkedin" aria-hidden="true"></i>
          </div> 
        </a>
      
       {/* <!-- TwitterButton --> */}
        <a href="http://twitter.com/" target="blank" class="social-margin">
          <div class="social-icon twitter">
            <i class="fa fa-twitter" aria-hidden="true"></i>
          </div> 
        
        </a>
</div>
</div>




<div className="col-lg-6 wow fadeInUp delay-06s animated">
    <div className="form">
      <div id="sendmessage">
         <h2>GET IN TOUCH</h2>
           </div>
            <div id="errormessage"></div>
             <form onSubmit={this.onSubmit}>
               <div className="field">
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    id="name"
                    placeholder="Your name" autoFocus
                    data-rule="name"
                    data-msg="Please enter a name"/>
                    <label for="name">NAME</label>
                  </div>
                     
                 <div className="field">
                  <input
                   type="text"
                   name="email"
                   id="email"
                   value={this.state.email}
                   onChange={this.onChange}
                   placeholder="Your Email" autoFocus
                   data-rule="email"
                   data-msg="Please enter a valid email"/>
                     <label for="email">EMAIL</label> 
                     </div>
                    
                <div className="field">
                   <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={this.state.subject}
                    onChange={this.onChange}
                    placeholder="Subject"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 8 chars of subject"
                  />
                  <label for="subject">SUBJECT</label>
                </div>
                   
                <div className="field">
                      <textarea
                        id="msg"
                        name="message"
                        rows="5"
                        value={this.state.message}
                        onChange={this.onChange}
                        data-rule="required"
                        data-msg="Please write something for us"
                        placeholder="Message"
                      ></textarea>
                      <label for= "msg">MESSAGE</label>
                    
                    </div>
             <button type="submit" className="btn input-btn">
              SEND 
              <Link to ="/ngo/Mail">
              
          
              </Link>
              </button>
              
          </form>
        </div>
    </div>
  </div> 
  </div>
  </section>
</div>
</div> 
</div>


 


<section className="subscribe-section">
   <div className="subscribe-form">
   <form action="#" className="subscribe-form">
   <label for="text"className="clr" >Intrested to know more about us join Now</label>
   <br/>
   <input type="email" name="email" className="clr" placeholder="Enter your email address"/>
   <span className="submit">
    <input type="submit" value="subscribe"/> <a  className="clr" >Subscribe</a>
    </span> 
    
    </form>
</div>

</section>
</Fragment>
);
 }
}
export default HomeLS;
