import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Blog {
    title: string;
    content: string;
    id: number;
    author: {
        name: string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    useEffect(() => {
       
             console.log("useblog started")
             const token = localStorage.getItem("token")
             console.log(token)
            axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("token"), // Ensure token is set
                    },
                }
            ).then(response => {
                    setBlog(response.data.post);
                    setLoading(false);
                 console.log(response.data.post);
                     console.log("after logging response")
                })
             console.log("fetched")

        


    }, [id]);

    return { loading, blog }  
   
}


export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);


    useEffect(() => {
        try {
            console.log("useblog started")
            const token = localStorage.getItem("token")
            // console.log(token)
            axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,
                {
                    headers: {
                        Authorization: localStorage.getItem("token"), // Ensure token is set
                    },
                }
            )
                .then(response => {
                    setBlogs(response.data.posts);
                    setLoading(false);
                    console.log(response.data.posts);
                    console.log("after logging response")
                })
            console.log("fetched")

        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }



    }, []);



    return { loading, blogs }

}