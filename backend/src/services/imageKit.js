import ImageKit from "@imagekit/nodejs";
import { config } from "../config/config.js";

const imagekit = new ImageKit({
  publicKey: config.IMAGEKIT_PUBLICKEY,
  privateKey: config.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: config.IMAGEKIT_URLENDPOINT,
});

export const uploadFile = async ({ file, fileName, folder = "/uploads" }) => {
  try {
    if (!file) {
      throw new Error("File is required");
    }

    if (!fileName) {
      throw new Error("File name is required");
    }
    const response = await imagekit.files.upload({
      file: file.toString("base64"),
      fileName,
      folder,
      useUniqueFileName: true,
    });

    return {
      fileId: response.fileId,
      name: response.name,
      url: response.url,
      thumbnailUrl: response.thumbnailUrl,
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

export async function deleteFile(fileId) {
  try {
    await imagekit.files.delete(fileId);
  } catch (error) {
    console.error(`Failed to delete ${fileId}:`, error.message);
  }
}
