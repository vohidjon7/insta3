import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditProfil(props) {
    const [login, setLogin] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [img, setImg] = useState();
    const [bio, setBio] = useState();
    const param = useParams();
    const navigate = useNavigate()
    function getUser(){
        fetch(`http://localhost:5000/get-user/${param.id}`)
        .then(res => res.json())
        .then(data =>{
            setLogin(data?.login)
            setEmail(data?.email)
            setPassword(data?.password)
            setBio(data?.bio)
            setImg(data?.foydalanuvchi_img)
        })
    }
    useEffect(()=>{
        getUser()
    },[])

    function EditProfil(e) {
        e.preventDefault();
        fetch(`http://localhost:5000/edit-profil/${param.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login: login, email: email, password: password, bio:bio, img:img })
        }).then(res => res.json())
            .then(data => { 
                if (data.xato) {
                    window.alert(data.xato)
                }else{
                    navigate(`/user/profil/${param.id}`)
                }
            })
    }
    return (
        <div className='register'>
            <div className="register1">
                <h1 >Edit Profil</h1>
                <form >
                    <input type="text" className='form-control mt-3' placeholder='Login' value={login} onChange={(e) => setLogin(e.target.value)} />
                    <input type="text" className='form-control mt-3' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" className='form-control mt-3' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="text" className='form-control mt-3' placeholder='Bio' value={bio} onChange={(e) => setBio(e.target.value)} />
                    <input type="text" className='form-control mt-3' placeholder='Img' value={img} onChange={(e) => setImg(e.target.value)} />
                    <button className='btn btn-outline-primary m-3' onClick={()=>navigate(`/user/profil/${param.id}`)} >Back</button>
                    <button className='btn btn-outline-primary m-3' onClick={EditProfil} >Edit Profil</button>
                </form>
            </div>
        </div>
    );
}

export default EditProfil;