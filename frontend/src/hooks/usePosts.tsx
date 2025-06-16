import React, { useEffect, useState } from 'react';
import  axios  from 'axios';

interface Author {
  name: string;
}
interface Post {
  id: number;
  title: string;
  content: string;
  author: Author;
}


export const  usePosts=()=>{
    const [posts,setPosts]=useState<Post[]>([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState<string>('');

    
    useEffect(()=>{
        const fetchposts=async()=>{
            try
            {
                const token=localStorage.getItem("token");
                if(!token)
                {
                    setLoading(false);
                    setError("no token found.Please log in");
                    return;
                }
                const response=await axios.get('https://backend.shivanihjadav.workers.dev/api/v1/blog/profile',{
                    headers:{
                        Authorization:token
                    }
                })
               
                setPosts(response.data.posts);
            }
            catch(error)
            {
               setError( "error fetching posts");
            }
        }
        fetchposts();
    },[]);
    return {posts};
}