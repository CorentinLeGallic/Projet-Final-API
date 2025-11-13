import { config } from 'dotenv';

config();

export const JWT_CONSTANTS = {
  secret: process.env.JWT_KEY as string,
};
