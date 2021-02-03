/* Front-End: 
    - Sumier Qadiri
    - Minerva Igama

    Back-End:
     - Sean Nguyen
     - Matthew Nguyen

*/

import React, { useState, useEffect } from "react";
import "./Feed.css";
import MessageSender from "./MessageSender";
import Post from "./Post";
import db from "./firebase";
import { auth } from "./firebase";
import Widgets from "./Widgets";
import Scroll from "./Scroll";
import { useStateValue } from "./StateProvider";
import { FooterContainer } from "./containers/footer";
import Title from "./assets/Hawk_Spot_Title7.png";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useStateValue(null);
  const [username, setUsername] = useState("");
  //Only runs once using useEffect hook
  //This snapshot listens to any change an re-renders based on change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
        // console.log(snapshot.docs.map((doc) => ({id:doc.id, data: doc.data()} )));
      });
  }, []);

  return (
    <div className="feedback">
      <div className="feed-Title">
        <img src={Title} />
      </div>

      <div className="widget-midget">
        <Widgets />
      </div>
      <div className="feed">
        <MessageSender />

        {/* Iterate through post and add to post Component */}
        {posts.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            user={user}
            profilePic={post.data.profilePic}
            message={post.data.message}
            timestamp={post.data.timestamp}
            username={post.data.username}
            image={post.data.image}
            likes={post.data.likes}
            email={post.data.email}
            bio={post.data.bio}
            tags={post.data.tags}
          />
        ))}
      </div>

      <Scroll showBelow={500} />
      <footer>
        <FooterContainer />
      </footer>
    </div>
  );
}

export default Feed;
