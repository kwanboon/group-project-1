import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import TeamLineup from './screens/TeamLineup';
import headerImage from './images/EPL.jpg';
import Matches from "./screens/Matches"

ReactDOM.render(
  <React.StrictMode>
  <div className="grid-container">
    <div className="header"><img src={headerImage} alt=""/></div>
    <div className="item2">Container 2</div>
    <div className="item3">Container 3</div>  
    <Matches/>
    <TeamLineup />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
