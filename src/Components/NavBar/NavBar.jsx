import './index.css';
import logo_img from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NavBar = () => {

  const [isAuthorized, setIsAuthorized] = useState();

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
  }, [localStorage]);

  return (
    <div className="nav_bar">
      <img className='logo_container' src={logo_img} />
      <div className='links_container'>
        {isAuthorized ? <Link className="link" to="/support">Support</Link> :
          <Link className="link" to="/login">Support</Link>}
        <Link className="link" to="/">Buy</Link>
        {isAuthorized ? <Link className='link' to="/user">User info</Link> :
          <Link className="link" to="/login">Login</Link>}
      </div>
    </div>
  );
}

export default NavBar;