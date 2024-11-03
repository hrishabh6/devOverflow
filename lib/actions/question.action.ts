"use server"

import Question from "@/database/question.model"
import { connectToDatabase } from "../mongoose"
import Tag from "@/database/tag.model"
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types"
import User from "@/database/user.model"

export async function getQuestions(params: GetQuestionsParams){
    try {
        connectToDatabase();
        const questions = await Question.find({}).populate({path: 'tags', model: Tag}).populate({path: 'author', model: User})

        return {questions}

    } catch (error) {
        console.log(error)
    }
}


export async function createQuestion(param : CreateQuestionParams){
    try {
        await connectToDatabase();
        const {title, content, tags, author, path} = param

        const question = await Question.create({
            title,
            content,
            author
        })

        const tagDocument = []

        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                {name : {$regex: new RegExp(`^${tag}$`, "i")}},
                {$setOnInsert : {name: tag}, $push: {questions : question._id}},
                {upsert: true, new: true, setDefaultsOnInsert: true}
            )
            tagDocument.push(existingTag._id);
        }

        await Question.findByIdAndUpdate(question._id, {
            $push: {tags: {$each: tagDocument}}
        })

    } catch (error) {
        console.error(error);
    }
}
