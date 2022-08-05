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
  const [query1Year, setquery1Year] = useState('');
  const [query1Info, setquery1Info] = useState([]);
  const [showTable2, setShowTable2] = useState(false);
  const [query2Name, setquery2Name] = useState('');
  const [query2Info, setquery2Info] = useState([]);
  const [showReviewTable, setShowReviewTable] = useState(false);
  const [reviewTableInfo, setReviewTableInfo] = useState([]);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewShowID, setReviewShowID] = useState('');
  const [newReviewContent, setNewReviewContent] = useState('');
  const [showID, setShowID] = useState('');
  const [searchTable, setSearchTable] = useState(false);
  const [listDetail, setListDetail] = useState([]);
  const [detailTable, setDetailTable] = useState(false);
  const [showSP, setSP] = useState(false);
  const [SPTableInfo, setSPTableInfo] = useState([]);


  const submitSearch = () => {
    // console.log(title)
    setSearchTable((s) => !s)
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
    .then((response) => {
      console.log(response.data);
      if (response.data.sqlMessage != null) {
        alert(response.data.sqlMessage);
      } else {
        alert("Create User successfully");
      }
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
      console.log(response.data);
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

    const createTableContentView = () => {
      setDetailTable((s) => !s)
      Axios.get('http://localhost:3002/api/get_list_detail', {
        params: {
          list_id : listID
        }
      }).then((response) => {
        setListDetail(response.data)
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

  //add movie to list
  const addToList = () => {
    Axios.put('http://localhost:3002/api/add_movie_to_list', {
        ID : listID,
        ShowID: showID
    })
    .then((response) => {
      if (loginUser.length === 0) {
        alert("Please login first");
        setLoginUser("")
      }
    })
  }

  //delete movie from list
  const deleteFromList = () => {
    Axios.delete('http://localhost:3002/api/delete_movie_from_list', {
        params: {
          ID : listID,
          ShowID: showID
        }
    })
    .then((response) => {
      if (loginUser.length === 0) {
        alert("Please login first");
        setLoginUser("")
      }
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
    })
  }

  const createTableView1 = () => {
    setShowTable1((s) => !s)
    Axios.get('http://localhost:3002/api/get_query1', {
      params: {
        year: query1Year
      }
    }).then((response) => {
      setquery1Info(response.data)
      console.log(response.data)
    })
  }

  const createTableView2 = () => {
    setShowTable2((s) => !s)
    Axios.get('http://localhost:3002/api/get_query2', {
      params: {
        name: query2Name
      }
    }).then((response) => {
      setquery2Info(response.data)
      console.log(response.data)
    })
  }


// Review Table Operation Start
  const createReviewTableView = () => {
    setShowReviewTable((s) => !s)
    Axios.get('http://localhost:3002/api/get_review_table', {
      params: {
        user_name : loginUser
      }
    }).then((response) => {
      setReviewTableInfo(response.data)
      console.log(response.data)
    })
  }
  
  const submitReview = () => {
    Axios.post('http://localhost:3002/api/create_review', {
        review_show_id : reviewShowID,
        review_content : reviewContent,
        review_creater : loginUser
    })
    .then((response) => {
      console.log(response);
      if (loginUser.length === 0) {
        alert("Please login first");
        setLoginUser("")
      }
    })
  }

  const updateReview = () => {
    Axios.put('http://localhost:3002/api/update_review', {
      show_id : reviewShowID,
      new_content : newReviewContent,
      user : loginUser
    })
  }

  const deleteReview = () => {
    Axios.delete('http://localhost:3002/api/delete_review', {
        params: {
          review_show_id : reviewShowID,
          curr_user: loginUser
        }
    })
    .then((response) => {
      if (loginUser.length === 0) {
        alert("Please login first");
        setLoginUser("")
      }
    })
  }
  // Review Table Operation End

  // Stored Procedure
  const createSP = () => {
    setSP((s) => !s)
    Axios.get('http://localhost:3002/api/get_stored_procedure', {
      // params: {
      //   user_name : loginUser
      // }
    }).then((response) => {
      setSPTableInfo(response.data[0])
      console.log(response.data)
    })
  }

  return (
    <div className="App">
      <h1>Official application for Movie/TV database</h1>
      <div className="search_function">
        <label>Movie/Show Title </label>
        <input type='text' name='title' onChange={(e) => {
          setTitle(e.target.value)
        }}> 
        </input>
        <button onClick={submitSearch}> Search</button>
      </div>

      {/* Create Search Table interface */}
      <div className="search_table_interface" style={{ visibility: searchTable ? "visible" : "hidden" }}>
        <table className="search_table">
          <tr>
            <th>Show ID</th>
            <th>Show Title</th>
            <th>Year Released</th>
            <th>Type</th>
            <th>Country</th>
            <th>Rating</th>
            <th>Duration</th>
          </tr>
          {showInfo.map((val) => {
            return (
              <tr>
                <td>{val.show_id}</td>
                <td>{val.title}</td>
                <td>{val.year_released}</td>
                <td>{val.category}</td>
                <td>{val.country}</td>
                <td>{val.rating}</td>
                <td>{val.duration}</td>
              </tr>
            );
          })}   
        </table>
      </div>

      <div className="create_user">
        <label>User name </label>
        <input type='text' name='new_user_name' onChange={(e) => {
          setNewUser(e.target.value)
        }}> 
        </input>
        <label>Password </label>
        <input type='text' name='new_password' onChange={(e) => {
          setNewPassword(e.target.value)
        }}> 
        </input>
        <button onClick={submitCreateUser}>Create</button>
      </div>

      <div className="login">
        <label>User name </label>
          <input type='text' name='user_name' onChange={(e) => {
            setLoginUser(e.target.value)
        }}> 
        </input>
        <label>Password </label>
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

      {/* Create list_content interface */}
      <label>List ID </label>
          <input type='text' name='list_id' onChange={(e) => {
            setListID(e.target.value)
        }}> 
        </input>
      <button onClick={createTableContentView}>Show List Detail</button>

      {/* table of movies in a specific list */}
      <div className="list_content_interface" style={{ visibility: detailTable ? "visible" : "hidden" }}>
            {listDetail.map((val) => {
            return (
              <div>
                <h4>{val.show_id} {val.title}</h4>
              </div>
            );
          })}
      </div>


      <div className="create_list">
        <label>List name </label>
        <input type='text' name='new_list_name' onChange={(e) => {
          setListName(e.target.value)
        }}> 
        </input>
        <button onClick={submitList}>Create List</button>
      </div>



      <div className="update_list">
        <label>List ID </label>
        <input type='text' name='id' onChange={(e) => {
          setListID(e.target.value)
        }}> 
        </input>
        <label>New List Name </label>
        <input type='text' name='name' onChange={(e) => {
          setNewListName(e.target.value)
        }}> 
        </input>
        <button onClick={updateTable}>Update List</button>
      </div>
      
      <div className="update_list_content">
        <label>List ID </label>
        <input type='text' name='id' onChange={(e) => {
          setListID(e.target.value)
        }}> 
        </input>
        <label>Show ID </label>
        <input type='text' name='movie' onChange={(e) => {
          setShowID(e.target.value)
        }}> 
        </input>
        <button onClick={addToList}>Add to List</button>
        <button onClick={deleteFromList}>Delete from List</button>
      </div>

      <div className="delete_list">
        <label>List ID </label>
        <input type='text' name='list_ID' onChange={(e) => {
          setListID(e.target.value)
        }}> 
        </input>
        <button onClick={deleteTable}>Delete List</button>
      </div>

      
      {/* Create Review Table Interface */}
      <button onClick={createReviewTableView}>Show User Review</button>

      <div className="review_table_interface" style={{ visibility: showReviewTable ? "visible" : "hidden" }}>
        <table className="review_table">
          <tr>
            <th>Show ID</th>
            <th>Review</th>
          </tr>
            {reviewTableInfo.map((val) => {
            return (
              <tr>
                <th>{val.show_id}</th>
                <th>{val.reviews}</th>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="create_review">
        <label>Show ID</label>
        <input type='text' name='review_show_id' onChange={(e) => {
          setReviewShowID(e.target.value)
        }}> 
        </input>
        <label>Review Content</label>
        <input type='text' name='review_content' onChange={(e) => {
          setReviewContent(e.target.value)
        }}> 
        </input>
        <button onClick={submitReview}>Create Review</button>
      </div>
      
      <div className="update_review">
        <label>Show ID </label>
        <input type='text' name='show_id' onChange={(e) => {
          setReviewShowID(e.target.value)
        }}> 
        </input>
        <label>Review Content </label>
        <input type='text' name='new_review_content' onChange={(e) => {
          setNewReviewContent(e.target.value)
        }}> 
        </input>
        <button onClick={updateReview}>Update Review</button>
      </div>

      <div className="delete_review">
        <label>Review Show ID </label>
        <input type='text' name='review_show_id' onChange={(e) => {
          setReviewShowID(e.target.value)
        }}> 
        </input>
        <button onClick={deleteReview}>Delete Review</button>
      </div>
      {/*Review Table Operation End*/}

      {/* Create Stored Procedure Interface */}
      <button onClick={createSP}>Show the Most Popular Movies and Shows in Each Rating</button>

      <div className="SP_table_interface" style={{ visibility: showSP ? "visible" : "hidden" }}>
        <table className="SP_table">
          <tr>
            <th>Rating</th>
            <th>Type</th>
            <th>Movie Name</th>
            <th>NumReviews</th>
          </tr>
            {SPTableInfo.map((val) => {
            return (
              <tr>
                <th>{val.rating}</th>
                <th>{val.category}</th>
                <th>{val.Movie_Name}</th>
                <th>{val.NumReviews}</th>
              </tr>
            );
          })}
        </table>
      </div>
      

      {/* advanced query section */}
      <div>
        <label>Year </label>
        <input type='text' name='query1' onChange={(e) => {
            setquery1Year(e.target.value)
          }}> 
        </input>
        <button onClick={createTableView1}>Show result from query 1</button>
      </div>

      {/* table of lists */}
      <div className="query1" style={{ visibility: showTable1 ? "visible" : "hidden" }}>
        <label>Find actors and actresses cast the top 15 largest number of movies that are released before {query1Year}</label>
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
      <div>
        <label>Director name</label>
        <input type='text' name='query2' onChange={(e) => {
            setquery2Name(e.target.value)
          }}> 
        </input>
        <button onClick={createTableView2}>Show result from query 2</button>
      </div>
      

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
