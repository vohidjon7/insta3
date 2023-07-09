import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate()
    function Register(e) {
        e.preventDefault();
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login: login, password: password })
        }).then(res => res.json())
            .then(data => { 
                if (data.xato) {
                    window.alert(data.xato)
                }else{
                    navigate(`/profil/${data.id}`)
                }
            })
    }
    return (
        <div className='register'>
            <div className="register1">
                <form onSubmit={Register}>
                    <input type="text" className='form-control mt-3' placeholder='Login' value={login} onChange={(e) => setLogin(e.target.value)} />
                    <input type="password" className='form-control mt-3' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='btn btn-outline-primary mt-3' onClick={Register}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;