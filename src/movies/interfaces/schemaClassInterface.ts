import { ObjectSchema } from '@hapi/joi';

export interface SchemaClassInterface {
  getSchema: (genre: string[]) => ObjectSchema;
}
