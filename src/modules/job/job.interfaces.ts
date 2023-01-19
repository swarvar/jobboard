import mongoose, { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IJob {
  title: string;
  description: string;
  email: string;
  skills: Array<string>;
  experience: number;
  postedById: mongoose.Schema.Types.ObjectId;
  applicantIds: Array<mongoose.Schema.Types.ObjectId>;
}

export interface IJobDoc extends IJob, Document {}

export interface IJobModel extends Model<IJobDoc, Document> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateJobBody = Partial<IJob>;

export type NewCreatedJob = Omit<IJob, 'applicantIds'>;
