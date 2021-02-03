/* Coders: 
    - Sumier Qadiri
    - Minerva Igama
*/

import React, { useState, useEffect } from "react";
import "../src/Nav.css";
import { Link, useHistory } from "react-router-dom";
import Shawn_white from "../src/assets/Shawn_white.png";
import titleNav from "../src/assets/Hawk_Spot_Title7.png";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import { auth } from "./firebase";
import { Button } from "@material-ui/core";
import { Close, MenuOutlined, HelpOutlineOutlined } from "@material-ui/icons";

function Nav(props) {
  const [{ user }, dispatch] = useStateValue();
  const [posts, setPosts] = useState([]);

  const history = useHistory();

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      console.log(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
  }, []);

  var bioFromPost;

  posts.map((post) => {
    if (post.data.name === user.displayName) {
      console.log("->>>>>" + post.data.bio);
      bioFromPost = post.data.bio;
    }
  });

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbarLogo" onClick={closeMobileMenu}>
          <img src={Shawn_white} alt="Mascot" width="50px" />
        </Link>

        <div className="menuIcon" onClick={handleClick}>
          {click ? <Close /> : <MenuOutlined />}
        </div>

        <div className="navItem_title">
          <img src={titleNav} alt="HawkSpot" />
        </div>

        <ul className={click ? "navMenu active" : "navMenu"}>
          <li className="navItem">
            <Link to="/Feed" className="navLinks" onClick={closeMobileMenu}>
              News Feed
            </Link>
          </li>

          <li
            className="navItem"
            className="navLinks"
            onClick={closeMobileMenu}
          >
            <div
              onClick={() => {
                console.log(user);
                history.push({
                  pathname: "/Profile2",
                  state: {
                    userName: user.displayName,
                    userEmail: user.email,
                    userAvatar: user.photoURL,
                    userBio: bioFromPost,
                  },
                });
              }}
            >
              Profile
            </div>
          </li>

          <li className="navItem">
            <Link
              to="/Settings"
              className="navLinks"
              onClick={closeMobileMenu}
              onClick={() => {
                console.log(user.photoURL);
              }}
            >
              Settings
            </Link>
          </li>

          <li>
            <div className="nav-logOut">
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
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
