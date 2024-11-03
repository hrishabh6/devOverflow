"user server"

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose"
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function getUserById(params : any ) {
    try {
        connectToDatabase();

        const { userId } = params;

        const user = await User.findOne({clerkId: userId});
        return user;


    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function createUser(params : CreateUserParams){
    try {
        connectToDatabase();
        console.log("creating a user")
        const newUser = await User.create(params)
        return newUser;
    } catch (error) {
        throw error
        console.error("user can not be created")
    }
}
export async function updateUser(params : UpdateUserParams){
    try {
        connectToDatabase();
        const {clerkId, updateData, path} = params
        const newUser = await User.findOneAndUpdate({clerkId}, updateData, {new : true})
        revalidatePath(path)
    } catch (error) {
        
    }
}
export async function deleteUser(params : DeleteUserParams){
    try {
        connectToDatabase();
        const {clerkId} = params
        const user = await User.findOneAndDelete({clerkId})
        
        if(!user){
            throw new Error('User not found')
        }

        const userQuestionId  = await Question.find({author : user._id}).distinct('_id')

        await Question.deleteMany({author : user._id})

    } catch (error) {
        
    }
}