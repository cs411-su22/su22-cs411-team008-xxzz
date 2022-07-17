import logo from './logo.svg';
import React, {useState} from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState('');

  const submitSearch = () => {
    Axios.get('http://localhost:3002/api/get', {
      title: title
    })
    .then((response) => {
      console.log(response)
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
    </div>
  );
}

export default App;
