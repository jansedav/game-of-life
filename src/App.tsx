import React from 'react';
import './App.css';

//COMPONENTS//
import Grid from './components/Grid';

function App() {
  return (
    <div className="App">
      <Grid columns={25} rows={25}/>
    </div>
  );
}

export default App;
