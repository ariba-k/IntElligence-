import React from "react";
import '../css/card.css';
import BrainImg from '../imgs/brainIcon.png';
import ObjDisc from '../imgs/objdisc.png';
import { withRouter } from 'react-router';

const img = [BrainImg, ObjDisc];

const Card = (props) => {
    if (props.curId === props.imgid - 1) {
        return (
          <div className='te'>
            <img src={img[1]} alt='cannot display'  className="imgDisplay"/>
            <p>
              Step {props.imgid}
            </p>
            <h1 className="cardTag">{props.name}</h1>
          </div>
      );
    }
    return (
        <div className='te1' onClick={() => props.onSearchChange(props.imgid)}>
          <img src={img[1]} alt='cannot display'  className="imgDisplay"/>
          <p>
            Step {props.imgid}
          </p>
          <h1 className="cardTag">{props.name}</h1>
        </div>
    );
}


export default withRouter(Card);
