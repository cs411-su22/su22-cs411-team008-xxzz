import logo from './logo.svg';
import React, {useState} from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [showInfo, setShowInfo] = useState([])

  const submitSearch = () => {
    // console.log(title)
    Axios.get('http://localhost:3002/api/get', {
      params: {
        show_title : title
      }
    })
    .then((response) => {
      setShowInfo(response.data)
    })
  }

  return (
    <div className="App">
      <h1>Official application for Movie/TV database</h1>
      <div className="form1">
        <label>Movie/Show Title</label>
        <input type='text' name='title' onChange={(e) => {
          setTitle(e.target.value)
        }}> 
        </input>
        <button onClick={submitSearch}> Submit</button>
      </div>
      
      {showInfo.map((val) => {
        return (
          <div className= "form1_result">
            <h2>Show Name: {val.title}</h2>
          </div>
        );

      })}
      



    </div>
  );
}

export default App;
