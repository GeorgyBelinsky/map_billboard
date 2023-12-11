import './index.css';
import logo_img from '../../assets/logo.svg';
import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="nav_bar">
            <img className='logo_container' src={logo_img} />
            <div className='links_container'>
                <Link className="link" to="/"><span className='link_border'/> Map</Link>
                <Link className="link" to="/cabinet"><span className='link_border'/> Cabinet</Link>
            </div>
        </div>
    );
}

export default NavBar;