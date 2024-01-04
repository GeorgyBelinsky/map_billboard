import { useState } from 'react';
import './index.css';
import AuthorizeForm from './AuthorizeForm/AuthorizeForm';
import RegisterForm from './RegisterForm/RegisterForm';
const UserPage = () => {
    const [isRegistered, setIsRegistered] = useState(false);

    const registerUser = async (userData) => {
        console.log(JSON.stringify(userData));
        try {
            const response = await fetch('https://bord.azurewebsites.net/api/User/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            return await response.text(); // You might want to return some data from the server response
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    };

    const authUser = async (credentials) => {
        try {
            const response = await fetch('https://bord.azurewebsites.net/api/User/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Authentication failed');
            }

            return await response.text();

        } catch (error) {
            console.error('Error during authentication:', error);
            throw error;
        }
    };

    return (
        <div className="user_page">
            {!isRegistered ? <RegisterForm registerUser={registerUser} setIsRegistered={setIsRegistered}/> : <AuthorizeForm authUser={authUser} />}
            <a className="switch_form" href="#" onClick={() => setIsRegistered((prevIsRegistered) => !prevIsRegistered)}>
                {!isRegistered ? "Already registered? Authorize."
                    : "Don`t have account? Register."}</a>
        </div>
    )
}

export default UserPage;