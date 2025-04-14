import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/skeleton";
import { useBlogs } from "../hooks"
export const Blogs = () => {

  const { loading, blogs } = useBlogs();
  if (loading) {
    return <div>
      <BlogSkeleton></BlogSkeleton></div>
   
  }

  return <div>
    <Appbar></Appbar>
    <div className="flex justify-center">

      <div className=" max-w-xl">
        {blogs.map(blog => <BlogCard authorName={blog.author.name || "ANONYMOUS"}
          title={blog.title}
          content={blog.content}
          id={blog.id}
          publishedDate="9 MAR 2025" ></BlogCard>)}



      </div>
    </div>
  </div>
}

