import React from "react";

export default function FooterLS() {
  return (
    <footer id="footer" className="footers">
       <div className="footer-top footers">
         <div className="container">
          <div className="row">
          <div className="col-lg-4 col-md-6 footer-info">
              <h3>Needy Feedy</h3>
              <p>
             We aim to redistribute surplus food to those who are in need of it. 
              If you have excess food from an event, party, wedding etc, please call our helpline. 
            The excess food will be checked for quality because lack of proper refrigeration and storage tend to spoil food.
              </p>
              <h3>Connect :</h3>
              <div className="social-links">
               
              <ul>
               	<li>
 		<a href="https://www.facebook.com/">
 			<i class="fa fa-facebook" aria-hidden="true"></i>
 			<span> - Facebook</span>
 	 	</a>
 	</li>
   <li>
 		<a href="http://twitter.com/">
 			<i class="fa fa-twitter" aria-hidden="true"></i>
			<span> - Twitter</span>
 		</a>
 	</li>
 	<li>
		<a href="https://www.linkedin.com/in/anushree-k-66350819b">
 			<i class="fa fa-linkedin" aria-hidden="true"></i>
			<span> - Linkedin</span>
		</a>
	</li>
	<li>
		<a href="https://www.instagram.com/">
			<i class="fa fa-instagram" aria-hidden="true"></i>
			<span> - Instagram</span>
		</a>
	</li>
</ul> 
 </div>
            </div>

            <div className="col-lg-4 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="/Home#services">About us</a>
                </li>
                <li>
                  <a href="#">Terms of service</a>
                </li>
                <li>
                  <a href="#">Privacy policy</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 footer-contact">
              <h4>Contact Us</h4>
              <p>
                Raj Alkaa Park,Bannerghatta Main RD,
                Kalena Agrahara,
                Bengaluru,Karnataka-560076<br></br>
                <strong>Phone:</strong> +91 8762966543<br></br>
                <strong>Email:</strong> shreeanu951@gmail.com<br></br>
              </p>
            </div>
          </div>
        </div>
      </div> 
      

      <div className="container">
        <div className="copyright">
         <p>Needy Feedy © Copyright 2020 </p>
         <h1 className="feed">Made with</h1> 
        
        <i className="fa fa-heart"></i> 
        <h1 className="feed">to Feed the Needy</h1>
         </div>
         </div>
         
         
         
     </footer>
  );
}
