import React from 'react';
import Visualize from './Visualize';
import '../css/index.css';
import { withRouter } from 'react-router';

//timestamp={this.state.tstamp} engagement={this.state.engagelist} joy={this.state.joylist} negative={this.state.neglist} confuse={this.state.confuselist} flag={this.state.flag}

const VisualizeList = ({timestamp, engagelist, joylist, neglist, confuselist, flag}) =>{
  const cardComponent = joylist.map((canvas, i) => {
    return <Visualize name={i} key={i} width={400} height={300} timestamp={timestamp} engagement={engagelist[i]} joy={joylist[i]} negative={neglist[i]} confuse={confuselist[i]} flag={flag} />
  });
  return (
    <div className="block">
      {cardComponent}
    </div>
  );
}

export default withRouter(VisualizeList);
