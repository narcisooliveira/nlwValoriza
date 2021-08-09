import { getCustomRepository } from "typeorm";
import { ComplimentRepositories } from "../repositories/ComplimentsRepositories";


class ListUserReceiveComplimentsService {

    async execute(user_id: string) {
        const complimentsRepositories = getCustomRepository(ComplimentRepositories) 

        const compliments = await complimentsRepositories.find({
            where:{
                userReceiver: user_id
            }
            // Faz um relacionamento com as outras colunas
            // relations: ["userSender", "userReceiver", "tag"]
        })

        return compliments
    } 
}

export { ListUserReceiveComplimentsService }