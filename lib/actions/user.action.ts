"user server";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

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

