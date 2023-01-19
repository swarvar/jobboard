import Joi from 'joi';
import { NewCreatedJob } from './job.interfaces';
import { objectId } from '../validate';

const createJobBody: Record<keyof NewCreatedJob, any> = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  email: Joi.string().required().email(),
  skills: Joi.array().items(Joi.string()),
  experience: Joi.number().required(),
  postedById: Joi.custom(objectId).required(),
};

export const createJob = {
  body: Joi.object().keys(createJobBody),
};

export const getJobs = {
  query: Joi.object().keys({
    title: Joi.string(),
    experience: Joi.number(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getJob = {
  params: Joi.object().keys({
    JobId: Joi.string().custom(objectId),
  }),
};

export const updateJob = {
  params: Joi.object().keys({
    JobId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      name: Joi.string(),
    })
    .min(1),
};

export const deleteJob = {
  params: Joi.object().keys({
    JobId: Joi.string().custom(objectId),
  }),
};
