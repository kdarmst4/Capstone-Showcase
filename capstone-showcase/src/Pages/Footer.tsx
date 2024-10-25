import React from "react";
import asuLogo from "../assets/asuLogo.png";
import '../CSS/Footer.css'

const Footer: React.FC = () => {
    return(
        <footer>
              
              <div className="container">
                  <div className="row1">
                    <table className="table">

                    <td className="col1">
                    <img src={asuLogo} alt="ASU Logo" className="asu-logo-footer" />
                    </td>

                    <td className="col2">
                    <h4>Website</h4>
                    <ul>
                      <li><a href="https://www.google.com/">Home</a></li>
                      <li><a href="fill in">TBD</a></li>
                      <li><a href="fill in">TBD</a></li>
                      <li><a href="fill in">Meet the Team</a></li>
                    </ul>
                    </td>
                     
                    <td className = "col3">
                    <h4>get help</h4>
                    <ul>
                      <li><a href="fill in">FAQ</a></li>
                      <li><a href="fill in">TBD</a></li>
                      <li><a href="fill in">TBD</a></li>
                      <li><a href="fill in">TBD</a></li>
                    </ul>
                      </td>  

                      <td className = "col4">
                    <h4>contact us</h4>
                    <ul>
                    <label className="email">Email Us:</label>
                    <input type="email" id="email" name="email" placeholder="Email us at (email here) "></input>
                      
                    </ul>
                      </td>  
                    </table>
                    
                  </div>
                <div className="row2">
                  <div className="column1">
                    <p className="text-center">&copy; {new Date().getFullYear()} ASU Capstone Projects. All rights reserved.</p>
                  </div>
                </div>


              </div>
            
    </footer>
    )
};

export default Footer;