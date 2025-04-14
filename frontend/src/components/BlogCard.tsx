import { Link } from "react-router-dom";



interface BlogCardType {
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
    return <Link to={`/blog/${id}`}>
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            <div className="flex justify-center flex-col">
                <Avatar name={authorName} size="small"></Avatar>
            </div>
            <div className="font-extralight pl-2 text-sm">
                {authorName}
            </div>
            <div className="flex justify-center flex-col pl-2 ">
                <Circle></Circle>
            </div>
            <div className="pl-2 font-thin text-slate-400 text-sm">{publishedDate}</div>
        </div>
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-sm font-thin pb-3">{content.slice(0, 100) + "..."}</div>
        <div className="text-slate-500 text-sm font-thin">{`${Math.floor(content.length / 100)}minute(s)`}</div>
        
    </div>
    </Link>
}




export function Avatar({ name,size="small" }: { name: string,size:"small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center ${size=="small"?"w-6 h-6":"w-10 h-10"} w-4.5 h-4.5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 `}>
        <span className={`${size=="small"?"text-xs":"text-md"} text-gray-600 dark:text-gray-300` }>{name[0]}</span>
    </div>
}


function Circle()
{
    return <div className="h-1 w-1 rounded-full bg-slate-200">

    </div>
}