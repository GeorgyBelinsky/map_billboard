import './index.css';
import { useState } from 'react';
const RegisterForm = ({ registerUser, setIsRegistered }) => {
    const [formData, setFormData] = useState({ firstName: '', secondName: '', email: '', password: '' });

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const result = await registerUser(formData);
            alert("User "+formData.firstName +" "+formData.secondName+" successfuly registered.")
            setIsRegistered(true);
        } catch (error) {
           alert('Registration failed:', error);
        }
    };

    return (
        <form className="authorize_form" onSubmit={handleRegister}>
            <h3>Registration</h3>
            
            <input required type="text" placeholder="Name" value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />

            <input required type="text" placeholder="Surname" value={formData.secondName}
                onChange={(e) => setFormData({ ...formData, secondName: e.target.value })} />

            <input required type="email" placeholder="Email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

            <input required type="password" placeholder="Password" value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} pattern="^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$"/>

            <button className="submit_button" type="submit">Register</button>
        </form>
    )
};
export default RegisterForm;