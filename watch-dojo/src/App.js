import logo from './logo.svg';
import React, {useState} from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [showInfo, setShowInfo] = useState([])
  const [newUser, setNewUser] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loginUser, setLoginUser] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [listname, setListName] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [listInfo, setListInfo] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [listID, setListID] = useState('');
  const [showTable1, setShowTable1] = useState(false);
  const [query1Info, setquery1Info] = useState([]);
  const [showTable2, setShowTable2] = useState(false);
  const [query2Info, setquery2Info] = useState([]);

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

  const submitCreateUser = () => {
    Axios.post('http://localhost:3002/api/create_user', {
        new_user_name : newUser,
        new_password : newPassword
    })
  }

  const submitLogin = () => {
    Axios.get('http://localhost:3002/api/login', {
      params: {
        user_name : loginUser,
        password : loginPassword
      }
    })
    .then((response) => {
      // console.log(response.data)
      if (response.data.length === 1){
        alert("Login successfully");
      } else if (response.data.length === 0) {
        alert("Username or password is incorrect");
        setLoginUser("")
        setLoginPassword("")
      }
    })
  }

  const submitList = () => {
    Axios.post('http://localhost:3002/api/create_list', {
        new_list_name : listname,
        list_creater : loginUser
    })
    .then((response) => {
      if (response.data.length === 1){
        alert("Create successfully");
      } else if (loginUser.length === 0) {
        alert("Please login first");
        setLoginUser("")
      }
    })
  }

  const createTableView = () => {
      setShowTable((s) => !s)
      Axios.get('http://localhost:3002/api/get_list', {
        params: {
          user_name : loginUser
        }
      }).then((response) => {
        setListInfo(response.data)
        console.log(response.data)
      })
    }


    const updateTable = () => {
      Axios.put('http://localhost:3002/api/update_list', {
          ID : listID,
          Name: newListName,
          User: loginUser
      })
    }

    const deleteTable = () => {
      Axios.delete('http://localhost:3002/api/delete_list', {
          params: {
            list_ID : listID,
            curr_user: loginUser
          }
      })
      .then((response) => {
        if (loginUser.length === 0) {
          alert("Please login first");
          setLoginUser("")
        }
        // what if the list_id do not exist?
      })
    }

    const createTableView1 = () => {
      setShowTable1((s) => !s)
      Axios.get('http://localhost:3002/api/get_query1', {
      }).then((response) => {
        setquery1Info(response.data)
        console.log(response.data)
      })
    }

    const createTableView2 = () => {
      setShowTable2((s) => !s)
      Axios.get('http://localhost:3002/api/get_query2', {
      }).then((response) => {
        setquery2Info(response.data)
        console.log(response.data)
      })
    }


  return (
    <div className="App">
      <h1>Official application for Movie/TV database</h1>
      <div className="search_function">
        <label>Movie/Show Title</label>
        <input type='text' name='title' onChange={(e) => {
          setTitle(e.target.value)
        }}> 
        </input>
        <button onClick={submitSearch}> Submit</button>
      </div>
      
      {showInfo.map((val) => {
        return (
          <div className= "search_result">
            <h2>Show Name: {val.title}</h2>
          </div>
        );
      })}
      
      <div className="create_user">
        <label>User name</label>
        <input type='text' name='new_user_name' onChange={(e) => {
          setNewUser(e.target.value)
        }}> 
        </input>
        <label>Password</label>
        <input type='text' name='new_password' onChange={(e) => {
          setNewPassword(e.target.value)
        }}> 
        </input>
        <button onClick={submitCreateUser}>Create</button>
      </div>

      <div className="login">
        <label>User name</label>
          <input type='text' name='user_name' onChange={(e) => {
            setLoginUser(e.target.value)
        }}> 
        </input>
        <label>Password</label>
        <input type='text' name='password' onChange={(e) => {
          setLoginPassword(e.target.value)
        }}> 
        </input>
        <button onClick={submitLogin}>Login</button>
      </div>


      {/* Create list interface */}
      <button onClick={createTableView}>Show User Favorite List</button>

      {/* table of lists */}
      <div className="list_interface" style={{ visibility: showTable ? "visible" : "hidden" }}>
        <table className="list_table">
          <tr>
            <th>List ID</th>
            <th>List Name</th>
          </tr>
            {listInfo.map((val) => {
            return (
              <tr>
                <th>{val.list_id}</th>
                <th>{val.list_name}</th>
              </tr>
            );
          })}
        </table>
      </div>



      <div className="create_list">
        <label>List name</label>
        <input type='text' name='new_list_name' onChange={(e) => {
          setListName(e.target.value)
        }}> 
        </input>
        <button onClick={submitList}>Create List</button>
      </div>



      <div className="update_list">
        <label>List ID</label>
        <input type='text' name='id' onChange={(e) => {
          setListID(e.target.value)
        }}> 
        </input>
        <label>New List Name</label>
        <input type='text' name='name' onChange={(e) => {
          setNewListName(e.target.value)
        }}> 
        </input>
        <button onClick={updateTable}>Update List</button>
      </div>

      <div className="delete_list">
        <label>List ID</label>
        <input type='text' name='list_ID' onChange={(e) => {
          setListID(e.target.value)
        }}> 
        </input>
        <button onClick={deleteTable}>Delete List</button>
      </div>
      

      {/* advanced query section */}
      <button onClick={createTableView1}>Show result from query 1</button>

      {/* table of lists */}
      <div className="query1" style={{ visibility: showTable1 ? "visible" : "hidden" }}>
        <label>Find actors and actresses cast the top 15 largest number of movies that are released after 2008</label>
        <table className="list_table">
          <tr>
            <th>First Name</th>
            <th>List Name</th>
            <th>Number of Movies </th>
          </tr>
            {query1Info.map((val) => {
            return (
              <tr>
                <th>{val.first_name}</th>
                <th>{val.last_name}</th>
                <th>{val.num_movie}</th>
              </tr>
            );
          })}
        </table>
      </div>

      {/* advanced query section */}
      <button onClick={createTableView2}>Show result from query 2</button>

      {/* table of lists */}
      <div className="query2" style={{ visibility: showTable2 ? "visible" : "hidden" }}>
        <label>Find how many different ratings of American movies and shows each director have</label>
        <table className="list_table">
          <tr>
            <th>First Name</th>
            <th>List Name</th>
            <th>Rating</th>
            <th>Number of Movies and Shows</th>
          </tr>
            {query2Info.map((val) => {
            return (
              <tr>
                <th>{val.first_name}</th>
                <th>{val.last_name}</th>
                <th>{val.rating}</th>
                <th>{val.num_all}</th>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default App;
