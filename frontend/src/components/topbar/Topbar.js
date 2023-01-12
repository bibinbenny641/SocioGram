import "./topbar.css";
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useEffect, useState } from "react";

export default function Topbar() {
  const [showResults, setShowResults] = useState(false);
  const [adddata, setAdddata] = useState('');

  const [usersearch, setUsersearch] = useState([])
  console.log(usersearch, 'first time')

  const generateError = (err) =>
    toast.success(err, {
      position: 'bottom-right',
    })

    let remove = ()=>{
      console.log("close");
    }


  let searchUser = async (e) => {
    e.preventDefault()
    if(e.target.value==''){
      console.log("show result if    fff")
      setShowResults(false)
    }
    console.log(e.target.value)
    setAdddata(e.target.value)

    let response = await fetch('http://127.0.0.1:8000/follow/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({ 'name': e.target.value })
    })
    let data = await response.json()
    console.log("aaaaaaaaaaaaaaaaaaaaadddddddddddd")
    console.log(data.results[0])
    if (response.status === 200) {
      console.log('kitty kitty');
      generateError(data.results[0].fullname)
      setUsersearch(data.results)
      console.log(usersearch, 'second time')
      setShowResults(true)



    } else {
      generateError(" no such user found")
    }

  }
  useEffect(() => {
    setShowResults(false)
  },[])

  return (
    <div className="topbarContainer"  onClick={remove}>
      <div className="topbarLeft">
        <Link style={{ textDecoration: 'none' }} to='/'>
          <span className="logo">SocioGram</span>
        </Link>
      </div>

      <div className="topbarCenter" >
        <div className="searchbar">
          <SearchIcon className="searchIcon" />

          <input onChange={searchUser}
            name="name"
            placeholder="Search for friend, post or video"
            className="searchInput"
            value={adddata}
          />
          <div style={{ background: "grey", height: "25px", width: 'auto' }} className="dropdown">
            {showResults && (
              <div className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto">
                {usersearch.map((item, index) => {
                  return (
                    <div
                      key={index}
                      // onMouseDown={() => handleSelection(index)}
                      // ref={index === focusedIndex ? resultContainer : null}
                      // style={{
                      //   backgroundColor:
                      //     index === focusedIndex ? "rgba(0,0,0,0.1)" : "",
                      // }}
                      className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
                    >
                      {item.user_name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>

      <div className="topbarRight">
        {/* <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div> */}
        <div className="topbarIcons">
          {/* <div className="topbarIconItem">
            
            <Link  to="/myprofile">
            <PersonIcon /></Link>
            <span className="topbarIconBadge">1</span>
          </div> */}

        </div>
        <Link to='/profile'>
          <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
        </Link>

      </div>
    </div>
  );
}