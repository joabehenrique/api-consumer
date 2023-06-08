import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        console.log("Username: ", username);
        console.log("Password: ", password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Login</button>
        </form>
    );
};


const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        console.log("New User - Username: ", username);
        console.log("New User - Password: ", password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create User</h2>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Create</button>
        </form>
    );
};

export { Login, CreateUser };