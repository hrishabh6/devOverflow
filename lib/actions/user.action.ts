"user server";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Questions from "@/database/quesstion.model";

export async function getUserById(userId: string) {
    try {
        await connectToDatabase();       
        const user = await User.findOne({ clerkId: userId });
        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}

export async function createUser(userParams:CreateUserParams) {
    try {
        connectToDatabase()
        const newUser = await User.create(userParams); 
        return newUser;
    } catch (error) {
        
    }
}
export async function updateUser(Params:UpdateUserParams) {
    try {
        connectToDatabase()
        const {clerkId, updateData, path} = Params;
        await User.findOneAndUpdate({clerkId: clerkId}, updateData, {new: true});
        revalidatePath(path);
    } catch (error) {
        
    }
}
export async function deleteUser(Params:DeleteUserParams) {
    try {
        connectToDatabase()
        const {clerkId} = Params;
        const user = await User.findOneAndDelete({clerkId})

        if (!user) {
            throw new Error('User not found')
        }

        //delete all data of that user 
        const userQuestionIDs = await Questions.find({author : user._id}).distinct('_id');
        await Questions.deleteMany({author : user._id});

        // todo: delete all the tags that are not associated with any question

        const deleteUser = await User.findByIdAndDelete(user._id)
        return deleteUser;  

    } catch (error) {
        
    }
}