import React, { useState } from 'react';
import { useEffect } from 'react';

function Home (props) {
    const [post, setPost] = useState();
    function getPost() {
        fetch(`http://localhost:5000/home`)
        .then(res => res.json())
        .then(data => {
            setPost(data);
        })
    }

    useEffect(() => {
        getPost()
    }, [])
    return (
        <div className='home'>
          {
            post?.map((e, idx) => {
               return (
                <div className="mb-4" style={{ width: '18rem'}}>
                   <img src={e?.img_url} className="card-img-top img" style={{height:"200px"}} alt="..." />
                </div>
               )
                
            })
          }
        </div>
    )
}

export default Home;
