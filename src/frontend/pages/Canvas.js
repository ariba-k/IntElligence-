import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/TestPage.css';
import {Button, InputGroup, FormControl} from 'react-bootstrap';
import YouTube from 'react-youtube';
import Test from "./../services/test";
import { withRouter } from 'react-router';

class Canvas extends Component {
  constructor(){
    super();
    this.state = {
      detectors:[],
      timeStamp: "",
      numOfFace: "",
      appearance: "",
      emotion: "",
      expression: "",
      url: "",
      submitted: 0,
      facelist: [],
      startTimestamp: null,
      heartbeat: [],
      record: true,
      loading: false,
      file: null,
      fileUrl: null,
    };
  }

  loop = () => {
    this.refs.canvas.getContext('2d').drawImage(document.querySelector('#img'), 0, 0, this.refs.canvas.width, this.refs.canvas.height);
    setTimeout(this.loop, 1000); // drawing at 30fps
  }

  drawFeaturePoints = (img, featurePoints) => {
    var contxt = document.querySelector('#face_video_canvas').getContext('2d');

    var hRatio = contxt.canvas.width / img.width;
    var vRatio = contxt.canvas.height / img.height;
    var ratio = Math.min(hRatio, vRatio);

    contxt.strokeStyle = "#FFFFFF";
    for (var id in featurePoints) {
      contxt.beginPath();
      contxt.arc(featurePoints[id].x,
      featurePoints[id].y, 2, 0, 2 * Math.PI);
      contxt.stroke();
    }
  }

 handleImageChange = (event) => {
    this.setState({
      fileUrl: URL.createObjectURL(event.target.files[0])
    });
    this.setState({
      file: event.target.files[0]
    })
  }

  detectionSetup = () => {
    const ctx = this.refs.canvas.getContext('2d');
    var video = document.querySelector('#img');
    ctx.drawImage(video, 0, 0, this.refs.canvas.width, this.refs.canvas.height);
    console.log("detectionSetupDone");
  }

  analyzeVideoFrame = (idx) => {
    //Get a canvas element from DOM

    //Get imageData object.
    var imageData = this.refs.canvas.getContext('2d').getImageData(this.state.facelist[idx][0], this.state.facelist[idx][1], this.state.facelist[idx][2], this.state.facelist[idx][3]);

    //Get current time in seconds
    var now = (new Date()).getTime() / 1000;

    //Get delta time between the first frame and the current frame.
    var deltaTime = now - this.state.startTimestamp;

    //Process the frame
    this.state.detectors[idx].process(imageData, deltaTime);
    if (idx == 2 && this.state.record) {
      //console.log("update time stamp: " + idx + "   time stamp: " + deltaTime);
      this.props.updateTime(deltaTime.toFixed(2));
    }
  }

  createAffDetector = (idx) => {
    const self = this;
    //var faceMode = window.affdex.FaceDetectorMode.LARGE_FACES;
    //var detector = new window.affdex.CameraDetector(divRoot, width, height, faceMode);
    var detector = new window.affdex.FrameDetector(window.affdex.FaceDetectorMode.LARGE_FACES);

    detector.detectAllEmotions();
    detector.detectAllExpressions();
    detector.detectAllAppearance();

    //Add a callback to notify when the detector is initialized and ready for runing.
    detector.addEventListener("onInitializeSuccess", function() {
      var startTimestamp = (new Date()).getTime() / 1000;
      self.setState({startTimestamp: startTimestamp});
      var heartbeat = setInterval(() => self.analyzeVideoFrame(idx), 2000);
      self.state.heartbeat.push(heartbeat);
    });

    detector.addEventListener("onImageResultsSuccess", function(faces, image, timestamp) {
      if (faces.length > 0) {
        //console.log(faces[0]);
        var confuse = faces[0].expressions.innerBrowRaise.toFixed(0) * 0.2 + faces[0].expressions.browFurrow.toFixed(0) * 0.4 + faces[0].expressions.lipPress.toFixed(0) * 0.4 + faces[0].expressions.lipCornerDepressor.toFixed(0) * 0.2;
        self.props.updateExpression(idx, faces[0].emotions.engagement.toFixed(0), faces[0].emotions.joy.toFixed(0), Math.max(faces[0].emotions.fear.toFixed(0), faces[0].emotions.anger.toFixed(0)), confuse.toFixed(0));
      }
      if (self.state.record === true) {
        self.props.updateCounterList(idx, faces.length);
      }

      if (self.state.loading === true) {
        self.setState({loading: false});
      }
      //console.log("onImageResultsSuccess:", timestamp, faces.length, faces[0]);
      console.log("Detector " + idx + " Success" + timestamp + " " +faces.length);
    });

    detector.start();
    this.state.detectors.push(detector);
    console.log("detector finish");
  }


