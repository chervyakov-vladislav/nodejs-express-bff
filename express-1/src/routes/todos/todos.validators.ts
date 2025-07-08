import { RequestHandler } from "express";
import { z } from "zod";
import { BadRequestError } from "../../common/errors/bad-request-error";

const paramsSchema = z.object({
  id: z.coerce.number().positive(),
});

const bodySchema = z
  .object({
    id: z.coerce.number().positive().optional(),
    title: z.string().min(3),
    completed: z.boolean(),
  })
  .strip();

const validateBody = (schema: z.ZodSchema): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new BadRequestError("Bad request");
    }

    req.body = result.data;
    next();
  };
};

const validateParams = (schema: z.ZodSchema): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      throw new BadRequestError("Bad request");
    }

    req.params = result.data;
    next();
  };
};

export const validateParamId = validateParams(paramsSchema);
export const validateBodyTodo = validateBody(bodySchema);
