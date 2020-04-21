import { Injectable } from '@nestjs/common';
import Joi from '@hapi/joi';
import { SchemaClassInterface } from '../interfaces/schemaClassInterface';

@Injectable()
export class FindMoviesSchema implements SchemaClassInterface {
  getSchema(genres) {
    return Joi.object({
      genres: Joi.array()
        .min(1)
        .items(Joi.string().valid(...genres))
        .optional(),
      runtime: Joi.number()
        .min(0)
        .optional(),
    });
  }
}