  onStop = () => {
    for (var i = 0; i < this.state.facelist.length; i++) {
      if (this.state.detectors[i] && this.state.detectors[i].isRunning) {
        this.state.detectors[i].removeEventListener();
        this.state.detectors[i].stop();
        console.log("detector " + i + " stopped");
      }
      console.log("#logs:\t\tClicked the stop button");
    }
    this.setState({record: false});
  };

  onReset = () => {
    for (var i = 0; i < this.state.facelist.length; i++) {
      if (this.state.detectors[i] && this.state.detectors[i].isRunning) {
        this.state.detectors[i].reset(this.state.facelist.length);
        console.log("#logs:\t\tClicked the reset button");
        this.props.resetlist();
      }
    }
    var startTimestamp = (new Date()).getTime() / 1000;
    this.setState({startTimestamp: startTimestamp});
  };

  sendUrl = () => {
    console.log("in send url");
    Test.postimg(this.state.file)
          .then(response => {
          console.log(response.data);
          //this.setState({facelist: response.data});
        })
        .catch(error => console.log(error));
    if (this.state.url !== "") {
      var list = [[0, 0, 320, 240], [320, 0, 320, 240], [160, 240, 320, 240]];
      this.setState({submitted: true});
      this.setState({facelist: list});
    }
  };

  startDetection = () => {
    this.detectionSetup();
    this.props.initializelist(this.state.facelist.length);
    for (var i = 0; i < this.state.facelist.length; i++) {
      this.createAffDetector(i);
    }
    this.loop();
    this.setState({record: true});
    this.setState({loading: true});
  }

  handleInputChange = (event) => {
    //console.log(event);
    this.setState({url: event.target.value});
  }

  render() {
    if (this.state.submitted == 0) {
      return (
        <div className="canvas-content">
        <p className="intro">Step 1: input the url of the video that you want to test and upload a thumbnail picture from the video that shows all the people</p>
          <FormControl
            placeholder="Input your video url here"
            defaultValue={this.state.url}
            onChange={this.handleInputChange.bind(this)}
            aria-describedby="basic-addon2"
          />
          <br />
          <div>
            <input type="file" className="imginput" onChange={this.handleImageChange}/>
          </div>
          <img src={this.state.fileUrl}/><br/><br/>
          <Button variant="warning"  className="nav-testbutton" onClick={this.sendUrl}>Submit URL</Button>

        </div>
      );
    }
    return (
      <div className="canvas-content">
        <p className="intro">Click [start Detection] and wait till [loading ···] disappear to start the video and test your data</p>
        <canvas id="canvas" ref="canvas" className="canvas" height={480} width={640}></canvas>
        <video crossOrigin='anonymous' width={640} height={480} controls ref="img" id="img">
          <source crossOrigin='anonymous' type="video/mp4" src={this.state.url} />
        </video>
        <br/>
        {this.state.loading === false && <br/>}
        {this.state.loading === true && <p className="intro">Loading ··· </p>}
        <Button variant="outline-secondary" onClick={this.startDetection}>Start Detection</Button>
        <Button variant="outline-secondary" onClick={this.onStop}>Stop Detection</Button>
        <Button variant="outline-secondary" onClick={this.onReset}>Reset Detection</Button>
      </div>
    );
  }
}

export default withRouter(Canvas);
