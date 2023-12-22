import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
  author: string;
  colaborators: string[];
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  author: { type: String, required: true },
  colaborators: [{ type: String }],
});

export default mongoose.model<ITask>('Task', TaskSchema);