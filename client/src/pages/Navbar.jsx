import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './pages.css'

function Navbar(props) {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    function getUser() {
        let data = JSON.parse(localStorage.getItem("user"))
        setUser(data)
    }
    useEffect(() => {
        getUser()
    }, [localStorage.getItem("user")])
    function LogOut() {
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
                                        <NavLink className="btn btn-warning mt-2 m-2 pt-2" style={{ color: "white" }} aria-current="page" to={'/'}><i className="material-icons">store</i></NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="btn btn-warning mt-2 m-2 pt-2" style={{ color: "white" }} aria-current="page" to={`/user/profil/${user?.user_id}`}><i className="material-icons">account_box</i></NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <a className="btn btn-warning mt-2 m-2 pt-2 out" style={{ color: "white" }} aria-current="page" onClick={LogOut} ><i className="material-icons">keyboard_tab</i></a>
                                    </li>
                                    <li className="nav-item">
                                        <p class="fst-italic">{user.login}</p>
                                    </li>
                                </ul>
                                :
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <NavLink className="btn btn-warning mt-2 m-2 pt-2" style={{ color: "white" }} aria-current="page" to={'/'}>Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="btn btn-warning mt-2 m-2 pt-2" style={{ color: "white" }} aria-current="page" to={'/register'}>Register</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="btn btn-warning mt-2 m-2 pt-2" style={{ color: "white" }} aria-current="page" to={'/login'}>Login</NavLink>
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