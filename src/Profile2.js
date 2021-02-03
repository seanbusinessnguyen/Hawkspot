/* Front-End: 
    - Sumier Qadiri

    Back-End:
     - Sean Nguyen
*/

import React from "react";
import "../src/Profile2.css";
import profile_placeholder from "../src/assets/profile_placeholder.png";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailIcon from "@material-ui/icons/Email";
import { useHistory } from "react-router-dom";
import db from "./firebase";
import { FooterContainer } from "./containers/footer";

function Profile2() {
  const history = useHistory();
  console.log(history);
  console.log("hello");

  return (
    <>
      <body className="profile2-body">
        <div className="profile2-container">
          <div className="profile2-avatar">
            <img
              id="profile2-avatar"
              src={history.location.state.userAvatar}
              alt="missingProfilePic"
            />
          </div>
          <div className="profile2-content">
            <h1 id="profile2-userName">{history.location.state.userName}</h1>
            <h2 id="profile2-studentYear">
              "{history.location.state.userEmail}
            </h2>
            <p id="profile2-bio">{history.location.state.userBio}</p>
            <h3 className="profile2-h3">Contact Info</h3>
          </div>
          <div className="profile2-socialMedia">
            <a href="#">
              <i>
                <FacebookIcon></FacebookIcon>
              </i>
            </a>
            <a href="#">
              <i>
                <LinkedInIcon></LinkedInIcon>
              </i>
            </a>
            <a href="#">
              <i>
                <EmailIcon></EmailIcon>
              </i>
            </a>
          </div>
        </div>
      </body>
      <footer>
        <FooterContainer />
      </footer>
    </>
  );
}

export default Profile2;
