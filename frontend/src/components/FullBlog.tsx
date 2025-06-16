import { Appbar } from "./Appbar"
import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"


export const FullBlog=({blog}:{blog:Blog})=>{
    return <div>
        <Appbar></Appbar>
        
        <div className="grid grid-cols-12 gap-x-10 w-full pt-10">
                <div className="col-span-8">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                        {blog.title}
                    </h1>

                    <p className="text-sm text-gray-500 mb-8">Post on 9 Mar 2025</p>

                    <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        {blog.content}
                    </article>
                </div>

            </div>
            
            <div className="col-span-4">
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="text-slate-500 uppercase tracking-wide font-semibold mb-4">
                    Author
                    </div>
                <div className="flex w-full">
                    <div className="pr-2 flex-col justify-center"><Avatar name={blog.author.name ||"Anonymous"} size="big"></Avatar></div>
                    <div>
                        <div className="text-xl font-bold">{blog.author.name || "Anonymous"}</div>
                    <div className="pt-2 text-slate-500"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum quaerat illo illum magni debitis error provident nostrum praesentium odio incidunt quis, iusto velit libero in facere, sint voluptatum ratione. Maiores.Random catch to get users attention</div></div>
                </div>
                </div>
            </div>

        </div>
    </div>
}