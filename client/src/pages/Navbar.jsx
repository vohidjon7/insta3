import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './pages.css'

function Navbar(props) {
    const [user, setUser] = useState()
    const navigate = useNavigate()
    function getUser() {
        let data = JSON.parse(localStorage.getItem("user"))
        setUser(data)
    }
    useEffect(() => {
        getUser()
    }, [])
    function LogOut(){
        localStorage.clear()
        navigate('/login')
        setUser('')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {
                            user?.login ?
                              
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to={'/'}>Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to={`/profil/${user?.id}`}>{user?.login}</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active out" aria-current="page" onClick={LogOut} >Log Out</a>
                                    </li>
                                </ul>
                                :
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to={'/register'}>Register</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to={'/login'}>Login</NavLink>
                                    </li>
                                </ul>
                        }
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default Navbar;