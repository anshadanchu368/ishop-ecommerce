import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../images/logo.png'
import './styles.css'
import Hamburger from 'hamburger-react'
import {BsFillCartPlusFill,BsSearch} from 'react-icons/bs';
import {CgProfile} from 'react-icons/cg';


const Header = () => {

   const [show,setShow] =useState(false);

   const toggleNavItems =()=>{
    setShow(!show)
   }

  return (
    <nav className="navbar">
      <div className="container">
         <img src={logo} alt="logo" className="logo"/>
         <div className="cart">
         <BsFillCartPlusFill/>
         </div>
       
       
         <div className="menu-icon" onClick={toggleNavItems}>
          <Hamburger/>
        </div>
        <div className={`nav-elements ${show && 'active'} `}>
          <ul>
            <li>
              <NavLink to="/search"><BsSearch/></NavLink>

            </li>
            <li>
              <NavLink to="/">HOME</NavLink>
            </li>
            <li>
              <NavLink to="/store">STORE</NavLink>
            </li>
            <li>
              <NavLink to="/products">PRODUCTS</NavLink>
            </li>
            <li>
              <NavLink to="/ipad">IPAD</NavLink>
            </li>
            <li>
              <NavLink to="/macbook">MACBOOK</NavLink>
            </li>
            <li>
       
              <NavLink to="/login"> <CgProfile/></NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header