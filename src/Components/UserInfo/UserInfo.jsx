import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.css';
import OwnedBillboard from './OwnedBillboard/OwnedBillboard';

const UserInfo = () => {

    useEffect(() => {
        getUserBillboards();
    }, [])

    const [ownedBillboards, setOwnedBillboards] = new useState([]);

    const getUserBillboards = async () => {
        try {
            //TODO: change request to a correct for the task when it`s ready
            const response = await fetch('https://billboards-backend.azurewebsites.net/api/Bord/BoardDetails');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setOwnedBillboards(result);
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

    return (
        <div className='user_info'>
            <div className='user_history'>
                {ownedBillboards?.map((billboard, index) => (
                    <OwnedBillboard key={index} billboard={billboard} />
                ))}
            </div>
            <div className='user_sidebar'>
                <div className="logout" onClick={handleLogOut}>
                    log out
                </div>
            </div>
        </div>
    )
}

export default UserInfo;