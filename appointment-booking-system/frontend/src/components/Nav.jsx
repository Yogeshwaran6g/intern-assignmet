
import React from 'react';
import Images from '../assets/assets'
import '../styles/nav.css';
import { useNavigate } from 'react-router-dom';




const Navbar = () => {


  const tkn=localStorage.getItem("token")
  const navigate=useNavigate();
  
  function handleCreateAccount(e){
    navigate("/Login")
  }

  function handleLogoutAccount(e){
    localStorage.removeItem("token");
    navigate("/Login")
  }
  function handleDocClick(){
    navigate("/Doctors")
  }
  function handleMyAppointmentClick(){
    // navigate("/Userdashboard")

  }

  return (
      <nav className="nav">
          <div className="logo"><img  src={Images.logo}></img><p>Docto</p></div>
          <div className="links">
            <a href="#home" className="link" onClick={(e)=>handleDocClick()}>ALL DOCTORS <hr></hr> </a>
            <a href="#appointmen" className="link" onClick={(e)=>handleMyAppointmentClick()}>MY APPOINTMENTS <hr></hr> </a>
         </div>
        {
          tkn?
              (<button className="create-account-button" onClick={(e)=>handleLogoutAccount()}>Log out</button>):
              (<button className="create-account-button" onClick={(e)=>handleCreateAccount()}>Login / Sign in</button>)
        }
    </nav>
  );
};

export default Navbar;