import { Appbar } from "./Appbar"
import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"


export const FullBlog=({blog}:{blog:Blog})=>{
    return <div>
        <Appbar></Appbar>
        
        <div className="grid grid-cols-12 px-10 w-full pt-10">
            <div className="col-span-8">
                <div className="text-3xl font-extrabold">{blog.title}</div>
                <div className="text-slate-500 pt-2">Post on 9 Mar 2025</div>
                <div className="pt-4 ">{blog.content}</div>
            </div>
            <div className="col-span-4">
                <div className="text-slate-500">Author</div>
                <div className="flex w-full">
                    <div className="pr-2 flex-col justify-center"><Avatar name={blog.author.name ||"Anonymous"} size="big"></Avatar></div>
                    <div>
                        <div className="text-xl font-bold">{blog.author.name || "Anonymous"}</div>
                    <div className="pt-2 text-slate-500"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum quaerat illo illum magni debitis error provident nostrum praesentium odio incidunt quis, iusto velit libero in facere, sint voluptatum ratione. Maiores.Random catch to get users attention</div></div>
                </div>
            </div>

        </div>
    </div>
}