import Joi from "joi";

export const createUserSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  middlename: Joi.string().required(),
});

export const findUserSchema = Joi.object({
  registrationId: Joi.string().required(),
});
