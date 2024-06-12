import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthorizeForm = ({ authUser }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const navigate = useNavigate();
    function toMap() {
        return navigate("/");
    }

    const handleAuthenticate = async (e) => {
        e.preventDefault();
        const result = await authUser(credentials);
        localStorage.setItem('token', result);
        //localStorage.setItem('isAdminSupport', result.isAdminSupport);

        alert('Authentication successfull');
        toMap();
        location.reload();
    };

    return (
        <form className="authorize_form" onSubmit={handleAuthenticate}>
            <h3>Log in</h3>
            <input required className="field_input" type="email" placeholder="Email" value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
            <input required className="field_input" type="password" placeholder="Password" value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <button className="submit_button" type="submit">Authorize</button>
        </form>
    );
}

export default AuthorizeForm;