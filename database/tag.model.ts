import {Schema, model, models, Document} from 'mongoose'

export interface ITag extends Document {
    name: string,
    description: string,
    questions: Schema.Types.ObjectId[],
    followers: Schema.Types.ObjectId[],
    createdOn: Date

}

const tagSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }], // Array of ObjectIds referencing questions
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],    // Array of ObjectIds referencing users
    createdOn: { type: Date, default: Date.now } // Defaults to current date
});

const Tag = models.Tag || model<ITag>('Tag', tagSchema)

export default Tag; 

 














