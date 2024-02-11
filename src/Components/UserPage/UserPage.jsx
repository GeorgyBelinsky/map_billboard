import { useState } from 'react';
import './index.css';
import AuthorizeForm from './AuthorizeForm/AuthorizeForm';
import RegisterForm from './RegisterForm/RegisterForm';
import { useEffect } from 'react';
const UserPage = () => {
    const [isRegistered, setIsRegistered] = useState(false);

    const registerUser = async (userData) => {
        try {
            const response = await fetch('https://bord.azurewebsites.net/api/User/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessages = errorData.error.split(/,\s*/); 

                alert(errorMessages.join('\n'));
                throw new Error(errorData.error);
            }

            return await response.text();
        } catch (error) {
            console.error('Error during registration:', error.message);
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
                const errorData = await response.json();
                alert(errorData.message, "Error");
                throw new Error(errorData.message);
            }

            return await response.text();

        } catch (error) {
            console.error('Error during authentication:', error.message);
            throw error;
        }
    };

    return (
        <div className="user_page">
            {!isRegistered ? <RegisterForm registerUser={registerUser} setIsRegistered={setIsRegistered} /> : <AuthorizeForm authUser={authUser} />}
            <a className="switch_form" href="#" onClick={() => setIsRegistered((prevIsRegistered) => !prevIsRegistered)}>
                {!isRegistered ? "Already registered? Authorize."
                    : "Don`t have account? Register."}</a>
        </div>
    )
}

export default UserPage;