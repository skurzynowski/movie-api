import { promisify } from 'util';
import fs from 'fs';

export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);
