import ImageKit from "@imagekit/nodejs";
import { config } from "../config/config.js";

const imagekit = new ImageKit({
  publicKey: config.IMAGEKIT_PUBLICKEY,
  privateKey: config.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: config.IMAGEKIT_URLENDPOINT,
});

export const uploadFile = async ({
  file,
  fileName,
  folder = "/uploads",
}) => {
  try {
    if (!file) {
      throw new Error("File is required");
    }

    const response = await imagekit.upload({
      file,
      fileName,
      folder,
      useUniqueFileName: true,
    });

    return response;
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};