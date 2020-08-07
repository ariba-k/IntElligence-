import React from 'react';
import Main from './frontend/pages/main.js';
import ScriptTag from 'react-script-tag';

function App() {
  return (
    <div>
      <Main />
      <ScriptTag type="text/javascript" src="/path/to/resource.js" />
      <ScriptTag type="text/javascript" src="/path/to/resource.js" />
    </div>
  );
}

export default App;
