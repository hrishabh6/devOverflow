import { Schema, models, model, Document } from 'mongoose';

export interface Iuser extends Document {
    clerkId: string;
    name: string;
    email: string;
    password?: string;
    bio?: string;
    picture: string;
    location?: string;
    portfolioLink?: string;
    reputation?: number;
    saved: Schema.Types.ObjectId[];
    joinedAt: Date;
}

const userSchema = new Schema<Iuser>({
    clerkId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    bio: { type: String, required: false },
    picture: { type: String, required: true },
    location: { type: String, required: false },
    portfolioLink: { type: String, required: false },
    reputation: { type: Number, default: 0 },
    saved: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    joinedAt: { type: Date, default: Date.now }
});

const User = models.User || model<Iuser>('User', userSchema);
export default User;
