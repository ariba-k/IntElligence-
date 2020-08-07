import React, { Component } from 'react';
import CardList from './CardList.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/TestPage.css';
import {Button} from 'react-bootstrap';
import { withRouter } from 'react-router';
import Detail from "./Detail.js";
import Canvas from "./Canvas.js";
import Visualize from './Visualize.js';
import VisualizeList from './VisualizeList.js';
import Team from './../imgs/team.png';
//import ScriptTag from 'react-script-tag';

class MainPage extends Component {
  constructor(){
    super();
    this.state = {
      steps: [
        {
          "name":"Connect to Video",
          "imgid": 1,
          "url":"https://image.freepik.com/free-vector/vintage-glass-dome-wooden-tray-realistic_107791-236.jpg",
          "detail": "Connecting a video to Int Elligence is easy. Before you begin a Zoom virtual session, make sure to check your Zoom settings to ensure that the following boxes are checked, “Record a separate audio file for each participant” and “Record video during screen sharing. Once you begin your Zoom virtual session, make sure to hit the record button directly from Zoom. After the session, you will be prompted to view your saved mp4 video and audio files in the designated location. "
        },
        {
          "name":"Emotion Analyzation",
          "imgid": 2,
          "url":"https://image.freepik.com/free-vector/vintage-glass-dome-wooden-tray-realistic_107791-236.jpg",
          "detail": "Next, you will need to upload the file video online. For this demo version, we are using Amazon Web Services (AWS) s3 bucket to store the video for our demo. This steps allows your files to be stored on the cloud and to have a unique link to paste directly into our Int Elligence software to process. At this point, your work is nearly complete! Once you have uploaded your Zoom video online, you can now paste the cloud link into our “Demo Step 1: input your url” on our webpage. "
        },
        {
          "name":"Data Visualization",
          "imgid": 3,
          "url":"https://image.freepik.com/free-vector/vintage-glass-dome-wooden-tray-realistic_107791-236.jpg",
          "detail": " After you click the submit url button, select the start detection button, and watch your feedback and data populate! Each color line represents a different type of emotion: red corresponds to level of engagement, blue with joy, and green represents negative emotion. The x-axis represents time elapsed in seconds, while the y-axis represents the intensity of each type of emotion. "
        }],
      stepId: 0,
      tstamp: [],
      engagelist: [],
      joylist: [],
      neglist: [],
      confuselist: [],
      flag: -1,
      counters: [],

      engagement: [],
      joy: [],
      negative: [],
      confusion: [],
      detectlist:[],
      counterlist: [],
      viewmore: false,
    };
  }

  updateExpression = (idx, engagement, joy, negative, confusion) => {
    if (idx <= 2) {
      this.state.engagelist[idx].push(engagement);
      this.state.joylist[idx].push(joy);
      this.state.neglist[idx].push(negative);
      this.state.confuselist[idx].push(confusion);

      this.state.detectlist[this.state.counters[idx]] += 1;
      //let tempE = this.state.engagement;
      this.state.engagement[this.state.counters[idx]] = Number(this.state.engagement[this.state.counters[idx]]) + Number(engagement);
      this.state.joy[this.state.counters[idx]] = Number(this.state.joy[this.state.counters[idx]]) + Number(joy);
      this.state.negative[this.state.counters[idx]] = Number(this.state.negative[this.state.counters[idx]]) + Number(negative);
      this.state.confusion[this.state.counters[idx]] = Number(this.state.confusion[this.state.counters[idx]]) + Number(confusion);

    }else {
      console.log("This is the idx that goes wrong: " + idx);
    }
  }

  updateCounterList = (idx, detected) => {
    this.state.counters[idx] += 1
    if (detected === 0) {
      this.state.engagelist[idx].push(-10);
      this.state.joylist[idx].push(-10);
      this.state.neglist[idx].push(-10);
      this.state.confuselist[idx].push(-10);
    }
    //console.log("IDX IDX: " + idx + "    " + detected);
    //console.log("engagelist: " + this.state.engagelist);
    //console.log("engagement: " + this.state.engagement);
    //console.log("detectlist: " + this.state.detectlist);
    //console.log("counterlist: " + this.state.counterlist);
    //console.log("timestamp  : " + this.state.tstamp);
    //console.log("counter    : " + this.state.counters);
  }

  updateTime = (tstamp) => {
    this.state.tstamp.push(tstamp);
    this.state.detectlist.push(0);
    this.state.counterlist.push(0);
    this.state.engagement.push(0);
    this.state.joy.push(0);
    this.state.negative.push(0);
    this.state.confusion.push(0);
    this.setState({flag: (this.state.flag + 1) % 10 });
  }

