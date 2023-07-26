import React, { useState } from 'react';
import { useEffect } from 'react';
import './pages.css'
import { useNavigate } from 'react-router-dom';

function Home(props) {
    const [post, setPost] = useState();
    const [user, setUser] = useState();
    const navigate = useNavigate()

    function getPost() {
        fetch(`http://localhost:5000/home`)
            .then(res => res.json())
            .then(data => {
                setPost(data);
            })
    }
    function getUser() {
        let data = JSON.parse(localStorage.getItem("user"))
        setUser(data)
    }
    useEffect(() => {
        getPost()
        getUser()
    }, [])

    function Liked(id) {
        fetch(`http://localhost:5000/like`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ post_id: id, user_id: user?.user_id })
        })
            .then(res => res.json())
            .then(data => {
                if (data.xato) {
                    window.alert(data.xato)
                    navigate(`/login`)
                }else{
                    setPost(data)
                }
                setPost(data)
            })
    }
    function UnLiked(id) {
        fetch(`http://localhost:5000/unlike`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        }).then(res => res.json())
            .then(data => {
                setPost(data)
            })

    }
    return (
        <div className='home container'>
            {
                post?.map((e, idx) => {
                    return (
                        <div key={idx} className="card1 mb-4" style={{ width: '18rem' }}>
                            <img src={e?.img_url} className="card-img-top img" style={{ height: "200px" }} alt="..." />
                            {
                                (e.post_id === e.post1_id) ?
                                    <>
                                        {
                                            (e.user1_id === user.user_id) ?
                                                <button className='btn btn-outline-danger hbtn' ><i className="material-icons mt-1" onClick={() => UnLiked(e.post_id)}>favorite</i></button>
                                                :
                                                <button className='btn btn-outline-danger hbtn' ><i className="material-icons mt-1" onClick={() => Liked(e.post_id)}>favorite_border</i></button>
                                        }
                                    </>
                                    :
                                    <button className='btn btn-outline-danger hbtn' ><i className="material-icons mt-1" onClick={() => Liked(e.post_id)}>favorite_border</i></button>
                            }
                        </div>
                    )
                })
            }
        </div >
    )
}

export default Home;
