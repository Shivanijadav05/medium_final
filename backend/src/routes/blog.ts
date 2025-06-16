import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import {Hono} from "hono"
import { verify } from "hono/jwt"
import { createBlogInput, CreateBlogInput,updateBlogInput } from "shivani-medium-common"


export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:number
    }
}>()


blogRouter.use("/*",async (c,next)=>{
   const authHeader=c.req.header("authorization") || ""
   const user=await verify(authHeader,c.env.JWT_SECRET) as{id:string}
   if(user){
    c.set("userId",Number(user.id));
    await next();
   }
   else{
    c.status(403);
    return c.json({
        message:"you are not logged in!" 
    })
   }

})


//create a blog
blogRouter.post('/',async (c)=>{
   try{

        const body=await c.req.json();
        
            const {success}=createBlogInput.safeParse(body);
            if(!success)
            {
              c.status(411);
              return c.json({
                message:"inputs are not correct"
              })
            }
        const userId=Number(c.get("userId"));
        const prisma=new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const post=await prisma.post.create({
            data:{
                title:body.title,
                content:body.content,
                     //  @ts-ignore
                authorId:Number(userId)
            }
        })
        return c.json({
            id:post.id
        });
    }
    catch(e)
    {
        c.status(403);
        console.log(e);
        return c.json({
            message:"error while creating blog"
        })
    }
  })
  
  //update a blog
  blogRouter.put('/',async (c)=>{
   
    try
    {
        const body=await c.req.json();
       
            const {success}=updateBlogInput.safeParse(body);
            if(!success)
            {
              c.status(411);
              return c.json({
                message:"inputs are not correct"
              })
            }
        const userId=c.get("userId");
        console.log(userId);
        const prisma=new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        const post=await prisma.post.update({
            where:{
                id:body.id
            },
                data:{
                title:body.title,
                content:body.content,
                     //  @ts-ignore
                authorId:{set:Number(userId)}
                }
        })
        return c.json({
            id:post.id,
             message:"successfully updating a blog"
        });
        
    }
    catch(e)
    {
        c.status(403);
        console.log(e);
        return c.json({
            message:"error while updating a blog"
        })
    }


  })


  //get profile
  blogRouter.get('/profile',async(c)=>{
    const userId=c.get("userId");
    const prisma=new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    try
    {
        const posts=await prisma.post.findMany({
            where:{authorId:userId},
            include:{author:true},

        });
        return c.json({
            posts
        })
    }
    catch(e)
    {
        c.status(400);
        console.log(e);
        return c.json({
            message:"error while displaying"
        })
    }
  })




  //collect all blog
  blogRouter.get('/bulk',async (c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
    const posts=await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });
    

    return c.json({
        posts
    })
}
    catch(e)
    {
        console.log(e);
    }
  })
  




  //read a blog
  blogRouter.get('/:id{[0-9]+}',async (c)=>{
   try 
   {
        const id= c.req.param("id");
        const prisma=new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        const post=await prisma.post.findFirst({
            where:{
              //  @ts-ignore
                id:Number(id)
            },
                select:{
                    title:true,
                    content:true,
                    author:{
                        select:{
                            name:true
                        }
                    }
                
            }
        })
        return c.json({
            post
        });
    }
        catch(e)
        {
            c.status(404);
            console.log(e);
            return c.json({
                message:"Error while fetching blog post"
            })
        }
  })


  