import { Link } from "react-router-dom";
import { Options } from "./Options";



 export interface BlogCardType {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id:number;

}


export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardType) => {
    return (
        
      <div className=" relative w-full max-w-4xl mx-auto p-6 mb-6 bg-white rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center mb-3 space-x-3">
              <Avatar name={authorName} size="small" />
              <span className="text-gray-700 font-light text-sm">{authorName}</span>
              <Circle />
              <span className="text-gray-400 font-thin text-sm">{publishedDate}</span>
            </div>
            <Options id={Number(id)}></Options>
          </div>
        <Link to={`/blog/${id}`}>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
        </Link>
        <p className="text-gray-600 text-sm font-light mb-3 line-clamp-3">
          {content.length > 200 ? content.slice(0, 200) + "..." : content}
        </p>
        <div className="text-gray-500 text-xs font-thin">{`${Math.ceil(content.length / 100)} minute(s) read`}</div>
      </div>
 
    )
}




export function Avatar({ name,size="small",onClick }: { name: string,size:"small" | "big",onClick?:()=> void; }) {
   

    return <div 
              onClick={onClick}
             className={`relative inline-flex items-center justify-center ${size=="small"?"w-6 h-6":"w-10 h-10"} w-4.5 h-4.5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 `}>
            <span className={`${size=="small"?"text-xs":"text-md"} text-gray-600 dark:text-gray-300` }>{name[0]}</span>
    </div>
   
}

function Circle()
{
    return <div className="h-1 w-1 rounded-full bg-slate-200">

    </div>
}