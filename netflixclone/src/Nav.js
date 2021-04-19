import React, { useEffect, useState } from 'react'
import "./Nav.css"

function Nav() {
     const [show, handleshow] = useState(false)

//scroll listener
//100px the scroll comes
useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleshow(true)
      } else handleshow(false);
    });
    return () => {
      window.removeEventListener("scroll")
    }
  }, []);








    return (
        <div className={`nav ${show && "nav_black"}`}>
             <img
        className="nav_logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDYI_vl6lUh6xNPP5TFsqb-U_-J6myfg8Wkw&usqp=CAU"
        alt="Netflix Logo"
      />

             <img
        className="nav_avatar"
        src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
        alt="Netflix Logo"
      />
        </div>
    )
}

export default Nav
