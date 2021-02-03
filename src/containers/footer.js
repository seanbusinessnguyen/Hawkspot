/* Coders: 
    - Sumier Qadiri
    - Minerva Igama
*/

import React from "react";
import Footer from "../components/footer";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";

export function FooterContainer() {
  return (
    <Footer>
      <Footer.Wrapper>
        <Footer.Row>
          <Footer.Column>
            <Footer.Title>About Us</Footer.Title>
            <Footer.Link href="#">Story</Footer.Link>
            <Footer.Link href="../ToS">
              Terms of Service
              {/* <Link to="../ToS">Terms of Service</Link> */}
            </Footer.Link>
          </Footer.Column>
          <Footer.Column>
            <Footer.Title>UHCL Services</Footer.Title>
            <Footer.Link href="https://www.uhcl.edu/maps/">
              Maps and Directions
            </Footer.Link>
            <Footer.Link href="https://uhsystem.edu/">UH System</Footer.Link>
            <Footer.Link href="https://www.uhcl.edu/campus-safety">
              Campus Safety
            </Footer.Link>
            <Footer.Link href="https://www.uhcl.edu/health-alert/">
              Covid-19 Updates
            </Footer.Link>
          </Footer.Column>
          <Footer.Column>
            <Footer.Title>Contact Us</Footer.Title>
            <Footer.Link href="https://outlook.office.com/">
              Email Us
            </Footer.Link>
            <Footer.Link href="#">
              Phone: <br />
              (281) 283-7600
            </Footer.Link>
          </Footer.Column>
          <Footer.Column>
            <Footer.Title>Social</Footer.Title>
            <Footer.Link href="https://www.facebook.com/UHClearLake/">
              <FacebookIcon />
              <p>Facebook</p>
            </Footer.Link>
            <Footer.Link href="https://www.instagram.com/uhclearlake/?hl=en">
              <InstagramIcon />
              <p>Instagram</p>
            </Footer.Link>
            <Footer.Link href="https://www.youtube.com/user/uhclearlake">
              <YouTubeIcon />
              <p>Youtube</p>
            </Footer.Link>
            <Footer.Link href="https://twitter.com/UHClearLake">
              <TwitterIcon />
              <p>Twitter</p>
            </Footer.Link>
          </Footer.Column>
        </Footer.Row>
      </Footer.Wrapper>
    </Footer>
  );
}
