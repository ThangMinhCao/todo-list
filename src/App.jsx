import React from 'react';
import TopBar from './components/MainPage/AppHeader/AppHeader';
import BodyPanel from './components/MainPage/BodyPanel/BodyPanel';
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
