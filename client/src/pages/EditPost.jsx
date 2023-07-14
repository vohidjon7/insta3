import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const [img_url,setImg] = useState()
    const [post,setPost] = useState()
    const [user,setUser] = useState()
    const param = useParams()
    const navigate = useNavigate()

    function getPost(){
        fetch(`http://localhost:5000/get-post1/${param.id}`)
        .then(res => res.json())
        .then(data =>{
            setImg(data?.img_url)
            setPost(data?.post)
        })
    }
    function getUser() {
            let data = JSON.parse(localStorage.getItem("user"));
            setUser(data);
    }

    useEffect(() => {
        getUser()
        getPost()
    }, []);


    function EditPost(){
        fetch(`http://localhost:5000/edit-post/${param.id}`,{
            method: "PUT",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({img_url:img_url,post:post})
        }).then(res => res.json())
            .then(data =>{
                if (data.xato) {
                    window.alert(data.xato)
                }else{
                    navigate(`/profil/${user?.id}`)
                }
            })

    }
    return (
        <div className='register'>
            <div className='register1'>
            <input type="text" className='form-control mt-3' placeholder='img' value={img_url} onChange={(e) => setImg(e.target.value)} />
            <input type="text" className='form-control mt-3' placeholder='post' value={post} onChange={(e) => setPost(e.target.value)} />
            <button className='btn btn-outline-primary m-3' onClick={()=>navigate(`/profil/${user?.id}`)}>Back</button>
            <button className='btn btn-outline-primary m-3' onClick={EditPost} >Edit Profil</button>
            </div>
        </div>
    );
}

export default EditPost;
