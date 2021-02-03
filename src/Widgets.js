/* Coders: 
    - Sumier Qadiri
    - Minerva Igama
*/

import React from "react";
import "./Widgets.css";
import { TwitterTimelineEmbed } from "react-twitter-embed";

function Widget() {
  return (
    <div className="widgets">
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FUHClearLake%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
        width="340"
        height="100%"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameborder="0"
        allowTransparency="true"
        allow="encrypted-media"
      ></iframe>
      <br />
      <div className="widgets">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="UHClearLake"
          options={{ height: 800, width: 400 }}
        />
      </div>
    </div>
  );
}

export default Widget;
