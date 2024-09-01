import React from "react";
import "./contact.css"
import { Button } from "@mui/material";

const ContactSection = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:shubhamgorle.me@sbjit.edu.in">
        <Button>Contact: shubhamgorle.me@sbjit.edu.in</Button>
      </a>
    </div>
  );
};

export default ContactSection;