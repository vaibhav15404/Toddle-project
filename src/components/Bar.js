import React from 'react'
import { Link } from "react-router-dom";


import "./Bar.css"
const Bar = () => {
  return (
    <>

    
    <header className='navbar'>
      <div className="logo">
        <img src="downloadoddle.png" alt='logo'/>
      </div>
      <nav className="navigation">
        <ul>
        <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="../Courses" >Courses</Link>
          </li>
          <li>
            <Link to="../MyResume">My Resume</Link>
          </li>
          <li>
            <Link to="../ContactUs">Contact </Link>
          </li>
        </ul>
      </nav>
    </header>
     </>
  )
}

export default Bar

// components/Navbar.js

