import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './pages.css'

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
                console.log(data);
                setPost(data);
            })
    }

    function DeletePost(id) {
        fetch(`http://localhost:5000/delete-post`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, user_id: user.user_id })
        }).then(res => res.json())
            .then(data => {
                if (data.xato) {
                    window.alert(data.xato)
                } else {
                    window.alert('Uchirildi')
                    setPost(data);
                }
            })

    }
    useEffect(() => {
        getPost()
        getUser()
    }, [])
    function Navigate() {
        navigate(`/user/edit-profil/${user?.user_id}`)
    }
    function Navigate1() {
        navigate(`/user/add-post/${user?.user_id}`)
    }

    function Navigate2(id) {
        navigate(`/user/edit-post/${id}`)
    }
    return (
        <div className='profil'>
            <div className='prf mt-4'>
                {
                    user?.foydalanuvchi_img ?
                    <img className='img mb-4' style={{ borderRadius: "50%" }} width="200px" height="200px" src={user?.foydalanuvchi_img} alt="rasm" />
                    :
                    <img className='img mb-4' style={{ borderRadius: "50%" }} width="200px" height="200px" src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png" alt="rasm" />
                }
                <h3>{user?.login}</h3>
                <div className="btns">
                    <button className='btn btn-warning mt-4 m-2 pt-2' onClick={Navigate}><i class="material-icons">edit</i></button>
                    <button className='btn btn-warning mt-4 m-2 pt-2' onClick={Navigate1}><i class="material-icons">add</i></button>
                </div>
            </div>
            <div className='container'>
                {
                    post?.map((e, idx) => {
                        return (
                            <div className="card1 mb-4" style={{ width: '20rem' }}>
                                <img src={e?.img_url} className="card-img-top" style={{ height: "230px" }} alt="..." />
                                <div className="card-body">
                                    <button className='btn btn-outline-warning m-2 pt-2'  onClick={() => DeletePost(e.post_id)}><i class="material-icons">delete</i></button>
                                    <button className='btn btn-outline-warning m-2 pt-2'  onClick={() => Navigate2(e?.post_id)}><i class="material-icons">edit</i></button>
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