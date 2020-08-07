import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import createPlotlyComponent from 'react-plotly.js/factory';
import { withRouter } from 'react-router';

const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

class Visualize extends Component {

  constructor(){
    super();
    this.state = {
      flag:-1,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.flag!==prevState.flag){
      //console.log("getDerivedStateFromProps reached!" + nextProps.flag);
      return {flag : nextProps.flag};
    }
    else return null;
  }

  render() {
    var name = 'Aggregated Visualization';
    var gwidth = 1200;
    var gheight = 600;
    if (this.props.name >= 0) {
      name = 'Student ' + (this.props.name + 1);
      gwidth = 400;
      gheight = 300;
    }
    console.log(this.state.flag);
    if (this.state.flag < 0) {
      return (
        <div></div>
      );

    }
    return (
      <div className="button-m">

      <Plot
        data={[
          {
            y: this.props.engagement,
            x: this.props.timestamp,
            name: 'Engagement',
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {
            y: this.props.joy,
            x: this.props.timestamp,
            name: 'joy',
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'blue'},
          },
          {
            y: this.props.negative,
            x: this.props.timestamp,
            name: 'negative',
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'green'},
          },
          {
            y: this.props.confuse,
            x: this.props.timestamp,
            name: 'confuse',
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'orange'},
          },
        ]}
        layout={ {width: gwidth, height: gheight, datarevision: this.state.flag, title: name} }
      />
      <p>{this.state.flag}</p>
      </div>
    );
  }
}

export default withRouter(Visualize);
