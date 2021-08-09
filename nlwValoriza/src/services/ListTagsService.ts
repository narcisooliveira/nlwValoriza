import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";


class ListTagsService {

    async execute() {
        const tagsRepositories = getCustomRepository(TagsRepositories)

        const tags = await tagsRepositories.find()

        // Um maneira de manipular os dados da entidade 
        // tags = tags.map((tag) => ({...tag, nameCustom: `#${tag.name}`}))

        return classToPlain(tags) 
    }
}

export { ListTagsService }