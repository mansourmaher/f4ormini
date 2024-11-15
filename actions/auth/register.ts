"use server"
import { RegisterSchema } from "@/app/schemas"
import { z } from "zod"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/app/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import bcrypt from "bcryptjs"

export const register=async(values:z.infer<typeof RegisterSchema>)=>
{
    
    const validateFiels=RegisterSchema.safeParse(values)
    if(!validateFiels.success)
    {
        return {error:"Invalid fields"}
    }
    const {email,password,firstname,lastname}=validateFiels.data
    const hassedPassword=await bcrypt.hash(password,10)
    const existUser=await getUserByEmail(email)
    if(existUser)
    {
        return {error:"Email already exist"}
    }
    const newUser=await db.user.create({data:{email,password:hassedPassword,firstName:firstname,lastName:lastname}})
    const verificationToken=await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email,verificationToken.token)
    return {succes:"Wellcome to ower platform verify your email to start"}
}

