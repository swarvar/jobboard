import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IJobDoc, NewCreatedJob, UpdateJobBody } from './job.interfaces';
import Job from './job.model';
import { ApiError } from '../errors';

/**
 * Create new job
 * @param {NewCreatedJob} jobBody
 * @returns {Promise<IJobDoc>}
 */
export async function createJob(jobBody: NewCreatedJob): Promise<IJobDoc> {
  return Job.create(jobBody);
}

/**
 * Query for jobs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryJobs = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const Jobs = await Job.paginate(filter, options);
  return Jobs;
};

/**
 * Get job by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IJobDoc | null>}
 */
export const getJobById = async (id: mongoose.Types.ObjectId): Promise<IJobDoc | null> => Job.findById(id);

/**
 * Update job by id
 * @param {mongoose.Types.ObjectId} jobId
 * @param {UpdateJobBody} updateBody
 * @returns {Promise<IJobDoc | null>}
 */
export const updateJobById = async (jobId: mongoose.Types.ObjectId, updateBody: UpdateJobBody): Promise<IJobDoc | null> => {
  const job = await getJobById(jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  Object.assign(Job, updateBody);
  await job.save();
  return job;
};

/**
 * Delete Job by id
 * @param {mongoose.Types.ObjectId} jobId
 * @returns {Promise<IJobDoc | null>}
 */
export const deleteJobById = async (jobId: mongoose.Types.ObjectId): Promise<IJobDoc | null> => {
  const job = await getJobById(jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  await job.remove();
  return job;
};
