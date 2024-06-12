import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.css';
import OwnedBillboard from './OwnedBillboard/OwnedBillboard';

const UserInfo = () => {
    const [ownedBillboards, setOwnedBillboards] = useState([]);
    const [displayOption, setDisplayOption] = useState("Rented billboards");
    const [userEmail, setUserEmail] = useState('');

    const displayOptions = ["Rented billboards", "Owned billboards"];

    useEffect(() => {
        getUserBillboards();
        getUserData();
    }, [])

    useEffect(() => {
        getUserBillboards();
    }, [displayOption])

    const getUserBillboards = async () => {
        try {
            const response = await fetch(`https://billboards-backend.azurewebsites.net/api/User/GetUserBoards?personal=${displayOption === "Rented billboards" ? false : true}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            setOwnedBillboards(result);
        } catch (error) {
            console.log(error);
            setOwnedBillboards([]);
        }
    };

    const getUserData = async () => {
        try {
            const response = await fetch(`https://billboards-backend.azurewebsites.net/api/User/UserCheck`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.text();

            setUserEmail(result);
        } catch (error) {
            console.log(error);
        }
    };

    const navigate = useNavigate();

    function toLogin() {
        return navigate("/login");
    }

    const handleLogOut = () => {
        localStorage.clear();
        toLogin();
        location.reload();
    }

    const handleDisplayedOptionChange = (e) => {
        setDisplayOption(e.target.value);
    };

    return (
        <div className='user_info'>
            <div className='user_history_container'>
                <select className="billboard_switch_select" onChange={handleDisplayedOptionChange} value={displayOption} >
                    {displayOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <div className='user_history'>
                    {ownedBillboards?.map((billboard, index) => (
                        <OwnedBillboard key={index} billboard={billboard} />
                    ))}
                </div>
            </div>
            <div className='user_sidebar'>
                <p className='user_email'>
                    {userEmail}
                </p>
                <div className='logout' onClick={handleLogOut}>
                    log out
                </div>
            </div>
        </div>
    )
}

export default UserInfo;