import React from 'react';

import PokeGrid from './components/PokeGrid/PokeGrid'
import PokeBar from './components/PokeBar/PokeBar'
import './App.css';

const App = () => {

  return (
    <div>
      <PokeBar />
      <PokeGrid />
    </div>
  );
}

export default App;