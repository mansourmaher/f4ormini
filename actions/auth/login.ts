"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { z } from "zod"
import { getUserByEmail } from "@/app/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import { LoginSchema } from "@/app/schemas"

export const login=async(values:z.infer<typeof LoginSchema>)=>
{
    const validateFiels=LoginSchema.safeParse(values)
    if(!validateFiels.success)
    {
        return {error:"Invalid fields"}
    }
    const {email,password}=validateFiels.data
    const existingUser=await getUserByEmail(email)
    if(!existingUser || !existingUser.email || !existingUser.password)
    {
        return {error:"EMAIL DOES NOT EXIST"}
    }
     if(!existingUser.emailVerified)
     {
       
         const verificationToken=await generateVerificationToken(existingUser.email)
         await sendVerificationEmail(existingUser.email,verificationToken.token)
         
         return {error:"Please verify your email before logging in. A new verification email has been sent to your email address."}
          


     }
   

    
    try{
        if(existingUser.role ==="TEACHER")
        {
            await signIn('credentials',{email,password,redirectTo:"/teacher_dashbord"})
            return {success:"Logged in"}
        }
        else if(existingUser.role ==="STUDENT")
            { await signIn('credentials',{email,password,redirectTo:"/"})
        
        return {success:"Logged in"}}
        else if(existingUser.role==="ADMIN")
            {
                await signIn('credentials',{email,password,redirectTo:"/admin/admin_dashboard"})
                return {success:"Logged in"}


            }
       
    }catch(error:any){
        if(error instanceof AuthError)
        {
            switch(error.type)
            {
                case"CredentialsSignin":
                return {error:"Invalid credentials"}
                default:
                return {error:"An error occurred"}
            }
        }
        throw error


    }

}