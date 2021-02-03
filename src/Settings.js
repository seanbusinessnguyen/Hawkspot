/* Front-End: 
    - Sumier Qadiri
    - Minerva Igama

    Back-End:
     - Sean Nguyen
     - Matthew Nguyen

*/

import React, { useEffect, useState } from "react";
import "./Settings.css";
import db from "./firebase";
import firebase from "firebase";
import { auth } from "./firebase";
import {
  Button,
  CircularProgress,
  LinearProgress,
  Switch,
} from "@material-ui/core";

import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import ModalButton from "./ModalButton";

export default function Settings(props) {
  const [passwordTab, setPasswordTab] = useState(true);
  const [profileTab, setProfileTab] = useState("");
  const [contactTab, setContactTab] = useState("");
  const [settingsTab, setSettingsTab] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const [{ user }, dispatch] = useStateValue();
  var storage = firebase.storage();
  useEffect(() => {
    console.log(storage.ref("510469085700816896.png")); //had props.user.uid before
  }, []);

  const handleName = (e) => {
    setName(e.target.value);
    console.log(name);
  };
  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);
  };
  const clearPasswordFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };
  const handleBio = (e) => {
    setBio(e.target.value);
  };
  const selectFileHandler = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  const uploadFileHandler = () => {
    if (file) {
      const uploadTask = storage.ref(`images/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
          console.log(progress);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };
  const clearEditProfile = () => {
    setName("");
    setFile("");
    setBio("");
    setProgress(0);
  };
  const handleSubmit = () => {
    const ref = db.collection("users").doc(user.uid);
    var URL;
    storage
      .ref("images")
      .child(file.name)
      .getDownloadURL()
      .then((url) => {
        URL = url;

        user.updateProfile({
          displayName: name,
          photoURL: url,
        });
      })
      .then(() => {
        ref.set({
          name: name,
          imageUrl: URL,
          bio: bio,
        });
      })
      .then(() => {
        ref.update({
          imageUrl: URL,
        });
        clearEditProfile();
      });
  };
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    //    if(true){
    //     var element = document.getElementById("container");
    //     element.classList.remove("container");
    //    }
  };

  const handleChangePassword = () => {
    if (confirmNewPassword === newPassword) {
      const emailCred = firebase.auth.EmailAuthProvider.credential(
        firebase.auth().currentUser.email,
        currentPassword
      );
      firebase
        .auth()
        .currentUser.reauthenticateWithCredential(emailCred)
        .then(() => {
          // User successfully reauthenticated.
          alert("Password successfully updated");
          return firebase.auth().currentUser.updatePassword(newPassword);
        })
        .then(() => {
          clearPasswordFields();
        })
        .catch((error) => {
          alert(
            `${error} OR you must have been logged in recently to change password`
          );
        });
    } else {
      alert("New Password doesn't match Confirm password");
    }
  };
  const toggle = (tabName) => {
    // var element = document.getElementById(tabName);
    // element.classList.add("active");
    console.log(tabName);
    if (tabName === "passwordTab") {
      setPasswordTab(true);
      setProfileTab(false);
      setContactTab(false);
      setSettingsTab(false);
    } else if (tabName === "profileTab") {
      setProfileTab(true);
      setPasswordTab(false);
      setContactTab(false);
      setSettingsTab(false);
    } else if (tabName === "contactTab") {
      setContactTab(true);
      setPasswordTab(false);
      setProfileTab(false);
      setSettingsTab(false);
    } else if (tabName === "settingsTab") {
      setSettingsTab(true);
      setPasswordTab(false);
      setProfileTab(false);
      setContactTab(false);
    }
  };
  return (
    <body className="body-settings">
      <div>
        {/* <!-- These are the navigation icons for the settings page--> */}
        <div
          id="container-settings"
          className={darkMode ? "darkMode" : "container-settings"}
        >
          <div className="leftbox-settings">
            <nav className="nav-settings">
              <a
                id="passwordTab"
                onClick={() => {
                  toggle("passwordTab");
                }}
                className="tab " //this used to be "tab active" but i took that out to make the key icon look like the other icons
              >
                <i className="fa fa-key ">
                  <VpnKeyIcon></VpnKeyIcon>
                </i>
              </a>
              <a
                id="profileTab"
                onClick={() => {
                  toggle("profileTab");
                }}
                className="tab  "
              >
                <i className="fa fa-user-circle ">
                  <AccountCircleIcon></AccountCircleIcon>
                </i>
              </a>
              <a
                onClick={() => {
                  toggle("contactTab");
                }}
                className="tab "
              >
                <i className="fa fa-envelope ">
                  <EmailIcon></EmailIcon>
                </i>
              </a>
              <a
                onClick={() => {
                  toggle("settingsTab");
                }}
                className="tab "
              >
                <i className="fa fa-cog">
                  <SettingsOutlinedIcon></SettingsOutlinedIcon>
                </i>
              </a>
              {/* <!--- **Implement Credit Card payment if time permits** */}
              {/* <a onClick={()=>{
                    toggle("profileTab")
                }}
                class="tab ">
                    <i class="fas fa-credit-card "></i>
                </a> */}
            </nav>
          </div>
          <div className={`rightbox-settings`}>
            {passwordTab && (
              <div className="password tabShow-settings">
                <h1 className="h1-settings">Change Password</h1>
                <h2 className="h2-settings">Current password</h2>
                <input
                  type="password"
                  className="input-settings"
                  onChange={handleCurrentPassword}
                  value={currentPassword}
                />
                <br />
                <h2 className="h2-settings">New password</h2>
                <input
                  type="password"
                  className="input-settings"
                  onChange={handleNewPassword}
                  value={newPassword}
                />
                <br />
                <h2 className="h2-settings">Confirm new password</h2>
                <input
                  type="password"
                  className="input-settings"
                  onChange={handleConfirmNewPassword}
                  value={confirmNewPassword}
                />
                <button className="btn-settings" onClick={handleChangePassword}>
                  Change Password
                </button>
                <button className="btn-settings" onClick={clearPasswordFields}>
                  Cancel
                </button>
              </div>
            )}
            {profileTab && (
              <div className="profile tabShow-settings">
                <h1 className="h1-settings">Edit Profile</h1>
                <h2 className="h2-settings">Name</h2>
                <input
                  type="text"
                  className="input-settings"
                  value={name}
                  onChange={handleName}
                />
                <br />
                <h2 className="h2-settings">Upload Profile Picture</h2>
                <input
                  type="file"
                  className="input-settings"
                  onChange={selectFileHandler}
                />{" "}
                <br />
                <LinearProgress variant="determinate" value={progress} />
                <button className="btn-settings" onClick={uploadFileHandler}>
                  Upload
                </button>
                <br />
                <br />
                <h2 className="h2-settings">Bio</h2>
                <input
                  type="text"
                  className="input-settings"
                  onChange={handleBio}
                  value={bio}
                />
                <button className="btn-settings" onClick={handleSubmit}>
                  Submit
                </button>
                <button className="btn-settings" onClick={clearEditProfile}>
                  Cancel
                </button>
                <div>
                  <ModalButton />
                </div>
              </div>
            )}
            {contactTab && (
              <div className="tech support tabShow-settings">
                <h1 className="h1-settings">Contact Tech Support</h1>
                <a
                  href="https://outlook.office365.com/mail/inbox"
                  target="_blank"
                >
                  ShawnTheHawkAerie@gmail.com
                </a>
                <p style={{ color: darkMode && "#777" }}>
                  Click the link to email our tech support and we will get back
                  to you as soon as possible.
                </p>
              </div>
            )}
            {settingsTab && (
              <div className="settings tabShow-settings">
                <h1 className="h1-settings">Settings</h1>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    style={{ backgroundColor: "#7ed386" }}
                    onClick={() => {
                      auth
                        .signOut()
                        .then(() => {
                          console.log("success");
                          window.location.reload(true);
                        })
                        .catch((error) => {
                          console.log(error.message);
                        });
                    }}
                  >
                    Log Out
                  </Button>{" "}
                  <br />
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Dark Mode
                    <Switch
                      checked={darkMode}
                      onChange={handleDarkMode}
                      name="darkMode"
                      //  inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* <!--Allows to cycle through icons and display information corresponding to clicked icons--> */}
      </div>
    </body>
  );
}
