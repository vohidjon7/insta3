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

    function DeletePost(id){
        fetch(`http://localhost:5000/delete-post`,{
            method: "DELETE",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({id:id,user_id:user.id})
        }).then(res => res.json())
            .then(data =>{
                if (data.xato) {
                    window.alert(data.xato)
                }else{
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
        navigate(`/user/edit-profil/${user?.id}`)
    }
    function Navigate1() {
        navigate(`/user/add-post/${user?.id}`)
    }

    function Navigate2(id) {
        navigate(`/user/edit-post/${id}`)
    }
    return (
        <div className='profil'>
            <div className='mt-4'>
                <img className='img mb-4' style={{borderRadius:"50%"}} width="200px" height="200px"  src={user?.foydalanuvchi_img} alt="rasm" />
                <h3>{user?.login}</h3>
                <h3>{user?.email}</h3>
                <h5>{user?.bio}</h5>
            </div>
            <button className='btn btn-outline-primary mt-4 m-2' onClick={Navigate}>Edit Profil</button>
            <button className='btn btn-outline-primary mt-4 m-2' onClick={Navigate1}>Add Post</button>
            <div className='container'>
                {
                    post?.map((e, idx) => {
                        return (
                            <div className="mb-4" style={{ width: '18rem'}}>
                                <img src={e?.img_url} className="card-img-top" style={{height:"200px"}} alt="..." />
                                <div className="card-body">
                                    <p className="card-text">{e?.post}</p>
                                    <button className='btn btn-outline-danger m-2' onClick={()=>DeletePost(e.id)}>Delete</button>
                                    <button className='btn btn-outline-danger m-2' onClick={()=>Navigate2(e?.id)}>Edit</button>
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