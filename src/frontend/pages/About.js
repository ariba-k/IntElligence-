import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/about.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import TestImage from './TestImage.js';

class About extends Component {
  render() {
    return (
      <div className="disclaimer">

        <h1 className="about-title">Project Mnemosyne - Where do your memory abilities rank compared to everyone else?</h1>
        <p className="about-stitle">(AI Robots excluded)</p>
        <div  className="about-content">
        <p className="about-section">We’re interested in collecting a lot of information from people
        around the world to tell us more about how our brains work to remember. Our task suite examines
        the what, where, and when of memory. We provide a rich space by which to investigate memory
        differences- from those with superior memory to those experiencing memory
         difficulties. Take these three tasks to test your memory and see how you score!
        </p>

         <p className="about-section">After completing these three memory tasks, you’ll be given a report
         on your performance and where you rank compared to others that have completed Project Mnemosyne. Please
         keep in mind though that a person’s individual test score can be affected by
         a number of factors, including but not limited to stress, sleep, interest, attention, the device you are
         on while taking the tasks, etc. In other words, we ask that you consider these results as a “snapshot” in
         time and not as an indication of overall cognitive health or memory capacity. These tasks are for research
         purposes only and are not clinically significant. We hope you have fun with them!
         </p>
         </div>
      </div>
    );
  }
}

export default About;
