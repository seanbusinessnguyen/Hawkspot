/* Front-End: 
    - Sumier Qadiri

    Back-End:
     - Sean Nguyen
     - Matthew Nguyen
     - Alex Sinha

*/

import React, { useState } from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import UHCL_Hawk from "./assets/UHCL_Hawk.png";
import FB_icon from "./assets/fb-icon.png";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";
import TwitterIcon from "./assets/tw-icon.png";

Modal.setAppElement("#root");

function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, dispatch] = useStateValue();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  function register() {
    let login = document.getElementById("login");
    let register = document.getElementById("register");
    let btn = document.getElementById("btn");

    login.style.left = "-400px";
    register.style.left = "50px";
    btn.style.left = "110px";
  }

  function login() {
    let login = document.getElementById("login");
    let register = document.getElementById("register");
    let btn = document.getElementById("btn");

    login.style.left = "50px";
    register.style.left = "450px";
    btn.style.left = "0px";
  }

  function signUp() {
    var email = document.getElementById("createEmail");

    var password = document.getElementById("createPassword");

    if (email.value.search(/@UHCL.edu/i) !== -1) {
      const promise = auth.createUserWithEmailAndPassword(
        email.value,
        password.value
      );
      promise.catch((e) => alert(e.message));
    } else {
      alert("Please enter in a valid UHCL email using @UHCL.edu");
    }
  }

  function signInEmail() {
    var email = document.getElementById("loginEmail");
    var password = document.getElementById("loginPassword");

    const promise = auth.signInWithEmailAndPassword(
      email.value,
      password.value
    );
    promise.catch((e) => alert(e.message));
    console.log(email.value);
    console.log(password.value);
  }

  auth.onAuthStateChanged(function (userLogin) {
    //signed in
    if (userLogin) {
      dispatch({
        type: actionTypes.SET_USER,
        user: userLogin,
      });
      console.log(userLogin);
    } else {
      console.log("none");
    }
  });

  return (
    <div class="hero">
      <div class="form-box">
        <div class="button-box">
          <div id="btn"></div>
          <button type="button" class="toggle-btn" onClick={login}>
            Log In
          </button>
          <button type="button" class="toggle-btn" onClick={register}>
            Register
          </button>
        </div>
        <div class="mascot-icon">
          <a href="https://bit.ly/39qgxbO" target="_blank">
            <img src={TwitterIcon} alt="Twitter" />
          </a>
          <a href="https://www.uhcl.edu" target="_blank">
            <img src={UHCL_Hawk} alt="UHCL website" />
          </a>
          <a href="https://www.facebook.com/UHClearLake/" target="_blank">
            <img src={FB_icon} alt="UHCL Facebook" />
          </a>
        </div>
        <div id="login" class="input-group">
          <input
            type="email"
            class="input-field"
            placeholder="UHCL Email"
            required
            id="loginEmail"
          />
          <input
            type="password"
            class="input-field"
            placeholder="Password"
            required
            id="loginPassword"
          />
          <input type="checkbox" class="check-box" />
          <span>Remember Password</span>
          <button type="submit" class="submit-btn" onClick={signInEmail}>
            Log in
          </button>
        </div>
        <div id="register" class="input-group">
          <input
            type="text"
            class="input-field"
            placeholder="First Name"
            required
            id="firstName"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <input
            type="text"
            class="input-field"
            placeholder="Last Name"
            required
            id="lastName"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <input
            type="email"
            class="input-field"
            placeholder="UHCL Email"
            required
            id="createEmail"
          />
          <input
            type="password"
            class="input-field"
            placeholder="Password"
            required
            id="createPassword"
          />

          <input type="checkbox" class="check-box" required />

          <span>
            <Button
              onClick={() => setModalIsOpen(true)}
              size="small"
              style={{
                height: "25%",
                width: "85%",
                color: "dodgerblue",
              }}
              color="primary"
              variant="outlined"
            >
              I agree to the Terms & Conditions
            </Button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              className="modal-bodal"
            >
              <h1 className="modal-bodal-h1">Terms of Service</h1>
              <br />
              <h2 className="modal-bodal-h2">Hawk Spot Website Terms of Use</h2>
              <ul className="modal-bodal-list">
                <li>
                  {" "}
                  By accessing and using Hawk Spot, you accept and agree to be
                  bound by the terms and provision of this agreement that is
                  provided in the information to come. In addition, when using
                  Hawk Spot's particular services, you shall be subject to any
                  posted guidelines or rules applicable to such services, which
                  may be posted and modified from time to time. All such
                  guidelines or rules are hereby incorporated by reference into
                  the TOS.
                </li>
                <br />
                <li>
                  {" "}
                  ANY PARTICIPATION IN THIS SITE WILL CONSTITUTE ACCEPTANCE OF
                  THIS AGREEMENT. IF YOU DO NOT AGREE TO ABIDE BY THE ABOVE,
                  PLEASE DO NOT USE THIS SITE AND EXIT NOW.
                </li>
                <br />
                <li>
                  The Hawk Spot, associates, and components are not to be
                  responsible or liable for the accuracy of the information
                  posted on the site. Any misinformation, error, or results from
                  poor information is the responsibility of the end-user. Hawk
                  Spot is neither responsible for physical or mental injuries
                  that may be brought about by viewing information or visiting
                  and using the site.
                </li>
                <br />
                <li>
                  The Hawk Spot intends to follow all laws and regulations and
                  in the case of copyright infringement please contact us as
                  ShawnTheHawkAerie@gmail.com.
                </li>
                <br />
                <li>
                  In the event of endorsement, Hawk Spot will disclose the
                  relationship between the site and product at risk of losing
                  reputation and credibility. Hawk Spot will only endorse
                  products that have been personally tried and researched.
                </li>
                <br />
                <li>
                  Hawk Spot is not liable for fraud caused by mishandling of
                  sensitive data. Any sensitive data, including passwords and
                  other personally identifiable information, will be hashed and
                  properly stored on the database to ensure the lowest
                  probability of a data leak. Data will not be sold or processed
                  by other entities without the consent of the user.
                </li>
                <br />
                <li>
                  {" "}
                  Hawk Spot is neither liable or to be held responsible for the
                  following: failure to operate a secure server that stores
                  personal information, failure to identify and assess internal
                  and external risk to the security of personal information,
                  failure to monitor the effectiveness of security of personal
                  information and update security measures, sharing of personal
                  information with others for purposes of marketing, permitting
                  third party service providers to have access to the internal
                  the server, transmission of personal information outside the
                  site's secure system or across public networks, uploaded
                  files, operating a service that would be attractive to those
                  who are unfit for use and access, serving third party cookies,
                  serving behavior ads, use of a competitor's trademark in ads,
                  and borrowing someone else's privacy policy.
                </li>
              </ul>
              <Button
                onClick={() => setModalIsOpen(false)}
                variant="contained"
                color="secondary"
              >
                Close
              </Button>
              <hr />
            </Modal>
          </span>

          <button type="submit" class="submit-btn" onClick={signUp}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