  initializelist = (idx) => {
    for (var i = 0; i < idx; i++ ) {
      this.state.engagelist.push([]);
      this.state.joylist.push([]);
      this.state.neglist.push([]);
      this.state.confuselist.push([]);
      this.state.counters.push(0);
    }
    console.log("engagelist: " + this.state.engagelist);
    console.log("joylist: " + this.state.joylist);
    console.log("neglist: " + this.state.neglist);
    console.log("confuselist: " + this.state.confuselist);
  }

  resetlist = (idx) => {
    var tempt = [];
    var tempj = [];
    var tempn = [];
    this.setState({tstamp: tempt});
    this.setState({joylist: tempj});
    this.setState({neglist: tempn});
    this.setState({confuselist: []});
    console.log("engagelist: " + this.state.engagelist);
    console.log("joylist: " + this.state.joylist);
    console.log("neglist: " + this.state.neglist);
    console.log("confuselist: " + this.state.confuselist);
    console.log("above are in reset");

    this.initializelist(idx);
  }

  onSearchChange = (id) => {
    this.setState({stepId: id - 1});
  }

  viewmore = () => {
    this.setState({viewmore: true});

  }

  componentDidMount(){}

  render() {
    return (
      <div>
      <div id='bg'>
        <div className="main-title-d">
          <h1 id='title'>TEAM &nbsp;<span className= "sf">Int Elligence</span></h1>
          <p className="sTitle">Boost your students' learning ability by knowing their state of study </p>
          <div  className="button-m">
          <Button variant="warning"  className="nav-testbutton" href="/pretest">Try Our Demo</Button>
          </div>
        </div>
        <div className="main-title-m">
          <h1 className='title-m'>TEAM</h1>
          <h2 className= "sf-m">Int Elligence</h2>
          <p className="sPhrase-m">Boost your students' learning ability by knowing their state of study </p>
          <div  className="button-m">
          <Button variant="warning"  className="nav-testbutton" href="/pretest">Try Our Demo</Button>
          </div>
        </div>
      </div>
      <div className="introclass">
        <p className='sTitle'>Who are we?</p>

          <img src={Team} width="1000px" alt="photo of team"/>
          {this.state.viewmore &&
            <div className="whoarewe">
          <p className="intro">On our team, everyone wears different hats. We take pride in the fact that where some of us are strong,
          others aren’t. We play our different strengths to our advantage. But what we do share as our common thread is what fuels the
          growth of Int Elligence to unprecedented heights:
          </p>
          <p className="intro">1 )  We are a tried-and-true team. Our skill sets are as student programmers and startup developers who
           are passionate about using emotion recognition technologies to transform the way we live on an everyday basis.
          </p>
          <p className="intro">2 )  We are students. We understand our target audience of educators and students, and the unique challenges
          that confront today’s educational landscape more than virtually anyone. When the COVID-19 pandemic began and students across the
          globe were forced to learn from behind a monitor, we understood what it felt like to struggle and stress with coursework-- without
          having the rapport from a teacher in the physical world to reach out for help.
          </p>
          <p className="intro">3 )  We are the real lives behind the statistics. Our team of 4 knows our target audience beyond the graphs
          and statistics— because these abstract figures can only tell so much of the real lives we live. Beyond our deep market research
          from qualitative and quantitative surveying to reviewing prior literature on the topic, we resonate with what it means to be a student
          today. We know what works, and what doesn’t. We accept reality, with all of its challenges, and we build Int Elligence from there.
          </p>
          </div>
        }
        <br/>
        <br/>
        <Button className="testButtonDisplay" onClick={this.viewmore}>Learn More</Button>
      </div>
      <div className="projclass">
      <CardList steps={this.state.steps} onSearchChange={this.onSearchChange} id={this.state.stepId}/>
      </div>
      <Detail id={this.state.stepId + 1} name={this.state.steps[this.state.stepId].name} detail={this.state.steps[this.state.stepId].detail}/>

      <div className="introclass">
        <p className='sTitle'>Demo</p>

        <Canvas updateExpression={this.updateExpression} updateTime={this.updateTime} initializelist={this.initializelist} resetlist={this.resetlist} updateCounterList={this.updateCounterList}/>

        {(this.state.flag !== -1) && <p className='sTitle'>Visualization</p>}
        <Visualize name={-1} width={1200} height={600} timestamp={this.state.tstamp} engagement={this.state.engagement} joy={this.state.joy} negative={this.state.negative} confuse={this.state.confusion} flag={this.state.flag}/>

        <VisualizeList timestamp={this.state.tstamp} engagelist={this.state.engagelist} joylist={this.state.joylist} neglist={this.state.neglist} confuselist={this.state.confuselist} flag={this.state.flag}/>
      </div>
      </div>
    );
  }
}

export default withRouter(MainPage);
