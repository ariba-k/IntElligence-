import React from 'react';
import Card from './card';
import '../css/index.css';
import { withRouter } from 'react-router';

const CardList = ({steps, onSearchChange, id}) =>{
  const cardComponent = steps.map((user, i) => {
    return <Card key={i} name={steps[i].name} description={steps[i].description} url={steps[i].url} imgid={steps[i].imgid} curId={id} onSearchChange={onSearchChange} />
  });
  return (
    <div className="block">
      {cardComponent}
    </div>
  );
}

export default withRouter(CardList);
