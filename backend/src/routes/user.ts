import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import {sign,verify } from "hono/jwt"
import {signupInput,signinInput} from "shivani-medium-common"

export const userRouter=new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    }
  }>();




userRouter.post('/signup',async (c)=>{
    const body=await c.req.json();
    const {success}=signupInput.safeParse(body);
    if(!success)
    {
      c.status(411);
      return c.json({
        message:"inputs are not correct"
      })
    }


    const validationResult = signupInput.safeParse(body);
    console.log("Validation Result:", validationResult); // 🔍 Debugging

    if (!validationResult.success) {
        c.status(411);
        return c.json({ 
            message: "Inputs are not correct",
            error: validationResult.error.errors  // 🔍 Detailed error response
        });
    }

    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      try{
     
      const user=await prisma.user.create({
        data:{
          email:body.username,
          name:body.name,
          password:body.password,
        },
      })
    
      const token=await sign({id: user.id},c.env.JWT_SECRET);
      console.log("Generated JWT:", token);
      return c.json({token});
    }catch (error) {
      console.error("Signup Error:", error);
      c.status(500);
      return c.json({ error: "Internal Server Error" });
    }
    
})




userRouter.post('/signin',async (c)=>{
  const body=await c.req.json();
    const {success}=signinInput.safeParse(body);
    if(!success)
    {
      c.status(411);
      return c.json({
        message:"inputs are not correct"
      })
    }
  const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  try{
  const user=await prisma.user.findUnique({
    where:{
      email:body.username
    }
  });
  if(!user)
  {
    c.status(403);
    return c.json({error:"user not found"})
  }

  const token=await sign({id:user.id},c.env.JWT_SECRET)
  console.log("Generated JWT:",token);

  return c.json({token});
}
catch(e)
{
    console.log(e);
    c.status(400);
    return c.json({error:"user not found"})
}

})



// userRouter.post('/userinfo',async(c)=>{
//   const body=await c.req.json();
//     const {success}=signinInput.safeParse(body);
//     if(!success)
//     {
//       c.status(411);
//       return c.json({
//         message:"inputs are not correct"
//       })
//     }
//   const prisma=new PrismaClient({
//     datasourceUrl:c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
  
//   try{
//   const user=await prisma.user.findUnique({
//     where:{
//       email:body.username
//     }
//   });
//   return c.json(user?.name);
//   console.log(user)
//   }
//   catch(e)
//   {
//      console.log(e);
//     c.status(400);
//     return c.json({error:"user not found"})

//   }
// })




userRouter.post("/userinfo",async (c)=>{
   try{const authHeader=c.req.header("authorization") || ""
   const decoded=await verify(authHeader,c.env.JWT_SECRET) as{id:string}
    const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());
   
   const user=await prisma.user.findUnique({
    where:{id:Number(decoded.id)},
    select:{
      id:true,
      name:true,email:true
    }
   })
   if(!user)
   {
    return c.json("user not found");
   }
   return c.json({user});
}
catch(error)
{
   console.error(error);
    return c.json({ error: "Invalid or expired token" });
}

})


