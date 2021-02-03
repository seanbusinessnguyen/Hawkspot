/* Front-End: 
    - Sumier Qadiri
    - Minerva Igama

    Back-End:
     - Sean Nguyen
     - Matthew Nguyen
*/

import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./MessageSender.css";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import Modal from "react-modal";

Modal.setAppElement("#root");

function MessageSender() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tag, setTag] = useState("");
  const [posts, setPosts] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [{ user }, dispatch] = useStateValue();
  console.log(user);

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

  // This prevents refreshing when we hit submit - stops default behavior (e.preventDefault())
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tag);
    //Code to add to database
    db.collection("posts").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      email: user.email,
      bio: bioFromPost,
      profilePic: user.photoURL,
      username: user.displayName,
      image: imageUrl,
      tags: tag,
    });

    setImageUrl("");
    setInput("");
  };

  const history = useHistory();

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar
          src={user.photoURL}
          style={{ cursor: "pointer" }}
          onClick={() => {
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
        />
        <form>
          <input
            id="messageSender__OnYourMind"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder={`What's on your mind, ${user.displayName}?`}
          ></input>

          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            type="text"
            placeholder="image URL (optional)"
          ></input>

          <button className="MS-SubmitBtn" onClick={handleSubmit} type="submit">
            Submit Post
          </button>
        </form>
      </div>
      <div className="messageSender__bottom">
        <div className="messageSender__option">
          <ExpandMoreOutlinedIcon />
          <label for="Tags">Tags :</label>
          <select
            value={tag}
            autofocus="true"
            onChange={(e) => setTag(e.target.value)}
          >
            <option value="General Discussion">General Discussion</option>
            <option value="For Sale">For Sale</option>
            <option value="Study Group">Study Group</option>
            <option value="Looking For">Looking For</option>
            <option value="Memes">Memes</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default MessageSender;
