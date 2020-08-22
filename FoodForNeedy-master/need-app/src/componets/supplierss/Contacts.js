// import React, { Component } from "react";
// import "../CSS/donor.css";

// import axios from "axios";

// export default class contact extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
     
//       name: "",
//       email: "",
//       subject:"",
//       message: "",
//       review:[],
//     };
//     this.onChange = this.onChange.bind(this);
//   //   this.handleDropdownChange = this.handleDropdownChange.bind(this);
//   }
//   // componentDidMount() {
//   //   this.props.getReviews();
//   // }
//   // Input on change
//   onChange(e) {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   }
//   onSubmit = async (e) => {
//     e.preventDefault();
//     // const data = new FormData();
//     // data.append("file", this.state.file, this.state.file.name);

//     // console.log(data);
//     // const token = sessionStorage.getItem("token");
//     // const config = {
//     //   headers: {
//     //     Authorization: `Bearer ${token}`,
//     //     "Content-Type": "multipart/form-data",
//     //   },
//     // };
//     // try {
//     //   const res = await axios.post(
//     //     `http://localhost:5000/api/v1/reviews/`,
//     //     data,
//     //     config
//     //   );
//     //   console.log(res.data.data);

//       const reviews = {
//         name: this.state.name,
//         email: this.state.email,
//         subject: this.state. subject,
//         message:this.state.message,
//       };
//       const body = JSON.stringify(reviews);
//       console.log(body);
//       // const token = sessionStorage.getItem("token");
//       const config1 = {
//         headers: {
         
//           "Content-Type": "application/json",
//         },
//       };
//       const result = await axios.post(
//         `http://localhost:5000/api/v1/reviews`,
//         body,
//         config1
//       );
//       this.setState({review:result.data})
//       console.log(this.state.review);
//       alert(`Reviews Added`);
//       window.location.reload();
    
//   };
//   render() {
//     return(
        
//     <div className="container-fluid mt-5">
//         {/* {console.log(this.state)} */}
//       <div className="footer_section " id="contact">
//         <div className="container">
//           <section className="main-section contact" id="contact">
//           <div className="contact_section">
//             <div className="row">
//               <div className="col-lg-6 wow fadeInLeft animated">
              
//                 <div className="contact-info-box address clearfix">
//                   <h2>Contact Us</h2>
//                   <p>
//                   Charitable giving is the act of giving money, goods or time to the unfortunate, either directly or by means of a charitable trust or other worthy cause.[9] Charitable giving as a religious act or duty is referred to as almsgiving or alms. The name stems from the most obvious expression of the virtue of charity; giving the recipients of it the means they need to survive. The impoverished, particularly those widowed or orphaned, and the ailing or injured, are generally regarded as the proper recipients of charity. The people who cannot support themselves and lack outside means of support sometimes become "beggars", directly soliciting aid from strangers encountered in public.

// Some groups regard charity as being distributed towards o
//                   </p>
//                   <p>If any suggestions or tips let us know</p>
//                 </div>
//                 <ul className="social-link">
//                   <li >
//                     <a href="(0)">
//                       <i className="fa fa-twitter "></i>
//                     </a>
//                   </li>
//                   <li className="facebook animated bounceIn wow delay-03s animated">
//                     <a href="(0)">
//                       <i className="fa fa-facebook "></i>
//                     </a>
//                   </li>
//                   <li className="pinterest animated bounceIn wow delay-04s animated">
//                     <a href="(0)">
//                       <i className="fa fa-pinterest "></i>
//                     </a>
//                   </li>
//                   <li className="dribbble animated bounceIn wow delay-06s animated">
//                     <a href="(0)">
//                       <i className="fa fa-instagram "></i>
//                     </a>
//                   </li>
               
                
//                 </ul>
//               </div>
//               <div className="col-lg-6 wow fadeInUp delay-06s animated">
//                 <div className="form">
//                   <div id="sendmessage">
//                     Sent Message Thank you!
//                   </div>
//                   <div id="errormessage"></div>
//                   <form onSubmit={this.onSubmit}
//                       // encType="multipart/form-data"
//                     >
//                     <div className="form-group">
//                         {/* <div class="name">Center name:</div>
//                         <div class="value"> */}
//                         <input
//                             className="form-control input-text"
//                             type="text"
//                             name="name"
//                             value={this.state.name}
//                             onChange={this.onChange}
//                             id="name"
//                             placeholder="Your name"
//                             data-rule="name"
//                             data-msg="Please enter a name"
//                           />
//                         </div>
                     
//                     <div className="form-group">
//                       <input
//                         type="email"
//                         className="form-control input-text"
//                         name="email"
//                         id="email"
//                         value={this.state.email}
//                         onChange={this.onChange}
//                         placeholder="Your Email"
//                         data-rule="email"
//                         data-msg="Please enter a valid email"
//                       />
                     
//                     </div>
//                     <div className="form-group">
//                       <input
//                         type="text"
//                         className="form-control input-text"
//                         name="subject"
//                         id="subject"
//                         value={this.state.subject}
//                         onChange={this.onChange}
//                         placeholder="Subject"
//                         data-rule="minlen:4"
//                         data-msg="Please enter at least 8 chars of subject"
//                       />
                      
//                     </div>
//                     <div className="form-group">
//                       <textarea
//                         className="form-control"
//                         name="message"
//                         rows="5"
//                         value={this.state.message}
//                         onChange={this.onChange}
//                         data-rule="required"
//                         data-msg="Please write something for us"
//                         placeholder="Message"
//                       ></textarea>
                    
//                     </div>

//                     <button type="submit" className="btn input-btn">
//                       SEND MESSAGE
//                     </button>
//                   </form>
//                 </div>
//               </div>
              
//             </div>
      
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }
// }