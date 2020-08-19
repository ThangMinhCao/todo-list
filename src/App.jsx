import React from 'react';
import TopBar from './components/AppHeader/AppHeader';
import BodyPanel from './components/BodyPanel/BodyPanel';
import './App.scss';

function App() {
  return (
    <div className="main-page">
      <TopBar className="top-bar" />
      <div className="app-body">
        <BodyPanel />
      </div>
    </div>
  );
}

export default App;
