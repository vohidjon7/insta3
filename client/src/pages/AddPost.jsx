import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddPost(props) {
    const [img, setImg] = useState()
    const [post, setPost] = useState()
    const navigate = useNavigate()
    const param = useParams()
    function AddPost(e) {
        e.preventDefault()
        fetch(`http://localhost:5000/add-post/${param.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ img: img, post: post })
        })
        .then(res=>res.json())
        .then(data=>{
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
                <h1 >Add Post</h1>
                <form >
                    <input type="text" className='form-control mt-3' placeholder='Img' value={img} onChange={(e) => setImg(e.target.value)} />
                    <input type="text" className='form-control mt-3' placeholder='Post' value={post} onChange={(e) => setPost(e.target.value)} />
                    <button className='btn btn-outline-primary m-3' onClick={() => navigate(`/user/profil/${param.id}`)} >Back</button>
                    <button className='btn btn-outline-primary m-3' onClick={AddPost} >Add Post</button>
                </form>
            </div>
        </div>
    );
}

export default AddPost;