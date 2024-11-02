"use server"

import Question from "@/database/quesstion.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { Regex } from "lucide-react";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/user.model";


 export async function getQuestions(params : GetQuestionsParams) {
    try {
        connectToDatabase();
        const questions = await Question.find({}).populate({path: 'tags', model: Tag}).populate({path : 'author', model : User}).exec();
        return {questions}
    } catch (error) {
        console.log(error)
        throw error;
    }
 }


export async function createQuestion(params: CreateQuestionParams) {
    try {
        await connectToDatabase();

        const { title, content, tags, author, path } = params;

        // Create a new question document
        const question = await Question.create({
            title,
            content,
            author,
        });

        const tagDocuments = [];

        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
                {
                    $setOnInsert: { name: tag },
                    $push: { questions: question._id }, 
                },
                { upsert: true, new: true }
            );

            tagDocuments.push(existingTag._id);
        }
        await Question.findByIdAndUpdate(question._id, { 
            $push : {tags : {$each : tagDocuments }}
         });

    } catch (error) {
        console.error(error);
        throw new Error("Failed to create question");
    }
}
