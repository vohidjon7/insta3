import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Profil(props) {
    const param = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [post, setPost] = useState()
    function getUser() {
        fetch(`http://localhost:5000/get-user/${param.id}`)
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
    }
    function getPost() {
        fetch(`http://localhost:5000/get-post/${param.id}`)
            .then(res => res.json())
            .then(data => {
                setPost(data);
            })
    }
    useEffect(() => {
        getPost()
        getUser()
    }, [])
    function Navigate() {
        navigate(`/edit-profil/${user?.id}`)
    }
    function Navigate1() {
        navigate(`/add-post/${user?.id}`)
    }

    function Navigate2() {
        navigate(`/edit-post/${user?.id}`)
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
            <button className='btn btn-outline-primary' onClick={Navigate1}>Add Post</button>
            <div className=''>
                {
                    post?.map((e, idx) => {
                        return (
                            <div className="card" style={{ width: '18rem'}}>
                                <img src={e?.img_url} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-text">{e?.post}</p>
                                    <button className='btn btn-outline-danger' onClick={Navigate2}>Edit</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Profil;