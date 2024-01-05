import './index.css';
import logo_img from '../../assets/logo.svg';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';

const NavBar = () => {

    const [isAuthorized, setIsAuthorized]= useState();

    useEffect(() => {
        // Check the content of 'token' in localStorage
        const token = localStorage.getItem('token');
        setIsAuthorized(!!token); // Update isLoggedIn based on whether 'token' exists
    
        // Set up an event listener for changes in 'token'
        const handleStorageChange = () => {
          const updatedToken = localStorage.getItem('token');
          setIsLoggedIn(!!updatedToken);
        };
    
        window.addEventListener('storage', handleStorageChange);
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };
      }, []);

    const handleLogOut=()=>{
        localStorage.clear();
        setIsAuthorized(false);
    }

    return (
        <div className="nav_bar">
            <img className='logo_container' src={logo_img} />
            <div className='links_container'>
                <Link className="link" to="/"><span className='link_border'/>Map</Link>
                {isAuthorized?<a className="link" onClick={handleLogOut}><span className='link_border'/>Log out</a> :
                <Link className="link" to="/authorization"><span className='link_border'/>Login</Link>}
            </div>
        </div>
    );
}

export default NavBar;