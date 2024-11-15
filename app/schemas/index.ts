import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({message: "Please enter a valid email"}),
    
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"

    })
})
export const RegisterSchema = z.object({
    firstname: z.string().min(3, {
        message: "First name must be at least 3 characters long"

    }),
    lastname: z.string().min(3, {
        message: "Last name must be at least 3 characters long"

    }),
    email: z.string().email({message: "Please enter a valid email"}),
    
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"

    }),
   
})



