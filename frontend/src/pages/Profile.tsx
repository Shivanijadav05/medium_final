import { Appbar } from "../components/Appbar";
import { usePosts } from "../hooks/usePosts";
import { BlogCard } from "../components/BlogCard";




export const Profile=()=>

{
  const {posts}=usePosts();
  return <div>
      <Appbar></Appbar>
      <div className="flex justify-center">
  
        <div className=" max-w-xl">
          {posts.map(blog => <BlogCard authorName={blog.author.name || "ANONYMOUS"}
            title={blog.title}
            content={blog.content}
            id={blog.id}
            publishedDate="9 MAR 2025" ></BlogCard>)}
  
  
  
        </div>
      </div>
    </div>




}