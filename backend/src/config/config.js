import dotenv from "dotenv";
dotenv.config();

export const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  IMAGEKIT_PRIVATEKEY: process.env.IMAGEKIT_PRIVATEKEY,
  IMAGEKIT_PUBLICKEY: process.env.IMAGEKIT_PUBLICKEY,
  IMAGEKIT_URLENDPOINT: process.env.IMAGEKIT_URLENDPOINT, 
};
