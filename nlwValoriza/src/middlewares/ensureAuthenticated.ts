import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPload {
    sub: string
}

export function ensureAuthenticated( request: Request, response: Response, next: NextFunction ) {
    
    // Receber o token
    const authToken = request.headers.authorization
    
    // Validar se token está preenchido
    if (!authToken) {
        return response.status(401).end()
    }

    // A "," a=ignora a primeira posição do array
    const [,token] = authToken.split(" ")

    try {
        // Validar se token é válido
        const { sub } = verify(token, "53010a5619f05115e2e23fcca38df988") as IPload
        
        // Recuperar informações do usuário
        request.user_id = sub

        return next()
    } catch (error) {
        return response.status(401).end()
    }
    
}
