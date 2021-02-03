/* Front-End: 
    - Sumier Qadiri
    - Minerva Igama

    Back-End:
     - Sean Nguyen
     - Matthew Nguyen
*/

import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Post.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import NearMeIcon from "@material-ui/icons/NearMe";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import { CommentTwoTone } from "@material-ui/icons";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ClearIcon from "@material-ui/icons/Clear";
import { useHistory } from "react-router-dom";
import LabelImportantTwoToneIcon from "@material-ui/icons/LabelImportantTwoTone";

function Post({
  postId,
  profilePic,
  image,
  username,
  timestamp,
  message,
  likes,
  userProp,
  bio,
  email,
  tags,
}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const storage = firebase.storage();

  var storageRef = storage.ref("510469085700816896.png");
  console.log(storageRef);
  var test = storageRef.getDownloadURL().then(function (url) {
    return url;
  });

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      console.log(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });

    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  var bioFromPost;

  posts.map((post) => {
    if (post.data.name === user.displayName) {
      console.log("->>>>>" + post.data.bio);
      bioFromPost = post.data.bio;
    }
  });

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userAvatar: user.photoURL,
      userBio: bioFromPost,
      userEmail: user.email,
    });
    setComment("");
  };

  function deleteComment(commentToDel) {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .where("text", "==", commentToDel)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });
  }

  return (
    <div className="post">
      <div className="post__top">
        <Avatar
          src={profilePic}
          style={{ cursor: "pointer" }}
          onClick={() => {
            console.log("hello");
            history.replace({
              pathname: "/Profile2",
              state: {
                userName: username, //use username because thats prop passed in
                userEmail: email,
                userBio: bio,
                userAvatar: profilePic,
              },
            });
          }}
        />

        <div className="post__topInfo">
          <h3>{username}</h3>
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>

          <h4>
            <LabelImportantTwoToneIcon /> :{tags}
          </h4>
        </div>
      </div>

      <div className="post__bottom">
        <p>{message}</p>
      </div>

      <div className="post__image">
        <img src={image} alt="" />
      </div>

      <div className="post__options">
        <div
          className="post__option"
          onClick={() => {
            const increment = firebase.firestore.FieldValue.increment(1);
            const likesReference = db.collection("posts").doc(postId);
            likesReference.update({ likes: increment });
          }}
        >
          <ThumbUpIcon />
          <p>{likes} Likes</p>
        </div>

        <div className="post__option">
          <ChatBubbleOutlineOutlinedIcon />
          <p>Comment</p>
        </div>

        <div
          className="post__option"
          onClick={() => {
            const deleteReference = db.collection("posts").doc(postId);

            deleteReference.delete();
          }}
        >
          <DeleteForeverIcon />
          <p>Delete Post</p>
        </div>
      </div>

      <div className="post__comments">
        {comments.map((comment) => (
          <>
            <Avatar
              src={comment.userAvatar}
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log(comment);
                history.replace({
                  pathname: "/Profile2",
                  state: {
                    userName: comment.username, //use username because thats prop passed in
                    userEmail: comment.userEmail,
                    userBio: comment.userBio,
                    userAvatar: comment.userAvatar,
                  },
                });
              }}
            />

            <div className="comment-header">
              <h3>{comment.username}</h3>
              <p>
                {new Date(comment.timestamp?.toDate()).toLocaleString("UTC")}{" "}
              </p>
              <br />
            </div>
            <br />
            {comment.text}
            <br />
            <br />
            <button
              className="delete__button"
              onClick={() => {
                deleteComment(comment.text);
              }}
            >
              Delete Comment
            </button>
            <br />
            <hr />
          </>
        ))}
      </div>
      <div>
        <form className="post_commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__comment_button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;
