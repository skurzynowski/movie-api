import { Injectable } from '@nestjs/common';
import Joi from '@hapi/joi';
import { SchemaClassInterface } from '../interfaces/schemaClassInterface';

@Injectable()
export class CreateMovieSchema implements SchemaClassInterface {
  getSchema(genres) {
    return Joi.object({
      title: Joi.string()
        .alphanum()
        .max(255)
        .required(),
      genres: Joi.array()
        .min(1)
        .items(Joi.string().valid(...genres))
        .required(),
      year: Joi.number()
        .min(1900)
        .max(2100)
        .required(),
      runtime: Joi.number()
        .min(0)
        .required(),
      director: Joi.string()
        .max(255)
        .required(),
      actors: Joi.string().optional(),
      plot: Joi.string().optional(),
      posterUrl: Joi.string().optional(),
    });
  }
}
