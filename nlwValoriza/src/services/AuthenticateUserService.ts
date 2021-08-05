import { getCustomRepository } from "typeorm"

import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import { UsersRepositories } from "../repositories/UserRepositories"

interface IAuthenticateRequest {
    email: string,
    password: string
}

class AuthenticateUserService{

    async execute({email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories)
        
        // Verificar se email existe
        const user = await usersRepositories.findOne({
            email
        })

        if (!user) {
            throw new Error("Email/Password incorrect")
        }

        // Verificar se senha está correta

        // 987981247912 => 987981247912jbaksfih018214hbof

        const passwordMatch = await compare(password, user.password)

        // Gerar token

        const token = sign({
            email: user.email
        }, "53010a5619f05115e2e23fcca38df988", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token
    }
}


export { AuthenticateUserService }