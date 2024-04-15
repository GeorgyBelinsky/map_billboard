import { useNavigate } from 'react-router-dom';
import './index.css';

const UserInfo = () => {

    const navigate = useNavigate();

    function toLogin() {
      return navigate("/login");
    }

    const handleLogOut = () => {
        localStorage.clear();
        toLogin();
        location.reload();
    }

    return (
        <div className='user_info'>
            <div className="logout" onClick={handleLogOut}>
                log out
            </div>
        </div>
    )
}

export default UserInfo;