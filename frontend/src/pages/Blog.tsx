

import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"

export const Blog=()=>{
  
    const {id}=useParams();
    console.log(id);
         const { loading, blog } = useBlog({
            id:id || " "
         });
          if (loading || !blog) {
            return <div>LOADING</div>
          }
          return <div>
           
           <FullBlog blog={blog}></FullBlog>
            {/* <Appbar></Appbar> */}
            
    </div>
}