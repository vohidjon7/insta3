import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Profil(props) {
    const param = useParams()
    const navigate = useNavigate()
    const [user,setUser] = useState()
    console.log(user);
    function getUser(){
        fetch(`http://localhost:5000/get-user/${param.id}`)
        .then(res => res.json())
        .then(data =>{
            setUser(data)
        })
    }
    useEffect(()=>{
        getUser()
    },[])
    function Navigate(){
        navigate(`/edit-profil/${user?.id}`)
    }
    return (
        <div>
            <div>
                <h3>{user?.login}</h3>
                <h3>{user?.email}</h3>
                <h5>{user?.bio}</h5>
                <img className='img' src={user?.foydalanuvchi_img} alt="rasm" />
            </div>
            <button className='btn btn-outline-primary' onClick={Navigate}>Edit Profil</button>
        </div>
    );
}

export default Profil;